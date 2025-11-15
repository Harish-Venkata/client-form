import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
    },
    phoneNumber: {
      type: String,
      required: true,
      match: [/^\+?[1-9]\d{1,14}$/, "Please use a valid phone number."],
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Client = mongoose.model("Client", clientSchema);
export default Client;
