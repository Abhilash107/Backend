import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
// 1.  try catch wrapping OR promises (resolve )

const connectDB = async () => {
    try {
        // 2.  async await
        const connectionInstance=
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB connected  DB Host: ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log("MONGODB connection FAILED", error);
        process.exit(1)
        
    }

}

export default connectDB;


//In your case, if there's a space before ${process.env.MONGODB_URI}, it would result in a space being added to the beginning of the MongoDB connection string. This could cause the connection string to be malformed, resulting in an error when trying to connect to the MongoDB database.

