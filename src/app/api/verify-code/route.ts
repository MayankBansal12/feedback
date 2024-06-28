import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { ApiResponse } from "@/types/ApiResponse";


export async function POST(request: Request) {
    await dbConnect();

    let response: ApiResponse

    try {
        const { email, verifyCode } = await request.json();
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
        console.error("Error verifying the code", error);
        response = { success: false, status: 400, message: "Error verifying the code" }
        return new Response(JSON.stringify(response), { status: response.status })
    }
}