import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import { ApiResponse } from "@/types/ApiResponse";
import { sendEmail } from "@/helpers/sendEmail";

export async function POST(request: Request): Promise<ApiResponse> {
    await dbConnect();

    try {
        const { name, email, password } = await request.json();
        const isUserExistByEmail = await UserModel.findOne({ email })
        if (isUserExistByEmail) {
            return { success: false, status: 400, message: "User already exist by email" }
        }
        const hashedPasswd = await bcrypt.hash(password, 10);
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        const verifyCodeExpiry = new Date();
        verifyCodeExpiry.setHours(verifyCodeExpiry.getHours() + 1);
        
        const newUser = new UserModel({ email, name, password: hashedPasswd, verifyCode, verifyCodeExpiry })
        await newUser.save();

        // Send verification email 
        sendEmail(email, name, verifyCode);

        return { success: true, status: 200, message: "User registered successfully, verify your email!" }
    } catch (error) {
        console.error("Error registering user!", error);
        return { success: false, status: 400, message: "Error registering user" }
    }
}