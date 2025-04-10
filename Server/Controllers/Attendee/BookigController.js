import Booking from "../../Model/BookingModel.js";
import Expo from "../../Model/ExpoModel.js";

const createbooking = async(req , res) => {
    try{
        const {attendeeId , expoId , attendeeName , attendeeEmail , phone , numberOfTickets , eventName , eventDate , additionalNotes} = req.body;
        if(!attendeeId || !expoId || !attendeeName || !attendeeEmail || !phone || !numberOfTickets || !eventName || !eventDate || !additionalNotes){
            return res.send({
                success:false,
                status:"error",
                message:"all fields are required"
            })
        }
        
       const expo = await Expo.findById(expoId)
       
       if(!expo){
        return res.send({
            success:false,
            status:"error",
            message:"expo not found"
        })
       }


        const newBooking = await Booking.create({
        attendeeId,
        expoId,
        attendeeName,
        attendeeEmail,
        phone,
        numberOfTickets,
        eventName,
        eventDate,
        additionalNotes
      });

      await newBooking.save()

      await Expo.findByIdAndUpdate(expoId , {
        $addToSet:{attendees:attendeeId}  
      } , 
     {new:true}
    
    )

      return res.status(200).send({
        success:true,
        status:"success",
        message:"Event Booked"
    })
  
    }catch(error){
      console.log(error)  
      return res.send({
        success:false,
        status:"error",
        message:"error occured while event book"
    })
    }
}


const getallbooking = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("expoId" , "title"); 
    return res.status(200).send({
      success: true,
      status: "success",
      message: "booking fetch successfully",
      data: {
        count: bookings.length,
        bookings,
      },
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      status: "error",
      message: "error occurred while fetching bookings",
    });
  }
};

export{createbooking , getallbooking}
