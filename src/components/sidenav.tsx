/** @format */
"use client";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const SideNav = () => {
  const navLinks = [
    { name: "dash", link: "/dashboard" },
    { name: "projects", link: "/dashboard/projects" },
    { name: "analytics", link: "/dashboard/analytics" },
    //  { name: "create form", link: "/dashboard/create" },
    // { name: "post", link: "/dashboard/post_content" },
    { name: "logs", link: "/dashboard/logs" },
    { name: "get started", link: "/dashboard/get-started" },
    { name: "settings", link: "/dashboard/settings" },
  ];
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    console.log("logout ")
    localStorage.removeItem("token")
    router.push("/auth?login=true")
  }

  return (
    <div className="flex flex-col justify-center bg-light-primary dark:bg-dark-primary w-full h-[calc(100vh-4rem)] text-black dark:text-white">
      <div className="flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-10">
          <div className="flex flex-col gap-2 w-full text-center md:text-left">
            {navLinks.map((link, index) => {
              const isActive = pathname?.endsWith(link.link);
              return (
                <Link
                  key={index}
                  href={link.link}
                  className={isActive ? `underline underline-offset-2	` : ``}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
          <hr className="border-2 border-gray-400 rounded-full w-1/2" />
          <div className="px-3 py-3 border border-black dark:border-light-primary">
            we care about <br />
            your privacy so
            <br />
            don&apos;t worry.
            <br />
            everything is safe.
            <br />
            if you face issues
            <br />
            you can contact at
            <br />
            <Link href="mailto:mayankbansal125@gmail.com" className="text-accent-link hover:text-accent-buttonhover transition-all">mayankbansal125 <br /> @gmail.com</Link>
          </div>
          <AlertDialog>
            <div className="w-full text-center md:text-left">
              <AlertDialogTrigger className="flex gap-2 justify-center bg-accent-link hover:bg-accent-buttonhover py-2 px-4 rounded-full w-full text-white transition-all border-none outline-none">
                log out <LogOut />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>you wanna log out?</AlertDialogTitle>
                  <AlertDialogDescription>
                    this will log you out of this account
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="rounded-full">nope</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLogout} className="bg-accent-link hover:bg-accent-buttonhover py-2 px-4 rounded-full text-white transition-all">logout!</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </div>
          </AlertDialog>
        </div>
      </div>
    </div >
  );
};

export default SideNav;
