const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const { Logging } = require('@google-cloud/logging');
const express = require('express');
const cors = require('cors');
const app = express();
const logging = new Logging({
  projectId: process.env.GCLOUD_PROJECT,
});

const { Stripe } = require('stripe');
const stripe = new Stripe(functions.config().stripe.secret, {
});

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

  exports.handleTransaction = functions.https.onRequest(async (req, res) => {
    let charge = null;
    const data = req.body;
    switch (data.transactionStatus) {
      case 'COMPLETED':
        charge = await captureCharge(data.chargeId)
        break;
      case 'SOME_INTERMEDIATE_STATUS':
        charge = await capturePartialCharge(data.chargeId, {amount: data.partialCharge})
        break;
      default:
        charge = await refundCharge(data.chargeId);
    }
    // perform further actions on `charge` such as saving to a collection or subcollection
    admin.firestore().collection(`users/${data.customer.id}/charges`).doc(data.chargeId).set({...charge, status: data.transactionStatus});
  });
exports.authorizeStripe = functions.https.onRequest(async (req, res) => {
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
      }
  
      const { authorizationCode } = req.body;
      try {
          const user = admin.firestore().collection('users').doc(req.user.uid).get();
          if (user.exists) {
              const resp = driverStripeAccount(authorizationCode);
              if (resp.error) {
                  return res.status(400).json({ error: resp.error_description });
              }
              // add the stripe account Id to the user record (integrated business)
              await user.ref.update({ stripeLink: resp.stripe_user_id });
              return res.json({ message: "Stripe Account Connection Completed." });
          }
          return res.status(400).json({ error: "User not found." });
      } catch (err) {
          console.error(err);
          return res.status(400).json({ error: err.message });
      }
  });
  
  exports.preAuthorizeCharge = functions.https.onRequest((req, resp) => {
    const data = req.body;
    const percentageOfTransaction = 0.05; // percentage charge on a business for using the platform
    const application_fee_amount = Math.round((data.amount * percentageOfTransaction) * 100);
    const cost = Math.round(data.amount * 100);
    const descriptor = 'Bakely';
    const description = data.description;
  
    try {
      const charge = stripe.charges.create({
        customer: customer.stripe_customer_id,
        amount: cost,
        application_fee_amount,
        description,
        statement_descriptor: descriptor,
        currency: 'usd',
        transfer_data: {
          destination: data.accountId
        },
        metadata,
        capture: false,
        receipt_email: customer.email
      });
  
      return charge;
    } catch (err) {
      reportError(err);
    }
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

/**
 * When a payment document is written on the client,
 * this function is triggered to create the payment in Stripe.
 *
 * @see https://stripe.com/docs/payments/save-and-reuse#web-create-payment-intent-off-session
 */

// [START chargecustomer]

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
    const options = {
        method: 'POST',
        uri: functions.config().stripe.secret,
        body: {
            code: authorizationCode,
            grant_type: 'authorization_code'
        },
        json: true
    }
    
    return await Request(options)
  }

// [END chargecustomer]

/**
 * When 3D Secure is performed, we need to reconfirm the payment
 * after authentication has been performed.
 *
 * @see https://stripe.com/docs/payments/accept-a-payment-synchronously#web-confirm-payment
 */
exports.confirmStripePayment = functions.firestore
  .document('stripe_customers/{userId}/payments/{pushId}')
  .onUpdate(async (change, context) => {
    if (change.after.data().status === 'requires_confirmation') {
      const payment = await stripe.paymentIntents.confirm(
        change.after.data().id,
      );
      change.after.ref.set(payment);
    }
  });

/**
 * When a user deletes their account, clean up after them
 */
exports.cleanupUser = functions.auth.user().onDelete(async (user) => {
  const dbRef = admin.firestore().collection('stripe_customers');
  const customer = (await dbRef.doc(user.uid).get()).data();
  await stripe.customers.del(customer.customer_id);
  // Delete the customers payments & payment methods in firestore.
  const batch = admin.firestore().batch();
  const paymetsMethodsSnapshot = await dbRef
    .doc(user.uid)
    .collection('payment_methods')
    .get();
  paymetsMethodsSnapshot.forEach((snap) => batch.delete(snap.ref));
  const paymentsSnapshot = await dbRef
    .doc(user.uid)
    .collection('payments')
    .get();
  paymentsSnapshot.forEach((snap) => batch.delete(snap.ref));

  await batch.commit();

  await dbRef.doc(user.uid).delete();
  return;
});

/**
 * To keep on top of errors, we should raise a error report with Stackdriver
 * This will calculate users affected + send you email
 * alerts, if you've opted into receiving them.
 */

// [START reporterror]

function reportError(err, context = {}) {
  // This is the name of the StackDriver log stream that will receive the log
  // entry. This name can be any valid log stream name, but must contain "err"
  // in order for the error to be picked up by StackDriver Error Reporting.
  const logName = 'errors';
  const log = logging.log(logName);

  // https://cloud.google.com/logging/docs/api/ref_v2beta1/rest/v2beta1/MonitoredResource
  const metadata = {
    resource: {
      type: 'cloud_function',
      labels: { function_name: process.env.FUNCTION_NAME },
    },
  };

  // https://cloud.google.com/error-reporting/reference/rest/v1beta1/ErrorEvent
  const errorEvent = {
    message: err.stack,
    serviceContext: {
      service: process.env.FUNCTION_NAME,
      resourceType: 'cloud_function',
    },
    context: context,
  };

  // Write the error log entry
  return new Promise((resolve, reject) => {
    log.write(log.entry(metadata, errorEvent), (error) => {
      if (error) {
        return reject(error);
      }
      return resolve();
    });
  });
}

// [END reporterror]

/**
 * Sanitize the error message for the user.
 */
function userFacingMessage(error) {
  return error.type
    ? error.message
    : 'An error occurred, developers have been alerted';
}

async function captureCharge(chargeId) {
  try {
    return await stripe.charges.capture(chargeId);
  } catch( err) {
    throw err;
  }
}

async function capturePartialCharge(chargeId, data) {
  try {
    if (data.amount) data.amount = Math.round(data.amount)
    return stripe.charges.capture(chargeId, data);
  } catch( err) {
    throw err;
  }
}

async function refundCharge(chargeId) {
  try {
    // you can choose to refund application_fee as well
    stripe.refunds.create({ charge: chargeId, reverse_transfer: true, refund_application_fee: true });
  } catch (err) {
    throw err;
  }
}