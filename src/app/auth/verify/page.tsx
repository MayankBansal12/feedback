"use client";

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Verify() {
    const [code, setCode] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { toast } = useToast()
    const router = useRouter()

    const handleSubmit = async () => {
        if (!email) {
            toast({
                variant: "destructive",
                title: "error with verify email",
                description: "try to refresh the page and try again",
            })
            return
        }
        if (!code || code === "") {
            toast({
                title: "error with verify email",
                description: "verify code can't be empty",
            })
            return
        }
        setIsLoading(true)

        try {
            const response = await fetch("/api/verify-code", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, verifyCode: code }),
            });

            if (response.ok) {
                router.replace("/dashboard")
            } else {
                const errorData = await response.json();
                console.error("Error:", errorData);

                toast({
                    variant: "destructive",
                    title: "caught up with an error",
                    description: errorData.message.toLowerCase(),
                })
            }
        } catch (error) {
            console.log("error: ", error)
            toast({
                variant: "destructive",
                title: "caught up with an error",
                description: "Error, try again!",
            })
        } finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const email = params.get("email") ?? ""
        setEmail(email);
    }, []); // Fetch email once when component mounts


    return (
        <div className="flex flex-col justify-center items-center w-full gap-6">
            <div className="text-center flex gap-1 flex-col">
                <h3 className="font-bold text-xl">check your email for the verification code</h3>
                <p className="text-sm opacity-70">{email}</p>
            </div>
            <InputOTP
                maxLength={6}
                value={code}
                onChange={(value) => setCode(value)}
            >
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
            </InputOTP>

            <div className="flex justify-center w-1/3">
                <button
                    className="bg-accent-link hover:bg-accent-buttonhover transition-all p-1 w-1/2 rounded-full text-white"
                    disabled={isLoading}
                    onClick={handleSubmit}
                >
                    {isLoading ? "loading..." : "verify"}
                </button>
            </div>

        </div>
    );
}