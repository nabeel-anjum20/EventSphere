import express from 'express'
import { atendeeRegister, authMiddleware, exibitorRegister, handleimageupload, login, logout } from '../Controllers/auth/websiteAuth.js'
import { upload } from '../helpers/cloudinary.js'


const router = express.Router()
router.post("/upload-image" , upload.single("file") , handleimageupload)
router.route("/attendee/register").post(atendeeRegister)
router.route("/exhibitor/register").post(exibitorRegister)
router.route("/login").post(login)
router.route("/logout").post(logout)
router.get("/check-auth" , authMiddleware , (req , res) => {
    const user = req.user
    return res.status(200).send({
        success:true,
        status: "success",
        message: "user is authorized",
        user:user   
    })    
})

export default router
