import { Facebook, Instagram, Linkedin, Menu, Twitter, User, X } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import slider2 from '../../assets/images/slider2.jpg'
import slider3 from '../../assets/images/slider3.jpg'
import { useDispatch, useSelector } from 'react-redux'

function AttendeeAboutUs() {

  const [menuopen, setmenuopen] = useState(false)
  const [dropdown , setdropdown] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isAuthenticated  } = useSelector((state) => state.auth)

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
      

      {/* Slider Section */}

      <div className="relative w-full h-[600px] overflow-hidden">
        <img src={slider2} alt="Slider" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center px-6">
          <h2 className="text-5xl sm:text-5xl lg:text-4xl  font-bold mb-4 px-4">About EventSphere</h2>
          <p className="text-lg sm:px-10 max-w-4xl px-4">
            EventSphere is your gateway to extraordinary event exhibitions and services.
            Our mission is to create unforgettable experiences by bringing together people, ideas, and innovations.
            Join us in celebrating creativity and connection at every event we host.
          </p>
        </div>
      </div>

      <div className='mt-6 '>
        <h1 className='text-4xl font-semibold p-8'>About Us</h1>
        <p className='text-lg leading-7 text-gray-700 max-w-6xl  px-6'>
          Welcome to <span className="text-pink-500 font-bold">EventSphere</span>, where events meet excellence. Our platform is designed to bring together extraordinary experiences, innovative ideas, and unforgettable memories.
          <br /><br />
          At EventSphere, we believe in the power of connection. Our mission is to create a seamless experience for attendees by providing exceptional event exhibitions and top-notch services. Whether it's a corporate gathering, a cultural fest, or a personal celebration, we strive to make every event special and impactful.
          <br /><br />
          With a commitment to creativity, professionalism, and inclusivity, EventSphere aims to bridge the gap between vision and reality, ensuring that your events are not just occasions but celebrations of life and innovation.
          <br /><br />
          Thank you for choosing EventSphere. Let’s create memories that last a lifetime!
        </p>
      </div>


      <div className="mt-8">
        <h2 className="text-3xl font-semibold p-6  text-pink-500">Why Choose Us?</h2>
        <p className="text-lg leading-7 px-6 max-w-6xl text-gray-700">
          At <span className="text-pink-500 font-bold">EventSphere</span>, we go beyond simply organizing events. We focus on delivering unparalleled quality, ensuring every detail is meticulously planned and executed.
          <br /><br />
          Our team of experts collaborates with you to bring your vision to life, offering personalized services tailored to your needs. We leverage the latest technologies and trends to create immersive and engaging experiences for every attendee.
          <br /><br />
          With a strong network of partners, venues, and vendors, we ensure seamless event management, allowing you to focus on what matters most—enjoying the moment. Choose EventSphere for exceptional service, innovative solutions, and memories that last a lifetime.
        </p>
      </div>

      <div className="relative w-full h-[600px] overflow-hidden mt-14">
        <img src={slider3} alt="Slider" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center px-6">
          <h2 className="text-5xl sm:text-5xl lg:text-4xl font-bold mb-4 px-4">Experience the Best with EventSphere</h2>
          <p className="text-lg sm:px-10 max-w-4xl px-4">
            Discover a world of exceptional events and immersive experiences with EventSphere.
            We are dedicated to connecting ideas, people, and creativity to craft moments that inspire and leave a lasting impact.
            Be part of our journey and make every event a celebration of innovation and excellence.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-3xl font-semibold p-6  text-pink-500">More Info</h2>
        <p className="text-lg leading-7 px-6 max-w-6xl text-gray-700">
          At <span className="text-pink-500 font-bold">EventSphere</span>, we do more than just manage events. We create extraordinary experiences designed to inspire and leave lasting impressions.
          <br /><br />
          Our team is committed to understanding your unique needs and delivering customized solutions that exceed expectations. With a blend of creativity, technology, and meticulous planning, we ensure that every detail is perfect.
          <br /><br />
          Partnering with us means collaborating with a team that values innovation and excellence. Let us help you turn your vision into a reality, making your events memorable and impactful for years to come.
        </p>
      </div>


      <div className="relative w-full h-[600px] overflow-hidden mt-14 mb-2">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345094264!2d144.96305781531696!3d-37.816279179751824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2s!4v1618366609633!5m2!1sen!2s"
          width="100%"
          height="600"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Google Map"
        ></iframe>
      </div>

      {/* footer */}


      <footer className='bg-gray-800 text-white mt-16'>
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

export default AttendeeAboutUs