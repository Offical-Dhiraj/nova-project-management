import mongoose from "mongoose";
import dns from "dns";
import { env } from "../config/env.js"

const connectDB = async () => {
    try {
        dns.setServers(["8.8.8.8", "1.1.1.1"])
        const connection = await mongoose.connect(env.mongodbUri)

        console.log(`MongoDB connected: ${connection.connection.host}/${connection.connection.name}`,

        );

    } catch (error) {
        console.error(`MongoDB connection failed: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB