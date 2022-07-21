const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const employerSchema = new mongoose.Schema(
  {
    organization_name: {
      type: String,
      required: [true, "Please enter the organization name"],
      minLength: [
        2,
        "Organization Name should contain at least two characters",
      ],
    },
    contact_person: {
      type: String,
      required: [true, "Please enter your full name"],
      minLength: [2, "Full Name should contain at least two characters"],
    },
    accountId: {
      type: ObjectId,
      ref: "Account",
    },
    email: {
      type: String,
      required: [true, "Please provide your organization email"],
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
      required: [true, "Please provide telephone or mobile number"],
      minLength: [7, "Phone number length is shorter than expected"],
    },
    physical_address: {
      type: String,
      required: [true, "Please provide the organization's physical address"],
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

export default mongoose.models.Employer ||
  mongoose.model("Employer", employerSchema);
