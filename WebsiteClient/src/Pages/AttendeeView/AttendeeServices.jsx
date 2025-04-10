import { Facebook, Instagram, Linkedin, Menu, Twitter, User, X } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import slider2 from '../../assets/images/slider2.jpg'

function AttendeeServices() {
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


  const toggledropdown = () => {
    setdropdown(!dropdown)
  }


  return (
    <>
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
            <ul className="hidden md:flex space-x-8 flex-grow justify-center">
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

      {/* slider section */}

      <div className="relative w-full h-[600px] overflow-hidden ">
        <img src={slider2} alt="Slider" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center px-6">
          <h2 className="text-5xl sm:text-5xl lg:text-6xl text-center items-center font-bold mb-4 px-4">Services</h2>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Our Event Exhibition Services
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-pink-500 mb-4">
                Booth Design & Setup
              </h3>
              <p className="text-gray-600">
                We provide creative and customized booth designs to help you
                stand out at exhibitions, ensuring maximum engagement and visibility.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-pink-500 mb-4">
                Event Branding & Promotion
              </h3>
              <p className="text-gray-600">
                Our team helps you build a strong brand presence through customized
                marketing materials, digital promotion, and eye-catching displays.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-pink-500 mb-4">
                Audio-Visual & Tech Support
              </h3>
              <p className="text-gray-600">
                We offer high-quality sound systems, LED screens, lighting, and
                interactive technologies to enhance your exhibition experience.
              </p>
            </div>

            {/* Service 4 */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-pink-500 mb-4">
                Event Logistics & Management
              </h3>
              <p className="text-gray-600">
                From planning to execution, we handle transportation, setup, and
                coordination to ensure a smooth and stress-free exhibition.
              </p>
            </div>

            {/* Service 5 */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-pink-500 mb-4">
                Attendee Engagement & Networking
              </h3>
              <p className="text-gray-600">
                We help create networking opportunities and audience engagement
                strategies to maximize your event’s impact.
              </p>
            </div>

            {/* Service 6 */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-pink-500 mb-4">
                Custom Exhibitor Packages
              </h3>
              <p className="text-gray-600">
                Tailored exhibition packages to fit your budget and business goals,
                ensuring a successful and high-return event experience.
              </p>
            </div>
          </div>
        </div>
      </section>


      <footer className='bg-gray-800 text-white mt-0'>
        <div className='max-w-6xl mx-auto px-4 py-8'>
          {/* Social Media Icons */}
          <div className='flex items-center justify-center space-x-6 mb-4'>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-700 p-2 rounded-full hover:bg-pink-500 transition duration-300"
            >
              <Facebook />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-700 p-2 rounded-full hover:bg-pink-500 transition duration-300"
            >
              <Instagram />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-700 p-2 rounded-full hover:bg-pink-500 transition duration-300"
            >
              <Twitter />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-700 p-2 rounded-full hover:bg-pink-500 transition duration-300"
            >
              <Linkedin />
            </a>
          </div>

          {/* Copyright and Links */}
          <div className='text-center text-sm'>
            <p>© 2025 Exhibition Company. All Rights Reserved.</p>
            <nav className='mt-5'>
              <ul className='flex justify-center space-x-4'>
                <li className="hover:text-pink-500 transition duration-300">
                  <Link to="/attendee/attendeehome">Eventsphere</Link>
                </li>
                <li className="hover:text-pink-500 transition duration-300">
                  <Link to="/attendee/attendeeservices">Terms Of Service</Link>
                </li>
                <li className="hover:text-pink-500 transition duration-300">
                  <Link to="/attendee/attendeecontactus">Contact</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>
    </>
  )
}

export default AttendeeServices