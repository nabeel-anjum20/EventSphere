import { logoutuser } from '@/Store/AuthSlice/AuthSlice';
import { Facebook, Instagram, Linkedin, Menu, Twitter, User, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import slider4 from '../../assets/images/slider4.jpg';
import { getallexpo } from '@/Store/ExhibitorSlice/ExpoSlice';

function ExhibitorHome() {
  const [menuopen, setmenuopen] = useState(false);
  const [dropdown, setdropdown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { expos } = useSelector((state) => state.expo);

  const handlemenu = () => {
    setmenuopen(!menuopen);
  };

  const handlelogout = () => {
    dispatch(logoutuser()).then(() => {
      navigate('/exhibitorauth/login');
    });
  };

  const toggledropdown = () => {
    setdropdown(!dropdown);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    dispatch(getallexpo());
  }, []);



  return (
    <>
      <header className="bg-white shadow sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-pink-500">
              <Link to={"/exhibitor/home"}>EventSphere</Link>
            </h1>

            <button
              className="md:hidden text-black focus:outline-none"
              onClick={handlemenu}
            >
              {menuopen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <ul className="hidden md:flex space-x-8 flex-grow justify-start ml-20 pt-2">
              <li className="text-black font-semibold hover:text-pink-500">
                <Link to="/exhibitor/home">My Expo</Link>
              </li>
              <li className="text-black font-semibold hover:text-pink-500">
                <Link to="/exhibitor/createxpo">Create Expo</Link>
              </li>
            </ul>

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

          {menuopen && (
            <ul className="md:hidden flex flex-col space-y-4 mt-4">
              <li className="text-black font-semibold hover:text-pink-500">
                <Link to="/attendee/attendeehome">My Expo</Link>
              </li>
              <li className="text-black font-semibold hover:text-pink-500">
                <Link to="/attendee/attendeeevents">Create Expo</Link>
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

      <div className="relative w-full h-[600px] overflow-hidden">
        <img src={slider4} alt="Slider" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center text-white">
          <h1 className="text-8xl sm:text-8xl md:text-7xl lg:text-5xl font-bold mb-4">My Expo</h1>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-14 md:grid-cols-4 mt-14 max-w-6xl mx-auto px-4">
        {expos && expos.length > 0 ? (
          expos.map((expo, i) => (
            <div
              key={i}
              className="bg-white shadow-md border   border-pink-300 rounded-lg overflow-hidden   transition-transform hover:scale-105"
            >
              <img
                src={expo.eventImage}
                alt="Event"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800">{expo.title}</h2>
                <p className="text-gray-600 font-bold mt-2">Description : {expo.description}</p>
                <p className="text-gray-600 font-bold text-sm mb-3">Date : {formatDate(expo.date)}</p>
                <p className="text-gray-600 font-bold text-sm mb-3">Location : {expo.location}</p>
                <p className="text-gray-600 font-bold text-sm mb-3">Ticket Price: {expo.ticketPrice}</p>
                <p className="text-gray-600 font-bold text-sm mb-3">Duration : {expo.eventDuration}</p>
                <p className="text-gray-600 font-bold text-sm mb-3">{expo.HallNumber}</p>
                <p className="text-gray-600 font-bold text-sm mb-3">{expo.theme}</p>
                <div className="flex justify-end">
                  <p
                    className={`font-bold text-sm mb-3 ${expo.eventStatus === 'Approved' || expo.eventStatus === "Pending"  ?  'text-green-600' : 'text-red-600'
                      }`}
                  >
                    {expo.eventStatus}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 font-bold">No Expos Available</p>
        )}
      </div>

      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center space-x-6 mb-4">
            <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-pink-500 transition duration-300">
              <Facebook />
            </a>
            <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-pink-500 transition duration-300">
              <Instagram />
            </a>
            <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-pink-500 transition duration-300">
              <Twitter />
            </a>
            <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-pink-500 transition duration-300">
              <Linkedin />
            </a>
          </div>
          <div className="text-center text-sm">
            <p>© 2025 Exhibition Company. All Rights Reserved.</p>
            <nav className="mt-5">
              <ul className="flex justify-center space-x-4">
                <li className="hover:text-pink-500 transition duration-300">
                  <Link>Privacy Policy</Link>
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
  );
}

export default ExhibitorHome;
