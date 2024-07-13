// api/v1/form

import isSecretValid from "@/helpers/validSecret";
import dbConnect from "@/lib/dbConnect";
import FormModel from "@/models/Form";
import { formSchema } from "@/schemas/formSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { NextRequest } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
    await dbConnect()

    let response: ApiResponse;
    response = await isSecretValid(req)

    if (!response.success) {
        return new Response(JSON.stringify(response), { status: response.status })
    }

    try {
        const searchParams = req.nextUrl.searchParams
        const projectId = searchParams.get('projectId')
        const forms = await FormModel.find({ projectId }).sort({ createdDate: -1 })

        response = { success: true, status: 200, message: "fetched all forms!", data: forms };
        return new Response(JSON.stringify(response), { status: response.status })
    } catch (error) {
        if (error instanceof z.ZodError) {
            response = { success: false, status: 400, message: error.errors[0].message };
        } else {
            console.error("Error fetching a form!", error);
            response = { success: false, status: 400, message: "Error fetching a form!" };
        }
        return new Response(JSON.stringify(response), { status: response.status })
    }
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
        const { name, heading, type, projectId } = formSchema.parse(reqData)

        const newRecord = new FormModel({ name, heading, type, projectId })
        newRecord.save()

        response = { success: true, status: 200, message: "Submitted the form!", data: newRecord };
        return new Response(JSON.stringify(response), { status: response.status })
    } catch (error) {
        if (error instanceof z.ZodError) {
            response = { success: false, status: 400, message: error.errors[0].message };
        } else {
            console.error("Error creating a form!", error);
            response = { success: false, status: 400, message: "Error creating a form!" };
        }
        return new Response(JSON.stringify(response), { status: response.status })
    }
}