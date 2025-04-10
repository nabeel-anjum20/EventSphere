import Expo from "../../Model/ExpoModel.js"
import Hall from "../../Model/HallModel.js"

const getallexpodetails = async(req , res) => {
    try{
        const expos = await Expo.find().populate("exhibitorid" , "name")
        return res.status(200).send({
            success:true,
            status:"success",
            message:"expos fetch successfully",
            data:{
                count:expos.length,
                expos
            }
        })
    }catch(error){
        console.log(error)
        return res.send({
            success:false,
            status:"error",
            message:"error occured while expos fetching"
        })
    }
}


const updatexpo = async(req , res) => {
  try{
    const { id } = req.params;
    const {title, description, date, theme, location, eventStatus, HallNumber , ticketPrice, eventDuration, eventImage } = req.body;

    const expo = await Expo.findByIdAndUpdate(id , {title, description, date, HallNumber ,  theme, location, eventStatus, ticketPrice, eventDuration, eventImage})
  
    if(!expo){
        return res.send({
            success:false,
            status:"error",
            message:"expo not found"
        })
    }

    return res.status(200).send({
        success:true,
        status:"success",
        message:"expo update successfully"
    })

  }catch(error){
    console.log(error)
    
    return res.send({
        success:false,
        status:"error",
        message:"error occured while expos updateting"
    })
  }

}


 const getHallDetails = async (req, res) => {
    try {
      const halls = await Hall.find();
      return res.status(200).send({
        success:true,
        status:"success",
        message:"hall fetch successfully",
        data:{
            count:halls.length,
            halls
        }
    })
    } catch (error) {
        console.log(error)
        return res.send({
            success:false,
            status:"error",
            message:"error occured while halls fetching"
        })
    }
  };
  
   const updateHall = async (req, res) => {
    try{
        const { id } = req.params;
    const {
      HallName,
      HallDescription,
      HallNumber,
      HallFloor,
      HallSize,
      NoOfStalls,
      NoOfEntrances,
      SeatingCapacity,
      HallType,
      Facilities,
      AccessibilityFeatures,
      BookingPrice,
      Location,
    } = req.body;
  
      const hall = await Hall.findByIdAndUpdate(
        id,
        {
          HallName,
          HallDescription,
          HallNumber,
          HallFloor,
          HallSize,
          NoOfStalls,
          NoOfEntrances,
          SeatingCapacity,
          HallType,
          Facilities,
          AccessibilityFeatures,
          BookingPrice,
          Location,
        },
      );
  
      if (!hall) {
        return res.status(404).json({ success: false, message: "Hall not found" });
      }

      return res.status(200).send({
        success:true,
        status:"success",
        message:"hall update successfully"
    })


    }catch(error){
        console.log(error)
        return res.send({
            success:false,
            status:"error",
            message:"error occured while update hall"
        })            
    }
  };


  const deletexpobyid = async(req , res) => {
    try{
      const {id} = req.params

      const expo = await Expo.findById(id)
      if(!expo){
        return res.send({
            success:false,
            status:"error",
            message:"expo not found"
        })
      }

      await Expo.findByIdAndDelete(id)

      return res.status(200).send({
        success:true,
        status:"success",
        message:"expo delete successfully"
    })

    }catch(error){
      console.log(error)
      return res.send({
        success:false,
        status:"error",
        message:"error occured while expo delete"
    })
    }
  }

  export {getallexpodetails , updatexpo ,  getHallDetails , updateHall , deletexpobyid}

