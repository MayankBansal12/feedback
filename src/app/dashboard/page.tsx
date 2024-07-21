/** @format */

"use client";

export default function Dash() {

  return (
    <div className="flex flex-col w-full h-full dark:bg-dark-secondary dark:text-white px-10">
      <h1 className="py-10 text-xl font-semibold">dashboard</h1>
      <div className="flex flex-col justify-center items-center gap-8 h-2/3">
        <h2 className="text-center text-xl">
          <p>this week you had <span className="font-semibold">1000</span> feedbacks</p>
          <p>on your <span className="font-semibold">social</span> app.</p>
        </h2>
        <div className="flex w-3/4 justify-center gap-10">
          <div className="bg-gradient-to-r from-[#86CAFC] to-[#33CA66] py-8 border border-light-primary dark:border-light-primary rounded-lg w-1/3">
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
          </div>
        </div>
        <p className="text-slate-400">more metrics coming soon...</p>
      </div>
    </div>
  );
}
