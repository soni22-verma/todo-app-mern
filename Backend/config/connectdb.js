import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv()
export const connectdb = async() =>{
    try {
        mongoose.connect(process.env.MONGO_URI)
        .then(()=>{
            console.log("database connected successfully")
        })
        
    } catch (error) {
        console.log(error.message,"error")
    }
}