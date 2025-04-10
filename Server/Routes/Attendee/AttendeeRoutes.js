import express from 'express'
import { getallexpos } from '../../Controllers/Attendee/ExpoController.js'


const router = express.Router()

router.route("/getallexpos").get(getallexpos)


export default router