/** @format */
"use client"

import Nav from "@/components/nav";
import SideNav from "@/components/sidenav";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button";
import { List } from "lucide-react";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState, Fragment } from "react";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768); // Example breakpoint for mobile
  };

  const path = usePathname()
  const [paths, setPaths] = useState<string[]>([])

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token || token === "") {
      redirect("/auth?login=true")
    }
    if (path != null)
      setPaths(path.split("/").slice(1))
  }, [path])


  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    if (!isMobile) {
      setIsSideNavOpen(true);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  return (
    <div className="w-screen h-screen font-default">
      <div className="top-0 absolute mx-4 my-4">
        <Button
          onClick={() => setIsSideNavOpen(!isSideNavOpen)}
          className={`${isMobile ? "flex" : "hidden"}`}
        >
          <List />
        </Button>
      </div>
      <Nav />
      <div
        className={`flex h-[calc(100vh-4rem)] ${isMobile ? "flex-col" : ""}`}
      >
        {isSideNavOpen && (
          <div
            className={`w-full  lg:w-1/6 ${!isMobile || isSideNavOpen ? "" : "hidden"
              }`}
          >
            <SideNav />
          </div>
        )}

        <div className={`w-full h-full ${isSideNavOpen ? "md:w-5/6" : "md:w-full"} overflow-hidden`}>
          {paths.length > 1 &&
            <Breadcrumb className="bg-white dark:bg-dark-secondary pt-6 px-10">
              <BreadcrumbList>
                {paths.map((path, index) => {
                  const isLast = index === paths.length - 1;
                  const href = "/" + paths.slice(0, index + 1).join("/");
                  const text = index === 2 ? "project forms" : index === 3 ? "feedback form" : path

                  return (
                    <Fragment key={index}>
                      <BreadcrumbItem>
                        {!isLast ? (
                          <BreadcrumbLink href={href}>{text}</BreadcrumbLink>
                        ) : (
                          <BreadcrumbPage>{text}</BreadcrumbPage>
                        )}
                      </BreadcrumbItem>
                      {!isLast && <BreadcrumbSeparator />}
                    </Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          }
          {children}
        </div>
      </div>
    </div>
  );
}
