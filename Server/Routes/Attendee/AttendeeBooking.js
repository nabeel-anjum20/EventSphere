import express from 'express'
import { createbooking, getallbooking } from '../../Controllers/Attendee/BookigController.js'

const router = express.Router()


router.route("/createbooking").post(createbooking)
router.route("/getallbooking").get(getallbooking)


export default router