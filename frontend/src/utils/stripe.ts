import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your publishable key
// Get this from: https://dashboard.stripe.com/test/apikeys
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';

// Make sure to use test key in development: pk_test_...
// And live key in production: pk_live_...
export const stripePromise = stripePublishableKey 
  ? loadStripe(stripePublishableKey)
  : null;

// Log warning if key not configured
if (!stripePublishableKey) {
  console.warn('⚠️ Stripe not configured. Add VITE_STRIPE_PUBLISHABLE_KEY to .env file');
}

export const STRIPE_ENABLED = !!stripePublishableKey;
