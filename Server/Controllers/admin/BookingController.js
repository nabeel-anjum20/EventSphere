import Booking from "../../Model/BookingModel.js"

const getallbooking = async(req , res) => {
    try{
      const bookings = await Booking.find()
  
      return res.status(200).send({
        success:true,
        status:"success",
        message:"booking fetch successfully",
        data:{
          count:bookings.length,
          bookings
        }
      })
  
    }catch(error){
      console.log(error)
      
      return res.send({
        success:false,
        status:"error",
        message:"error occured while booking fetch",
      })
    }
  }



  
const updatebooking = async(req , res) => {
    try{
      const { id } = req.params;
      const {attendeeName  , attendeeEmail , phone , numberOfTickets , eventName , eventDate , additionalNotes , bookingStatus} = req.body;
  
      const booking = await Booking.findByIdAndUpdate(id , {attendeeName  , attendeeEmail , phone , numberOfTickets , eventName , eventDate , additionalNotes , bookingStatus})
    
      if(!booking){
          return res.send({
              success:false,
              status:"error",
              message:"booking not found"
          })
      }
  
      return res.status(200).send({
          success:true,
          status:"success",
          message:"booking update successfully"
      })
  
    }catch(error){
      console.log(error)
      return res.send({
          success:false,
          status:"error",
          message:"error occured while booking updateting"
      })
    }
  
  }



  const deletebooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        status:"success",
        message: "booking not found",
      });
    }

    await Booking.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      status:"error",
      message: "booking deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting booking",
    });
  }
};


export{getallbooking , updatebooking  , deletebooking}