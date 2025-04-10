import express from 'express'
import { createHall, deleteHallById, getAllHalls, updateHallById } from '../../Controllers/admin/HallController.js'

const router = express.Router()


router.route("/createhall").post(createHall)
router.route("/allhalls").get(getAllHalls)
router.route("/update/:id").put(updateHallById)
router.route("/delete/:id").delete(deleteHallById)


export default router