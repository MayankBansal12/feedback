import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
    email: string,
    password: string,
    isVerified: boolean,
    verifyCode: string,
    verifyCodeExpiry: Date
}

const UserSchema: Schema<User> = new Schema({
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: true,
        match: [/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g, "Please provide correct email format!"]
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verifyCode: {
        type: String,
        required: [true, "Verify code is required!"]
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "Verify code expiry is required!"]
    },
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema))
export default UserModel;