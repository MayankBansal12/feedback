/** @format */
"use client";
import Nav from "@/components/nav";
import SideNav from "@/components/sidenav";
import { List } from "lucide-react";
import React, { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isSideNavOpen, setIsSideNavOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768); // Example breakpoint for mobile
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

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
      </div>
    </div>
  );
}
