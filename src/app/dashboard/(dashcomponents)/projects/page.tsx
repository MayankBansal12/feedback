/** @format */
"use client";
import { Dock, ExternalLink } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useApi from "@/helpers/useApi";
import { useProjectStore, useUserStore } from "@/global-store/store";
import { useToast } from "@/components/ui/use-toast";
import { ProjectType } from "@/types/type";
import { formatDate } from "@/helpers/format";

const Projects = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const { user } = useUserStore();
  const { setProject } = useProjectStore();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const callApi = useApi();
  const { toast } = useToast();

  // for creating a new project
  const createNewProject = async () => {
    if (!name) {
      toast({
        title: "name can't be empty!",
        description: "give your project a name and try again!",
      });
      return;
    }
    if (!user) {
      toast({
        title: "oops! couldn't create new project",
        description: "refresh and try again!",
      });
      return;
    }

    try {
      const res = await callApi(
        "/v1/project",
        "POST",
        { name, desc },
        user.userId,
        user.clientSecret
      );
      console.log("new project creaetd:", res);
      if (res.data.success) {
        toast({
          title: "project created!",
          description: res.data.message.toLowerCase(),
        });
      } else {
        toast({
          title: "oops! couldn't create new project",
          description: res.data.message.toLowerCase(),
        });
      }
    } catch (error: any) {
      console.error("error creating project: ", error);
      toast({
        title: "oops! couldn't create new project",
        description: error?.response?.data?.message || "error, try again!",
      });
    }
  };

  // fetch all projects related to that user
  const fetchProjects = async () => {
    if (!user) {
      return;
    }

    try {
      const res = await callApi(
        "/v1/project",
        "GET",
        {},
        user.userId,
        user.clientSecret
      );
      console.log("user projects:", res);
      if (res.data.success) {
        setProjects(res.data.data);
      }
    } catch (error: any) {
      console.error("error creating project: ", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [user]);

  return (
    <div className="flex flex-col dark:bg-dark-secondary px-10 w-full h-full dark:text-white">
      <div className="flex justify-between items-center gap-4">
        <h1 className="pt-1 pb-3 font-semibold text-xl">projects</h1>
        <div className="flex items-center gap-4">
          <p>
            total: <span className="font-semibold">{projects.length}</span>
          </p>
          <Dialog>
            <DialogTrigger className="bg-accent-link hover:bg-accent-buttonhover px-4 py-1 rounded-full text-white transition-all">
              create new
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>create new project</DialogTitle>
                <DialogDescription>
                  create new project and organize all your forms and feedbacks
                  with that.
                </DialogDescription>
              </DialogHeader>
              <div className="gap-4 grid py-4">
                <div className="items-center gap-4 grid grid-cols-4">
                  <Label htmlFor="name" className="text-right">
                    project name
                  </Label>
                  <Input
                    id="name"
                    placeholder="new project"
                    value={name}
                    className="col-span-3"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="items-center gap-4 grid grid-cols-4">
                  <Label htmlFor="desc" className="text-right">
                    project desc
                  </Label>
                  <Input
                    id="desc"
                    value={desc}
                    placeholder="project description..."
                    className="col-span-3"
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={createNewProject}
                  className="bg-accent-link hover:bg-accent-buttonhover px-4 py-1 rounded-full text-white transition-all"
                >
                  create new project
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col mt-2 px-2 pb-10 overflow-auto">
        {projects && projects.length === 0 ? (
          <div className="shadow-lg my-4 px-4 py-8 border border-light-primary dark:border-light-primary rounded-sm text-center">
            <p>you haven&apos;t created any projects yet :&#40;&#40; </p>
            <p>
              <Link href="/dashboard/get-started" className="text-accent-link">
                get started here.
              </Link>
            </p>
          </div>
        ) : (
          <div className="md:gap-4 lg:gap-5 md:grid grid-cols-2">
            {projects.map((project) => (
              <Link
                href={"/dashboard/projects/" + project?._id}
                key={project?._id}
                onClick={() => setProject(project)}
              >
                <div className="hover:border-white shadow-lg my-4 p-6 border border-light-primary rounded-sm transition-all hover:cursor-pointer">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-3">
                      <Dock size={20} />
                      <p className="font-semibold text-xl">
                        {project?.name?.toLowerCase()}
                      </p>
                    </div>

                    <ExternalLink />
                  </div>
                  <div className="mb-2">
                    <p className="text-gray-700 dark:text-gray-300">
                      {project?.desc?.toLowerCase()}
                    </p>
                  </div>
                  <div>
                    <p className="text-right text-gray-400 text-sm">
                      created: {formatDate(project?.createdDate)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
