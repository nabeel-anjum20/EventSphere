import React, { useState } from 'react';
import adminlogo from '../../../assets/images/adminlogo.png';
import { useNavigate } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { BarChart, Box, Calendar, Grid, Home, Layout, List, Phone, Users } from 'lucide-react';

const adminSidebarMenuItems = [
  { id: 'dashboard', label: 'Dashboard', path: '/admin/dashboard', icon: <Layout className="text-red-900" /> },
  { id: 'expo-management', label: 'Expo Management', path: '/admin/expomanagement', icon: <Box className="text-red-900" /> },
  { id: 'exhibitor-list', label: 'Exhibitor List', path: '/admin/exhibitorlist', icon: <List className="text-red-900" /> },
  // { id: 'exhibitor-management', label: 'Exhibitor Management', path: '/admin/exhibitormanagement', icon: <Users className="text-gray-800" /> },
  { id: 'attendee-info', label: 'Attendee Info', path: '/admin/attendeeinfo', icon: <Users className="text-red-900" /> },
  { id: 'hall-management', label: 'Hall Management', path: '/admin/hallmanagement', icon: <Grid className="text-red-900" /> },
  { id: 'hall-list', label: 'Halls List', path: '/admin/hallslist', icon: <Home className="text-red-900" /> },

];

function MenuItems() {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown visibility

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="flex flex-col mt-5">
      {adminSidebarMenuItems.map((item) => (
        <div key={item.id}>
          {/* Hall Management dropdown */}
          {item.dropdown ? (
            <div>
              <div
                onClick={toggleDropdown}
                className="flex gap-3 m-2 items-center text-lg cursor-pointer px-3 py-2 hover:bg-gray-200 rounded-md"
              >
                <span className='text-sm font-semibold'>{item.icon}</span>
                <span className='text-sm font-semibold '>{item.label}</span>
              </div>
              {isDropdownOpen && (
                <div className="ml-6">
                  <div
                    onClick={() => navigate('/admin/hallslist')}
                    className="flex gap-3 m-2 items-center text-lg cursor-pointer px-3 py-2 hover:bg-gray-200 rounded-md"
                  >
                    <span className="text-sm font-semibold">All Halls</span>
                  </div>
                  <div
                    onClick={() => navigate('/admin/createhall')}
                    className="flex gap-3 m-2 items-center text-lg cursor-pointer px-3 py-2 hover:bg-gray-200 rounded-md"
                  >
                    <span className="text-sm font-semibold">Create Hall</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Render normal menu items
            <div
              key={item.id}
              onClick={() => navigate(item.path)}
              className="flex gap-3 m-2 items-center text-lg cursor-pointer px-3 py-2 hover:bg-gray-200 rounded-md"
            >
              <span className='text-sm font-bold  text-black'>{item.icon}</span>
              <span className='text-sm font-bold '>{item.label}</span>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}

function AdminSidebar({ open, setopen }) {
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setopen}>
        <SheetContent side="left" className="w-64">
          <SheetHeader className="border-b">
            <SheetTitle className="flex gap-2 items-center mt-5">
              <img
                src={adminlogo}
                alt="Admin Logo"
                className="h-10 w-10 object-contain"
              />
              <h1 className="text-2xl font-extrabold">Events</h1>
            </SheetTitle>
          </SheetHeader>
          <MenuItems />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col bg-white border-r">
        <div
          onClick={() => navigate('/admin/dashboard')}
          className="flex gap-2 items-center cursor-pointer px-4 py-6"
        >
          <img
            src={adminlogo}
            alt="Admin Logo"
            className="h-10 w-10 object-contain"
          />
          <h1 className="text-3xl font-extrabold">Events</h1>
        </div>
        <MenuItems />
      </aside>
    </>
  );
}

export default AdminSidebar;
