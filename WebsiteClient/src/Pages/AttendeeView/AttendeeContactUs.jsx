import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import slider1 from '../../assets/images/slider1.jpg';
import { Facebook, Instagram, Linkedin, Menu, Twitter, User, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { createcontact } from '@/Store/AttendeeSlice/ContactSlice';

function AttendeeContactUs() {

  const [formData, setFormdata] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })

  const [menuopen, setmenuopen] = useState(false)
  const [dropdown, setdropdown] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isAuthenticated } = useSelector((state) => state.auth)

  const handlemenu = () => {
    setmenuopen(!menuopen)
  }

  const handlelogout = () => {
    dispatch(logoutuser()).then(() => {
      navigate("/attendeeauth/login")
    })
  }

  const handleonsubmit = (e) => {
    e.preventDefault();
    dispatch(createcontact(formData)).then((res) => {
      if (res.payload.success) {
        Swal.fire({
          icon: "success",
          title: res.payload.status,
          text: res.payload.message,
          confirmButtonColor: "#3085d6",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: res.payload.status,
          text: res.payload.message,
        });
      }
    });
  };


  const toggledropdown = () => {
    setdropdown(!dropdown)
  }


  return (
    <>
      {/* header */}
      <header className="bg-white shadow sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-pink-500">
              <Link to={"/attendee/attendeehome"}>
                EventSphere
              </Link>
            </h1>

            {/* Menu Icon for Mobile */}
            <button
              className="md:hidden text-black focus:outline-none"
              onClick={handlemenu}
            >
              {menuopen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Menu */}
            <ul className="hidden md:flex space-x-8  flex-grow justify-center ">
              <li className="text-black font-semibold hover:text-pink-500">
                <Link to="/attendee/attendeehome">
                  Home
                </Link>
              </li>
              <li className="text-black font-semibold hover:text-pink-500">
                <Link to="/attendee/attendeeevents">
                  Events
                </Link>
              </li>
              <li className="text-black font-semibold hover:text-pink-500">
                <Link to="/attendee/attendeeservices">
                  Services
                </Link>
              </li>
              <li className="text-black font-semibold hover:text-pink-500">
                <Link to="/attendee/attendeeaboutus">
                  About Us
                </Link>
              </li>
              <li className="text-black font-semibold hover:text-pink-500">
                <Link to="/attendee/attendeecontactus">
                  Contact Us
                </Link>
              </li>
            </ul>

            {/* User Dropdown - only visible for large screens */}
            {isAuthenticated && (
              <div className="hidden md:block relative">
                <button
                  onClick={toggledropdown}
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

          {/* Mobile Menu */}
          {menuopen && (
            <ul className="md:hidden flex flex-col space-y-4 mt-4">
              <li className="text-black font-semibold hover:text-pink-500">
                <Link to="/attendee/attendeehome">
                  Home
                </Link>
              </li>
              <li className="text-black font-semibold hover:text-pink-500">
                <Link to="/attendee/attendeeevents">
                  Events
                </Link>
              </li>
              <li className="text-black font-semibold hover:text-pink-500">
                <Link to="/attendee/attendeeservices">
                  Services
                </Link>
              </li>
              <li className="text-black font-semibold hover:text-pink-500">
                <Link to="/attendee/attendeeaboutus">
                  About Us
                </Link>
              </li>
              <li className="text-black font-semibold hover:text-pink-500">
                <Link to="/attendee/attendeecontactus">
                  Contact Us
                </Link>
              </li>
              {isAuthenticated && (
                <li className="text-red-500 hover:text-pink-500 font-semibold">
                  <button onClick={handlelogout}>Logout</button>
                </li>
              )}
            </ul>
          )}
        </nav>
      </header>


      {/* slider */}

      <div className='relative w-full h-[600px] overflow-hidden'>
        <img src={slider1} className='w-full h-full object-cover' />
        <div className='flex flex-col-reverse absolute inset-0 bg-black bg-opacity-50 justify-center items-center  text-white'>
          <h1 className='text-5xl font-bold'>Contact Us</h1>
        </div>
      </div>

      <div className='max-w-3xl mt-16 px-4 text-left'>
        <form onSubmit={(e) => handleonsubmit(e)} className='bg-gray-100 ml-5 border-b shadow-md rounded-lg p-8 space-y-6'>
          <div>
            <label htmlFor="name" className='block text-sm font-medium text-gray-700'>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className='mt-1 block w-full rounded-md border border-black shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm p-3'
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormdata({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className='mt-1 block w-full rounded-md border border-black shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm p-3'
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormdata({ ...formData, email: e.target.value })}
            />
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className='block text-sm font-medium text-gray-700'>Phone</label>
            <input
              type="number"
              id="phone"
              name="phone"
              className='mt-1 block w-full rounded-md border border-black shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm p-3'
              placeholder="Your Phone Number"
              value={formData.phone}
              onChange={(e) => setFormdata({ ...formData, phone: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="message" className='block text-sm font-medium text-gray-700'>Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className='mt-1 block w-full rounded-md border border-black shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm p-3'
              placeholder="Your Message"
              value={formData.message}
              onChange={(e) => setFormdata({ ...formData, message: e.target.value })}
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              className='w-full bg-pink-500 text-white py-2 px-4 rounded-md shadow hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 p-3'
            >
              Submit
            </button>
          </div>
        </form>
      </div>



      {/* footer */}

      <footer className='bg-gray-800 text-white mt-10'>
        <div className='max-w-6xl mx-auto px-4 py-8'>
          <div className='flex items-center justify-center space-x-6 mb-4'>
            <a
              href="#"
              className="bg-gray-700 p-2 rounded-full hover:bg-pink-500 transition duration-300"
            >
              <Facebook />
            </a>

            <a
              href="#"
              className="bg-gray-700 p-2 rounded-full hover:bg-pink-500 transition duration-300"
            >
              <Instagram />
            </a>

            <a
              href="#"
              className="bg-gray-700 p-2 rounded-full hover:bg-pink-500 transition duration-300"
            >
              <Twitter />
            </a>

            <a
              href="#"
              className="bg-gray-700 p-2 rounded-full hover:bg-pink-500 transition duration-300"
            >
              <Linkedin />
            </a>
          </div>
          <div className='text-center text-sm'>
            <p>© 2025 Exhibition Company. All Rights Reserved.</p>
            <nav className='mt-5'>
              <ul className='flex justify-center space-x-4 '>
                <li className="hover:text-pink-500 transition duration-300">
                  <Link to="/attendee/attendeehome">Eventsphere</Link>
                </li>
                <li className="hover:text-pink-500 transition duration-300">
                  <Link>Terms Of Services</Link>
                </li>
                <li className="hover:text-pink-500 transition duration-300">
                  <Link>Contact</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>
    </>
  )
}

export default AttendeeContactUs