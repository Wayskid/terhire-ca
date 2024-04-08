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

//Webhook
const endpointSecret = process.env.STRIPE_SECRET;
stripeRouter.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
    } catch (err) {
      // On error, log and return the error message
      console.log(`❌ Error message: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const checkoutSessionCompleted = event.data.object;
        const {
          id,
          amount_subtotal,
          amount_total,
          created,
          currency,
          customer,
          customer_details,
          payment_method_types,
          payment_status,
          shipping_details,
          total_details,
        } = checkoutSessionCompleted;

        const session = await stripe.checkout.sessions.retrieve(
          checkoutSessionCompleted.id,
          {
            expand: ["customer", "line_items.data.price.product"],
          }
        );

        await Order.create({
          session_id: id,
          user_id: session.customer.metadata.user_id,
          cart_items: session.line_items.data,
          amount_subtotal,
          amount_total,
          order_no: created,
          order_date: created,
          delivery_date: created + 14 * 24 * 60 * 60,
          currency,
          customer_id: customer,
          customer_details,
          payment_method_types,
          payment_status,
          shipping_details,
          total_details,
        });

        // map cart items
        const mappedCartItems = session.line_items.data.map(
          (item) =>
            `<table
            cellspacing="0"
            cellpadding="0"
            border="0"
            role="presentation"
            width="100%"
            align="center"
            class="r0-o"
            style="table-layout: fixed; width: 100%;"
          >
            <tr>
              <td
                class="r28-i"
                style="background-color: #fcf6ea; padding-left: 35px; padding-right: 35px; padding-top: 57px;"
              >
                <table
                  width="100%"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  role="presentation"
                >
                  <tr>
                    <th
                      width="25%"
                      valign="top"
                      class="r5-c"
                      style="font-weight: normal;"
                    >
                      <table
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        role="presentation"
                        width="100%"
                        class="r6-o"
                        style="table-layout: fixed; width: 100%;"
                      >
                        <tr>
                          <td valign="top" class="r16-i">
                            <table
                              width="100%"
                              cellspacing="0"
                              cellpadding="0"
                              border="0"
                              role="presentation"
                            >
                              <tr>
                                <td class="r29-c" align="left">
                                  <table
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                    role="presentation"
                                    width="100"
                                    class="r30-o"
                                    style="table-layout: fixed; width: 100px;"
                                  >
                                    <tr>
                                      <td style="font-size: 0px; line-height: 0px;">
                                        <img src="https://img.mailinblue.com/2670624/images/rnb/original/5fd092a3becf5f229e6014c2.png" width="100" border="0" style="display: block; width: 100%;" >
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </th>
                    <th
                      width="50%"
                      valign="top"
                      class="r5-c"
                      style="font-weight: normal;"
                    >
                      <table
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        role="presentation"
                        width="100%"
                        class="r6-o"
                        style="table-layout: fixed; width: 100%;"
                      >
                        <tr>
                          <td valign="top" class="r16-i">
                            <table
                              width="100%"
                              cellspacing="0"
                              cellpadding="0"
                              border="0"
                              role="presentation"
                            >
                              <tr>
                                <td class="r31-c" align="left">
                                  <table
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                    role="presentation"
                                    width="100%"
                                    class="r32-o"
                                    style="table-layout: fixed; width: 100%;"
                                  >
                                    <tr class="nl2go-responsive-hide">
                                      <td
                                        height="25"
                                        style="font-size: 25px; line-height: 25px;"
                                      >
                                        ­
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        align="left"
                                        valign="top"
                                        class="r33-i nl2go-default-textstyle"
                                        style="color: #3b3f44; font-family: Montserrat,arial,helvetica,sans-serif; font-size: 16px; line-height: 1.2; word-break: break-word; text-align: left;"
                                      >
                                        <div>
                                          <h3
                                            class="default-heading3"
                                            style="margin: 0; color: #000; font-family: Montserrat,arial,helvetica,sans-serif; font-size: 20px; word-break: break-word;"
                                          >
                                            <u>Product name</u>
                                          </h3>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  class="r34-c nl2go-default-textstyle"
                                  align="left"
                                  style="color: #3b3f44; font-family: Montserrat,arial,helvetica,sans-serif; font-size: 16px; line-height: 1.2; word-break: break-word; padding-top: 6px; text-align: left; valign: top;"
                                >
                                  <div>
                                    <div
                                      class="sib_class_16_black"
                                      style="color: #000; font-family: Montserrat,arial,helvetica,sans-serif; font-size: 16px; word-break: break-word;"
                                    >
                                      Category here
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </th>
                    <th
                      width="8.33%"
                      valign="top"
                      class="r5-c"
                      style="font-weight: normal;"
                    >
                      <table
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        role="presentation"
                        width="100%"
                        align="left"
                        class="r13-o"
                        style="table-layout: fixed; width: 100%;"
                      >
                        <tr>
                          <td
                            align="left"
                            valign="top"
                            class="r35-i nl2go-default-textstyle"
                            style="color: #3b3f44; font-family: Montserrat,arial,helvetica,sans-serif; font-size: 16px; line-height: 1.2; word-break: break-word; padding-top: 35px; text-align: left;"
                          >
                            <div>
                              <div
                                class="sib_class_18_black_sb"
                                style="color: #000; font-family: Montserrat,arial,helvetica,sans-serif; font-size: 18px; font-weight: 600; word-break: break-word;"
                              >
                                x2
                              </div>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </th>
                    <th
                      width="16.67%"
                      valign="top"
                      class="r5-c"
                      style="font-weight: normal;"
                    >
                      <table
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        role="presentation"
                        width="100%"
                        align="left"
                        class="r13-o"
                        style="table-layout: fixed; width: 100%;"
                      >
                        <tr>
                          <td
                            align="right"
                            valign="top"
                            class="r35-i nl2go-default-textstyle"
                            style="color: #3b3f44; font-family: Montserrat,arial,helvetica,sans-serif; font-size: 16px; line-height: 1.2; word-break: break-word; padding-top: 32px; text-align: right;"
                          >
                            <div>
                              <div
                                class="sib_class_24_black_b"
                                style="color: #000; font-family: Montserrat,arial,helvetica,sans-serif; font-size: 24px; font-weight: 700; word-break: break-word;"
                              >
                                1300€
                              </div>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </th>
                  </tr>
                </table>
              </td>
            </tr>
          </table>`
        );

        async function main() {
          const transporter = nodeMailer.createTransport({
            host: process.env.MAILER_HOST,
            secureConnection: true,
            port: 587,
            auth: {
              user: process.env.TERHIRE_EMAIL,
              pass: process.env.TERHIRE_PASSWORD,
            },
          });

          const info = await transporter.sendMail({
            from: `Terhire <${process.env.TERHIRE_EMAIL}>`,
            to: customer_details.email,
            subject: "Order Confirmation",
            html: emailHtml({
              name: customer_details.name,
              mappedCartItems,
            }),
          });

          console.log(`Message sent: ${info.messageId}`);
        }
        main();
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    response.send().end();
  }
);
