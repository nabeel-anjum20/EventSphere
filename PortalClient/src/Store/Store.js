import { configureStore } from "@reduxjs/toolkit";
import authreducer from '../Store/AuthSlice/AuthSlice'
import exhibitorsreducer from './AdminSlice/ExhibitorSlice'
import hallsreducers from './AdminSlice/HallSlice'
import adminexporeducer from './AdminSlice/ExpoSlice'
import admincontactreducer from './AdminSlice/ContactSlice'
import adminbookingreducer from './AdminSlice/BookingSlice'


const store = configureStore({
    reducer:{
        portalauth:authreducer,
        exhibitors:exhibitorsreducer,
        halls:hallsreducers,
        expo:adminexporeducer,
        contact:admincontactreducer,
        booking:adminbookingreducer
    }
})


export default store