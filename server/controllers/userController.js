import Subscriber from "../models/subscribeModel.js";
import User from "../models/userModel.js";
import nodeMailer from "nodemailer";
import { emailHtml } from "../utils/email.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    //Check if email exists
    const user = await User.findOne({ email });
    if (user) throw new Error("User already exists");

    //Hash password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    //Register user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    res.status(201).send({
      _id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: generateToken(newUser._id),
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) throw new Error("Invalid email or password");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new Error("Invalid email or password");

    if (user && isMatch) {
      res.status(200).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const userInfo = async (req, res) => {
  try {
    const { user_id, customer_id } = req.params;

    //Ensure only Admin can edit product
    const user = await User.findById(user_id);
    if (!user || !user.isAdmin) throw new Error("Forbidden");

    const userInfo = await User.findById(customer_id);

    res.status(200).send({
      _id: userInfo._id,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      isAdmin: userInfo.isAdmin,
      token: generateToken(userInfo._id),
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const subscribeUser = async (req, res) => {
  try {
    const { email } = req.body;

    //Check if already subscribed
    const subscriber = await Subscriber.findOne({ email });
    if (subscriber) throw new Error("Already subscribed");

    const subscribedUser = await Subscriber.create({ email });

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
        to: email,
        subject: "Welcome to Terhire",
        html: emailHtml({ name: "Anon" }),
      });

      console.log(`Message sent: ${info.messageId}`);
    }
    main();

    res.status(200).send(subscribedUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getSubscribers = async (req, res) => {
  try {
    const { user_id } = req.params;

    //Ensure only Admin can edit product
    const user = await User.findById(user_id);
    if (!user || !user.isAdmin) throw new Error("Forbidden");

    const subscribers = await Subscriber.find({});

    res.status(200).send(subscribers);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
