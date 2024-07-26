"use client";

import { FormEvent, useState } from "react";

interface FromElem {
  target: {
    appname: HTMLInputElement;
    formname: HTMLInputElement;
    formheading: HTMLInputElement;
  };
}

const Connect = () => {
  const [formData, setformData] = useState(null);

  function handleSubmit(e: FormEvent<HTMLFormElement> & FromElem) {
    e.preventDefault();
    const appname = e.target.appname.value;
    const formname = e.target.formname.value;
    const formheading = e.target.formheading.value;
    if (!appname || !formname || !formheading) {
      alert("Please fill all fields");
      return;
    }
    if (appname.length < 1 || formname.length < 1 || formheading.length < 1) {
      alert("Please fill all fields");
      return;
    }
  }

  return (
    <div className="flex flex-col dark:bg-dark-secondary px-10 py-10 w-full h-full dark:text-white">
      <div className="flex flex-col justify-start gap-3 w-full text-left">
        <p className="text-xl">Create form for various apps.</p>
        <p className="text-md">We do not store any info.</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-5 py-10 w-full"
      >
        <input
          type="text"
          name="appname"
          placeholder="App name"
          className="bg-light-primary dark:bg-accent-darkinput px-4 py-1 border-l-2 border-l-black dark:border-l-[#ffffff] w-96 text-md dark:text-white outline-none hover:outline focus:outline"
        />
        <input
          type="text"
          name="formname"
          placeholder="Form name"
          className="bg-light-primary dark:bg-accent-darkinput px-4 py-1 border-l-2 border-l-black dark:border-l-[#ffffff] w-96 text-md dark:text-white outline-none hover:outline focus:outline"
        />
        <input
          type="text"
          name="formheading"
          placeholder="Form Heading: Eg?: How was your experience"
          className="bg-light-primary dark:bg-accent-darkinput px-4 py-1 border-l-2 border-l-black dark:border-l-[#ffffff] w-96 text-md dark:text-white outline-none hover:outline focus:outline"
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-accent-link hover:bg-accent-buttonhover p-1 rounded-full w-48 text-white"
          >
            create
          </button>
        </div>
      </form>
    </div>
  );
};

export default Connect;
