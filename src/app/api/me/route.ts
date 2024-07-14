import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { ApiResponse } from "@/types/ApiResponse";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET ?? "";

export async function GET(request: Request) {
    await dbConnect();

    let response: ApiResponse;

    try {
        const authToken = request.headers.get("Authorization");
        const token = authToken?.split(" ")[1]
        if (!token) {
            response = { success: false, status: 400, message: "Token is missing!" }
            return new Response(JSON.stringify(response), { status: response.status })
        }
        const decoded = jwt.verify(token, secret)

        if (typeof decoded !== "object" || !decoded?.id) {
            response = { success: false, status: 400, message: "User isn't authenticated!", data: { user: null } }
            return new Response(JSON.stringify(response), { status: response.status })
        }

        const user = await UserModel.findById(decoded.id)
        if (!user) {
            response = { success: false, status: 400, message: "Unable to find user!", data: { user: null } }
            return new Response(JSON.stringify(response), { status: response.status })
        }
        response = { success: true, status: 200, message: "User authenticated!", data: { userId: user._id, name: user.name, email: user.email, isVerified: user.isVerified, createdDate: user.createdDate } }
        return new Response(JSON.stringify(response), { status: response.status })
    } catch (error) {
        console.error("Error while authenticating user", error);
        response = { success: false, status: 400, message: "Error authenticating user!" }
        return new Response(JSON.stringify(response), { status: response.status })
    }
}