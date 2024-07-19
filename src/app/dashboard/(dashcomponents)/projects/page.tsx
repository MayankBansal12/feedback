/** @format */
"use client";
import { Dock, FilePenLine, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const deleteHandler = () => {
    // delete code
  };

  return (
    <div className="flex flex-col w-full h-full dark:bg-dark-secondary dark:text-white px-10">
      <div className="flex gap-4 justify-between items-center">
        <h1 className="pt-1 pb-3 text-xl font-semibold">projects</h1>
        <div className="flex gap-4 items-center">
          <p>total: <span className="font-semibold">{5}</span></p>
          <button
            className="bg-accent-link hover:bg-accent-buttonhover transition-all py-1 px-4 rounded-full text-white"
          >
            create new
          </button>
        </div>
      </div>

      <div className="flex flex-col overflow-auto mt-2 pb-10 px-2">
        {projects.length === 0 ? (
          <div className="shadow-lg my-4 p-4 border border-light-primary dark:border-light-primary rounded-sm text-center">
            <p>you haven&apos;t created any projects yet 😕 </p>
            <p>
              <Link href="/dashboard/docs" className="text-accent-link">
                get started here.
              </Link>
            </p>
          </div>
        ) : (
          <div className="md:gap-4 lg:gap-5 md:grid grid-cols-2">
            <Link href="/dashboard/projects/project_id">
              <div className="shadow-lg my-4 p-4 border border-light-primary rounded-sm hover:cursor-pointer hover:border-white transition-all">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <Dock size={20} />
                    <p className="font-semibold text-xl underline">
                      twitter feedback
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setDeleteModal(true)}>
                      <Trash2 size={20} />
                    </button>
                    <FilePenLine size={20} />
                  </div>
                </div>
                <div className="mb-2">
                  <p className="text-gray-700 dark:text-gray-300">
                    this is the description of the application.
                  </p>
                </div>
                <div>
                  <p className="text-right font-md text-sm">
                    created_date: 12/7/2024
                  </p>
                </div>
              </div>
            </Link>
          </div>
        )}

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
    </div>
  );
};

export default Projects;
