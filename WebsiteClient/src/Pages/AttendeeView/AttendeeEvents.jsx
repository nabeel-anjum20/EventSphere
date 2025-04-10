import React, { useState } from 'react';
import slider1 from '../../assets/images/slider1.jpg';


import { Link, useNavigate } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Menu, Twitter, User, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';

function AttendeeEvents() {

  const [menuopen, setmenuopen] = useState(false)
  const [dropdown , setdropdown] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isAuthenticated } = useSelector((state) => state.auth)
  const { expos } = useSelector((state) => state.attendeeexpo)
  


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };



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

  const handlebooking = (expo) => {
    navigate("/attendee/attendeebooking", { state: { expoData: expo } });
  }

  return (
    <>
      {/* Header */}

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
        <img src={slider1} alt="Slider" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            All Events
          </h1>
        </div>
      </div>

      <div className='mt-6'>
        <h1 className='text-5xl font-semibold text-center'>Events</h1>
      </div>
      <div className='grid lg:grid-cols-3 md:grid-cols-4  gap-7 mt-8 max-w-6xl mx-auto px-4'>
        {
          expos && expos.length && expos.filter((expo) => expo.eventStatus !== "Rejected" && expo.eventStatus !== "Pending").map((expo, i) => {
            return <div key={i} className="bg-white shadow-md border border-pink-300 rounded-lg overflow-hidden transition-transform hover:scale-105">
              <img src={expo.eventImage} alt="Event 1" className="w-full h-48 object-cover" />
              <div className="p-4 text-center">
                <h2 className="text-xl font-bold text-gray-800">{expo.title}</h2>
                <p className="text-gray-600 mt-2 font-bold">{expo.eventDuration}</p>
                <p className="text-gray-600 mt-2 font-bold">{expo.location}</p>
                <p className='text-sm mb-3 text-gray-600 font-bold'>{formatDate(expo.date)}</p>
                <button className="mt-4">
                  {isAuthenticated ? (
                    // <Link to={"/attendee/attendeebooking"} className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-14 rounded-md">
                    //   Book
                    // </Link>
                  <Button onClick={() => handlebooking(expo)}  className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-14 rounded-md">Book</Button>
                                    
                  ) : (
                    <Link to={"/attendeeauth/register"} className="bg-white text-pink-500 hover:text-pink-600 font-semibold py-2 px-14 rounded-md border border-pink-500">
                      Book
                    </Link>
                  )}
                </button>
              </div>
            </div>
          })
        }



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
  );
}

export default AttendeeEvents;
