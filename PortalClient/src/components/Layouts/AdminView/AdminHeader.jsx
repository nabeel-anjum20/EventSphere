import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, Menu } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutuser } from '@/Store/AuthSlice/AuthSlice';
import { useNavigate } from 'react-router-dom';

function AdminHeader({ open, setopen }) {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handlelogout = () => {
    dispatch(logoutuser()).then(()=>{
      navigate("/adminuserauth/login")
    })
  }
  return (
    <header className="flex items-center  justify-between px-4 py-4 bg-white shadow-lg lg:px-6">
      {/* Toggle Button for Sidebar */}
      <Button
        className="lg:hidden block"
        onClick={() => setopen(!open)}
      >
        <Menu />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
      
      {/* Logout Button */}

         <div className="flex  flex-1 justify-end">
              <Button
              variant="ghost"
              className="flex items-center mt-4    gap-2 text-red-500 hover:text-red-700"
              onClick={handlelogout}
            >
              <LogOut className="w-5 h-5" />
              <span className="text-red-500">Logout</span>
            </Button>
         
        </div>
       
     
    </header>
  );
}

export default AdminHeader;
