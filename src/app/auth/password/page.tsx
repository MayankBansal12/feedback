"use client"

import { useToast } from "@/components/ui/use-toast"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, ChangeEvent, useEffect, Suspense } from "react"

const PasswordComponent = () => {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()
    const router = useRouter()
    const params = useSearchParams()
    const token = params.get("token")

    useEffect(() => {
        if (!token) {
            toast({
                title: "invalid request!",
            })
            router.replace("/auth?login=true")
        }
    }, [token, router])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast({
                title: "oops! you sure you remember the password?",
                description: "password and confirm password do not match",
            })
            return;
        }
        setIsLoading(true)

        try {
            const response = await fetch("/api/reset-password", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Success:", data.data);

                localStorage.setItem("token", data.data.token)

                toast({
                    title: "password changed",
                    description: "you can login now!",
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
    }

    return (
        <div className="flex flex-col justify-center items-center w-full gap-6">
            <div className="text-center flex gap-1 flex-col">
                <h3 className="font-bold text-2xl">change your password</h3>
                <p className="text-sm opacity-70">enter your new password</p>
            </div>
            <form className="flex flex-col justify-center gap-4 w-1/3" onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    className="bg-light-primary dark:bg-accent-darkinput px-4 py-1 border border-l-2 border-l-black dark:border-l-[#ffffff] text-md dark:text-white outline-none hover:outline focus:outline"
                    required
                />
                <input
                    type="password"
                    placeholder="confirm password"
                    value={confirmPassword}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                    className="bg-light-primary dark:bg-accent-darkinput px-4 py-1 border border-l-2 border-l-black dark:border-l-[#ffffff] text-md dark:text-white outline-none hover:outline focus:outline"
                    required
                />
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-accent-link hover:bg-accent-buttonhover transition-all p-1 rounded-full w-1/2 text-white"
                        disabled={isLoading}
                    >
                        {isLoading ? "loading..." : "reset passwd"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default function Password() {
    return (
        <Suspense fallback={<div>loading...</div>}>
            <PasswordComponent />
        </Suspense>
    )
}
