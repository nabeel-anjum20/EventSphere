import mongoose from "mongoose";

const ExpoModel = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "expo title is required"],
    },

    description: {
      type: String,
      required: [true, "expo description is required"],
    },

    date: {
      type: Date,
      required: [true, "expo date is required"],
    },

    theme: {
      type: String,
      required:true
    },

    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organizer", 
    },

    location: {
      type: String,
      required: [true, "expo location is required"],
    },

    eventStatus: {
      type: String,
      enum: ["Approved", "Rejected", "Pending", "Completed"],
      default: "Pending",
    },

    ticketPrice: {
      type: Number,
      required: true, 
    },

    eventDuration: {
      type: String, 
      required: true,
    },


    eventImage: {
      type: String,
      required: true,
    },

    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attendee",
      },
    ],

    exhibitorid:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Exhibitor",
      required:true
    } , 

    HallNumber:{
      type:String,
      default:""
    } , 


  },
  { timestamps: true }
); 

const Expo = mongoose.model("Expo", ExpoModel);

export default Expo;
