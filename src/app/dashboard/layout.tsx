/** @format */

import Nav from "@/components/nav";
import SideNav from "@/components/sidenav";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="w-screen h-screen font-default">
        <Nav />
        <div className="flex">
          <div className="w-1/6">
            <SideNav />
          </div>
          <div className="w-5/6">{children}</div>
        </div>
      </body>
    </html>
  );
}
