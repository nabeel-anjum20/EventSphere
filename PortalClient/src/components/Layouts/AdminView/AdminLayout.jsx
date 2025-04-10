import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { Outlet } from 'react-router-dom';

function AdminLayout() {
    const [open , setopen] = useState(false)
  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar open={open} setopen={setopen}/>
      <div className="flex flex-1 flex-col">
        <AdminHeader open={open} setopen={setopen}/>
        <main className="flex flex-1 flex-col bg-gray-200 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
