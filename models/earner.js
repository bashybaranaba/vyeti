const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const earnerSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "Please enter your first name"],
      minLength: [2, "First Name should contain at least two characters"],
    },
    last_name: {
      type: String,
      required: [true, "Please enter your last name"],
      minLength: [2, "Last Name should contain at least two characters"],
    },
    accountId: {
      type: ObjectId,
      ref: "Account",
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: true,
    },
    wallet: {
      type: String,
      required: [true, "Please connect your account with your wallet"],
      unique: true,
    },
    phone: {
      type: String,
      required: false,
    },
    profile_img: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
    industry: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Earner || mongoose.model("Earner", earnerSchema);
