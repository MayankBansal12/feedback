import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { z } from "zod"
import bcrypt from "bcryptjs"
import { clientAuthSchema } from './schemas/clientAuthSchema'
import dbConnect from './lib/dbConnect'
import UserModel from './models/User'

export async function middleware(request: NextRequest) {

    // Check if the request is for an API route
    if (request.nextUrl.pathname.startsWith('/api/v1')) {
        const clientId = request.headers.get('clientId')
        const clientSecret = request.headers.get('clientSecret')

        // in case no token, return unauthorized response
        if (!clientId || !clientSecret) {
            return new NextResponse(
                JSON.stringify({ success: false, message: 'Authentication is missing' }),
                { status: 401, headers: { 'content-type': 'application/json' } }
            )
        }

        // verify the credentials
        const isValid = await isValidReq(clientId, clientSecret)
        if (!isValid) {
            return new NextResponse(
                JSON.stringify({ success: false, message: 'Invalid credentials!' }),
                { status: 401, headers: { 'content-type': 'application/json' } }
            )
        }

        // if token is valid, allow request
        return NextResponse.next()
    }

    // for non api route, allow req as it is
    return NextResponse.next()
}

// verify the id and secret
async function isValidReq(id: string, secret: string): Promise<boolean> {
    const { clientId, clientSecret } = clientAuthSchema.parse({ clientId: id, clientSecret: secret })

    await dbConnect()

    try {
        const user = await UserModel.findById(clientId)

        if (!user) {
            return false
        }
        const isSecretMatch = await bcrypt.compare(user.clientSecret, clientSecret);
        if (!isSecretMatch) {
            return false
        }
        return true
    } catch (error) {
        console.log("Error in validating request: ", error)
        return false
    }
}

// Configure which routes the middleware should run on
export const config = {
    matcher: '/api/v1/:path*',
}