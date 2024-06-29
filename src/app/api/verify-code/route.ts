import { sendEmail } from "@/helpers/sendEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { z } from "zod";
import { emailValidation } from "@/schemas/signUpSchema";
import { verifySchema } from "@/schemas/verifySchema";
import { ApiResponse } from "@/types/ApiResponse";

export async function POST(request: Request) {
    await dbConnect();

    let response: ApiResponse

    try {
        const requestData = await request.json();
        const { email, verifyCode } = verifySchema.parse(requestData);

        const user = await UserModel.findOne({ email })
        if (!user) {
            response = { success: false, status: 400, message: "User with email not found!" }
            return new Response(JSON.stringify(response), { status: response.status })
        }
        if (user.isVerified) {
            response = { success: false, status: 400, message: "User is already verified!" }
            return new Response(JSON.stringify(response), { status: response.status })
        }

        const isVerified = user.verifyCode === verifyCode;
        const isExpired = new Date(user.verifyCodeExpiry) > new Date()

        if (!isVerified) {
            response = { success: false, status: 400, message: "Incorrect verification code!" }
            return new Response(JSON.stringify(response), { status: response.status })
        } else if (!isExpired) {
            response = { success: false, status: 400, message: "Verification code expired!" }
            return new Response(JSON.stringify(response), { status: response.status })
        } else {
            // set isVerified for user to true
            user.isVerified = true
            user.save()
            response = { success: true, status: 200, message: "Email verified!" }
            return new Response(JSON.stringify(response), { status: response.status })
        }

    } catch (error) {
        if (error instanceof z.ZodError) {
            response = { success: false, status: 400, message: error.errors[0].message };
        } else {
            console.error("Error verifying code!", error);
            response = { success: false, status: 400, message: "Error verifying code" };
        }
        return new Response(JSON.stringify(response), { status: response.status })
    }
}

export async function PUT(request: Request) {
    await dbConnect();

    let response: ApiResponse;

    try {
        const requestData = await request.json()
        const email = emailValidation.safeParse(requestData.email)

        const user = await UserModel.findOne({ email })
        if (!user) {
            response = { success: false, status: 400, message: "User with email not found!" }
            return new Response(JSON.stringify(response), { status: response.status })
        }
        if (user.isVerified) {
            response = { success: false, status: 400, message: "User already verified!" }
            return new Response(JSON.stringify(response), { status: response.status })
        }
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1)

        user.verifyCode = verifyCode;
        user.verifyCodeExpiry = expiryDate;
        user.save();

        const isEmailSend = await sendEmail(user.email, user.name, user.verifyCode)
        console.log("email response: ", isEmailSend)
        if (isEmailSend.success) {
            response = { success: true, status: 200, message: "Verification code send!" }
            return new Response(JSON.stringify(response), { status: response.status })
        }
        response = { success: false, status: 400, message: "Error sending email!" }
        return new Response(JSON.stringify(response), { status: response.status })
    } catch (error) {
        if (error instanceof z.ZodError) {
            response = { success: false, status: 400, message: error.errors[0].message };
        } else {
            console.error("Error sending code ", error);
            response = { success: false, status: 400, message: "Error while sending verification code" }
        }
        return new Response(JSON.stringify(response), { status: response.status })
    }
}