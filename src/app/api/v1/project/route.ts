// api/v1/project

import isSecretValid from "@/helpers/validSecret";
import dbConnect from "@/lib/dbConnect";
import { projectSchema } from "@/schemas/projectSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { z } from "zod";

export async function GET() {
    let response: ApiResponse;

    response = { success: true, status: 200, message: "working project route!" };
    return new Response(JSON.stringify(response), { status: response.status })
}

export async function POST(req: Request) {
    await dbConnect()

    let response: ApiResponse;
    response = await isSecretValid(req)

    if (!response.success) {
        return new Response(JSON.stringify(response), { status: response.status })
    }

    try {
        const reqData = await req.json()
        const { name, desc } = projectSchema.parse(reqData)

        console.log("data: ", name, desc)

        response = { success: true, status: 200, message: "success creating a project", data: { name, desc } };
        return new Response(JSON.stringify(response), { status: response.status })
    } catch (error) {
        if (error instanceof z.ZodError) {
            response = { success: false, status: 400, message: error.errors[0].message };
        } else {
            console.error("Error creating a project!", error);
            response = { success: false, status: 400, message: "Error creating a project!" };
        }
        return new Response(JSON.stringify(response), { status: response.status })
    }
}