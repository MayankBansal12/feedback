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
      <Nav />
      <div className="flex h-[calc(100vh-4rem)]">
        <div className="w-1/6">
          <SideNav />
        </div>
        <div className="w-5/6 overflow-hidden">
          {paths.length > 1 && <Breadcrumb className="bg-white dark:bg-dark-secondary pb-2 pt-4 px-10">
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
