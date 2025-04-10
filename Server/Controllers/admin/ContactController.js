import Contact from "../../Model/ContactModel.js"

const getallcontact = async(req , res) => {
    try{
        const contacts = await Contact.find()
        
        return res.status(200).send({
            success:true,
            status:"success",
            message:"contacts fetch successfully",
            data:{
                count:contacts.length,
                contacts
            }
        })
    }catch(error){
        console.log(error)
        return res.send({
            success:false,
            status:"error",
            message:"error occured while fetching contacts",
        })
    }
}
const deletecontact = async(req , res) => {
    try{
        const {id} = req.params
        const contact = await Contact.findById(id)
        if(!contact){
            return res.send({
                success:false,
                status:"error",
                message:"contact not found",
            })  
        }

        await Contact.findByIdAndDelete(id)
        return res.send({
            success:true,
            status:"success",
            message:"contact delete successfully",
        })
    }catch(error){
        console.log(error)
        return res.send({
            success:false,
            status:"error",
            message:"error occured while delete contact"
        })
    }
}


export{getallcontact , deletecontact}