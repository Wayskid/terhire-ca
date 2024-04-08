import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/mongoose.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import reviewsRoute from "./routes/reviewsRoute.js";
import bodyParser from "body-parser";
import { stripeRouter } from "./config/stripe.js";
import cors from "cors";
import orderRoute from "./routes/orderRoute.js";
import { Server } from "socket.io";
import http from "http";
import blogRoute from "./routes/blogRoute.js";
import Stripe from "stripe";
import Order from "./models/orderModel.js";
import nodeMailer from "nodemailer";
import { emailHtml } from "./utils/email.js";

dotenv.config();
connectDB();
const app = express();

//Webhook
const stripe = Stripe(process.env.STRIPE_KEY);
const endpointSecret = process.env.STRIPE_SECRET;
app.use((req, res, next) => {
  if (req.originalUrl === "/webhook") {
    next();
  } else {
    express.json()(req, res, next);
  }
});
app.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
  const payload = req.body;
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    console.log("before");
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    console.log("after");
  } catch (err) {
    console.log(`❌ Error message: ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  // switch (event.type) {
  //   case "checkout.session.completed":
  //     const checkoutSessionCompleted = event.data.object;
  //     const {
  //       id,
  //       amount_subtotal,
  //       amount_total,
  //       created,
  //       currency,
  //       customer,
  //       customer_details,
  //       payment_method_types,
  //       payment_status,
  //       shipping_details,
  //       total_details,
  //     } = checkoutSessionCompleted;

  //     const session = await stripe.checkout.sessions.retrieve(
  //       checkoutSessionCompleted.id,
  //       {
  //         expand: ["customer", "line_items.data.price.product"],
  //       }
  //     );

  //     await Order.create({
  //       session_id: id,
  //       user_id: session.customer.metadata.user_id,
  //       cart_items: session.line_items.data,
  //       amount_subtotal,
  //       amount_total,
  //       order_no: created,
  //       order_date: created,
  //       delivery_date: created + 14 * 24 * 60 * 60,
  //       currency,
  //       customer_id: customer,
  //       customer_details,
  //       payment_method_types,
  //       payment_status,
  //       shipping_details,
  //       total_details,
  //     });

  //     // map cart items
  //     const mappedCartItems = session.line_items.data.map(
  //       (item) =>
  //         `<table
  //         cellspacing="0"
  //         cellpadding="0"
  //         border="0"
  //         role="presentation"
  //         width="100%"
  //         align="center"
  //         class="r0-o"
  //         style="table-layout: fixed; width: 100%;"
  //       >
  //         <tr>
  //           <td
  //             class="r28-i"
  //             style="background-color: #fcf6ea; padding-left: 35px; padding-right: 35px; padding-top: 57px;"
  //           >
  //             <table
  //               width="100%"
  //               cellspacing="0"
  //               cellpadding="0"
  //               border="0"
  //               role="presentation"
  //             >
  //               <tr>
  //                 <th
  //                   width="25%"
  //                   valign="top"
  //                   class="r5-c"
  //                   style="font-weight: normal;"
  //                 >
  //                   <table
  //                     cellspacing="0"
  //                     cellpadding="0"
  //                     border="0"
  //                     role="presentation"
  //                     width="100%"
  //                     class="r6-o"
  //                     style="table-layout: fixed; width: 100%;"
  //                   >
  //                     <tr>
  //                       <td valign="top" class="r16-i">
  //                         <table
  //                           width="100%"
  //                           cellspacing="0"
  //                           cellpadding="0"
  //                           border="0"
  //                           role="presentation"
  //                         >
  //                           <tr>
  //                             <td class="r29-c" align="left">
  //                               <table
  //                                 cellspacing="0"
  //                                 cellpadding="0"
  //                                 border="0"
  //                                 role="presentation"
  //                                 width="100"
  //                                 class="r30-o"
  //                                 style="table-layout: fixed; width: 100px;"
  //                               >
  //                                 <tr>
  //                                   <td style="font-size: 0px; line-height: 0px;">
  //                                     <img src="https://img.mailinblue.com/2670624/images/rnb/original/5fd092a3becf5f229e6014c2.png" width="100" border="0" style="display: block; width: 100%;" >
  //                                   </td>
  //                                 </tr>
  //                               </table>
  //                             </td>
  //                           </tr>
  //                         </table>
  //                       </td>
  //                     </tr>
  //                   </table>
  //                 </th>
  //                 <th
  //                   width="50%"
  //                   valign="top"
  //                   class="r5-c"
  //                   style="font-weight: normal;"
  //                 >
  //                   <table
  //                     cellspacing="0"
  //                     cellpadding="0"
  //                     border="0"
  //                     role="presentation"
  //                     width="100%"
  //                     class="r6-o"
  //                     style="table-layout: fixed; width: 100%;"
  //                   >
  //                     <tr>
  //                       <td valign="top" class="r16-i">
  //                         <table
  //                           width="100%"
  //                           cellspacing="0"
  //                           cellpadding="0"
  //                           border="0"
  //                           role="presentation"
  //                         >
  //                           <tr>
  //                             <td class="r31-c" align="left">
  //                               <table
  //                                 cellspacing="0"
  //                                 cellpadding="0"
  //                                 border="0"
  //                                 role="presentation"
  //                                 width="100%"
  //                                 class="r32-o"
  //                                 style="table-layout: fixed; width: 100%;"
  //                               >
  //                                 <tr class="nl2go-responsive-hide">
  //                                   <td
  //                                     height="25"
  //                                     style="font-size: 25px; line-height: 25px;"
  //                                   >
  //                                     ­
  //                                   </td>
  //                                 </tr>
  //                                 <tr>
  //                                   <td
  //                                     align="left"
  //                                     valign="top"
  //                                     class="r33-i nl2go-default-textstyle"
  //                                     style="color: #3b3f44; font-family: Montserrat,arial,helvetica,sans-serif; font-size: 16px; line-height: 1.2; word-break: break-word; text-align: left;"
  //                                   >
  //                                     <div>
  //                                       <h3
  //                                         class="default-heading3"
  //                                         style="margin: 0; color: #000; font-family: Montserrat,arial,helvetica,sans-serif; font-size: 20px; word-break: break-word;"
  //                                       >
  //                                         <u>Product name</u>
  //                                       </h3>
  //                                     </div>
  //                                   </td>
  //                                 </tr>
  //                               </table>
  //                             </td>
  //                           </tr>
  //                           <tr>
  //                             <td
  //                               class="r34-c nl2go-default-textstyle"
  //                               align="left"
  //                               style="color: #3b3f44; font-family: Montserrat,arial,helvetica,sans-serif; font-size: 16px; line-height: 1.2; word-break: break-word; padding-top: 6px; text-align: left; valign: top;"
  //                             >
  //                               <div>
  //                                 <div
  //                                   class="sib_class_16_black"
  //                                   style="color: #000; font-family: Montserrat,arial,helvetica,sans-serif; font-size: 16px; word-break: break-word;"
  //                                 >
  //                                   Category here
  //                                 </div>
  //                               </div>
  //                             </td>
  //                           </tr>
  //                         </table>
  //                       </td>
  //                     </tr>
  //                   </table>
  //                 </th>
  //                 <th
  //                   width="8.33%"
  //                   valign="top"
  //                   class="r5-c"
  //                   style="font-weight: normal;"
  //                 >
  //                   <table
  //                     cellspacing="0"
  //                     cellpadding="0"
  //                     border="0"
  //                     role="presentation"
  //                     width="100%"
  //                     align="left"
  //                     class="r13-o"
  //                     style="table-layout: fixed; width: 100%;"
  //                   >
  //                     <tr>
  //                       <td
  //                         align="left"
  //                         valign="top"
  //                         class="r35-i nl2go-default-textstyle"
  //                         style="color: #3b3f44; font-family: Montserrat,arial,helvetica,sans-serif; font-size: 16px; line-height: 1.2; word-break: break-word; padding-top: 35px; text-align: left;"
  //                       >
  //                         <div>
  //                           <div
  //                             class="sib_class_18_black_sb"
  //                             style="color: #000; font-family: Montserrat,arial,helvetica,sans-serif; font-size: 18px; font-weight: 600; word-break: break-word;"
  //                           >
  //                             x2
  //                           </div>
  //                         </div>
  //                       </td>
  //                     </tr>
  //                   </table>
  //                 </th>
  //                 <th
  //                   width="16.67%"
  //                   valign="top"
  //                   class="r5-c"
  //                   style="font-weight: normal;"
  //                 >
  //                   <table
  //                     cellspacing="0"
  //                     cellpadding="0"
  //                     border="0"
  //                     role="presentation"
  //                     width="100%"
  //                     align="left"
  //                     class="r13-o"
  //                     style="table-layout: fixed; width: 100%;"
  //                   >
  //                     <tr>
  //                       <td
  //                         align="right"
  //                         valign="top"
  //                         class="r35-i nl2go-default-textstyle"
  //                         style="color: #3b3f44; font-family: Montserrat,arial,helvetica,sans-serif; font-size: 16px; line-height: 1.2; word-break: break-word; padding-top: 32px; text-align: right;"
  //                       >
  //                         <div>
  //                           <div
  //                             class="sib_class_24_black_b"
  //                             style="color: #000; font-family: Montserrat,arial,helvetica,sans-serif; font-size: 24px; font-weight: 700; word-break: break-word;"
  //                           >
  //                             1300€
  //                           </div>
  //                         </div>
  //                       </td>
  //                     </tr>
  //                   </table>
  //                 </th>
  //               </tr>
  //             </table>
  //           </td>
  //         </tr>
  //       </table>`
  //     );

  //     async function main() {
  //       const transporter = nodeMailer.createTransport({
  //         host: process.env.MAILER_HOST,
  //         secureConnection: true,
  //         port: 587,
  //         auth: {
  //           user: process.env.TERHIRE_EMAIL,
  //           pass: process.env.TERHIRE_PASSWORD,
  //         },
  //       });

  //       const info = await transporter.sendMail({
  //         from: `Terhire <${process.env.TERHIRE_EMAIL}>`,
  //         to: customer_details.email,
  //         subject: "Order Confirmation",
  //         html: emailHtml({
  //           name: customer_details.name,
  //           mappedCartItems,
  //         }),
  //       });

  //       console.log(`Message sent: ${info.messageId}`);
  //     }
  //     main();
  //   default:
  //     console.log(`Unhandled event type ${event.type}`);
  // }

  res.send().end();
});

