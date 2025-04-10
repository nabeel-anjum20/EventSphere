import express from 'express'
import dotenv from 'dotenv'
import connectdb from './Connection/connectdb.js'
import cookieParser from 'cookie-parser'
import exhibitoroutes from './Routes/admin/ExhibitorsRoutes.js'
import hallroutes from './Routes/admin/HallRoutes.js'
import portalroutes from './Routes/PortalRoutes.js'
import websiteroutes from './Routes/WebsitesRoutes.js'
import exporutes from './Routes/Exhibitor/ExpoRoutes.js'
import exporoutes from './Routes/admin/ExpoRoutes.js'
import attendeeexporoutes from './Routes/Attendee/AttendeeRoutes.js'
import attendeebooking from './Routes/Attendee/AttendeeBooking.js'
import attendeecontact from './Routes/Attendee/AttendeeContact.js'
import admincontact from './Routes/admin/ContactRoutes.js'
import adminbooking from './Routes/admin/BookingRoutes.js'


import cors from 'cors'

dotenv.config()
const port = process.env.PORT || 5001

connectdb()

const app = express()
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET", "POST", "DELETE", "PUT"],
    allowedHeaders:[
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma"
    ] , 

    credentials:true
}))

app.use(express.json())
app.use("/api/portalauth" , portalroutes)
app.use("/api/websiteauth" , websiteroutes)
app.use("/api/admin/exhibitors" , exhibitoroutes)
app.use("/api/admin/hall" , hallroutes)
app.use("/api/exhibitor/expo" , exporutes)
app.use("/api/admin/expo" , exporoutes)
app.use("/api/attendee/expo" , attendeeexporoutes)
app.use("/api/attendee/booking" , attendeebooking)
app.use("/api/attendee/contact" , attendeecontact)
app.use("/api/admin/contact" , admincontact)
app.use("/api/admin/booking" , adminbooking)


app.listen(port , () => {
    console.log(`server running ${port}`)
})