import mongoose from "mongoose";

let isConnected = false;

async function dbConnect() {
    if(isConnected) {
        console.log("Already connected to mongodb");
        return;
    }
    try {
      const db = await mongoose.connect(process.env.MONGODB_URL);
      console.log("Connected to mongodb" , db.connection.db.databaseName);
      isConnected = db.connection.readyState === 1;
    } catch (error) {
        console.log("Failed to connect mongodb" , error)
        throw error
    }
}

export default dbConnect;  