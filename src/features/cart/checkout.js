import React from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

import STRIPE_PUBLISHABLE from './constants/stripe';
import PAYMENT_SERVER_URL from './constants/server';

const CURRENCY = 'USD';

const fromDollarstoCents = amount => parseInt(amount * 100);

export default class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {success: false, data: { amount: null, transactionID: null}};
    this.successPayment = this.successPayment.bind(this);
    this.errorPayment = this.errorPayment.bind(this);
  }

  successPayment(data) {
    const amount = (data.data.success.amount / 100).toFixed(2);
    const transactionID = data.data.success.id;
    this.setState({success: true, data: { amount, transactionID }});
  }

  errorPayment(data) {
    this.setState({success: false, data: data.data});
    alert('Payment Error');
  }

  onToken = amount => token => axios.post(PAYMENT_SERVER_URL,
    {
      source: token.id,
      currency: CURRENCY,
      amount: fromDollarstoCents(amount)
    })
    .then(this.successPayment)
    .catch(this.errorPayment);

  render() {
    return (
      <div>
        <StripeCheckout
          amount={fromDollarstoCents(this.props.amount)}
          token={this.onToken(this.props.amount)}
          currency={CURRENCY}
          stripeKey={STRIPE_PUBLISHABLE}
        />
        {this.state.success
          ? <div style={{fontWeight: 'bold'}}>
              <br />
              {`Purchase Confirmed! Amount: $${this.state.data.amount}, Transaction ID: ${this.state.data.transactionID}`}
            </div>
          : null}
      </div>
    );
  }
};
