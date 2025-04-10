import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AdminUser from "../../Model/AdminUserModel.js";
import dotenv from 'dotenv';
dotenv.config();

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      success: false,
      status: "error",
      message: "Email and password are required",
    });
  }

  try {
    const adminUser = await AdminUser.findOne({ email });

    if (!adminUser) {
      return res.status(404).send({
        success: false,
        status: "error",
        message: "Admin user does not exist",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, adminUser.password);

    if (!isPasswordMatch) {
      return res.status(401).send({
        success: false,
        status: "error",
        message: "Invalid credentials",
      });
    }

    const accessToken = jwt.sign(
      {
        user: {
          id: adminUser._id,
          name: adminUser.name,
          email: adminUser.email,
        },
      },
      process.env.SECRET_KEY,
      { expiresIn: "100m" } 
    );

    return res
      .cookie("token", accessToken, { httpOnly: true, secure: false })
      .send({
        success: true,
        status: "success",
        message: "Login successful",
        user: adminUser, 
      });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).send({
      success: false,
      status: "error",
      message: "Something went wrong",
    });
  }
};

const logout = (req, res) => {
  return res.clearCookie("token").send({
    success: true,
    status: "success",
    message: "Logout successful",
  });
};

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send({
      success: false,
      status: "error",
      message: "User unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error("Error during token verification:", error);
    return res.status(401).send({
      success: false,
      status: "error",
      message: "User unauthorized",
    });
  }
};


const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
      return res.status(400).send({
          status: "error",
          message: "all fields are required"
      })
  }
  const chechuser = await AdminUser.findOne({ email });
  if (chechuser) {
      return res.send({
          success: false,
          status: "error",
          message: "user already exists"
      })
  }

  const hashpassword = await bcrypt.hash(password, 10);

  const createuser = await AdminUser.create({
      name,
      email,
      password: hashpassword,
  })


  if (createuser) {
      return res.send({
          success: true,
          status: "success",
          message: "admin registered successfully"
      })
  } else {
      return res.send({
          success: false,
          status: "error",
          message: "something went wrong"
      })
  }
}



export { login, logout, authMiddleware , register };
