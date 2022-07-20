const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const registrantSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Please enter registrant's full name"],
      minLength: [2, "Full Name should contain at least two characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide registrant's email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
    },
    phone: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: [true, "Please select registrant's Gender"],
      enum: {
        values: ["Male", "Female"],
        message: "Please choose one of the available options",
      },
    },
    institution: {
      type: ObjectId,
      ref: "Provider",
    },
    programme: {
      type: ObjectId,
      ref: "Programme",
    },
    admission_no: {
      type: String,
      requires: false,
    },
    date_of_birth: {
      type: Date,
      required: [true, "Please enter registrant's Date of Birth"],
    },
    enrollment_date: {
      type: Date,
      required: [true, "Please enter registrant's Expected Completion"],
    },
    expected_completion: {
      type: Date,
      required: [true, "Please enter registrant's Expected Completion"],
    },
    completion_date: {
      type: Date,
      required: false,
    },
    birth_certificate: {
      type: String,
      requires: false,
    },
    passport_no: {
      type: String,
      requires: false,
    },
    national_id: {
      type: String,
      requires: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Registrant ||
  mongoose.model("Registrant", registrantSchema);
