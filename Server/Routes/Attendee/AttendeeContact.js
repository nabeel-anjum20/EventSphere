import express from 'express'
import { createcontact } from '../../Controllers/Attendee/ContactController.js'

const router = express.Router()

router.route("/createcontact").post(createcontact)


export default router