import express from 'express'
//import { upload } from '../../helpers/cloudinary.js'
import {deletexhibitorbyid, getallexhibitor} from '../../Controllers/admin/ExhibitorController.js'

const router = express.Router()

//router.post("/upload-image" , upload.single("file") , handleimageupload)
// router.route("/create").post(createxhibitor)
router.route("/allexhibitors").get(getallexhibitor)
//router.route("/update/:id").put(updatexhibitorbyid)
router.route("/delete/:id").delete(deletexhibitorbyid)


export default router