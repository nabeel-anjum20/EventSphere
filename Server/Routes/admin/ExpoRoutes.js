import express from 'express'
import { deletexpobyid, getallexpodetails, getHallDetails, updateHall, updatexpo } from '../../Controllers/admin/ExpoController.js'
const router = express.Router()


router.route("/getallexpo").get(getallexpodetails)
router.route("/updatexpo/:id").put(updatexpo)
router.route("/gethalldetails").get(getHallDetails)
router.route("/updatehall/:id").put(updateHall)
router.route("/deletexpo/:id").delete(deletexpobyid)

export default router