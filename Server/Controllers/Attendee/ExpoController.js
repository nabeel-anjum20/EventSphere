import Expo from "../../Model/ExpoModel.js"

const getallexpos = async(req  , res) => {
    try{
        const expos = await Expo.find()
        return res.status(200).send({
            success:true,
            status:"success",
            message:"expos fetch successfully",
            data:{
                count:expos.length,
                expos
            }
        })
    }catch(error){
        console.log(error)
        return res.send({
            success:false,
            status:"error",
            message:"error occured while expo fetch"
        })
    }
}


export {getallexpos}