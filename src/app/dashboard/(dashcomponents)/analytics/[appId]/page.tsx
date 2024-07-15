/** @format */
"use client";
import { Dock, FilePenLine, Trash2 } from "lucide-react";
import { useState } from "react";

function ProjectInformation({
  params,
}: {
  params: {
    appId: string;
  };
}) {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const deleteHandler = () => {
    // delete code
  };
  return (
    <div className="flex flex-col dark:bg-dark-secondary px-10 py-10 w-full h-full dark:text-white">
      <div className="mb-4">
        <p>
          Project info for <span className="font-semibold">{params.appId}</span>
          . Please remove this after integration.
        </p>
      </div>
      <div className="shadow-lg my-4 p-6 border border-light-primary dark:border-light-primary rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <Dock size={24} />
            <p className="font-semibold text-2xl underline">Twitter Feedback</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setDeleteModal(true)}>
              <Trash2 size={24} className="cursor-pointer" />
            </button>
            <FilePenLine size={24} className="cursor-pointer" />
          </div>
        </div>
        <div className="mb-4">
          <p className="text-gray-500 text-sm dark:text-gray-400">
            created on: 12/7/2024
          </p>
        </div>
        <div className="flex flex-wrap">
          <div className="flex justify-center items-center mb-4 px-4 sm:px-24 w-full sm:w-1/2">
            <div className="bg-gradient-to-r from-[#86CAFC] to-[#33CA66] py-8 border border-light-primary dark:border-light-primary rounded-lg w-full text-white">
              <p className="font-bold text-center text-xl">
                100 users
                <br /> have responded.
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center mb-4 px-4 sm:px-24 w-full sm:w-1/2">
            <div className="bg-gradient-to-r from-[#F5B6F3] to-[#FF9292] py-8 border border-light-primary dark:border-light-primary rounded-lg w-full">
              <p className="font-bold text-center text-white text-xl">
                4.2 average
                <br /> rating.
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center my-4">
          <hr className="border-2 border-gray-400 rounded-full w-1/2" />
        </div>
        <div className="my-6">
          <p className="text-lg">here's what people say about you 👇</p>
        </div>
        <div className="px-4 py-2 border border-light-primary dark:border-light-primary rounded-lg w-full">
          <p>
            a user rated 4 stars for your app_name.{" "}
            <span className="text-gray-400 text-sm dark:text-light-primary">
              3 days ago
            </span>
          </p>
          <p className="text-md italic">"Great app, I love it!"</p>
        </div>
      </div>
      {deleteModal && (
        <div className="top-0 left-0 fixed flex justify-center items-center bg-gray-500 bg-opacity-50 w-full h-full">
          <div className="dark:bg-dark-secondary px-5 py-5">
            <p className="text-lg dark:text-white">
              are you sure you want to delete this project ⚠️
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="bg-accent-link hover:bg-red-600 mr-2 px-4 py-2 rounded-full text-white"
                onClick={deleteHandler}
              >
                Yes
              </button>
              <button
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-full text-gray-800"
                onClick={() => setDeleteModal(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectInformation;
