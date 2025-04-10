import Contact from "../../Model/ContactModel.js";

const createcontact = async(req , res) => {
    try{
        const {name , email, phone , message} = req.body;
    if(!name || !email || !phone || !message){
        return res.send({
            success:false,
            status:"error",
            message:"all fields are required"
        })
    }  

    const createcontact = await Contact.create({
        name,
        email,
        phone,
        message
    })

    return res.status(200).send({
        success:true,
        status:"success",
        message:"message submited"
    })


    }catch(error){
        console.log(error)
        return res.send({
            success:false,
            status:"error",
            message:"error occured file createcontact"
        })
    }
}




export{createcontact}