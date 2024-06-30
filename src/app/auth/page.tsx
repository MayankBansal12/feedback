"use client";

import Image from "next/image";
import logo from "../../asset/icon.svg";
import { useState } from "react";


const LoginForm = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full dark:text-white">
      <h1 className="mb-4 font-bold flex gap-2 items-center"><span className="text-2xl">hello buddy</span> <span className="text-md">(ᴖᴗᴖ)</span></h1>

      <form className="flex flex-col justify-center gap-4 w-1/3">
        <input
          type="email"
          placeholder="Email"
          className="bg-light-primary dark:bg-accent-darkinput px-4 py-1 border border-l-2 border-l-black dark:border-l-[#ffffff] text-md dark:text-white outline-none hover:outline focus:outline"
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-light-primary dark:bg-accent-darkinput px-4 py-1 border border-l-2 border-l-black dark:border-l-[#ffffff] text-md dark:text-white outline-none hover:outline focus:outline"
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

const RegisterForm = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full dark:text-white">
      <h1 className="mb-4 font-bold flex gap-2 items-center"><span className="text-2xl">welcome buddy</span> <span className="text-md">(ᴖᴗᴖ)</span></h1>
      <form className="flex flex-col justify-center gap-4 w-1/3">
        <input
          type="email"
          placeholder="Email"
          className="bg-light-primary dark:bg-accent-darkinput px-4 py-1 border border-l-2 border-l-black dark:border-l-[#ffffff] text-md dark:text-white outline-none hover:outline focus:outline"
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-light-primary dark:bg-accent-darkinput px-4 py-1 border border-l-2 border-l-black dark:border-l-[#ffffff] text-md dark:text-white outline-none hover:outline focus:outline"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="bg-light-primary dark:bg-accent-darkinput px-4 py-1 border border-l-2 border-l-black dark:border-l-[#ffffff] text-md dark:text-white outline-none hover:outline focus:outline"
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

  return (
    <div className="flex items-center w-screen h-screen">
      <div className="flex flex-col justify-center items-center gap-4 bg-dark-primary w-1/2 h-full text-white">
        <Image src={logo} width={100} height={100} alt="logo" />
        <h1 className="font-bold text-6xl text-white">social.</h1>
        <p>happy to know that you wanna be part of us : &#41;&#41;</p>
      </div>
      <div className="flex flex-col justify-center items-center dark:bg-dark-secondary p-4 w-full h-full text-black dark:text-white">
        {isLogin ? <LoginForm /> : <RegisterForm />}
        <button
          className="mt-4"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? (
            <>
              <p>
                don&apos;t have an account?{" "}
                <span className="text-accent-link hover:underline">signup</span>
              </p>
              <p>
                forgot password?{" "}
                <span className="text-accent-link hover:underline">reset</span>
              </p>
            </>
          ) : (
            <p>
              already have an account?{" "}
              <span className="text-accent-link hover:underline">login</span>
            </p>
          )}
        </button>
      </div>
    </div>
  );
}
