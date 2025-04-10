import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { deletehalls, getallhalls } from '@/Store/AdminSlice/HallSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import HallDetailDialog from './HallDetailDialog';

function HallsList() {
  const [opendetaildialog, setopendetaildialog] = useState({});
  const { halls } = useSelector((state) => state.halls); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleonedit = (hall) => {
    navigate('/admin/hallmanagement', { state: { halls: hall } });
  };

  const handleondelete = (id) => {
    dispatch(deletehalls(id)).then((res) => {
      dispatch(getallhalls());
      if (res.payload.success) {
        Swal.fire({
          icon: 'success',
          title: res.payload.status,
          text: res.payload.message,
          confirmButtonColor: '#3085d6',
        });
      }
    });
  };

  useEffect(() => {
    dispatch(getallhalls());
  }, [dispatch]);

  const toggledialog = (id) => {
    setopendetaildialog((prevstate) => ({
      ...prevstate,
      [id]: !prevstate[id],
    }));
  };

  return (
    <div className="p-4">
      <h2 className="font-bold text-2xl mb-4">Hall List</h2>
      <div className="overflow-x-auto mt-3">
        <table className="table-auto bg-white w-full shadow-lg border border-collapse">
          <thead>
            <tr className="text-center">
              <th className="border text-xs sm:text-sm border-gray-300 px-2 sm:px-4 py-2">Hall Id</th>
              <th className="border text-xs sm:text-sm border-gray-300 px-2 sm:px-4 py-2">Hotel Name</th>
              <th className="border text-xs sm:text-sm border-gray-300 px-2 sm:px-4 py-2">Hall Number</th>
              <th className="border text-xs sm:text-sm border-gray-300 px-2 sm:px-4 py-2">Hall Floor</th>
              <th className="border text-xs sm:text-sm border-gray-300 px-2 sm:px-4 py-2">No of Stalls</th>
              <th className="border text-xs sm:text-sm border-gray-300 px-2 sm:px-4 py-2">No of Entrances</th>
              <th className="border text-xs sm:text-sm border-gray-300 px-2 sm:px-4 py-2">Seating Capacity</th>
              <th className="border text-xs sm:text-sm border-gray-300 px-2 sm:px-4 py-2">Hall Type</th>
              <th className="border text-xs sm:text-sm border-gray-300 px-2 sm:px-4 py-2">Show</th>
            </tr>
          </thead>
          <tbody>
            {halls && halls.length ? (
              halls.map((hall, i) => (
                <tr key={i} className="text-center">
                  <td className="border text-xs sm:text-sm text-gray-500 font-bold border-gray-300 px-2 sm:px-4 py-2">
                    {`H-${String(i + 1).padStart(3, '0')}`}
                  </td>
                  <td className="border text-xs sm:text-sm text-gray-500 font-bold border-gray-300 px-2 sm:px-4 py-2">
                    {hall.HotelName}
                  </td>
                  <td className="border text-xs sm:text-sm text-gray-500 font-bold border-gray-300 px-2 sm:px-4 py-2">
                    {hall.HallNumber}
                  </td>
                  <td className="border text-xs sm:text-sm text-gray-500 font-bold border-gray-300 px-2 sm:px-4 py-2">
                    {hall.HallFloor}
                  </td>
                  <td className="border text-xs sm:text-sm text-gray-500 font-bold border-gray-300 px-2 sm:px-4 py-2">
                    {hall.NoOfStalls}
                  </td>
                  <td className="border text-xs sm:text-sm text-gray-500 font-bold border-gray-300 px-2 sm:px-4 py-2">
                    {hall.NoOfEntrances}
                  </td>
                  <td className="border text-xs sm:text-sm text-gray-500 font-bold border-gray-300 px-2 sm:px-4 py-2">
                    {hall.SeatingCapacity}
                  </td>
                  <td className="border text-xs sm:text-sm text-gray-500 font-bold border-gray-300 px-2 sm:px-4 py-2">
                    {hall.HallType}
                  </td>
                  <td className="border border-gray-300 px-2 sm:px-4 py-2">
                    <Dialog open={opendetaildialog[hall._id]} onOpenChange={() => toggledialog(hall._id)}>
                      <HallDetailDialog
                        hall={hall}
                        sequenceId={`H-${String(i + 1).padStart(3, '0')}`}
                        handleondelete={handleondelete}
                        handleonedit={handleonedit}
                      />
                    </Dialog>
                    <Button onClick={() => toggledialog(hall._id)} className="text-xs sm:text-sm py-1 px-2 sm:px-4">
                      Details
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="border text-xs sm:text-sm border-gray-300 px-2 sm:px-4 py-2 text-center">
                  No Hall Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HallsList;
