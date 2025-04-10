import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    attendeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attendee",
      required: true,
    },

    expoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expo",
      required: true,
    },

    attendeeName: {
      type: String,
      required: true,
    },

    attendeeEmail: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true,
    },

    numberOfTickets: {
      type: Number,
      required: true,
      min: 1,
    },

    eventName: {
      type: String,
      required: true,
    },

    eventDate: {
      type: Date,
      required: true,
    },

    additionalNotes: {
      type: String,
      default: "",
    },

    bookingStatus: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", BookingSchema);

export default Booking;
