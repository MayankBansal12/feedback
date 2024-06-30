/** @format */

import React from "react";

const Notifications = () => {
  return (
    <div className="flex flex-col dark:bg-dark-secondary px-10 py-10 w-full h-full dark:text-white">
      <div className="flex flex-col justify-start gap-3 w-full text-left">
        <p className="text-xl">stay updated.</p>
        <p className="text-md">checkout all of the latest updates 🔔</p>
      </div>
      <div className="flex flex-col justify-center items-center gap-5 py-10 w-full">
        <div className="flex flex-col my-5 w-full">
          <div className="dark:border-white p-3 border border-black">
            <p className="font-semibold text-xl">platfrom. username.</p>
            <p className="py-2 font-semibold text-md">
              @saakshi_raut commented “Hello world” on the post you recently
              shared.{" "}
            </p>
            <p className="mt-2 text-md">2 days ago.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
