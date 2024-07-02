/** @format */

import Nav from "@/components/nav";
import SideNav from "@/components/sidenav";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-screen h-screen font-default">
      <Nav />
      <div className="flex h-[calc(100vh-4rem)]">
        <div className="w-1/6">
          <SideNav />
        </div>
        <div className="w-5/6">{children}</div>
      </div>
    </div>
  );
}
