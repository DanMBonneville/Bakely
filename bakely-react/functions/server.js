const express = require("express");
const app = express();
const cors = require("cors");
const { logging } = require("./functionLogging");
const { Stripe } = require("stripe");
const validator = require("express-validator");
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const { reportError } = require("./functionLogging");

const stripe = new Stripe(
  functions.config().stripe.secret,
  {}
);
if (!admin.apps || !admin.apps.length) {
  admin.initializeApp();
}

app
  .use(cors({ origin: true, credentials: true }))
  .use(express.json())
  .use(express.urlencoded({ extended: false }));

app.post("/createNewSetupIntent/", async (req, res) => {
  const { uid } = req.body;
  const customerId = await admin
    .firestore()
    .collection("stripe_customers")
    .doc(uid)
    .get()
    .then((entry) => {
      return entry.data().customer_id;
    })
    .catch((e) => {
      functions.logger.log("Error on fetch", e);
    });
  const newIntent = await stripe.setupIntents.create({
    customer: customerId,
  });
  await admin
    .firestore()
    .collection("stripe_customers")
    .doc(uid)
    .update({ setup_secret: newIntent.client_secret })
    .catch((e) => {
      functions.logger.log("Error on set", e);
    });
  return res.json({ success: true });
});
app.post("/handleTransaction", async (req, res) => {
  let charge = null;
  const data = req.body;
  switch (data.transactionStatus) {
    case "COMPLETED":
      charge = await captureCharge(data.chargeId);
      break;
    case "SOME_INTERMEDIATE_STATUS":
      charge = await capturePartialCharge(data.chargeId, {
        amount: data.partialCharge,
      });
      break;
    default:
      charge = await refundCharge(data.chargeId);
  }
  // perform further actions on `charge` such as saving to a collection or subcollection
  admin
    .firestore()
    .collection(`users/${data.customer.id}/charges`)
    .doc(data.chargeId)
    .set({ ...charge, status: data.transactionStatus });
});
app.post("/authorizeStripe", async (req, res) => {
  const errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { code, state } = req.query;
  try {
    const user = await admin
      .firestore()
      .collection("users")
      .doc(state.toString())
      .get();
    if (user) {
      const resp = await driverStripeAccount(code);
      if (resp.error) {
        return res.status(400).json({ error: resp.error_description });
      }
      // add the stripe account Id to the user record (integrated business)
      user.ref.update({
        stripeLink: resp.stripe_user_id,
        stripeAccessToken: resp.access_token,
      });
      return res.redirect("http://localhost:3000/home");
    }
    return res.status(400).json({ error: "CSRF detected" });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
});

app.post("/preAuthorizeCharge", (req, resp) => {
  const data = req.query;
  const percentageOfTransaction = 0.2; // percentage charge on a business for using the platform
  const application_fee_amount = Math.round(
    data.amount * percentageOfTransaction * 100
  );
  const cost = Math.round(data.amount * 100);
  const descriptor = "Bakely";
  const { description, customer } = data;
  try {
    const charge = stripe.charges.create({
      customer: customer.stripe_customer_id,
      amount: cost,
      application_fee_amount,
      description,
      statement_descriptor: descriptor,
      currency: "usd",
      transfer_data: {
        destination: data.accountId,
      },
      metadata,
      capture: false,
      receipt_email: customer.email,
    });

    return charge;
  } catch (err) {
    reportError(err);
  }
});

async function captureCharge(chargeId) {
  try {
    return await stripe.charges.capture(chargeId);
  } catch (err) {
    throw err;
  }
}

async function capturePartialCharge(chargeId, data) {
  try {
    if (data.amount) data.amount = Math.round(data.amount);
    return stripe.charges.capture(chargeId, data);
  } catch (err) {
    throw err;
  }
}

async function refundCharge(chargeId) {
  try {
    // you can choose to refund application_fee as well
    stripe.refunds.create({
      charge: chargeId,
      reverse_transfer: true,
      refund_application_fee: true,
    });
  } catch (err) {
    throw err;
  }
}

module.exports = {
  app,
};
