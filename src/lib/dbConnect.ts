import mongoose from "mongoose";


type ConnectionObject = {
    isConnected?: number
}

const connectionObject: ConnectionObject = {}

async function dbConnect(): Promise<void> {
    if (connectionObject.isConnected) {
        console.log("Already connected to database!");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "", {})
        connectionObject.isConnected = db.connections[0].readyState
        console.log("Connected to database");
    } catch (error) {
        console.log("Error connecting to database! ", error);
        process.exit(1);
    }
}