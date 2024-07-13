import UserModel from "@/models/User"
import bcrypt from "bcryptjs"
import { clientAuthSchema } from "@/schemas/clientAuthSchema"
import { ApiResponse } from "@/types/ApiResponse"
import { z } from "zod"


// verify the id and secret
export default async function isSecretValid(request: Request): Promise<ApiResponse> {
    const id = request.headers.get('clientId')
    const secret = request.headers.get('clientSecret')

    // in case no token, return unauthorized response
    if (!id || !secret) {
        return { success: false, status: 400, message: 'Authentication is missing' }
    }

    // verify the credentials
    try {
        const { clientId, clientSecret } = clientAuthSchema.parse({ clientId: id, clientSecret: secret })
        const user = await UserModel.findById(clientId)

        if (!user) {
            return { success: false, status: 400, message: 'Error authenticating the user!' }
        }
        const isSecretMatch = await bcrypt.compare(user.clientSecret, clientSecret);
        return { success: isSecretMatch, status: 200, message: isSecretMatch ? 'Request authenticated!' : 'Invalid secret key!' }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, status: 400, message: error.errors[0].message };
        } else {
            console.log("Error in validating request: ", error)
            return { success: false, status: 400, message: "Error authenticating the request!" };
        }
    }
}