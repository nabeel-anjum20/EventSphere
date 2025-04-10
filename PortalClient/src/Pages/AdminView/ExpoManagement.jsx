import { Dialog } from '@/components/ui/dialog';
import { deletexpo, getallexpos, getallhalls } from '@/Store/AdminSlice/ExpoSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ExpoDetailDialog from './ExpoDetailDialog';
import { Button } from '@/components/ui/button';

function ExpoManagement() {
  const dispatch = useDispatch();
  const { expos, halls, isloading } = useSelector((state) => state.expo);
  const [opendetaildialog, setopendetaildialog] = useState(false);
  const [selectedexpo, setselectedexpo] = useState(null);

  useEffect(() => {
    dispatch(getallexpos());
    dispatch(getallhalls());
  }, [dispatch]);

  const hanldeopendialog = (expo) => {
    setselectedexpo(expo);
    setopendetaildialog(true);
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(new Date(date)); // 'DD/MM/YYYY'
  };

  const handleondelete = (id) => {
    dispatch(deletexpo(id));
    dispatch(getallexpos());
  };

  return (
    <>
      <div className="p-4">
        <h2 className="text-2xl font-bold text-center md:text-left mb-4">All Expos</h2>

        <div className="overflow-x-auto">
          <table className="table-auto bg-white border-collapse border shadow-lg w-full">
            <thead>
              <tr className="bg-gray-100 text-center">
                <th className="border text-xs md:text-sm border-gray-300 px-2 md:px-4 py-2">Expo Name</th>
                <th className="border text-xs md:text-sm border-gray-300 px-2 md:px-4 py-2">Exhibitor Name</th>
                <th className="border text-xs md:text-sm border-gray-300 px-2 md:px-4 py-2">Event Image</th>
                <th className="border text-xs md:text-sm border-gray-300 px-2 md:px-4 py-2">Ticket Price</th>
                <th className="border text-xs md:text-sm border-gray-300 px-2 md:px-4 py-2">Status</th>
                <th className="border text-xs md:text-sm border-gray-300 px-2 md:px-4 py-2">Date</th>
                <th className="border text-xs md:text-sm border-gray-300 px-2 md:px-4 py-2">Show</th>
                <th className="border text-xs md:text-sm border-gray-300 px-2 md:px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {expos && expos.length > 0 ? (
                expos.map((expo) => (
                  <tr key={expo._id} className="hover:bg-gray-50 text-center">
                    <td className="border text-xs md:text-sm text-gray-500 font-bold border-gray-300 px-2 md:px-4 py-2">
                      {expo.title}
                    </td>
                    <td className="border text-xs md:text-sm text-gray-500 font-bold border-gray-300 px-2 md:px-4 py-2">
                      {expo.exhibitorid?.name || 'N/A'}
                    </td>
                    <td className="border text-xs md:text-sm text-gray-500 font-bold border-gray-300 px-2 md:px-4 py-2">
                      {expo.eventImage ? (
                        <img
                          src={expo.eventImage}
                          alt="Event Logo"
                          className="w-16 h-12 md:w-20 md:h-14 object-cover mx-auto rounded-md"
                        />
                      ) : (
                        'No Image'
                      )}
                    </td>
                    <td className="border text-xs md:text-sm text-gray-500 font-bold border-gray-300 px-2 md:px-4 py-2">
                      {expo.ticketPrice}
                    </td>
                    <td className="border text-xs md:text-sm text-gray-500 font-bold border-gray-300 px-2 md:px-4 py-2">
                      {expo.eventStatus}
                    </td>
                    <td className="border text-xs md:text-sm text-gray-500 font-bold border-gray-300 px-2 md:px-4 py-2">
                      {formatDate(expo.date)}
                    </td>
                    <td className="border border-gray-300 px-2 md:px-4 py-2">
                      <Button
                        className="text-xs md:text-sm px-3 py-1 md:px-4 md:py-2"
                        onClick={() => hanldeopendialog(expo)}
                      >
                        Details
                      </Button>
                    </td>
                    <td className="border border-gray-300 px-2 md:px-4 py-2">
                      <Button
                        className="bg-red-500 hover:bg-red-600 text-xs md:text-sm px-3 py-1 md:px-4 md:py-2"
                        onClick={() => handleondelete(expo._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-gray-500">
                    No expos found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedexpo && (
        <Dialog open={opendetaildialog} onOpenChange={setopendetaildialog}>
          <ExpoDetailDialog
            halls={halls}
            expo={selectedexpo}
            onClose={() => setopendetaildialog(false)}
          />
        </Dialog>
      )}
    </>
  );
}

export default ExpoManagement;
