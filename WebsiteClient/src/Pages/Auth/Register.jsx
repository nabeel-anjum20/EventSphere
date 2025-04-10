import { registerAttendee } from '@/Store/AuthSlice/AuthSlice';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function Register() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        contactNumber: "",
        address: "",
    });

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleonsubmit = (e) => {
        e.preventDefault()
        dispatch(registerAttendee(formData)).then((res) => {
            console.log(formData)
            if (res.payload.success) {
                Swal.fire({
                    icon: 'success',
                    title: res.payload.status,
                    text: res.payload.message,
                    confirmButtonColor: '#3085d6',
                })
                navigate("/attendeeauth/login")
            }else{
                Swal.fire({
                    icon: 'error',
                    title: res.payload.status,
                    text: res.payload.message,
                })
            }
        })
    }
    return (
        <div>
            <div className="max-w-md w-full p-6">
                <h1 className="text-3xl font-semibold mb-6 text-black text-center">
                    Register
                </h1>
                <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
                    Exhibition Management A Guide To Planning An Exhibition
                </h1>

                <form className="space-y-4" onSubmit={(e) => handleonsubmit(e)}>
                    {/* Name input */}
                    <div>
                        <label
                            htmlFor="userName"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            className="mt-1 p-2 w-full border rounded-md border-gray-900 focus:outline-none focus:ring-offset-2 focus:ring-gray-700 transition-colors duration-300"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
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
                            className="mt-1 p-2 w-full border rounded-md border-gray-900 focus:outline-none focus:ring-offset-2 focus:ring-gray-700 transition-colors duration-300"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    {/* Contact Number */}
                    <div>
                        <label
                            htmlFor="contactnumber"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Contact Number
                        </label>
                        <input
                            type="number"
                            id="contactnumber"
                            name="contactnumber"
                            className="mt-1 p-2 w-full border rounded-md border-gray-900 focus:outline-none focus:ring-offset-2 focus:ring-gray-700 transition-colors duration-300"
                            value={formData.contactNumber}
                            onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label
                            htmlFor="address"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            className="mt-1 p-2 w-full border rounded-md border-gray-900 focus:outline-none focus:ring-offset-2 focus:ring-gray-700 transition-colors duration-300"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
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
                        <Link to={"/attendeeauth/login"} className="text-black hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register