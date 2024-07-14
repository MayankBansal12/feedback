import isSecretValid from "@/helpers/validSecret";
import dbConnect from "@/lib/dbConnect";
import ProjectModel from "@/models/Project";
import { projectSchema } from "@/schemas/projectSchema";
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
        const project = await ProjectModel.find({ _id: params.id })
        response = { success: true, status: 200, message: "fetched project data!", data: project };
        return new Response(JSON.stringify(response), { status: response.status })
    } catch (error) {
        if (error instanceof z.ZodError) {
            response = { success: false, status: 400, message: error.errors[0].message };
        } else {
            console.error("Error fetching a project!", error);
            response = { success: false, status: 400, message: "Error fetching a project!" };
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
        const { name, desc } = projectSchema.parse(reqData)
        const form = await ProjectModel.findByIdAndUpdate({ _id: params.id }, { name, desc })
        response = { success: true, status: 200, message: "updated project data!", data: form ?? {} };
        return new Response(JSON.stringify(response), { status: response.status })
    } catch (error) {
        if (error instanceof z.ZodError) {
            response = { success: false, status: 400, message: error.errors[0].message };
        } else {
            console.error("Error updating a project!", error);
            response = { success: false, status: 400, message: "Error updating a project!" };
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
        await ProjectModel.findByIdAndDelete(params.id)
        response = { success: true, status: 200, message: "successfully deleted form!" };
        return new Response(JSON.stringify(response), { status: response.status })
    } catch (error) {
        if (error instanceof z.ZodError) {
            response = { success: false, status: 400, message: error.errors[0].message };
        } else {
            console.error("Error deleting form!", error);
            response = { success: false, status: 400, message: "Error deleting the form!" };
        }
        return new Response(JSON.stringify(response), { status: response.status })
    }
}