// app.use(
//   bodyParser.json({
//     verify: function (req, res, buf) {
//       req.rawBody = buf;
//     },
//     limit: "50mb",
//     extended: true,
//   })
// );
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://terhire.com",
      "https://terhire-ca.netlify.app",
      "https://terhire-ca.onrender.com/api/stripe/create-checkout-session",
    ],
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    optionSuccessStatus: 204,
    preflightContinue: false,
  })
);

const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://terhire.com",
      "https://terhire-ca.netlify.app",
      "https://terhire-ca.onrender.com/api/stripe/create-checkout-session",
    ],
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  },
});

io.on("connect", (socket) => {
  socket.on("add_product", (result) => {
    socket.broadcast.emit("update_product", result);
  });

  socket.on("edit_product", (result) => {
    socket.broadcast.emit("update_edited_product", result);
  });

  socket.on("delete_product", (result) => {
    socket.broadcast.emit("delete_update", result);
  });

  socket.on("add_review", (result) => {
    socket.broadcast.emit("update_review", result);
  });
});

//Api Routes
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/review", reviewsRoute);
app.use("/api/order", orderRoute);
app.use("/api/blog", blogRoute);
app.use("/api/stripe", stripeRouter);

const PORT = process.env.PORT;
server.listen(PORT || 5000, console.log(`Server is running on ${PORT}`));
