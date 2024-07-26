/** @format */
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

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

  return (
    <React.Fragment>
      <div className="flex flex-col justify-center bg-light-primary dark:bg-dark-primary w-full h-[calc(100vh-4rem)] text-black dark:text-white">
        <div className="flex justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-10 md:gap-20">
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
            <div className="px-3 py-3 pb-8 border border-black dark:border-light-primary">
              we care about <br />
              your privacy so
              <br />
              don&apos;t worry.
              <br />
              everything is
              <br />
              safe with us. ^-^
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SideNav;
