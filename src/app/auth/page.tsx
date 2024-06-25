/** @format */
"use client";

import Image from "next/image";
import logo from "../../asset/icon.svg";
import { useState } from "react";
import Nav from "@/components/nav";

const LoginForm = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full dark:text-white">
      <h1 className="mb-4 font-bold text-2xl">Hello Buddy 🙋‍♂️</h1>
      <form className="flex flex-col justify-center gap-4 w-1/3">
        <input
          type="email"
          placeholder="Email"
          className="bg-light-primary dark:bg-accent-darkinput px-4 py-1 border border-l-2 border-l-black dark:border-l-[#ffffff] text-md text-white outline-none hover:outline focus:outline"
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-light-primary dark:bg-accent-darkinput px-4 py-1 border border-l-2 border-l-black dark:border-l-[#ffffff] text-md text-white outline-none hover:outline focus:outline"
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-accent-link hover:bg-accent-buttonhover p-1 rounded-full w-1/2 text-white"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

const RegisterForm = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full dark:text-white">
      <h1 className="mb-4 font-bold text-2xl">Welcome Buddy 🙋‍♂️</h1>
      <form className="flex flex-col justify-center gap-4 w-1/3">
        <input
          type="email"
          placeholder="Email"
          className="bg-light-primary dark:bg-accent-darkinput px-4 py-1 border border-l-2 border-l-black dark:border-l-[#ffffff] text-md text-white outline-none hover:outline focus:outline"
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-light-primary dark:bg-accent-darkinput px-4 py-1 border border-l-2 border-l-black dark:border-l-[#ffffff] text-md text-white outline-none hover:outline focus:outline"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="bg-light-primary dark:bg-accent-darkinput px-4 py-1 border border-l-2 border-l-black dark:border-l-[#ffffff] text-md text-white outline-none hover:outline focus:outline"
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-accent-link hover:bg-accent-buttonhover p-1 rounded-full w-1/2 text-white"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default function auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <div className="flex items-center w-screen h-screen">
        <div className="flex flex-col justify-center items-center gap-4 bg-dark-primary w-1/2 h-full text-white">
          <Image src={logo} width={100} height={100} alt="logo" />
          <h1 className="font-bold text-6xl text-white">social.</h1>
          <p>Happy to know that you wanna be part of us 🥹</p>
        </div>
        <div className="flex flex-col justify-center items-center dark:bg-dark-secondary p-4 w-full h-full">
          {isLogin ? <LoginForm /> : <RegisterForm />}
          <button
            className="mt-4 text-black dark:text-white"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? (
              <p>
                Don't have an account?{" "}
                <span className="text-accent-link hover:underline">Signup</span>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <span className="text-accent-link hover:underline">Login</span>
              </p>
            )}
          </button>
        </div>{" "}
      </div>
    </>
  );
}
