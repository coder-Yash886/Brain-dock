import mongoose from "mongoose";

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 5000;

const connectDB = async (): Promise<boolean> => {
    const uri = process.env.MONGO_URL as string | undefined;
    if (!uri) {
        console.error('MONGO_URL is not set in environment');
        return false;
    }

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            const connect = await mongoose.connect(uri, { family: 4 });
            console.log(`Mongo connected: ${connect.connection.host}`);
            return true;
        } catch (error) {
            const msg = (error as Error).message;
            console.error(`Mongo connect attempt ${attempt} failed: ${msg}`);
            if (attempt < MAX_RETRIES) {
                console.log(`Retrying in ${RETRY_DELAY_MS / 1000} seconds...`);
                await new Promise(res => setTimeout(res, RETRY_DELAY_MS));
            }
        }
    }

    console.error(`Unable to connect to MongoDB after ${MAX_RETRIES} attempts. Check network/DNS, Atlas IP whitelist, and consider using the non-SRV connection string if your environment blocks SRV lookups.`);
    return false;
}

export default connectDB;