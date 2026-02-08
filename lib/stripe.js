
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRETKEY, {
  apiVersion: "2023-10-16",
});

