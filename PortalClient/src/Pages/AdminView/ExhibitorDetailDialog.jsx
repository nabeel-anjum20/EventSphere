import { Button } from '@/components/ui/button'
import { DialogContent } from '@/components/ui/dialog'
import { Label } from '@radix-ui/react-label'
import React from 'react'

function ExhibitorDetailDialog({ exhibit, handleondelete }) {
    return (
        <>
            <DialogContent className="sm:max-w-[600px] overflow-y-auto max-h-[80vh]">
                <div className='grid gap-4'>
                    <div className='flex justify-between mt-5 items-center'>
                        <p className='font-medium'>Name</p>
                        <Label className='text-gray-500 font-bold'>{exhibit.name}</Label>
                    </div>
                    <div className='flex justify-between mt-5 items-center'>
                        <p className='font-medium'>Email</p>
                        <Label className='text-gray-500 font-bold' >{exhibit.email}</Label>
                    </div>
                    <div className='flex justify-between mt-5 items-center'>
                        <p className='font-medium'>Phone</p>
                        <Label className='text-gray-500 font-bold' >{exhibit.phone}</Label>
                    </div>
                    <div className='flex justify-between mt-5 items-center'>
                        <p className='font-medium'>Company Name</p>
                        <Label className='text-gray-500 font-bold'>{exhibit.companyName}</Label>
                    </div>
                    <div className='flex justify-between mt-5 items-center'>
                        <p className='font-medium'>Description</p>
                        <Label className='text-gray-500 font-bold' >{exhibit.description}</Label>
                    </div>
                    <div className='flex justify-between mt-5 items-center'>
                        <p className='font-medium'>Address</p>
                        <Label className='text-gray-500 font-bold' >{exhibit.address}</Label>
                    </div>
                    <div className='flex gap-3 justify-end mt-5 items-center'>
                        <Button className="bg-red-500 text-white"
                            onClick={() => handleondelete(exhibit._id)}
                        >Delete</Button>
                    </div>

                </div>
            </DialogContent>
        </>
    )
}

export default ExhibitorDetailDialog