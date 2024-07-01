"use client";

import { ChangeEvent, FC, useEffect, useState } from "react";
import { LoginFormProps, RegisterFormProps } from "@/types/type";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const LoginForm: FC<LoginFormProps> = ({ email, setEmail, password, setPassword, handleSubmit, isLoading }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full dark:text-white">
      <h1 className="mb-4 font-bold flex gap-2 items-center"><span className="text-2xl">hello buddy</span> <span className="text-md">(ᴖᴗᴖ)</span></h1>

      <form className="flex flex-col justify-center gap-4 w-1/3" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          className="bg-light-primary dark:bg-accent-darkinput px-4 py-1 border border-l-2 border-l-black dark:border-l-[#ffffff] text-md dark:text-white outline-none hover:outline focus:outline"
          required
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          className="bg-light-primary dark:bg-accent-darkinput px-4 py-1 border border-l-2 border-l-black dark:border-l-[#ffffff] text-md dark:text-white outline-none hover:outline focus:outline"
          required
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-accent-link hover:bg-accent-buttonhover transition-all p-1 rounded-full w-1/2 text-white"
            disabled={isLoading}
          >
            {isLoading ? "loading..." : "login"}
          </button>
        </div>
      </form>
    </div>
  );
};

const RegisterForm: FC<RegisterFormProps> = ({ name, setName, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, handleSubmit, isLoading }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full dark:text-white">
      <h1 className="mb-4 font-bold flex gap-2 items-center"><span className="text-2xl">welcome buddy</span> <span className="text-md">(ᴖᴗᴖ)</span></h1>
      <form className="flex flex-col justify-center gap-4 w-1/3" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          className="bg-light-primary dark:bg-accent-darkinput px-4 py-1 border border-l-2 border-l-black dark:border-l-[#ffffff] text-md dark:text-white outline-none hover:outline focus:outline"
          required
        />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          className="bg-light-primary dark:bg-accent-darkinput px-4 py-1 border border-l-2 border-l-black dark:border-l-[#ffffff] text-md dark:text-white outline-none hover:outline focus:outline"
          required
        />
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
            {isLoading ? "loading..." : "sign up"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.hash || window.location.pathname;
      setIsLogin(path.includes('#login'));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("login:", email, password, confirmPassword, name)

    if (!isLogin && password !== confirmPassword) {
      toast({
        title: "oops! you sure you remember the password?",
        description: "password and confirm password do not match",
      })
      return;
    }
    setIsLoading(true)
    const endpoint = isLogin ? "/api/sign-in" : "/api/sign-up";

    const payload = isLogin
      ? { email, password }
      : { name, email, password, confirmPassword };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data.data);

        localStorage.setItem("token", data.data.token)
        if (!isLogin)
          toast({
            title: "request success",
            description: "verify your email to access dashboard",
          })

        data.data.isVerified ? router.replace("/dashboard") : router.replace("/auth/verify?email=" + email)
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
    <div className="flex flex-col justify-center items-center dark:bg-dark-secondary p-4 w-full h-screen text-black dark:text-white">
      {isLogin ? (
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      ) : (
        <RegisterForm
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      )}

      <button
        className="mt-4"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? (
          <div>
            <p>
              don&apos;t have an account?{" "}
              <span className="text-accent-link hover:underline" onClick={() => router.replace("/auth#signup")}>signup</span>
            </p>
            <p>
              forgot password?{" "}
              <span className="text-accent-link hover:underline" onClick={() => router.replace("/auth/reset-password")}>reset</span>
            </p>
          </div>
        ) : (
          <p>
            already have an account?{" "}
            <span className="text-accent-link hover:underline" onClick={() => router.replace("/auth#login")}>login</span>
          </p>
        )}
      </button>
    </div>
  );
}
