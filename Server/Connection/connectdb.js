import mongoose from "mongoose";

const connectdb = async() => {
    try{
        const connection = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log(connection.connection.host)
        console.log(connection.connection.name)
    }catch(err){
        console.log(err.message)
        process.exit(1)
    }
}


export default connectdb