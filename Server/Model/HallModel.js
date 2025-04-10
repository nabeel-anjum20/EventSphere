import mongoose from "mongoose";

// Create a schema for the Hall model
const hallSchema = new mongoose.Schema(
  {
    HallId: {
      type: String,
      required: true,
      unique: true,
      default: function () {
        return `HALL-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      }, 
    },
    HotelName: {
      type: String,
      required: true
    },
    HallDescription: {
      type: String,
      required: true,
    },
    HallNumber: {
      type: String,
      required: true,
    },
    HallFloor: {
      type: Number,
      required: true,
    },
    HallSize: {
      type: String,
      required: true,
    },
    NoOfStalls: {
      type: Number,
      required: true,
    },
    NoOfEntrances: {
      type: Number,
      required: true,
    },
    SeatingCapacity: {
      type: Number,
      required: true,
    },
    HallType: {
      type: String,
      enum: ["Exhibition", "Conference", "Workshop", "Meeting Room"],
      required: true,
    },
    Facilities: {
      type: [String],
      required: true,
    },
    AccessibilityFeatures: {
      type: [String],
      required: true,
    },
    BookingPrice: {
      type: Number,
      required: true,
    },
    Location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create a Mongoose model for the Hall
const Hall = mongoose.model("Hall", hallSchema);

export default Hall;
