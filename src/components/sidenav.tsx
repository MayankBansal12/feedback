/** @format */
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav() {
  const navLinks = [
    { name: "dash", link: "/dashboard/analytics" },
    { name: "connect app", link: "/dashboard/connect" },
    { name: "post", link: "/dashboard/post_content" },
    { name: "notifications", link: "/dashboard/notifications" },
    { name: "subscription", link: "/dashboard/subscription" },
    { name: "profile", link: "/dashboard/profile" },
  ];
  const pathname = usePathname();
  return (
    <div className="flex flex-col bg-light-primary dark:bg-dark-primary w-full h-[calc(100vh-4rem)] justify-center text-black dark:text-white">
      <div className="flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-20">
          <div className="flex flex-col gap-2 w-full">
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
            we care about <br />
            your privacy so
            <br />
            don&apos;t worry.
            <br />
            everything is
            <br />
            safe. ^-^
          </div>
        </div>
      </div>
    </div>
  );
}
