/** @format */
"use client";
import { Separator } from "@/components/ui/separator";
import { Dock, FilePenLine, Trash2 } from "lucide-react";
import { useState } from "react";

function ProjectInformation({
  params,
}: {
  params: {
    project_id: string;
  };
}) {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const deleteHandler = () => {
    // delete code
  };

  return (
    <div className="flex flex-col w-full h-full dark:bg-dark-secondary dark:text-white px-10">
      <div className="flex gap-4 justify-between items-center">
        <h1 className="pt-1 pb-3 text-xl font-semibold">feedback form</h1>
      </div>

      <div className="flex flex-col gap-4 shadow-lg my-6 p-6 border border-light-primary dark:border-light-primary rounded-lg">
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Dock size={24} />
            <p className="font-semibold text-2xl">twitter feedback</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 transition-all" onClick={() => setDeleteModal(true)}>
              delete
            </button>
            <button className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-all">edit</button>
          </div>
        </div>
        <div className="mb-2 flex justify-between gap-4 items-center">
          <p className="text-md">this is form heading</p>
          <p className="text-sm text-gray-400">
            created: 12-07-24
          </p>
        </div>
        <Separator className="bg-dark-primary dark:bg-light-primary" />

        <div className="flex w-full justify-center gap-10 my-4">
          <div className="bg-gradient-to-r from-[#86CAFC] to-[#33CA66] py-8 border border-light-primary dark:border-light-primary rounded-lg w-1/3">
            <p className="text-center flex flex-col gap-2">
              <span className="font-bold text-2xl">31</span>
              <span className="font-semibold text-lg">users responded.</span>
            </p>
          </div>
          <div className="bg-gradient-to-r from-[#F5B6F3] to-[#FF9292] py-8 border border-light-primary dark:border-light-primary rounded-lg w-1/3">
            <p className="text-center flex flex-col gap-2">
              <span className="font-bold text-2xl">4.2</span>
              <span className="font-semibold text-lg">average rating</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-4 justify-between items-center">
            <p className="text-lg">latest feedbacks:</p>
            <button className="bg-accent-link hover:bg-accent-buttonhover transition-all py-1 px-4 rounded-full text-white">see all feedbacks</button>
          </div>

          <div className="flex flex-col gap-2">

            <div className="px-4 py-2 border border-light-primary dark:border-light-primary rounded-lg w-full">
              <p>
                a user rated 4 stars for your app_name.{" "}
                <span className="text-gray-400 text-sm dark:text-light-primary">
                  3 days ago
                </span>
              </p>
              <p className="text-md italic">&quot;Great app, I love it!&quot;</p>
            </div>

            <div className="px-4 py-2 border border-light-primary dark:border-light-primary rounded-lg w-full">
              <p>
                a user rated 4 stars for your app_name.{" "}
                <span className="text-gray-400 text-sm dark:text-light-primary">
                  3 days ago
                </span>
              </p>
              <p className="text-md italic">&quot;Great app, I love it!&quot;</p>
            </div>
          </div>
        </div>
      </div>

      {deleteModal && (
        <div className="top-0 left-0 fixed flex justify-center items-center bg-gray-500 bg-opacity-50 w-full h-full">
          <div className="bg-light-secondary dark:bg-dark-secondary px-5 py-5 rounded-lg">
            <p className="text-lg dark:text-white">
              are you sure you want to delete this form and all feedbacks?
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white outline-none"
                onClick={() => setDeleteModal(false)}
              >
                No
              </button>
              <button
                className="bg-red-600 hover:bg-red-800 px-6 rounded-full text-white outline-none transition-all"
                onClick={deleteHandler}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectInformation;
