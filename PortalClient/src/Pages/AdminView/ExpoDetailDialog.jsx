import { Button } from '@/components/ui/button';
import { DialogContent } from '@/components/ui/dialog';
import { updatehalls, updatexpo } from '@/Store/AdminSlice/ExpoSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

function ExpoDetailDialog({ expo, onClose, halls = [] }) {

    const dispatch  = useDispatch()

    const [formData, setFormData] = useState({
        title: '',
        theme: '',
        location: '',
        eventStatus: '',
        eventDuration: '',
        HallNumber: '',
        date: '' 
    });

    const handleupdateexpo = () => {

        const updatexpodata = {
            ...formData
        }

        const halldata = halls.find(hall => hall.HallNumber === formData.HallNumber)
        if(halldata){
            dispatch(updatehalls({id:halldata._id , formData:updatexpodata}))
        }

        dispatch(updatexpo({id:expo._id , formData:updatexpodata}))

        onClose()
    };

    useEffect(() => {
        if (expo) {
            setFormData({
                title: expo.title,
                theme: expo.theme,
                location: expo.location,
                eventStatus: expo.eventStatus,
                ticketPrice: expo.ticketPrice,
                eventDuration: expo.eventDuration,
                HallNumber: expo.HallNumber,
                date: expo.date
            });
        }
    }, [expo]);

    return (
        <DialogContent className="max-w-lg">
            <div className="p-4  max-h-[500px] mt-6 overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Edit Expo</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            className="border px-3 py-2 w-full"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Theme</label>
                        <input
                            type="text"
                            name="theme"
                            className="border px-3 py-2 w-full"
                            value={formData.theme}
                            onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Location</label>
                        <input
                            type="text"
                            name="location"
                            className="border px-3 py-2 w-full"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                    </div>

                    {/* Event Status Dropdown */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Event Status</label>
                        <select
                            name="eventStatus"
                            className="border px-3 py-2 w-full"
                            value={formData.eventStatus}
                            onChange={(e) => setFormData({ ...formData, eventStatus: e.target.value })}
                        >
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Ticket Price</label>
                        <input
                            type="number"
                            name="ticketPrice"
                            className="border px-3 py-2 w-full"
                            value={formData.ticketPrice}
                            onChange={(e) => setFormData({ ...formData, ticketPrice: e.target.value })}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Event Duration</label>
                        <input
                            type="text"
                            name="eventDuration"
                            className="border px-3 py-2 w-full"
                            value={formData.eventDuration}
                            onChange={(e) => setFormData({ ...formData, eventDuration: e.target.value })}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Hall No</label>
                        <select
                            className="border px-3 py-2 w-full"
                            name="hallNo"
                            value={formData.HallNumber}
                            onChange={(e) => setFormData({ ...formData, HallNumber: e.target.value })}
                        >
                            <option value="">Select a Hall No</option>
                            {halls.map((hall) => (
                                <option key={hall._id} value={hall.HallNumber}>
                                    {hall.HallNumber}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Date Picker */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Event Date</label>
                        <input
                            type="date"
                            name="date"
                            className="border px-3 py-2 w-full"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                    </div>

                    <div className="flex justify-end space-x-2">
                        <Button variant="secondary" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button onClick={handleupdateexpo}>Update Expo</Button>
                    </div>
                </form>
            </div>
        </DialogContent>
    );
}

export default ExpoDetailDialog;
