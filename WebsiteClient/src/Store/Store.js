import { configureStore } from "@reduxjs/toolkit";
import authreducer from '../Store/AuthSlice/AuthSlice'
import exporeducer from '../Store/ExhibitorSlice/ExpoSlice'
import attendeereducer from '../Store/AttendeeSlice/AttendeeExpoSlice'
import attendeecontactreducer from '../Store/AttendeeSlice/ContactSlice'


const store = configureStore({
    reducer:{
        auth:authreducer,
        expo:exporeducer,
        attendeeexpo:attendeereducer,
        attendeecontact:attendeecontactreducer

    }
})


export default store