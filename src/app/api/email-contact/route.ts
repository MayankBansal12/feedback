import { z } from "zod"
import { emailValidation } from "@/schemas/signUpSchema";
import { addContact, deleteContact } from "@/helpers/resendEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const email = emailValidation.parse(data.email)

        let response: ApiResponse = await addContact(email)
        return new Response(JSON.stringify(response), { status: response.status })
    } catch (error) {
        let response: ApiResponse;
        console.error("Error adding contact email! ", error);
        if (error instanceof z.ZodError)
            response = { success: false, status: 400, message: error.errors[0].message };
        else
            response = { success: false, status: 400, message: "Error adding user email!" }

        return new Response(JSON.stringify(response), { status: response.status })
    }
}

export async function DELETE(request: Request) {
    try {
        const data = await request.json();
        const email = emailValidation.parse(data.email)

        let response: ApiResponse = await deleteContact(email)
        return new Response(JSON.stringify(response), { status: response.status })
    } catch (error) {
        let response: ApiResponse;
        console.error("Error removing contact email! ", error);

        if (error instanceof z.ZodError)
            response = { success: false, status: 400, message: error.errors[0].message };
        else
            response = { success: false, status: 400, message: "Error removing user email!" }

        return new Response(JSON.stringify(response), { status: response.status })
    }
}