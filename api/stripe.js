import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const redirectToStripe = async (session) => {
  const stripe = await stripePromise;
  const result = await stripe.redirectToCheckout({
    sessionId: session.data.id,
  });
};

export default redirectToStripe;
