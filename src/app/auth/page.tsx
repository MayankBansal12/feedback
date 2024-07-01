"use client";

import { ChangeEvent, FC, useEffect, useState } from "react";
import { LoginFormProps, RegisterFormProps } from "@/types/type";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const LoginForm: FC<LoginFormProps> = ({ email, setEmail, password, setPassword, handleSubmit }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full dark:text-white">
      <h1 className="mb-4 font-bold flex gap-2 items-center"><span className="text-2xl">hello buddy</span> <span className="text-md">(ᴖᴗᴖ)</span></h1>

      <form className="flex flex-col justify-center gap-4 w-1/3" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          className="bg-light-primary dark:bg-accent-darkinput px-4 py-1 border border-l-2 border-l-black dark:border-l-[#ffffff] text-md dark:text-white outline-none hover:outline focus:outline"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          className="bg-light-primary dark:bg-accent-darkinput px-4 py-1 border border-l-2 border-l-black dark:border-l-[#ffffff] text-md dark:text-white outline-none hover:outline focus:outline"
          required
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-accent-link hover:bg-accent-buttonhover transition-all p-1 rounded-full w-1/2 text-white"
          >
            login
          </button>
        </div>
      </form>
    </div>
  );
};

const RegisterForm: FC<RegisterFormProps> = ({ name, setName, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, handleSubmit }) => {
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
          placeholder="Email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          className="bg-light-primary dark:bg-accent-darkinput px-4 py-1 border border-l-2 border-l-black dark:border-l-[#ffffff] text-md dark:text-white outline-none hover:outline focus:outline"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          className="bg-light-primary dark:bg-accent-darkinput px-4 py-1 border border-l-2 border-l-black dark:border-l-[#ffffff] text-md dark:text-white outline-none hover:outline focus:outline"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
          className="bg-light-primary dark:bg-accent-darkinput px-4 py-1 border border-l-2 border-l-black dark:border-l-[#ffffff] text-md dark:text-white outline-none hover:outline focus:outline"
          required
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-accent-link hover:bg-accent-buttonhover transition-all p-1 rounded-full w-1/2 text-white"
          >
            sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  // useEffect(() => {
  //   const path = router2.asPath;
  //   setIsLogin(path.includes('#login'));
  //   console.log('path', path);
  // }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("login:", email, password, confirmPassword, name)

    if (!isLogin && password !== confirmPassword) {
      // replace with toast or alert instead of window alert

      toast({
        title: "oops! you sure you remember the password?",
        description: "password and confirm password do not match",
      })
      return;
    }

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
        data.data.isVerified ? router.replace("/dashboard") : router.replace("/auth/verify-email")
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
        />
      )}

      <button
        className="mt-4"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? (
          <>
            <p>
              don&apos;t have an account?{" "}
              <span className="text-accent-link hover:underline" onClick={() => router.replace("/auth#signup")}>signup</span>
            </p>
            <p>
              forgot password?{" "}
              <span className="text-accent-link hover:underline" onClick={() => router.replace("/reset")}>reset</span>
            </p>
          </>
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
