//import { imageuploadutils } from "../../helpers/cloudinary.js";
import Exhibitor from "../../Model/ExhibitorModel.js";


// const handleimageupload = async(req , res) => {
//     try{
//         if(!req.file){
//             return res.send({
//                 success:false,
//                 status:"error",
//                 message:"no file upload"
//              })   
//         }

//         const b64 = Buffer.from(req.file.buffer).toString("base64")
//         const url = "data:" + req.file.mimetype + ";base64," + b64
//         const result = await imageuploadutils(url)

//         return res.send({
//             success:true,
//             result
//         })
//     }catch(error){
//         console.log(error)
//         return res.send({
//             success:false,
//             status:"error",
//             message:"error occured"
//          })
//     }
// }

// const createxhibitor = async(req , res) => {
//     try{
//         const {name , email , phone , password , companyName , description , logo , address , boothNumber} = req.body;
//         if(!name || !email || !phone || !password || !companyName || !description || !logo || !address || !boothNumber){
//          return res.send({
//             success:false,
//             status:"error",
//             message:"all fields are required"
//          })   
//         }

//         const checkexistexhibitor = await Exhibitor.findOne({email})
//         if(checkexistexhibitor){
//             return res.send({
//                 success:false,
//                 status:"error",
//                 message:"exhibitor already exist"
//              }) 
//         }

//         const createxhibitor = await Exhibitor.create({
//             name,
//             email,
//             phone,
//             password,
//             companyName,
//             description,
//             logo,
//             address,
//             boothNumber,
//         })

//         return res.status(200).send({
//             success:true,
//             status:"success",
//             message:"exhibitor create successfully"
//          }) 

//     }catch(error){
//         console.log(error)
//         return res.send({
//             success:false,
//             status:"error",
//             message:"error occured while create exhibitor"
//          })
//     }
// }


const getallexhibitor = async(req , res) => {
    try {
        const exhibitors = await Exhibitor.find()
        return res.status(200).send({
            success: true,
            status: "success",
            message: "Exhibitors fetched successfully",
            data: {
                count: exhibitors.length,
                exhibitors,
            },
        });
    } catch (error) {
        console.log(error);
        return res.send({
            success: false,
            status: "error",
            message: "Error occurred while fetching expos",
        });
    }
}


// const updatexhibitorbyid = async(req , res) => {
//     try{
//         const {name , email , phone , password , companyName , description , logo , address , boothNumber} = req.body;
//         if(!name || !email || !phone || !password || !companyName || !description || !logo || !address || !boothNumber){
//          return res.send({
//             success:false,
//             status:"error",
//             message:"all fields are required"
//          })   
//         }

//         const exhibitor = await Exhibitor.findById(req.params.id)
//         if (!exhibitor) {
//             return res.send({
//                 success: false,
//                 status: "error",
//                 message: "Expo not found",
//             });
//         }

//         await Exhibitor.findByIdAndUpdate(req.params.id,{
//             name , 
//             email , 
//             phone , 
//             password , 
//             companyName , 
//             description , 
//             logo , 
//             address , 
//             boothNumber
//         })

//         return res.status(200).send({
//             success: true,
//             status: "success",
//             message: "exhibitor update successfully",
//         });

//     }catch(error){
//         console.log(error)
//         return res.send({
//             success: false,
//             status: "error",
//             message: "error occured while update exhibitor",
//         });
//     }
// }


const deletexhibitorbyid = async(req , res) => {
    try {
        const { id } = req.params;
        const exhibitor = await Exhibitor.findById(id);
        if (!exhibitor) {
            return res.send({
                success: false,
                status: "error",
                message: "Exhibitor not found",
            });
        }

        await Exhibitor.findByIdAndDelete(id);

        return res.status(200).send({
            success: true,
            status: "success",
            message: "Exhibitor deleted successfully",
        });
    } catch (error) {
        console.log(error);
        return res.send({
            success: false,
            status: "error",
            message: "Error occurred while deleting exhibitor",
        });
    }
}


export {getallexhibitor , deletexhibitorbyid}