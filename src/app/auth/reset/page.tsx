"use client"

import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent } from "react";

export default function Reset() {
    const [email, setEmail] = useState("")
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email) {
            toast({
                title: "oops! email is required",
                description: "please enter correct email to reset password!",
            })
            return;
        }
        setIsLoading(true)

        try {
            const response = await fetch("/api/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                toast({
                    title: "email sent!",
                    description: "check your email for instructions to reset password",
                })
                router.replace("/auth?login=true")
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

    return (
        <div className="flex flex-col justify-center items-center w-full gap-6">
            <div className="text-center flex gap-1 flex-col">
                <h3 className="font-bold text-2xl">reset password</h3>
                <p className="text-sm opacity-70">check email for instructions</p>
            </div>
            <form className="flex flex-col justify-center gap-4 w-1/3" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    className="bg-light-primary dark:bg-accent-darkinput px-4 py-1 border border-l-2 border-l-black dark:border-l-[#ffffff] text-md dark:text-white outline-none hover:outline focus:outline"
                    required
                />
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-accent-link hover:bg-accent-buttonhover transition-all p-1 rounded-full w-1/2 text-white"
                        disabled={isLoading}
                    >
                        {isLoading ? "sending..." : "send link"}
                    </button>
                </div>
                <button className="mt-4">
                    <p>
                        back to login?{" "}
                        <span className="text-accent-link hover:underline" onClick={() => router.replace("/auth?login=true")}>login</span>
                    </p>
                </button>
            </form>
        </div >
    )
}