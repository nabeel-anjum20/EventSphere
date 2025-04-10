import React from "react";
import { Outlet } from "react-router-dom";
import adminbg from '../../../assets/images/admin.jpg'

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="flex flex-1 items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
      <div className="hidden lg:flex items-center justify-center w-1/2">
        <img
          src={adminbg}
          alt="Description"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default AuthLayout;
