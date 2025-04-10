import { loginuser } from '@/Store/AuthSlice/AuthSlice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Login() {
  const [formData, setformdata] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleonsubmit = (e) => {
    e.preventDefault();
    dispatch(loginuser(formData)).then((res) => {
      if (res.payload.success) {
        Swal.fire({
          icon: 'success',
          title: res.payload.status,
          text: res.payload.message,
          confirmButtonColor: '#3085d6',
        });
        navigate("/admin/dashboard")
      } else {
        Swal.fire({
          icon: 'error',
          title: res.payload.status,
          text: res.payload.message,
          confirmButtonColor: '#d33',
        });
      }
    });
  };

  return (
    <div>
      <div className="max-w-md w-full p-6">
        <h1 className="text-4xl font-semibold mb-6 text-black text-center">Login</h1>
        <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
          Exhibition Management A Guide To Planning An Exhibition
        </h1>

        <form className="space-y-4" onSubmit={(e) => handleonsubmit(e)}>
          {/* Email input */}
          <div>
            <label
              htmlFor="userEmail"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              id="userEmail"
              name="userEmail"
              className="mt-1 p-2 w-full border rounded-md border-gray-900 focus:outline-none focus:ring-offset-2 focus:ring-gray-800 transition-colors duration-300"
              value={formData.email}
              onChange={(e) => setformdata({ ...formData, email: e.target.value })}
            />
          </div>

          {/* Password input */}
          <div>
            <label
              htmlFor="userPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="userPassword"
              name="userPassword"
              className="mt-1 p-2 w-full border rounded-md border-gray-900 focus:outline-none focus:ring-offset-2 focus:ring-gray-700 transition-colors duration-300"
              value={formData.password}
              onChange={(e) => setformdata({ ...formData, password: e.target.value })}
            />
          </div>

          {/* Submit button */}
          <div>
            <button
              type="submit"
              className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition-colors duration-300"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
