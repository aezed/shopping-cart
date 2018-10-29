import React from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

import STRIPE_PUBLISHABLE from './constants/stripe';
import PAYMENT_SERVER_URL from './constants/server';

const CURRENCY = 'USD';

const fromDollarstoCents = amount => amount * 100;

const successPayment = data => {
  //alert('Payment Successful');
};

const errorPayment = data => {
  alert('Payment Error');
};

const onToken = amount => token =>
  axios.post(PAYMENT_SERVER_URL,
    {
      source: token.id,
      currency: CURRENCY,
      amount: fromDollarstoCents(amount)
    })
    .then(successPayment)
    .catch(errorPayment);

const Checkout = ({ amount }) =>
  <StripeCheckout
    amount={fromDollarstoCents(amount)}
    token={onToken(amount)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  />

export default Checkout;
