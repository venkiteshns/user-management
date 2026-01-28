import mongoose from "mongoose";

const dbConnect = async() => {
    try {
        console.log("Attempting database connection");
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected succesfully to :",mongoose.connection.name);
        
    } catch (err) {
        console.log("Mongo db connection error",err);
        process.exit(1);
    }
}

export default dbConnect;