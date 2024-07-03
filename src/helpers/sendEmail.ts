import { resend } from "@/lib/resend";
import { ApiResponse } from "@/types/ApiResponse";
import VerificationEmail from "../../emails/VerificationTemplate";
import ResetTemplate from "../../emails/ResetTemplate";

export async function sendEmail(email: string, name: string, otp: string): Promise<ApiResponse> {
    try {
        const { data } = await resend.emails.send({
            from: 'social <social@mayankbansal.xyz>',
            to: email,
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
            from: 'social <social@mayankbansal.xyz>',
            to: email,
            subject: 'reset your password. social.',
            react: ResetTemplate({ name, token }),
        });
        return { success: true, status: 200, message: "Email sent!", data: data || [] }
    } catch (error) {
        console.error("Error sending email! ", error);
        return { success: false, status: 400, message: "Error sending email!" }
    }
}