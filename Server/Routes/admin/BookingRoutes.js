import express from 'express'
import { deletebooking, getallbooking, updatebooking } from '../../Controllers/admin/BookingController.js'

const router = express.Router()

router.route("/getallbookings").get(getallbooking)
router.route("/updatebooking/:id").put(updatebooking)
router.route("/deletebooking/:id").delete(deletebooking)


export default router