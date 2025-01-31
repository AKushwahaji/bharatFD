

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () =>{
    try{
        mongoose.set('strictQuery', true);
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB connected successfully")
    }
    catch(err){
        console.log( "MongoDB not connected - " + err.message)
    }
}

export default connectDB;
// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

// const connectDB = async () => {
//   try {
//     // mongoose.set('strictQuery', true)
//     mongoose.connect(process.env.MONGO_URI);
//     console.log("MongoDB Connected successfully");
//   } catch (error) {
//     console.error("Mongo db not connected - " + error.message);
//     process.exit(1);
//   }
// };

// export default connectDB;