import { logoutuser } from "@/Store/AuthSlice/AuthSlice";
import { createxpo } from "@/Store/ExhibitorSlice/ExpoSlice";
import axios from "axios";
import { Menu, User, X } from "lucide-react";
import React, { createRef, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function CreateExpo() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    theme: "",
    ticketPrice: 0,
    eventDuration: "",
    eventImage: null,
  });

  const [menuopen, setmenuopen] = useState(false);
  const [dropdown, setdropdown] = useState(false);
  const [imagefile, setimagefile] = useState(null);
  const [uploadImageUrl, setUploadImageUrl] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputref = createRef();

  const handlemenu = () => {
    setmenuopen(!menuopen);
  };

  const handlelogout = () => {
    dispatch(logoutuser()).then(() => {
      navigate("/exhibitorauth/login");
    });
  };

  const toggledropdown = () => {
    setdropdown(!dropdown);
  };

  const handleimagefilechange = (e) => {
    console.log(e.target.files?.[0]);
    const selectedfiles = e.target.files?.[0];
    if (selectedfiles) {
      setimagefile(selectedfiles);
    }
  };

  const uploadimage = async () => {
    try {
      const data = new FormData();
      data.append("file", imagefile);
      const responce = await axios.post(
        "http://localhost:5000/api/exhibitor/expo/upload-image",
        data
      );
      if (responce.status === 200) {
        setUploadImageUrl(responce?.data?.result?.url);
      }
      console.log(responce);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (user._id != null) {
      dispatch(
        createxpo({
          ...formData,
          exhibitorid: user._id,
          eventImage: uploadImageUrl,
        })
      ).then((res) => {
        if (res.payload.success) {
          Swal.fire({
            icon: "success",
            title: res.payload.status,
            text: res.payload.message,
            confirmButtonColor: "#3085d6",
          });
          navigate("/exhibitor/home");
        } else {
          Swal.fire({
            icon: "error",
            title: res.payload.status,
            text: res.payload.message,
          });
        }
      });
    }
  };

  useEffect(() => {
    if (imagefile) {
      uploadimage();
    }
  }, [imagefile]);


  return (
    <>
      <header className="bg-white shadow sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-pink-500">
              <Link to={"/exhibitor/home"}>EventSphere</Link>
            </h1>

            {/* Menu Icon for Mobile */}
            <button
              className="md:hidden text-black focus:outline-none"
              onClick={() => handlemenu(true)}
            >
              {menuopen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Menu */}
            <ul className="hidden md:flex space-x-8 flex-grow justify-start ml-20 pt-2">
              <li className="text-black font-semibold hover:text-pink-500">
                <Link to="/exhibitor/home">My Expo</Link>
              </li>
              <li className="text-black font-semibold hover:text-pink-500">
                <Link to="/exhibitor/createxpo">Create Expo</Link>
              </li>
            </ul>

            {/* User Dropdown */}
            {isAuthenticated && (
              <div className="hidden md:block relative">
                <button
                  onClick={() => toggledropdown(true)}
                  className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full text-black focus:outline-none"
                >
                  <User size={24} />
                </button>

                {dropdown && (
                  <div className="absolute right-0 mt-2 w-38 bg-white shadow-lg rounded-lg">
                    <button
                      onClick={handlelogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 rounded-lg"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Form */}
      <div className="max-w-4xl ml-10 my-10 p-8 bg-gray-100 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-pink-500 mb-6">
          Create New Expo
        </h1>

        <form onSubmit={(e) => handleOnSubmit(e)}>
          {/* Title */}
          <div className="mb-5">
            <label htmlFor="title" className="block text-20xl font-semibold">
              Expo Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter expo title"
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div className="mb-5">
            <label
              htmlFor="description"
              className="block text-20xl font-semibold"
            >
              Expo Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Enter expo description"
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />
          </div>

          {/* Date */}
          <div className="mb-5">
            <label htmlFor="date" className="block text-20xl font-semibold">
              Expo Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />
          </div>

          {/* Location */}
          <div className="mb-5">
            <label htmlFor="location" className="block text-20xl font-semibold">
              Expo Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="Enter expo location"
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />
          </div>

          {/* Theme */}
          <div className="mb-5">
            <label htmlFor="theme" className="block text-20xl font-semibold">
              Theme (Optional)
            </label>
            <input
              type="text"
              id="theme"
              name="theme"
              value={formData.theme}
              onChange={(e) =>
                setFormData({ ...formData, theme: e.target.value })
              }
              placeholder="Enter expo theme (optional)"
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />
          </div>

          {/* Ticket Price */}
          <div className="mb-5">
            <label
              htmlFor="ticketPrice"
              className="block text-20xl font-semibold"
            >
              Ticket Price (Optional)
            </label>
            <input
              type="number"
              id="ticketPrice"
              name="ticketPrice"
              value={formData.ticketPrice}
              onChange={(e) =>
                setFormData({ ...formData, ticketPrice: e.target.value })
              }
              placeholder="Enter ticket price (optional)"
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />
          </div>

          {/* Event Duration */}
          <div className="mb-5">
            <label
              htmlFor="eventDuration"
              className="block text-20xl font-semibold"
            >
              Event Duration (Optional)
            </label>
            <input
              type="text"
              id="eventDuration"
              name="eventDuration"
              value={formData.eventDuration}
              onChange={(e) =>
                setFormData({ ...formData, eventDuration: e.target.value })
              }
              placeholder="Enter event duration (optional)"
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />
          </div>

          {/* Event Images */}
          <div className="mb-5">
            <label
              htmlFor="eventImage"
              className="block text-20xl font-semibold"
            >
              Event Image (Optional)
            </label>
            <input
              type="file"
              id="eventImage"
              name="eventImage"
              ref={inputref}
              onChange={(e) => handleimagefilechange(e)}
              placeholder="Enter image URLs (comma separated)"
              className="w-full p-3 mt-2 border bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-lg text-sm hover:bg-pink-600 transition duration-300"
          >
            Create Expo
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateExpo;
