const configureStripe = require('stripe');

const STRIPE_SECRET_KEY = 'your_secret_key';

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;
