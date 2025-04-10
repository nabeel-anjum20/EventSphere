import express from 'express'
import { deletecontact, getallcontact } from '../../Controllers/admin/ContactController.js'

const router = express.Router()

router.route("/getallcontacts").get(getallcontact)
router.route("/deletecontact/:id").delete(deletecontact)

export default router