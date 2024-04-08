import Stripe from "stripe";
import express from "express";
import nodeMailer from "nodemailer";
import { emailHtml } from "../utils/email.js";
import Order from "../models/orderModel.js";
import dotenv from "dotenv";

dotenv.config();

const stripe = Stripe(process.env.STRIPE_KEY);

export const stripeRouter = express.Router();

//Checkout
stripeRouter.post("/create-checkout-session", async (req, res) => {
  const { user_id, cart_items } = req.body;

  const customer = await stripe.customers.create({
    metadata: {
      user_id,
    },
  });

  const session = await stripe.checkout.sessions.create({
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "usd",
          },
          display_name: "Free shipping",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "usd",
          },
          display_name: "Next day air",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    line_items: cart_items.map((item) => {
      return {
        price_data: {
          currency: "cad",
          product_data: {
            name: item.title,
            images: [item.image],
            description: item.summary,
            metadata: {
              id: item.id,
              discount: item.discount,
            },
          },
          unit_amount: (item.price * 100).toFixed(0),
        },
        quantity: item.qty,
      };
    }),
    mode: "payment",
    shipping_address_collection: {
      allowed_countries: ["CA"],
    },
    customer: customer.id,
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: process.env.CANCEL_URL,
  });

  res.json({ url: session.url });
});

//Success page
stripeRouter.get("/success/:id", async (req, res) => {
  const { id } = req.params;

  const session = await stripe.checkout.sessions.retrieve(id, {
    expand: ["customer", "line_items.data.price.product"],
  });

  res.send({ session });
});
