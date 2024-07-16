/** @format */
"use client";
import { Dock, FilePenLine, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const Projects = () => {
  const [projects, setProjects] = useState([1]);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const deleteHandler = () => {
    // delete code
  };
  return (
    <div className="flex flex-col dark:bg-dark-secondary px-10 py-10 w-full h-full dark:text-white">
      <div className="flex flex-col justify-start gap-3 my-4 w-full text-left">
        <p className="text-xl">collection of all your projects 📂</p>
        <p className="text-md">
          discover what people are saying about your projects.
        </p>
      </div>
      <div className="flex justify-center items-center my-4">
        <hr className="border-2 dark:border-gray-400 border-light-primary rounded-full w-1/6" />
      </div>
      <div className="text-accent-link">
        <Link href="/dashboard/create/">+ create a new project.</Link>
      </div>
      {projects.length === 0 ? (
        <div className="shadow-lg my-4 p-4 border border-light-primary dark:border-light-primary rounded-sm text-center">
          <p>you haven't created any projects yet 😕 </p>
          <p>
            <Link href="/dashboard/docs" className="text-accent-link">
              get started here.
            </Link>
          </p>
        </div>
      ) : (
        <div className="md:gap-5 lg:gap-10 md:grid grid-cols-2">
          <div className="shadow-lg my-4 p-4 border border-light-primary dark:border-light-primary rounded-sm">
            <div className="flex justify-between items-center mb-4">
              <Link href="/dashboard/projects/project_id">
                <div className="flex items-center gap-3">
                  <Dock size={20} />
                  <p className="font-semibold text-xl underline">
                    twitter feedback
                  </p>
                </div>
              </Link>
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
  );
};

export default Projects;
