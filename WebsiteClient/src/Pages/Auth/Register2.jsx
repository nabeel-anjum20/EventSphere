import { registerExhibitor } from "@/Store/AuthSlice/AuthSlice";
import axios from "axios";
import React, { createRef, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Register2() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    companyName: "",
    logo:null,
    address: "",
    description: "", 
  });

  const [imagefile, setImageFile] = useState(null);
  const [uploadImageUrl, setUploadImageUrl] = useState(""); 

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = createRef()

  const uploadImage = async () => {
      try {
        const data = new FormData();
        data.append("file", imagefile);
        const response = await axios.post("http://localhost:5000/api/websiteauth/upload-image", data);
        if (response.status === 200) {
          setUploadImageUrl(response?.data?.result?.url); 
        }
        console.log(response)
      } catch (error) {
        console.log(error.message);
      }
  };

  

  const handleimagefilechange = (e) => {
    console.log(e.target.files?.[0])
    const selectedfiles = e.target.files?.[0]
    if(selectedfiles){
      setImageFile(selectedfiles)
    }
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    dispatch(registerExhibitor({ ...formData, logo: uploadImageUrl })).then((res) => {
      if (res.payload.success) {
        Swal.fire({
          icon: "success",
          title: res.payload.status,
          text: res.payload.message,
          confirmButtonColor: "#3085d6",
        });
        navigate("/exhibitorauth/login");
      } else {
        Swal.fire({
          icon: "error",
          title: res.payload.status,
          text: res.payload.message,
        });
      }
    });
  };

  useEffect(() => {
    if (imagefile) {
      uploadImage(); 
    }
  }, [imagefile]);

  return (
    <div>
      <div className="max-w-md w-full p-6">
        <h1 className="text-3xl font-semibold mb-6 text-black text-center">Register</h1>
        <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
          Exhibition Management A Guide To Planning An Exhibition
        </h1>

        <form className="space-y-4" onSubmit={(e) => handleOnSubmit(e)}>
          {/* Name input */}
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              className="mt-1 p-2 w-full border rounded-md border-gray-900 focus:outline-none focus:ring-offset-2 focus:ring-gray-700 transition-colors duration-300"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          {/* Email input */}
          <div>
            <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="userEmail"
              name="userEmail"
              className="mt-1 p-2 w-full border rounded-md border-gray-900 focus:outline-none focus:ring-offset-2 focus:ring-gray-700 transition-colors duration-300"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          {/* Password input */}
          <div>
            <label htmlFor="userPassword" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="userPassword"
              name="userPassword"
              className="mt-1 p-2 w-full border rounded-md border-gray-900 focus:outline-none focus:ring-offset-2 focus:ring-gray-700 transition-colors duration-300"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          {/* Company Name */}
          <div>
            <label htmlFor="compantName" className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              id="compantName"
              name="compantName"
              className="mt-1 p-2 w-full border rounded-md border-gray-900 focus:outline-none focus:ring-offset-2 focus:ring-gray-700 transition-colors duration-300"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              className="mt-1 p-2 w-full border rounded-md border-gray-900 focus:outline-none focus:ring-offset-2 focus:ring-gray-700 transition-colors duration-300"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          {/* Logo Input */}
          <div>
            <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
              Logo
            </label>
            <input
              type="file"
              id="logo"
              name="logo"
              className="mt-1 bg-white p-2 w-full border rounded-md border-gray-900 focus:outline-none focus:ring-offset-2 focus:ring-gray-700 transition-colors duration-300"
              ref={inputRef}
              onChange={(e) => handleimagefilechange(e)}
              required
            />
          </div>

          {/* Company Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Company Description
            </label>
            <textarea
              id="description"
              name="description"
              className="mt-1 p-2 w-full border rounded-md border-gray-900 focus:outline-none focus:ring-offset-2 focus:ring-gray-700 transition-colors duration-300"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="mt-1 p-2 w-full border rounded-md border-gray-900 focus:outline-none focus:ring-offset-2 focus:ring-gray-700 transition-colors duration-300"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />
          </div>

          {/* Submit button */}
          <div>
            <button
              type="submit"
              className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
            >
              Register
            </button>
          </div>
        </form>

        {/* Register Link */}
        <div className="mt-4 text-sm text-gray-600 text-center">
          <p>
            Already have an account?{" "}
            <Link to={"/exhibitorauth/login"} className="text-black hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register2;
