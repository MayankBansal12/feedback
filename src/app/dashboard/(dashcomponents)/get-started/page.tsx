import React from "react";
import Data from "./data";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Copy } from "lucide-react";
import { Label } from "@/components/ui/label";

const GetStarted = () => {
  return (
    <div className="flex flex-col w-full h-full dark:bg-dark-secondary dark:text-white px-10 py-1 overflow-scroll">
      <h1 className="pt-1 pb-3 text-xl font-semibold">get started</h1>

      <div className="flex flex-col gap-3">
        <p className="text-lg flex gap-1">
          <span className="opacity-70">
            simple guide for getting started. for apis documentation, refer to {"  "}
          </span>
          <Link href="/docs" className="dark:text-white opacity-85 hover:opacity-100 transition-all flex">docs <ArrowUpRight /></Link>
        </p>
        <h2 className="pt-4 pb-2 font-bold text-lg">simple steps for getting started:</h2>
        <div>
          <p className="font-bold text-lg">1. get started by creating a project and a form to start collecting feedbacks</p>
          <p className="px-4 py-2">
            head over to <Link href={"/dashboard/projects"} className="text-accent-link hover:text-accent-buttonhover transition-all">dashboard/project</Link> to create a new project. create a new form inside a project
          </p>
        </div>
        <div>
          <p className="font-bold text-lg">2. after creating a new form, you will find a form id which will be used to track and store feedbacks</p>
          <div className="flex flex-col gap-2 px-4 py-2">
            <p>on feedback form, the form id will look like this: </p>
            <p className="flex items-center h-6 gap-1">
              <Label className="opacity-60">form id:</Label>
              <Input
                id="link"
                defaultValue={"heb33-364hf-23563f"}
                className="bg-light-primary dark:bg-dark-primary outline-none w-1/2 text-md"
                disabled
                readOnly
              />
              <Button size="sm" className="bg-light-primary hover:bg-light-secondary dark:bg-dark-primary dark:hover:bg-dark-secondary transition-all">
                <Copy className="h-4 w-4 text-black dark:text-white" />
              </Button>
            </p>
          </div>
        </div>
        <div>
          <p className="font-bold text-lg">3. get client id and client secrets for using apis</p>
          <p className="px-4 py-2">
            you can find your client id and client secret from <Link href={"/dashboard/projects"} className="text-accent-link hover:text-accent-buttonhover transition-all">settings -&gt; secrets</Link>. these secrets can be used for feedback external apis. don&apos;t push your secrets in public repositories.
          </p>
        </div>
        <div>
          <p className="font-bold text-lg">4. use feedback docs and store your user&apos;s feedback with ease</p>
          <p className="px-4 py-2">
            check the <Link href="/docs" className="text-accent-link hover:text-accent-buttonhover transition-all">feedback docs</Link> for using feedback apis. you will need client id and client secret for authentication, along with form id for collecting feedback inside one form and later managing all inside <Link href="/dashboard" className="text-accent-link hover:text-accent-buttonhover transition-all">dashboard</Link>
          </p>
        </div>
        <div>
          <p className="opacity-70">
            note: currently the feedback only provides external apis, we are planning to work on ui and package in future.
            <br />
            for any feature request, feel free to reach out to us...
          </p>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
