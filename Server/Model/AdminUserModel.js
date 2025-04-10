import mongoose from "mongoose";

const AdminUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    userRole: {
      type: String,
      default: "admin",
    },
  },
  { timestamps: true }
);


const AdminUser = mongoose.model("AdminUser", AdminUserSchema);

export default AdminUser;
