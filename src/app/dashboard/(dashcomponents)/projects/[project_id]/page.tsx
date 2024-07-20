/** @format */
"use client";
import { Separator } from "@/components/ui/separator";
import { Dock, FilePenLine, Trash2, ExternalLink } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const Projects = () => {
  const [projects, setProjects] = useState([1, 1, 1]);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")

  const fetchProjects = () => {
    // fetch all projects related to that user
  };

  const createNewForm = () => {
    console.log("name: ", name, " desc: ", desc)
  }

  const editForm = () => {
    console.log("edit:  name: ", name, " desc: ", desc)
  }

  const deleteHandler = () => {
    // delete code
  };

  return (
    <div className="flex flex-col w-full h-full dark:bg-dark-secondary dark:text-white px-10">
      <div className="flex gap-4 justify-between items-center">
        <h1 className="pt-1 pb-3 text-xl font-semibold">project forms</h1>
        <div className="flex gap-4 items-center">
          <Dialog>
            <DialogTrigger className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-all">
              edit project
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>edit project</DialogTitle>
                <DialogDescription>
                  edit project name and project description here
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    project name
                  </Label>
                  <Input
                    id="name"
                    defaultValue={"new project"}
                    className="col-span-3"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="desc" className="text-right">
                    project desc
                  </Label>
                  <Input
                    id="desc"
                    defaultValue={"project desc"}
                    className="col-span-3"
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={editForm} className="bg-accent-link hover:bg-accent-buttonhover transition-all py-1 px-4 rounded-full text-white">edit project</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger className="bg-accent-link hover:bg-accent-buttonhover transition-all py-1 px-4 rounded-full text-white">
              add new form
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>create new form</DialogTitle>
                <DialogDescription>
                  create new form and keep a track of all feedback with that.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    form name
                  </Label>
                  <Input
                    id="name"
                    placeholder="new form"
                    className="col-span-3"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="desc" className="text-right">
                    form heading
                  </Label>
                  <Input
                    id="desc"
                    placeholder="form heading..."
                    className="col-span-3"
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={createNewForm} className="bg-accent-link hover:bg-accent-buttonhover transition-all py-1 px-4 rounded-full text-white">create new form</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="shadow-lg my-4 px-4 py-8 border border-light-primary dark:border-light-primary rounded-sm text-center">
          <p>no feedback received yet?</p>
          <p>no worries! we'll help you out!</p>
          <p>
            or if you haven&apos;t created any feedback forms yet?{" "}
            <Link href="/dashboard/docs" className="text-accent-link">
              get started here.
            </Link>
          </p>
        </div>
      ) : (
        <div className="md:gap-4 lg:gap-5 md:grid grid-cols-2">
          {projects.map((_, i) => (
            <Link href="/dashboard/projects/project_id/form_id" key={i}>
              <div className="shadow-lg my-4 p-6 border border-light-primary rounded-sm hover:cursor-pointer hover:border-white transition-all">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-3">
                    <Dock size={20} />
                    <p className="font-semibold text-xl">
                      feedback form 1
                    </p>
                  </div>

                  <ExternalLink />
                </div>
                <div className="my-2">
                  <p className="text-gray-700 dark:text-gray-300">
                    this is the form heading.
                  </p>
                </div>
                <div className="mb-2 flex gap-2">
                  <p className="font-medium">total feedback received: <span className="font-semibold">100</span></p>
                  <Separator orientation="vertical" className="h-5 bg-black dark:bg-white" />
                  <p>overall rating: <span className="font-semibold">4.3</span></p>
                </div>

                <div>
                  <p className="text-right text-sm text-gray-400">
                    created: 12-07-24
                  </p>
                </div>
              </div>
            </Link>
          ))}
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
