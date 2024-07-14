import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { ApiResponse } from "@/types/ApiResponse";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const secret = process.env.CLIENT_SECRET_TOKEN ?? "";

export async function GET(request: Request) {
    await dbConnect();

    let response: ApiResponse;

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) {
            response = { success: false, status: 400, message: "id can't be empty", data: { user: null } }
            return new Response(JSON.stringify(response), { status: response.status })
        }
        const user = await UserModel.findById(id)
        if (!user) {
            response = { success: false, status: 400, message: "Unable to find user!", data: { user: null } }
            return new Response(JSON.stringify(response), { status: response.status })
        }
        const hashedSecret = await bcrypt.hash(user.clientSecret, 10)
        response = { success: true, status: 200, message: "fetched client id and client secret!", data: { userId: user._id, name: user.name, secret: hashedSecret } }
        return new Response(JSON.stringify(response), { status: response.status })
    } catch (error) {
        console.error("Error while fetching secret", error);
        response = { success: false, status: 400, message: "Error while fetching secret" }
        return new Response(JSON.stringify(response), { status: response.status })
    }
}