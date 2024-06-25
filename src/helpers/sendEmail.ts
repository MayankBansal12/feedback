import resend from "@/lib/resend";
import { ApiResponse } from "@/types/ApiResponse";
import VerificationEmail from "../../emails/VerificationTemplate";


export async function sendEmail(email: string, name: string, otp: string): Promise<ApiResponse> {
    try {
        const { data } = await resend.emails.send({
            from: 'send@mayankbansal.xyz',
            to: email,
            subject: 'Verfication code',
            react: VerificationEmail({ name, otp }),
        });
        return { success: true, status: 200, message: "Email sent!", data }
    } catch (error) {
        console.error("Error sending email! ", error);
        return { success: false, status: 400, message: "Error sending email!" }
    }
}