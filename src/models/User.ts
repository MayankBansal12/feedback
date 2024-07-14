import mongoose, { Schema, Document } from "mongoose";

function getSecret() {
    let secret = "";
    const chars = "ABCTU5678VWXYZabcdefghijklmnoDEFGHIJKL01234MNOPQRSpqrstuvwxyz9"
    const length = 36

    for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * length)
        secret += chars.charAt(index)
    }
    return secret;
}

export interface User extends Document {
    name: string,
    email: string,
    password: string,
    isVerified: boolean,
    verifyCode: string,
    verifyCodeExpiry: Date,
    clientSecret: string,
    createdDate: Date,
    isDeleted: boolean
}

const UserSchema: Schema<User> = new Schema({
    name: {
        type: String,
        required: true
    },
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
    clientSecret: {
        type: String,
        required: true,
        default: getSecret()
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema))
export default UserModel;