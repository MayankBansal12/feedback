/** @format */
"use client";
import Link from "next/link";
import icon from "../asset/icon.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useUserStore } from "@/global-store/store";

export default function Nav() {
  const [darkMode, setDarkMode] = useState(true);
  const { user } = useUserStore();

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className="flex justify-between items-center bg-white dark:bg-dark-primary shadow-md px-4 lg:px-24 h-16 dark:text-white">
      <div className="flex lg:flex items-center hidden">
        <Image src={icon} alt="logo" height={40} width={40} />
      </div>
      <div className="lg:m-0 ml-10 font-black text-lg md:text-2xl">
        <span>feedback.</span>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex gap-3 dark:border-dark-secondary border border-light-primary rounded-full overflow-hidden">
          <span
            className={`transition-colors duration-300 p-1 rounded-full cursor-pointer ${
              !darkMode ? "bg-light-primary" : ""
            }`}
            onClick={() => setDarkMode(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 text-gray-800 dark:text-gray-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
              />
            </svg>
          </span>
          <span
            className={`transition-colors duration-300 p-1 rounded-full cursor-pointer ${
              darkMode ? "bg-dark-secondary" : ""
            }`}
            onClick={() => setDarkMode(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 text-gray-800 dark:text-gray-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.412 15.655L9.75 21.75l3.745-4.012M9.257 13.5H3.75l2.659-2.849m2.048-2.194L14.25 2.25 12 10.5h8.25l-4.707 5.043M8.457 8.457L3 3m5.457 5.457l7.086 7.086m0 0L21 21"
              />
            </svg>
          </span>
        </div>
        <span className="hover:underline hover:underline-offset-4">
          {user ? (
            <Link href="/dashboard">dashboard</Link>
          ) : (
            <Link href="/auth?login=true">login</Link>
          )}
        </span>
      </div>
    </div>
  );
}
