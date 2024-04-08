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

dotenv.config();
connectDB();
const app = express();

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

app.use("/api/stripe", stripeRouter);

app.use(
  bodyParser.json({
    verify: function (req, res, buf) {
      req.rawBody = buf;
    },
    limit: "50mb",
    extended: true,
  })
);
//Api Routes
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/review", reviewsRoute);
app.use("/api/order", orderRoute);
app.use("/api/blog", blogRoute);

const PORT = process.env.PORT;
server.listen(PORT || 5000, console.log(`Server is running on ${PORT}`));
