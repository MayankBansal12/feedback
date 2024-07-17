/** @format */
"use client";

import { useState } from "react";

const Settings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const saveHandler = async () => {
    console.log("name: ", name);
  };
  const deleteAccountHandler = async () => {};
  return (
    <div className="flex flex-col dark:bg-dark-secondary px-10 py-10 w-full h-full dark:text-white">
      <div className="flex flex-col justify-start gap-3 my-4 w-full text-left">
        <p className="text-xl">settings 🛠️</p>
        <p className="text-md">
          update your profile, change your password, and more...
        </p>
      </div>
      <hr className="border-1 my-4 my-4 border-light-primary dark:border-light-primary w-full" />
      <div className="flex flex-col shadow-lg my-4 my-4 p-4 border border-light-primary dark:border-light-primary rounded-sm">
        <div className="flex">
          <p>profile settings:</p>
        </div>
        <div className="flex flex-col my-2">
          <form className="flex flex-col justify-center">
            <input
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-light-primary dark:bg-accent-darkinput px-4 py-1 border border-l-2 border-l-black dark:border-l-[#ffffff] w-full md:w-96 text-md dark:text-white outline-none hover:outline focus:outline my-2"
              required
            />
            <input
              type="email"
              placeholder="email"
              value={name}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-light-primary dark:bg-accent-darkinput px-4 py-1 border border-l-2 border-l-black dark:border-l-[#ffffff] w-full md:w-96 text-md dark:text-white outline-none hover:outline focus:outline my-2"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-accent-link hover:bg-accent-buttonhover my-2 px-4 p-1 rounded-full w-fit md:w-48 text-white transition-all"
              onClick={saveHandler}
            >
              save
            </button>
          </form>
        </div>
      </div>
      <div className="flex flex-col shadow-lg my-4 my-4 p-4 border border-light-primary dark:border-light-primary rounded-sm">
        <div className="flex">
          <p>account settings:</p>
        </div>
        <div className="flex flex-col my-2">
          <form className="flex flex-col justify-center">
            <input
              type="password"
              placeholder="enter your password to delete your account"
              value={name}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-light-primary dark:bg-accent-darkinput px-4 py-1 border border-l-2 border-l-black dark:border-l-[#ffffff] w-full md:w-96 text-md dark:text-white outline-none hover:outline focus:outline my-2"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[#FF4040] hover:bg-accent-buttonhover my-2 px-4 p-1 rounded-full w-fit md:w-48 text-white transition-all"
              onClick={deleteAccountHandler}
            >
              delete
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
