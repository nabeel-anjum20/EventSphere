import React from 'react';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

function HallDetailDialog({hall , sequenceId  , handleondelete , handleonedit}) {
  return (
    <>
    <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <div className='grid gap-4'>
            <div className='flex justify-between mt-5 items-center'>
                <p className='font-medium'>Hall Id</p>
                <Label className='text-gray-500 font-bold'>{sequenceId}</Label>
            </div>
            <div className='flex justify-between mt-5 items-center'>
                <p className='font-medium'>Hall Name</p>
                <Label className='text-gray-500 font-bold'>{hall.HotelName}</Label>
            </div>
            <div className='flex justify-between mt-5 items-center'>
                <p className='font-medium'>Hall Description</p>
                <Label className='text-gray-500 font-bold'>{hall.HallDescription}</Label>
            </div>
            <div className='flex justify-between mt-5 items-center'>
                <p className='font-medium'>Hall Number</p>
                <Label className='text-gray-500 font-bold'>{hall.HallNumber}</Label>
            </div>
            <div className='flex justify-between mt-5 items-center'>
                <p className='font-medium'>Hall Floor</p>
                <Label className='text-gray-500 font-bold'>{hall.HallFloor}</Label>
            </div>
            <div className='flex justify-between mt-5 items-center'>
                <p className='font-medium'>Hall Size</p>
                <Label className='text-gray-500 font-bold'>{hall.HallSize}</Label>
            </div>
            <div className='flex justify-between mt-5 items-center'>
                <p className='font-medium'>No Of Stalls</p>
                <Label className='text-gray-500 font-bold'>{hall.NoOfStalls}</Label>
            </div>
            <div className='flex justify-between mt-5 items-center'>
                <p className='font-medium'>No Of Entrances</p>
                <Label className='text-gray-500 font-bold'>{hall.NoOfEntrances}</Label>
            </div>
            <div className='flex justify-between mt-5 items-center'>
                <p className='font-medium'>Seeting Capacity</p>
                <Label className='text-gray-500 font-bold'>{hall.SeatingCapacity}</Label>
            </div>
            <div className='flex justify-between mt-5 items-center'>
                <p className='font-medium'>Hall Type</p>
                <Label className='text-gray-500 font-bold'>{hall.HallType}</Label>
            </div>
            <div className='flex justify-between mt-5 items-center'>
                <p className='font-medium'>Facilities</p>
                <Label className='text-gray-500 font-bold'>{hall.Facilities}</Label>
            </div>
            <div className='flex justify-between  mt-5 items-center'>
                <p className='font-medium'>Accessibility Features</p>
                <Label className='text-gray-500 font-bold'>{hall.AccessibilityFeatures}</Label>
            </div>
            <div className='flex justify-between mt-5 items-center'>
                <p className='font-medium'>Booking Price</p>
                <Label className='text-gray-500 font-bold'>{hall.BookingPrice}</Label>
            </div>
            <div className='flex justify-between mt-5 items-center'>
                <p className='font-medium'>Location</p>
                <Label className='text-gray-500 font-bold'>{hall.Location}</Label>
            </div>
            <div className='flex gap-2 mt-5 justify-end'>
                <Button className="bg-blue-500 text-white"
                onClick={() => handleonedit(hall)}
                >Edit</Button>
                <Button className="bg-red-500 text-white"
                onClick={() => handleondelete(hall._id)}
                >Delete</Button>
            </div>
        </div>
    </DialogContent>
    </>
  );
}

export default HallDetailDialog;
