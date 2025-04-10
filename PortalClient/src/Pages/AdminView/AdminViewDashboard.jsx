import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { getallbookings } from '@/Store/AdminSlice/BookingSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BookingDetailDialog from './BookingDetailDialog';

function AdminViewDashboard() {
  const [opendetaildialog , setopendetaildialog] = useState(false);
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.booking);

  useEffect(() => {
    dispatch(getallbookings());
  }, [bookings]);


  return (
    <div className='p-4'>
      <h2 className='font-bold text-2xl'>Bookings List</h2>
      <div className='overflow-x-auto mt-3'>
        <table className='table-auto bg-white w-full shadow-lg border border-collapse'>
          <thead>
            <tr className='text-center'>
              <th className='border text-sm border-gray-300 px-4 py-2'>Booking Id</th>
              <th className='border text-sm border-gray-300 px-4 py-2'>Expo Id</th>
              <th className='border text-sm border-gray-300 px-4 py-2'>Attendee Id</th>
              <th className='border text-sm border-gray-300 px-4 py-2'>Booking Status</th>
              <th className='border text-sm border-gray-300 px-4 py-2'>Show</th>
            </tr>
          </thead>
          <tbody>
            {bookings && bookings.length && bookings.map((booking, i) => (
              <tr key={i} className='text-center'>
                <td className='border text-sm text-gray-500 font-bold border-gray-300 px-4 py-2'>
                  {booking._id.length > 10 ? `${booking._id.substring(0, 10)}` : booking._id}
                </td>
                <td className='border text-sm text-gray-500 font-bold border-gray-300 px-4 py-2'>
                  {booking.expoId.length > 10 ? `${booking.expoId.substring(0 , 10)}` : booking.expoId}
                </td>
                <td className='border text-sm text-gray-500 font-bold border-gray-300 px-4 py-2'>
                  {booking.attendeeId.length > 10 ? `${booking.attendeeId.substring(0 , 10)}` : booking.attendeeId}
                </td>
                <td className='border text-sm text-gray-500 font-bold border-gray-300 px-4 py-2'>
                  {booking.bookingStatus}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <Dialog open={opendetaildialog} onOpenChange={setopendetaildialog}>
                    <BookingDetailDialog booking={booking} onClose={() => setopendetaildialog(false)} />
                  </Dialog>
                  <Button onClick={() => setopendetaildialog(true)}>
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminViewDashboard;
