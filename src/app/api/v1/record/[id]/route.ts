import isSecretValid from "@/helpers/validSecret";
import dbConnect from "@/lib/dbConnect";
import RecordModel from "@/models/Record";
import { recordSchema } from "@/schemas/recordSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { z } from "zod"

export async function GET(request: Request, { params }: { params: { id: string } }) {
    await dbConnect()

    let response: ApiResponse;
    response = await isSecretValid(request)

    if (!response.success) {
        return new Response(JSON.stringify(response), { status: response.status })
    }

    try {
        const record = await RecordModel.find({ _id: params.id })
        response = { success: true, status: 200, message: "fetched record data!", data: record };
        return new Response(JSON.stringify(response), { status: response.status })
    } catch (error) {
        if (error instanceof z.ZodError) {
            response = { success: false, status: 400, message: error.errors[0].message };
        } else {
            console.error("Error fetching a record!", error);
            response = { success: false, status: 400, message: "Error fetching a record!" };
        }
        return new Response(JSON.stringify(response), { status: response.status })
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    await dbConnect()

    let response: ApiResponse;
    response = await isSecretValid(request)

    if (!response.success) {
        return new Response(JSON.stringify(response), { status: response.status })
    }

    try {
        const reqData = await request.json()
        const { text, rating } = recordSchema.parse(reqData)
        const record = await RecordModel.findByIdAndUpdate({ _id: params.id }, { text, rating })
        response = { success: true, status: 200, message: "updated record data!", data: record ?? {} };
        return new Response(JSON.stringify(response), { status: response.status })
    } catch (error) {
        if (error instanceof z.ZodError) {
            response = { success: false, status: 400, message: error.errors[0].message };
        } else {
            console.error("Error updating a project!", error);
            response = { success: false, status: 400, message: "Error updating a record!" };
        }
        return new Response(JSON.stringify(response), { status: response.status })
    }
}


export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    await dbConnect()

    let response: ApiResponse;
    response = await isSecretValid(request)

    if (!response.success) {
        return new Response(JSON.stringify(response), { status: response.status })
    }

    try {
        await RecordModel.findByIdAndDelete(params.id)
        response = { success: true, status: 200, message: "successfully deleted record!" };
        return new Response(JSON.stringify(response), { status: response.status })
    } catch (error) {
        if (error instanceof z.ZodError) {
            response = { success: false, status: 400, message: error.errors[0].message };
        } else {
            console.error("Error deleting record!", error);
            response = { success: false, status: 400, message: "Error deleting the record!" };
        }
        return new Response(JSON.stringify(response), { status: response.status })
    }
}