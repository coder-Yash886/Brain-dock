import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    try{
        const connect = await mongoose.connect(process.env.MONGO_URL as string);
        console.log(`Mongo connected: ${connect.connection.host}`);

    } catch(error){
        console.log(`Error: ${(error as Error).message}`);
        process.exit(1);
    }
}

export default connectDB;