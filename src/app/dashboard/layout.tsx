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
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  const path = usePathname()
  const [paths, setPaths] = useState<string[]>([])

  useEffect(() => {
    setPaths(path.split("/").slice(1))
  }, [path])


  return (
    <div className="w-screen h-screen font-default">
      <div className="top-0 absolute mx-4 my-4">
        <button
          onClick={() => setIsSideNavOpen(!isSideNavOpen)}
          className={`${isMobile ? "flex" : "hidden"}`}
        >
          <List />
        </button>
      </div>
      <Nav />
      <div
        className={`flex h-[calc(100vh-4rem)] ${isMobile ? "flex-col" : ""}`}
      >
        {isSideNavOpen && (
          <div
            className={`w-full  lg:w-1/6 ${
              !isMobile || isSideNavOpen ? "" : "hidden"
            }`}
          >
            <SideNav />
          </div>
        )}
        <div
          className={`w-full h-full ${
            isSideNavOpen ? "md:w-5/6" : "md:w-full"
          }`}
        >
          {children}
        </div>
        <div className="w-5/6 overflow-hidden">
          {paths.length > 1 && <Breadcrumb className="bg-white dark:bg-dark-secondary pt-6 px-10">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={"/" + paths[0]}>{paths[0]}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{paths[1]}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>}
          {children}
        </div>
      </div>
    </div>
  );
}
