/** @format */
"use client";
import { Dock, FilePenLine, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const Analytics = () => {
  const [projects, setProjects] = useState([]);
  return (
    <div className="flex flex-col dark:bg-dark-secondary px-10 py-10 w-full h-full dark:text-white">
      <div className="flex flex-col justify-start gap-3 my-4 w-full text-left">
        <p className="text-xl">here are your daily updates ✅</p>
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
          <p>no feedback received yet? 🤔</p>
          <p>no worries! you can chill for a bit.</p>
          <p>
            or if you haven't created any feedback forms yet?{" "}
            <Link href="/dashboard/docs" className="text-accent-link">
              get started here.
            </Link>
          </p>
        </div>
      ) : (
        <div className="shadow-lg my-4 p-4 border border-light-primary dark:border-light-primary rounded-sm">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <Dock size={20} />
              <p className="font-semibold text-xl underline">
                application name
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Trash2 size={20} />
              <FilePenLine size={20} />
            </div>
          </div>
          <div className="mb-2">
            <p className="font-medium">total feedback received: 100</p>
          </div>
          <div className="mb-2">
            <p className="text-gray-700 dark:text-gray-300">
              this is the description of the application.
            </p>
          </div>
          <div>
            <p className="font-md text-sm">created_date: 12/7/2024</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
