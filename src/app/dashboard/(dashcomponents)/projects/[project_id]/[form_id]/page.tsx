/** @format */
"use client";
import { Separator } from "@/components/ui/separator";
import { Check, Copy, Dock } from "lucide-react";
import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFormStore, useUserStore } from "@/global-store/store";
import { formatDate } from "@/helpers/format";
import { useToast } from "@/components/ui/use-toast";
import useApi from "@/helpers/useApi";

const FormInfo = ({ params }: { params: { form_id: string } }) => {
  const pathName = usePathname();
  const { user } = useUserStore();
  const { form } = useFormStore();
  const callApi = useApi();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [name, setName] = useState("");
  const [heading, setHeading] = useState("");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(params.form_id);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    } catch (error) {
      console.error("error copying text: ", error);
    }
  };

  // edit the form name and desc
  const editForm = async () => {
    if (!name || !heading) {
      toast({
        title: "name/heading can't be empty!",
        description: "give your form a name and a heading and try again!",
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

    setLoading(true);

    try {
      const res = await callApi(
        "/v1/form" + params.form_id,
        "PUT",
        { name, heading },
        user.userId,
        user.clientSecret
      );

      if (res.data.success) {
        toast({
          title: "form created!",
          description: res.data.message.toLowerCase(),
        });
      } else {
        toast({
          title: "oops! couldn't create new form",
          description: res.data.message.toLowerCase(),
        });
      }
    } catch (error: any) {
      console.error("error creating form: ", error);
      toast({
        title: "oops! couldn't create new form",
        description: error?.response?.data?.message || "error, try again!",
      });
    } finally {
      setLoading(false);
    }
  };
  const deleteHandler = () => {
    // delete code
  };

  return (
    <div className="flex flex-col dark:bg-dark-secondary px-10 w-full h-full dark:text-white">
      <div className="flex justify-between items-center gap-4">
        <h1 className="pt-1 pb-3 font-semibold text-xl">feedback form</h1>
      </div>

      <div className="flex flex-col gap-4 shadow-lg my-2 px-6 py-5 border border-light-primary dark:border-light-primary rounded-lg">
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Dock size={24} />
            <p className="font-semibold text-2xl">
              {form?.name ?? "feedback form"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Dialog>
              <DialogTrigger className="text-gray-600 hover:text-red-600 dark:hover:text-red-500 dark:text-gray-300 transition-all">
                delete
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>delete form</DialogTitle>
                  <DialogDescription>
                    are you sure you wanna delete the form? this will delete the
                    form and all the feedbacks!
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    type="submit"
                    className="bg-red-600 hover:bg-red-800 px-6 rounded-full text-white transition-all outline-none"
                    onClick={deleteHandler}
                    disabled
                  >
                    delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger className="text-gray-600 hover:text-black dark:hover:text-white dark:text-gray-300 transition-all">
                edit form
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>edit form</DialogTitle>
                  <DialogDescription>
                    edit form name and form heading here
                  </DialogDescription>
                </DialogHeader>
                <div className="gap-4 grid py-4">
                  <div className="items-center gap-4 grid grid-cols-4">
                    <Label htmlFor="formName" className="text-right">
                      form name
                    </Label>
                    <Input
                      id="formName"
                      placeholder="new form"
                      value={name}
                      className="col-span-3"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="items-center gap-4 grid grid-cols-4">
                    <Label htmlFor="heading" className="text-right">
                      form heading
                    </Label>
                    <Input
                      id="heading"
                      placeholder="form heading"
                      value={heading}
                      className="col-span-3"
                      onChange={(e) => setHeading(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    onClick={editForm}
                    className="bg-accent-link hover:bg-accent-buttonhover px-4 py-1 rounded-full text-white transition-all"
                    disabled={loading}
                  >
                    edit form
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="flex justify-between items-center gap-4 mb-2">
          <p className="text-md">{form?.heading ?? ""}</p>
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-gray-400 text-sm">form id:</p>
              <div className="flex items-center gap-1 h-7">
                <Input
                  id="link"
                  value={form?._id ?? "refresh and try again"}
                  className="bg-light-primary dark:bg-dark-primary opacity-75 h-full text-md"
                  readOnly
                />
                <Button
                  onClick={handleCopy}
                  size="sm"
                  className="bg-light-primary hover:bg-light-secondary dark:hover:bg-dark-secondary dark:bg-dark-primary px-2 h-full transition-all"
                >
                  {isCopied ? (
                    <Check className="w-4 h-4 text-black dark:text-white" />
                  ) : (
                    <Copy className="w-4 h-4 text-black dark:text-white" />
                  )}
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-gray-400 text-sm">created on:</p>
              <p className="mt-1 font-semibold">
                {form ? formatDate(form.createdDate) : "n/a"}
              </p>
            </div>
          </div>
        </div>
        <Separator className="bg-dark-primary dark:bg-light-primary" />

        <div className="flex justify-center gap-10 my-4 w-full">
          <div className="bg-gradient-to-r from-[#86CAFC] to-[#33CA66] py-8 border border-light-primary dark:border-light-primary rounded-lg w-1/3">
            <p className="flex flex-col gap-2 text-center">
              <span className="font-bold text-2xl">31</span>
              <span className="font-semibold text-lg">users responded.</span>
            </p>
          </div>
          <div className="bg-gradient-to-r from-[#F5B6F3] to-[#FF9292] py-8 border border-light-primary dark:border-light-primary rounded-lg w-1/3">
            <p className="flex flex-col gap-2 text-center">
              <span className="font-bold text-2xl">4.2</span>
              <span className="font-semibold text-lg">average rating</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center gap-4">
            <p className="text-lg">latest feedbacks:</p>
            <Link
              href={pathName + "/feedback"}
              className="bg-accent-link hover:bg-accent-buttonhover px-4 py-1 rounded-full text-white transition-all"
            >
              see all feedbacks
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            {/* <div className="px-4 py-2 border border-light-primary dark:border-light-primary rounded-lg w-full">
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
            </div> */}

            <div className="flex justify-center items-center py-10">
              no feedbacks yet!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormInfo;
