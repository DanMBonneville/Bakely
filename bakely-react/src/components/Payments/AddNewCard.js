import React from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';

import CardSection from './CardSection';

export default function AddNewCard(props) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const result = await stripe.confirmCardSetup(props.client_setup_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
      }
    });

    if (result.error) {
      // Display result.error.message in your UI.
    } else {
      // The setup has succeeded. Display a success message and send
      // result.setupIntent.payment_method to your server to save the
      // card to a Customer
      const paymentProfile = {
        uid: props.uid,
        payment_method_id: result.setupIntent.payment_method
      }
      props.store_payment_method(paymentProfile);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      <button disabled={!stripe} style={{marginTop:"10px"}}>Save Card</button>
    </form>
  );
}