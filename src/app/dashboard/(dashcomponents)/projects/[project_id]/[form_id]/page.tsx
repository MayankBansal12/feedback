/** @format */
"use client";
import { Separator } from "@/components/ui/separator";
import { Check, Copy, Dock, FilePenLine, Trash2 } from "lucide-react";
import { useState } from "react";
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
import Link from "next/link";
import { usePathname } from 'next/navigation'

function ProjectInformation({
  params,
}: {
  params: {
    form_id: string;
  };
}) {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [isCopied, setIsCopied] = useState(false)

  const pathName = usePathname()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(params.form_id)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 3000)
    } catch (error) {
      console.error("error copying text: ", error)
    }
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
        <h1 className="pt-1 pb-3 text-xl font-semibold">feedback form</h1>
      </div>

      <div className="flex flex-col gap-4 shadow-lg my-2 p-6 border border-light-primary dark:border-light-primary rounded-lg">
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Dock size={24} />
            <p className="font-semibold text-2xl">twitter feedback</p>
          </div>
          <div className="flex items-center gap-3">
            <Dialog>
              <DialogTrigger className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 transition-all">
                delete
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>delete form</DialogTitle>
                  <DialogDescription>
                    are you sure you wanna delete the form?
                    this will delete the form and all the feedbacks!
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button type="submit" className="bg-red-600 hover:bg-red-800 px-6 rounded-full text-white outline-none transition-all" onClick={deleteHandler}>delete</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-all">
                edit form
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>edit form</DialogTitle>
                  <DialogDescription>
                    edit form name and form heading here
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      form name
                    </Label>
                    <Input
                      id="name"
                      defaultValue={"new form"}
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
                      defaultValue={"form heading"}
                      className="col-span-3"
                      onChange={(e) => setDesc(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={editForm} className="bg-accent-link hover:bg-accent-buttonhover transition-all py-1 px-4 rounded-full text-white">edit form</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="mb-2 flex justify-between gap-4 items-center">
          <p className="text-md">this is form heading</p>
          <div className="flex gap-4 items-center">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-400">form id:</p>
              <div className="flex items-center h-7 gap-1">
                <Input
                  id="link"
                  defaultValue={params.form_id}
                  className="bg-light-primary h-full dark:bg-dark-primary opacity-75 text-md"
                  readOnly
                />
                <Button onClick={handleCopy} size="sm" className="h-full px-2 bg-light-primary hover:bg-light-secondary dark:bg-dark-primary dark:hover:bg-dark-secondary transition-all">
                  {isCopied ? <Check className="h-4 w-4 text-black dark:text-white" /> : <Copy className="h-4 w-4 text-black dark:text-white" />}
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-400">created on:</p>
              <p className="font-semibold mt-1">12-07-24</p>
            </div>
          </div>
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
            <Link href={pathName + "/feedback"} className="bg-accent-link hover:bg-accent-buttonhover transition-all py-1 px-4 rounded-full text-white">see all feedbacks</Link>
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
    </div>
  );
}

export default ProjectInformation;
