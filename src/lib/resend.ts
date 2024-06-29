import { Resend } from "resend";

export const resend = new Resend(process.env.RSEND__API_KEY);