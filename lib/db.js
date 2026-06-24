import mongoose from "mongoose";

async function dbConnect() {
    try {
      const db = await mongoose.connect(process.env.MONGODB_URL);
      console.log("Connected to mongodb" , db.connection.db.databaseName);
    } catch (error) {
        console.log("Failed to connect mongodb" , error)
        throw error
    }
}

export default dbConnect