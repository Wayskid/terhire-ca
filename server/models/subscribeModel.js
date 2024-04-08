import mongoose from "mongoose";

const subscribeUserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Subscriber = mongoose.model("Subscriber", subscribeUserSchema);
export default Subscriber;
