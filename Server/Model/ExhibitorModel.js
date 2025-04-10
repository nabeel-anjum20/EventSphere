import mongoose from "mongoose";

const exhibitorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Exhibitor name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },

    companyName: {
      type: String,
      required: [true, "Company name is required"],
    },
    description: {
      type: String,
      required: [true, "Company description is required"],
    },
    logo: {
      type: String,
      required:true
    },
    address: {
      type: String,
      required: [true, "Company address is required"],
    },

    userRole: {
      type: String,
      default: "Exhibitor",
    },
    
    registeredExpos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expo",
      },
    ],
  },
  { timestamps: true }
);

const Exhibitor = mongoose.model("Exhibitor", exhibitorSchema);

export default Exhibitor;
