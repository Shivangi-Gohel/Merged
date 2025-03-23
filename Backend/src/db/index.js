import mongoose from "mongoose";


const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect()
    } catch(error) {
        console.log("MONGODB connection failed ", error);
        
    }
}