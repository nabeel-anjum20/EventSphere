import { imageuploadutils } from "../../helpers/cloudinary.js";
import Exhibitor from "../../Model/ExhibitorModel.js";
import Expo from "../../Model/ExpoModel.js";


const handleimageupload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({
        success: false,
        status: "error",
        messgae: "no file uploaded"
      })
    }

    const b64 = Buffer.from(req.file.buffer).toString("base64")
    const url = "data:" + req.file.mimetype + ";base64," + b64
    const result = await imageuploadutils(url)

    return res.send({
      success: true,
      result
    })

  } catch (error) {
    console.log(error)
    return res.send({
      success: false,
      status: "error",
      messgae: "error occured"
    })
  }
}




const createxpo = async (req, res) => {
  try {
    const { title, description, date, theme, location, ticketPrice, eventDuration, eventImage, exhibitorid } = req.body;

    if (!title || !description || !date || !theme || !location || !ticketPrice || !eventDuration || !eventImage || !exhibitorid) {
      return res.send({
        success: false,
        status: "error",
        message: "All fields are required"
      });
    }

    const exhibitor = await Exhibitor.findById(exhibitorid);
    if (!exhibitor) {
      return res.status(400).send({
        success: false,
        status: "error",
        message: "Exhibitor not found",
      });
    }

    // Create Expo
    const expo = await Expo.create({
      title,
      description,
      date,
      theme,
      location,
      ticketPrice,
      eventDuration,
      eventImage,
      exhibitorid
    });

    return res.status(200).send({
      success: true,
      status: "success",
      message: "Expo created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(200).send({
      success: false,
      status: "error",
      message: "Error occurred while creating expo",
    });
  }
}


const fetchallexpo = async (req, res) => {
  try {

    const expos = await Expo.find()
      .populate("exhibitorid") 
      .exec();


    res.status(200).send({
      success: true,
      expos,
    });
  } catch (error) {
    console.error(error);
    res.send({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};



export { createxpo, fetchallexpo, handleimageupload}