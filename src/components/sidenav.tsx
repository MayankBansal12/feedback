/** @format */
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav() {
  const navLinks = [
    { name: "Dash", link: "/dashboard/analytics" },
    { name: "Connect App", link: "/dashboard/connect" },
    { name: "Post", link: "/dashboard/post_content" },
    { name: "Notifications", link: "/dashboard/notifications" },
    { name: "Subscription", link: "/dashboard/subscription" },
    { name: "Profile", link: "/dashboard/profile" },
  ];
  const pathname = usePathname();
  return (
    <div className="flex flex-col bg-light-primary dark:bg-dark-primary w-full h-[100vh] text-black dark:text-white">
      <div className="flex justify-center items-center py-20">
        <div className="flex flex-col justify-center items-center gap-20">
          <div className="flex flex-col gap-1 w-full">
            {navLinks.map((link, index) => {
              const isActive = pathname.startsWith(link.link);
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
            We care about <br />
            your security so
            <br />
            don&apos;t worry.
            <br />
            Everything is
            <br />
            safe 😌
          </div>
        </div>
      </div>
    </div>
  );
}
