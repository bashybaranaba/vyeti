const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const providerSchema = new mongoose.Schema(
  {
    institution_name: {
      type: String,
      required: [true, "Please enter the institution name"],
      minLength: [2, "Institution Name should contain at least two characters"],
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
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    profile_img: {
      type: String,
      required: false,
    },
    headline: {
      type: String,
      required: false,
      maxlength: [100, "Description should not exceed 500 characters"],
    },
    description: {
      type: String,
      required: false,
      maxlength: [500, "Description should not exceed 500 characters"],
    },
    slug: {
      type: String,
      required: true,
    },
    links: {
      linkedIn: {
        type: String,
        required: false,
      },
      facebook: {
        type: String,
        required: false,
      },
      twitter: {
        type: String,
        required: false,
      },
      instagram: {
        type: String,
        required: false,
      },
      webUrl: {
        type: String,
        required: false,
      },
    },
    type: {
      type: String,
      required: [true, "Please select a Category"],
      enum: {
        values: [
          "Higher-Education",
          "Professional-Assosiation",
          "Training-Provider",
          "Bootcamp",
          "Other",
        ],
        message: "Please choose one of the available options",
      },
    },
    is_accredited: {
      type: Boolean,
      default: false,
    },
    documents: [
      {
        file_url: {
          type: String,
          required: false,
        },
        file_type: {
          type: String,
          required: false,
        },
        description: {
          type: String,
          required: false,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Provider ||
  mongoose.model("Provider", providerSchema);
