const functions = require('firebase-functions');
const { reportError } = require('./functionLogging');
const admin = require('firebase-admin');
const { Stripe } = require('stripe');
const stripe = new Stripe(functions.config().stripe.secret, {});
if(!admin.apps || !admin.apps.length)
{
  admin.initializeApp();
}

exports.createStripeCustomer = functions.auth.user().onCreate(async (user) => {
  const customer = await stripe.customers.create({ email: user.email });
  const intent = await stripe.setupIntents.create({
    customer: customer.id,
  });
  await admin.firestore().collection('stripe_customers').doc(user.uid).set({
    customer_id: customer.id,
    setup_secret: intent.client_secret,
  });
  return;
});

exports.addPaymentMethodDetails = functions.firestore
  .document('/stripe_customers/{userId}/payment_methods/{pushId}')
  .onCreate(async (snap, context) => {
    try {
      const paymentMethodId = snap.data().id;
      const paymentMethod = await stripe.paymentMethods.retrieve(
        paymentMethodId,
      );
      await snap.ref.set(paymentMethod);
      const intent = await stripe.setupIntents.create({
        customer: `${paymentMethod.customer}`,
      });
      await snap.ref.parent.parent.set(
        {
          setup_secret: intent.client_secret,
        },
        { merge: true },
      );
      return;
    } catch (error) {
      await snap.ref.set({ error: userFacingMessage(error) }, { merge: true });
      await reportError(error, { user: context.params.userId });
    }
  });

  exports.createStripePayment = functions.firestore
  .document('stripe_customers/{userId}/payments/{pushId}')
  .onCreate(async (snap, context) => {
    const { amount, currency, payment_method } = snap.data();
    try {
      // Look up the Stripe customer id.
      const dbObj = (await snap.ref.parent.parent.get()).data();
      const customer = dbObj.customer_id;
      // Create a charge using the pushId as the idempotency key
      // to protect against double charges.
      const idempotencyKey = context.params.pushId;
      const connectedAccount = dbObj.connectedAccount;
      const payment = await stripe.paymentIntents.create(
        {
          amount,
          currency,
          customer,
          payment_method,
          off_session: false,
          confirm: true,
          confirmation_method: 'manual',
        },
        { idempotencyKey },
      );
      // If the result is successful, write it back to the database.
      await snap.ref.set(payment);
    } catch (error) {
      // We want to capture errors and render them in a user-friendly way, while
      // still logging an exception with StackDriver
      console.log(error);
      await snap.ref.set({ error: userFacingMessage(error) }, { merge: true });
      await reportError(error, { user: context.params.userId });
    }
  });
  // confirm that the authorizationCode belongs to an account on our platform
  async function driverStripeAccount(authorizationCode) {
    const resp = await stripe.oauth.token({
      grant_type: 'authorization_code',
      code: authorizationCode,
    });
    return resp;
  }

  /**
   * When 3D Secure is performed, we need to reconfirm the payment
   * after authentication has been performed.
   *
   * @see https://stripe.com/docs/payments/accept-a-payment-synchronously#web-confirm-payment
   */
   exports.confirmStripePayment = functions.firestore
   .document("stripe_customers/{userId}/payments/{pushId}")
   .onUpdate(async (change, context) => {
     if (change.after.data().status === "requires_confirmation") {
       const payment = await stripe.paymentIntents.confirm(
         change.after.data().id
       );
       change.after.ref.set(payment);
     }
   });
 
 /**
  * When a user deletes their account, clean up after them
  */
 exports.cleanupUser = functions.auth.user().onDelete(async (user) => {
   const dbRef = admin.firestore().collection("stripe_customers");
   const customer = (await dbRef.doc(user.uid).get()).data();
   await stripe.customers.del(customer.customer_id);
   // Delete the customers payments & payment methods in firestore.
   const batch = admin.firestore().batch();
   const paymetsMethodsSnapshot = await dbRef
     .doc(user.uid)
     .collection("payment_methods")
     .get();
   paymetsMethodsSnapshot.forEach((snap) => batch.delete(snap.ref));
   const paymentsSnapshot = await dbRef
     .doc(user.uid)
     .collection("payments")
     .get();
   paymentsSnapshot.forEach((snap) => batch.delete(snap.ref));
 
   await batch.commit();
 
   await dbRef.doc(user.uid).delete();
   return;
 });