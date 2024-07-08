import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import { ApiResponse } from "@/types/ApiResponse";
import { sendEmail } from "@/helpers/resendEmail";
import jwt from "jsonwebtoken";
import { signUpSchema } from "@/schemas/signUpSchema";
import { z } from "zod"

const secret = process.env.JWT_SECRET || "";

export async function POST(request: Request): Promise<Response> {
    await dbConnect();

    let response: ApiResponse;
    try {
        const requestData = await request.json();
        const { name, email, password } = signUpSchema.parse(requestData)
        const isUserExistByEmail = await UserModel.findOne({ email })
        if (isUserExistByEmail) {
            response = { success: false, status: 400, message: "User already exist by email" }
            return new Response(JSON.stringify(response), { status: response.status });
        }
        const hashedPasswd = await bcrypt.hash(password, 10);
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        const verifyCodeExpiry = new Date();
        verifyCodeExpiry.setHours(verifyCodeExpiry.getHours() + 1);

        const newUser = new UserModel({ email, name, password: hashedPasswd, verifyCode, verifyCodeExpiry })
        await newUser.save();

        // Send verification email 
        sendEmail(email, name, verifyCode);

        const jwtToken = jwt.sign({ id: newUser._id }, secret)
        response = { success: true, status: 200, message: "User registered successfully, verify your email!", data: { isVerified: false, token: jwtToken, isValid: true } }
        return new Response(JSON.stringify(response), { status: response.status });
    } catch (error) {
        if (error instanceof z.ZodError) {
            response = { success: false, status: 400, message: error.errors[0].message };
        } else {
            console.error("Error registering user!", error);
            response = { success: false, status: 400, message: "Error registering user" };
        }
        return new Response(JSON.stringify(response), { status: response.status });
    }
}