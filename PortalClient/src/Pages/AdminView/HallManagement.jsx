import { createhalls, updatehalls } from '@/Store/AdminSlice/HallSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

function HallManagement() {
  const initialformdata = {
    HallId:"",
    HotelName: "",
    HallDescription: "",
    HallNumber: "",
    HallFloor: "",
    HallSize: "",
    NoOfStalls: "",
    NoOfEntrances: "",
    SeatingCapacity: "",
    HallType: "",
    Facilities: "",
    AccessibilityFeatures: "",
    BookingPrice: "",
    Location: "",
  };

  const [formData, setformdata] = useState(initialformdata);
  const [currenteditid, setcurrenteditid] = useState(null);

  const dispatch = useDispatch();
  const location = useLocation();


  const generateHallId = () => {
    return `HALL-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  };


  const resetformdata = (res) => {
    setformdata(initialformdata);
    if (res.payload.success) {
      Swal.fire({
        icon: 'success',
        title: res.payload.status,
        text: res.payload.message,
        confirmButtonColor: '#3085d6',
      });
    }
  };

  const handleonupdate = () => {
    dispatch(updatehalls({ id: currenteditid, formData: formData }))
      .then((res) => {
        resetformdata(res);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          text: error.message,
        });
      });
  };

  const handlecreate = () => {
    const newFormData = { ...formData, HallId: generateHallId() };

    dispatch(createhalls(newFormData))
      .then((res) => {
        resetformdata(res);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          text: error.message,
        });
      });
  };

  const handleonsubmit = (e) => {
    e.preventDefault();
    if (currenteditid) {
      handleonupdate();
    } else {
      handlecreate();
    }
  };

  useEffect(() => {
    if (location.state?.halls) {
      setformdata(location.state?.halls);
      setcurrenteditid(location.state?.halls._id);
    }
  }, [location]);

  return (
    <div className="p-8 bg-white shadow-md rounded-lg">
      <form className="space-y-6" onSubmit={(e) => handleonsubmit(e)}>
        <h1 className="text-2xl font-bold text-gray-800">
          {currenteditid ? "Update Hall" : "Hall Management Form"}
        </h1>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Hall Name</label>
            <input
              type="text"
              name="HotelName"
              className="mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter hall name"
              value={formData.HotelName}
              onChange={(e) => setformdata({ ...formData, HotelName: e.target.value })}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="HallDescription"
              className="mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter description"
              rows="3"
              value={formData.HallDescription}
              onChange={(e) => setformdata({ ...formData, HallDescription: e.target.value })}
            ></textarea>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Hall Number</label>
            <input
              type="text"
              name="HallNumber"
              className="mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter hall number"
              value={formData.HallNumber}
              onChange={(e) => setformdata({ ...formData, HallNumber: e.target.value })}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Floor</label>
            <input
              type="number"
              name="HallFloor"
              className="mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter floor number"
              value={formData.HallFloor}
              onChange={(e) => setformdata({ ...formData, HallFloor: e.target.value })}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Size</label>
            <input
              type="text"
              name="HallSize"
              className="mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter hall size"
              value={formData.HallSize}
              onChange={(e) => setformdata({ ...formData, HallSize: e.target.value })}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">No. of Stalls</label>
            <input
              type="number"
              name="NoOfStalls"
              className="mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter number of stalls"
              value={formData.NoOfStalls}
              onChange={(e) => setformdata({ ...formData, NoOfStalls: e.target.value })}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">No. of Entrances</label>
            <input
              type="number"
              name="NoOfEntrances"
              className="mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter number of entrances"
              value={formData.NoOfEntrances}
              onChange={(e) => setformdata({ ...formData, NoOfEntrances: e.target.value })}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Seating Capacity</label>
            <input
              type="number"
              name="SeatingCapacity"
              className="mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter seating capacity"
              value={formData.SeatingCapacity}
              onChange={(e) => setformdata({ ...formData, SeatingCapacity: e.target.value })}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Hall Type</label>
            <select
              name="HallType"
              className="mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              value={formData.HallType}
              onChange={(e) => setformdata({ ...formData, HallType: e.target.value })}
            >
              <option value="">Select hall type</option>
              <option value="Exhibition">Exhibition</option>
              <option value="Conference">Conference</option>
              <option value="Workshop">Workshop</option>
              <option value="Meeting Room">Meeting Room</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Facilities</label>
            <input
              type="text"
              name="Facilities"
              className="mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter facilities (comma-separated)"
              value={formData.Facilities}
              onChange={(e) => setformdata({ ...formData, Facilities: e.target.value })}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Accessibility Features</label>
            <input
              type="text"
              name="AccessibilityFeatures"
              className="mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter accessibility features (comma-separated)"
              value={formData.AccessibilityFeatures}
              onChange={(e) => setformdata({ ...formData, AccessibilityFeatures: e.target.value })}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Booking Price</label>
            <input
              type="number"
              name="BookingPrice"
              className="mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter booking price"
              value={formData.BookingPrice}
              onChange={(e) => setformdata({ ...formData, BookingPrice: e.target.value })}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="Location"
              className="mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter location"
              value={formData.Location}
              onChange={(e) => setformdata({ ...formData, Location: e.target.value })}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-pink-500 text-white font-medium rounded-lg shadow-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            {currenteditid ? "Update Hall" : "Save Hall"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default HallManagement;
