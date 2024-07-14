// api/v1/project

import isSecretValid from "@/helpers/validSecret";
import dbConnect from "@/lib/dbConnect";
import ProjectModel from "@/models/Project";
import { projectSchema } from "@/schemas/projectSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { z } from "zod";
import { ObjectId } from "mongodb";

export async function GET(req: Request) {
    await dbConnect()

    let response: ApiResponse;
    response = await isSecretValid(req)

    if (!response.success) {
        return new Response(JSON.stringify(response), { status: response.status })
    }

    try {
        const clientId = req.headers.get("clientId") ?? ""
        const projects = await ProjectModel.find({ userId: new ObjectId(clientId) }).sort({ createdDate: -1 })

        response = { success: true, status: 200, message: "success fetching all projects", data: projects };
        return new Response(JSON.stringify(response), { status: response.status })
    } catch (error) {
        if (error instanceof z.ZodError) {
            response = { success: false, status: 400, message: error.errors[0].message };
        } else {
            console.error("Error fetching all projects!", error);
            response = { success: false, status: 400, message: "Error fetching all projects!" };
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
        const clientId = req.headers.get("clientId")
        const { name, desc } = projectSchema.parse(reqData)

        const newProject = new ProjectModel({ name, desc, userId: clientId })
        newProject.save()

        response = { success: true, status: 200, message: "success creating a project", data: newProject };
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