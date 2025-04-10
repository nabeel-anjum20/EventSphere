import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Exhibitor from "../../Model/ExhibitorModel.js";
import Attendee from "../../Model/AtendeeModel.js";
import { imageuploadutils } from "../../helpers/cloudinary.js";
dotenv.config();





const handleimageupload = async(req , res) => {
  try{
      if(!req.file){
          return res.send({
              success:false,
              status:"error",
              message:"no file upload"
           })   
      }

      const b64 = Buffer.from(req.file.buffer).toString("base64")
      const url = "data:" + req.file.mimetype + ";base64," + b64
      const result = await imageuploadutils(url)

      return res.send({
          success:true,
          result
      })
  }catch(error){
      console.log(error)
      return res.send({
          success:false,
          status:"error",
          message:"error occured"
       })
  }
}


const atendeeRegister = async (req, res) => {
  const { name, email, password, contactNumber, address } = req.body;
  if (!name || !email || !password || !contactNumber || !address) {
    return res.send({
      success: false,
      status: "error",
      message: "all fields are required",
    });
  }

  const checkattendeexixt = await Attendee.findOne({ email });
  if (checkattendeexixt) {
    return res.send({
      success: false,
      status: "error",
      message: "attendee already exist",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const createattendee = await Attendee.create({
    name,
    email,
    password: hashedPassword,
    contactNumber,
    address,
  });

  if (createattendee) {
    return res.send({
      success: true,
      status: "success",
      message: "attendee register successfully",
    });
  } else {
    return res.send({
      success: false,
      status: "error",
      message: "something went wrong",
    });
  }
};

const exibitorRegister = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      companyName,
      description,
      logo,
      address,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !companyName ||
      !description ||
      !logo ||
      !address
    ) {
      return res.send({
        success: false,
        status: "error",
        message: "all fields are required",
      });
    }

    const checkExhibitorExist = await Exhibitor.findOne({ email });
    if (checkExhibitorExist) {
      return res.send({
        success: false,
        status: "error",
        message: "exhibitor already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createExhibitor = await Exhibitor.create({
      name,
      email,
      phone,
      password: hashedPassword,
      companyName,
      description,
      logo,
      address,
    });

    if (createExhibitor) {
      return res.send({
        success: true,
        status: "success",
        message: "exhibitor register successfully",
      });
    } else {
      return res.send({
        success: false,
        status: "error",
        message: "something went wrong",
      });
    }
  } catch (error) {
    console.error(error);
    return res.send({
      success: false,
      status: "error",
      message: "something went wrong",
    });
  }
};

const login = async (req, res) => {
  const {email, password, userRole } = req.body;

  if (!email || !password || !userRole) {
    return res.send({
      success: false,
      status: "error",
      message: "all fields are required",
    });
  }

  if (userRole == "Exhibitor") {
    const exhibitor = await Exhibitor.findOne({ email });

    if (!exhibitor) {
      return res.send({
        success: false,
        status: "error",
        message: "exhibitor not found",
      });
    }

    const match = await bcrypt.compare(password, exhibitor.password);

    if (!match) {
      return res.send({
        success: false,
        status: "error",
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ user: exhibitor }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    return res.cookie("token", token, { httpOnly: true, secure: false }).send({
      success: true,
      status: "success",
      message: "Login successfully",
      user: exhibitor,
    });
    
  } else if (userRole == "Attendee") {
    const attendee = await Attendee.findOne({ email });

    if (!attendee) {
      return res.send({
        success: false,
        status: "error",
        message: "attendee not found",
      });
    }

    const match = await bcrypt.compare(password, attendee.password);

    if (!match) {
      return res.send({
        success: false,
        status: "error",
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ user: attendee }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    return res.cookie("token", token, { httpOnly: true, secure: false }).send({
      success: true,
      status: "success",
      message: "Login successfully",
      user: attendee,
    });
  } else {
    return res.send({
      success: false,
      status: "error",
      message: "Invalid user role",
    });
  }
};

//logout

const logout = async (req, res) => {
  return res.clearCookie("token").json({
    success: true,
    status: "Success",
    message: "User Logged Out Successfully",
  });
};

//auth middleware

const authMiddleware = async (req, res, next) => {
  let token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      status: "Error",
      message: "Unauthorized User",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      status: "Error",
      message: "Unauthorized User",
    });
  }
};

export { login, atendeeRegister, exibitorRegister ,  logout, authMiddleware , handleimageupload };
