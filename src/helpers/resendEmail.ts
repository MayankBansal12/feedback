import { z } from "zod"
import { resend } from "@/lib/resend";
import { ApiResponse } from "@/types/ApiResponse";
import VerificationEmail from "../../emails/VerificationTemplate";
import ResetTemplate from "../../emails/ResetTemplate";

const audienceId = process.env.AUDIENCE_ID ?? ""


export async function sendEmail(email: string, name: string, otp: string): Promise<ApiResponse> {
    try {
        const { data } = await resend.emails.send({
            from: 'feedback <feedback@mayankbansal.xyz>',
            to: email,
            reply_to: 'mayankbansal125@gmail.com',
            subject: 'yo. verfication code.',
            react: VerificationEmail({ name, otp }),
        });
        return { success: true, status: 200, message: "Email sent!", data: data || [] }
    } catch (error) {
        console.error("Error sending email! ", error);
        return { success: false, status: 400, message: "Error sending email!" }
    }
}

export async function sendResetEmail(email: string, name: string, token: string): Promise<ApiResponse> {
    try {
        const { data } = await resend.emails.send({
            from: 'feedback <feedback@mayankbansal.xyz>',
            to: email,
            reply_to: 'mayankbansal125@gmail.com',
            subject: 'reset your password. feedback.',
            react: ResetTemplate({ name, token }),
        });
        return { success: true, status: 200, message: "Email sent!", data: data || [] }
    } catch (error) {
        console.error("Error sending email! ", error);
        return { success: false, status: 400, message: "Error sending email!" }
    }
}

export async function addContact(email: string): Promise<ApiResponse> {
    try {
        await resend.contacts.create({
            email: email,
            unsubscribed: false,
            audienceId: audienceId,
        });

        return { success: true, status: 200, message: "User added to contact!" }
    } catch (error) {
        console.error("Error adding contact email! ", error);
        if (error instanceof z.ZodError)
            return { success: false, status: 400, message: error.errors[0].message };

        return { success: false, status: 400, message: "Error adding user email!" }
    }
}

export async function deleteContact(email: string): Promise<ApiResponse> {
    try {
        await resend.contacts.remove({
            email: email,
            audienceId: audienceId,
        });

        return { success: true, status: 200, message: "User removed from contact!" }
    } catch (error) {
        console.error("Error removing contact email! ", error);

        if (error instanceof z.ZodError)
            return { success: false, status: 400, message: error.errors[0].message };

        return { success: false, status: 400, message: "Error removing user email!" }
    }
}