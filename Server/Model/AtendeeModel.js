import mongoose from "mongoose";

const AttendeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    contactNumber: {
      type: String,
      required: [true, "Contact number is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    userRole: {
      type: String,
      default: "Attendee",
    },
  },
  { timestamps: true }
);

const Attendee = mongoose.model("Attendee", AttendeeSchema);

export default Attendee;
