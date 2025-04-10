import express from 'express'
import { createxpo, fetchallexpo,  handleimageupload } from '../../Controllers/Exhibitors/ExpoController.js'
import { upload } from '../../helpers/cloudinary.js'

const router = express.Router()

router.post("/upload-image" , upload.single("file") , handleimageupload)
router.route("/createxpo").post(createxpo)
router.route("/getallexpo").get(fetchallexpo)


export default router