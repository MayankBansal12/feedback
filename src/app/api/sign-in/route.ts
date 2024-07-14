import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { loginSchema } from "@/schemas/loginSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { z } from "zod"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET ?? "";

export async function POST(request: Request) {
    await dbConnect();

    let response: ApiResponse;
    try {
        const requestData = await request.json();
        const { email, password } = loginSchema.parse(requestData);
        const user = await UserModel.findOne({ email })
        if (!user) {
            response = { success: false, status: 400, message: "User with email not found!" }
            return new Response(JSON.stringify(response), { status: response.status })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            response = { success: false, status: 400, message: "Incorrect login credentials!", data: { isVerified: user.isVerified } }
            return new Response(JSON.stringify(response), { status: response.status })
        }
        const jwtToken = jwt.sign({ id: user._id }, secret)
        response = { success: true, status: 200, message: "User logged in!", data: { isVerified: user.isVerified, token: jwtToken, isValid: true } }
        return new Response(JSON.stringify(response), { status: response.status })
    } catch (error) {
        if (error instanceof z.ZodError) {
            response = { success: false, status: 400, message: error.errors[0].message };
        } else {
            console.error("Error signing in user!", error);
            response = { success: false, status: 400, message: "Error signing in user" };
        }
        return new Response(JSON.stringify(response), { status: response.status })
    }
}