/** @format */

"use client";

import { useUserStore } from "@/global-store/store";
import Link from "next/link";

export default function Dash() {
  const { user } = useUserStore()

  return (
    <div className="flex flex-col w-full h-full dark:bg-dark-secondary dark:text-white px-10">
      <h1 className="py-10 text-xl font-semibold">dashboard</h1>
      <div className="flex flex-col justify-center items-center gap-8 h-2/3">
        <h2 className="text-center text-xl">
          <p>hey <span className="font-semibold">{user ? user.name : ""}</span>. how ya doin'</p>
          <p>welcome to <span className="font-semibold">feedback</span>. </p>
        </h2>
        <div className="flex w-3/4 justify-center gap-10">
          {/* <div className="bg-gradient-to-r from-[#86CAFC] to-[#33CA66] py-8 border border-light-primary dark:border-light-primary rounded-lg w-1/3">
            <p className="text-center flex flex-col gap-2">
              <span className="font-semibold text-lg">total feedback forms</span>
              <span className="font-bold text-2xl">5</span>
            </p>
          </div>
          <div className="bg-gradient-to-r from-[#F5B6F3] to-[#FF9292] py-8 border border-light-primary dark:border-light-primary rounded-lg w-1/3">
            <p className="text-center flex flex-col gap-2">
              <span className="font-semibold text-lg">average overall rating</span>
              <span className="font-bold text-2xl">4.2</span>
            </p>
          </div> */}

          <ol>
            <li>- collect and manage user's feedback on your product</li>
            <li>- go to <Link href="/dashboard/get-started" className="text-accent-link hover:text-accent-buttonhover transition-all">getting started</Link> for a head start</li>
            <li>- visit <Link href="/docs/welcome" className="text-accent-link hover:text-accent-buttonhover transition-all">feedback docs</Link> for api references and more.</li>
            <li>- in case of feat request or complaint, feel free to submit a feedback</li>
          </ol>
        </div>
        <p className="text-slate-400">more metrics coming soon...</p>
      </div>
    </div>
  );
}
