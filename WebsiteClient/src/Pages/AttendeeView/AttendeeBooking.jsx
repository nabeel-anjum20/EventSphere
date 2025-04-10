import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { createBookExpo } from '@/Store/AttendeeSlice/AttendeeBookingSlice';
import { User, Menu, X, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { logoutuser } from '@/Store/AuthSlice/AuthSlice';

function AttendeeBooking() {
  
  const location = useLocation()

  const expo = location.state?.expoData

  const [formData, setFormData] = useState({
    expoId: '',
    attendeeId: '',  
    attendeeName: '',
    attendeeEmail: '',
    phone: '',
    numberOfTickets: 1,
    eventName: '',
    eventDate: '',
    additionalNotes: '',
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    dispatch(logoutuser()).then(() => {
      navigate('/attendeeauth/login');
    });
  };

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user != null) {
      dispatch(createBookExpo(formData)).then((res) => {
        Swal.fire({
          icon: res.payload.success ? "success" : "error",
          title: res.payload.status,
          text: res.payload.message,
          confirmButtonColor: "#3085d6",
        });
      });
    }
  };

  useEffect(() => {
    if (expo && user) {
      setFormData((prev) => ({
        ...prev,
        expoId: expo._id,
        attendeeId: user._id,  
      }));
    }
  }, [expo, user]);

  return (
    <>
      <header className="bg-white shadow sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-pink-500">
              <Link to={"/attendee/attendeehome"}>EventSphere</Link>
            </h1>
            <button className="md:hidden text-black focus:outline-none" onClick={handleMenu}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <ul className="hidden md:flex space-x-8 flex-grow justify-center">
              <li className="text-black font-semibold hover:text-pink-500">
                <Link to="/attendee/attendeehome">Home</Link>
              </li>
              <li className="text-black font-semibold hover:text-pink-500">
                <Link to="/attendee/attendeeevents">Events</Link>
              </li>
              <li className="text-black font-semibold hover:text-pink-500">
                <Link to="/attendee/attendeeservices">Services</Link>
              </li>
              <li className="text-black font-semibold hover:text-pink-500">
                <Link to="/attendee/attendeeaboutus">About Us</Link>
              </li>
              <li className="text-black font-semibold hover:text-pink-500">
                <Link to="/attendee/attendeecontactus">Contact Us</Link>
              </li>
            </ul>
            {isAuthenticated && (
              <div className="hidden md:block relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full text-black focus:outline-none"
                >
                  <User size={24} />
                </button>
                {dropdown && (
                  <div className="absolute right-0 mt-2 w-38 bg-white shadow-lg rounded-lg">
                    <button
                      onClick={handleLogout}
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

      <div className="max-w-4xl ml-10 mt-8 p-4 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Book Your Tickets</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded-md"
                required
                value={formData.attendeeName}
                onChange={(e) => setFormData({ ...formData, attendeeName: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 p-2 rounded-md"
                required
                value={formData.attendeeEmail}
                onChange={(e) => setFormData({ ...formData, attendeeEmail: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded-md"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Number of Tickets</label>
              <input
                type="number"
                className="w-full border border-gray-300 p-2 rounded-md"
                min="1"
                required
                value={formData.numberOfTickets}
                onChange={(e) => setFormData({ ...formData, numberOfTickets: Number(e.target.value) })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Event Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded-md"
                value={formData.eventName}
                onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Event Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 p-2 rounded-md"
                value={formData.eventDate}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Additional Notes</label>
            <textarea
              className="w-full border border-gray-300 p-2 rounded-md"
              rows="4"
              value={formData.additionalNotes}
              onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
            />
          </div>

          <div className="mt-6">
            <button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded-md">
              Submit Booking
            </button>
          </div>
        </form>
      </div>

      
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
  );
}

export default AttendeeBooking;
