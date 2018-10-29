import React from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

import STRIPE_PUBLISHABLE from './constants/stripe';
import PAYMENT_SERVER_URL from './constants/server';

const CURRENCY = 'USD';

const fromDollarstoCents = amount => parseInt(amount * 100);

const onToken = amount => token =>
  axios.post(PAYMENT_SERVER_URL,
    {
      source: token.id,
      currency: CURRENCY,
      amount: fromDollarstoCents(amount)
    })
    .then(Checkout.successPayment)
    .catch(Checkout.errorPayment);

export default class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {success: false, data: null}
  }

  successPayment(data) {
    this.setState({success:true, data});
    alert(data);
  }

  errorPayment(data) {
    alert('Payment Error');
    console.log(data);
  }

  render() {
    return (
      <div>
        <StripeCheckout
          amount={fromDollarstoCents(this.props.amount)}
          token={onToken(this.props.amount)}
          currency={CURRENCY}
          stripeKey={STRIPE_PUBLISHABLE}
        />
        {this.state.success === true && <div>Success</div>}
      </div>
    );
  }
};
