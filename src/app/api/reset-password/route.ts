import { z } from "zod";
import { sendResetEmail } from "@/helpers/resendEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { ApiResponse } from "@/types/ApiResponse";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs"
import { emailValidation, passwordValidation } from "@/schemas/signUpSchema";
const secret: string = process.env.JWT_SECRET ?? "";
export async function POST(request: Request) {
    await dbConnect();
    let response: ApiResponse;

    try {
        const data = await request.json()
        const email = emailValidation.parse(data.email);

        // find user with email
        const user = await UserModel.findOne({ email })
        if (!user) {
            response = { status: 400, success: false, message: "User not found with the email!" }
            return new Response(JSON.stringify(response), { status: response.status })
        }
        // assign jwt token to that user
        const token = jwt.sign({ id: user._id }, secret, { expiresIn: '10m' })

        // email with that token
        const isEmailSend = await sendResetEmail(email, user.name, token)
        if (!isEmailSend.success) {
            response = { status: 400, success: false, message: "Error sending email!" }
            return new Response(JSON.stringify(response), { status: response.status })
        }
        response = { status: 200, success: true, message: "Email sent!" }
        return new Response(JSON.stringify(response), { status: response.status })
    } catch (error) {
        console.log("Error in reset password: ", error)
        if (error instanceof z.ZodError) {
            response = { success: false, status: 400, message: error.errors[0].message };
        } else {
            console.error("Error verifying code!", error);
            response = { status: 400, success: false, message: "Error in reset password" }
        }
        return new Response(JSON.stringify(response), { status: response.status })
    }
}

export async function PUT(request: Request) {
    await dbConnect();
    let response: ApiResponse;

    try {
        const data = await request.json()
        const { token } = data;
        const password = passwordValidation.parse(data.password)

        // validate user with the token
        const decoded: JwtPayload = jwt.verify(token, secret) as JwtPayload

        if (!decoded) {
            response = { success: false, status: 400, message: "Error validating token" }
            return new Response(JSON.stringify(response), { status: response.status })
        }
        const userId = decoded.id as string

        // updating user password
        const hashedPasswd = await bcrypt.hash(password, 10)
        const updateUser = await UserModel.findByIdAndUpdate(userId, { password: hashedPasswd })
        if (!updateUser) {
            response = { success: false, status: 400, message: "Error updating the password" }
            return new Response(JSON.stringify(response), { status: response.status })
        }
        response = { success: true, status: 200, message: "User password updated!" }
        return new Response(JSON.stringify(response), { status: response.status })
    } catch (error) {
        console.log("Error updating password: ", error)
        if (error instanceof z.ZodError) {
            response = { success: false, status: 400, message: error.errors[0].message };
        } else {
            console.error("Error verifying code!", error);
            response = { success: false, status: 400, message: "invalid or expired token, try again!" }
        }
        return new Response(JSON.stringify(response), { status: response.status })
    }
}