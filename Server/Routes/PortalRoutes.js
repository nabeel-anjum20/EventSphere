import express from 'express'
import { authMiddleware, login, logout, register } from '../Controllers/auth/portalAuth.js'


const router = express.Router()

router.route("/login").post(login)
router.route("/logout").post(logout)
router.route("/register").post(register)
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
