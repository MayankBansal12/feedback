/** @format */

"use client";
import Nav from "@/components/nav";
import Link from "next/link";

import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";
import Image from "next/image";

const assets = [
  {
    name: "popup 1",
    src: "https://res.cloudinary.com/dwuyp1nss/image/upload/v1720441576/feedback%20landing%20page/1_xlzjco.png",
  },
  {
    name: "popup 2",
    src: "https://res.cloudinary.com/dwuyp1nss/image/upload/v1720441577/feedback%20landing%20page/2_joitzy.png",
  },
  {
    name: "popup 3",
    src: "https://res.cloudinary.com/dwuyp1nss/image/upload/v1720441577/feedback%20landing%20page/3_ts1ed9.png",
  },
  {
    name: "popup 4",
    src: "https://res.cloudinary.com/dwuyp1nss/image/upload/v1720441577/feedback%20landing%20page/4_iu60tb.png",
  },
  {
    name: "admin dash",
    src: "https://res.cloudinary.com/dwuyp1nss/image/upload/v1720441577/feedback%20landing%20page/5_ibmxcv.png",
  },
];

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Nav />
      <div className="flex flex-col justify-between items-center bg-white dark:bg-dark-secondary min-h-screen font-default">
        <div className="flex flex-col items-center h-screen">
          <div className="space-y-4 px-4 md:px-32 py-10 md:py-20 w-full text-black text-center text-xl md:text-3xl dark:text-white">
            <p>hey homie,</p>
            <p>
              we know how difficult it is for a builder like you
              <br /> to collect and analyze user feedbacks.
            </p>
            <p>dw, we&apos;re here to help you out. 🧚‍♀️ </p>
            <p className="py-3">
              introducing <span className="font-bold">feedback.</span> an easy
              way to collect and manage
              <br /> user feedbacks.
            </p>
          </div>
          <div className="bottom-0 absolute flex flex-col justify-centertext-center items-center space-y-2 text-black dark:text-white animate-bounce">
            <p className="underline">scroll down to know why us?</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="currentColor"
              className="bg-light-secondary dark:bg-dark-secondary p-0 rounded-full size-16"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-cols justify-center items-center bg-dark-primary mt-64 py-2 w-full">
          <div className="border-dark-primary mx-4 lg:mx-48 -mt-52 border rounded-xl w-full">
            <div className="bg-light-primary py-4 p-3 rounded-t-md text-black text-center text-xl md:text-3xl">
              <p>here are the top 5 reasons to chose us ;)</p>
            </div>
            <div className="space-y-4 bg-light-secondary px-4 lg:px-24 py-4 lg:py-20 rounded-b-md text-black text-md md:text-xl">
              <div className="flex">
                <span className="px-4">⭐</span>
                <p>
                  we&apos;ll allow you to easily place in app widgets to collect
                  user feedbacks and ratings.
                </p>
              </div>
              <div className="flex">
                <span className="px-4">⭐</span>
                <p>
                  if you wanna track your site ratings, you&apos;ll love us.
                </p>
              </div>
              <div className="flex">
                <span className="px-4">⭐</span>
                <p>
                  launched a new feature and wanna know user&apos;s feedback,
                  don&apos;t worry just create a new form and place on your
                  website and we&apos;ll take care of rest!
                </p>
              </div>
              <div className="flex">
                <span className="px-4">⭐</span>
                <p>
                  we&apos;ll take care of your users feedbacks and reviews; so
                  you just focus on your upgrading your site or app.
                </p>
              </div>
              <div className="flex">
                <span className="px-4">⭐</span>
                <p>
                  track all your user analytics and reviews on the dashboard.
                  you will exactly know what and where to improve, give a try!
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center gap-2 bg-dark-primary my-20 py-2 w-full text-white">
              <p>we are going live probably next week!</p>
              <h2 className="text-xl">
                be the first one to know and try out our product!
              </h2>
              <button
                className="bg-accent-link hover:bg-accent-buttonhover my-2 px-4 p-1 rounded-full text-white transition-all"
                onClick={() => router.replace("/dashboard")}
              >
                join waitlist
              </button>
            </div>

            <div className="flex flex-col justify-center items-center gap-2 mt-20 mb-10">
              <h2 className="text-xl">that&apos;s what we are building!</h2>
              <Carousel className="w-2/3">
                <CarouselContent>
                  {assets.map((item, i) => (
                    <CarouselItem key={i}>
                      <div className="p-1">
                        <Card>
                          <Image
                            src={item.src}
                            alt={item.name}
                            className="rounded-md"
                          />
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>

            <div className="py-6 text-center">
              <p className="text-white">
                made with &lsaquo;❤️&rsaquo; by -<br />
                <Link href="https://github.com/arghyahub"> @arghya</Link> ,{" "}
                <Link href="https://github.com/saakshiraut28">@saakshi</Link> &{" "}
                <Link href="https://github.com/mayankbansal12">@mayank</Link>
              </p>
            </div>
            <div className="flex gap-6 py-4 text-left">
              <p className="text-white">going live next week!</p>
              <Link
                className="text-accent-link hover:text-accent-buttonhover transition-all"
                href="/dashboard"
              >
                join waitlist
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
