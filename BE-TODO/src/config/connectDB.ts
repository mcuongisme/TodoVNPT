import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();


const url = process.env.MONGO_URL as string

export const connect = async (): Promise<void> => {
    try {
        await mongoose.connect(url);
        console.log("Connect db success !")
    } catch (error) {
        console.log(`Connect db fail ${error}! `)

    }
}