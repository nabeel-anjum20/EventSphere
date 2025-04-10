import { Button } from '@/components/ui/button'
import { DialogContent } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { deletebooking, updatebooking } from '@/Store/AdminSlice/BookingSlice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

function BookingDetailDialog({ booking , onClose }) {

    const [bookingStatus , setbookingStatus]= useState(booking.bookingStatus)
    const dispatch = useDispatch()

    const handleonupdate = () => {
        dispatch(updatebooking({ id: booking._id, bookingStatus }))
        onClose()
    }

    const handleondelete = (id) => {
        dispatch(deletebooking(id))
        onClose()  
    }

    return (
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <div className='grid gap-4'>
                <div className='flex justify-between mt-5 items-center'>
                    <p className='font-medium'>Attendee Name</p>
                    <Label className='text-gray-500 font-bold'>{booking.attendeeName}</Label>
                </div>
                <div className='flex justify-between mt-5 items-center'>
                    <p className='font-medium'>Phone</p>
                    <Label className='text-gray-500 font-bold'>{booking.phone}</Label>
                </div>
                <div className='flex justify-between mt-5 items-center'>
                    <p className='font-medium'>Number of Tickets</p>
                    <Label className='text-gray-500 font-bold'>{booking.numberOfTickets}</Label>
                </div>
                <div className='flex justify-between mt-5 items-center'>
                    <p className='font-medium'>Event Name</p>
                    <Label className='text-gray-500 font-bold'>{booking.eventName}</Label>
                </div>
                <div className='flex justify-between mt-5 items-center'>
                    <p className='font-medium'>Additional Notes</p>
                    <Label className='text-gray-500 font-bold'>{booking.additionalNotes}</Label>
                </div>
                <div className='flex justify-between mt-5 items-center'>
                    <p className='font-medium'>Booking Status</p>
                    <div className='flex justify-between mt-5 items-center'>
                        <select
                            className="border p-2 rounded-md text-gray-700"
                            value={bookingStatus}
                            onChange={(e) => setbookingStatus(e.target.value)}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
                <div className='flex gap-2 mt-5 justify-end'>
                    <Button className="bg-blue-500 text-white" onClick={handleonupdate}>Edit</Button>
                    <Button onClick={() => handleondelete(booking._id)} className="bg-red-500 text-white">Delete</Button>
                </div>
            </div>
        </DialogContent>
    )
}

export default BookingDetailDialog;
