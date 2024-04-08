import express from "express";
import {
  login,
  register,
  userInfo,
  subscribeUser,
  getSubscribers,
} from "../controllers/userController.js";

const userRoute = express.Router();

//Register user
userRoute.post("/register", register);

//Login user
userRoute.post("/login", login);

//Get user info
userRoute.get("/:user_id/:customer_id", userInfo);

//Subscribe user
userRoute.post("/subscriber/create", subscribeUser);

//Get Subscribed user
userRoute.get("/subscriber/:user_id", getSubscribers);

export default userRoute;
