"use client";
import Nav from "@/components/nav";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex flex-col justify-between items-center bg-white dark:bg-dark-secondary min-h-screen font-default">
        <div className="flex flex-col items-center h-screen">
          <div className="space-y-4 px-4 md:px-32 py-10 md:py-20 w-full text-black text-center text-xl md:text-3xl dark:text-white">
            <p>hi buddy,</p>
            <p>
              we know how difficult it is for a personality like you
              <br /> to handle all your fans on various apps.
            </p>
            <p>dw, we&apos;re here to help you out. 🧚‍♀️ </p>
            <p className="py-3">
              introducing <span className="font-bold">social.</span> a way to
              manage your digital
              <br /> world.
            </p>
          </div>
          <div className="bottom-0 absolute flex flex-col justify-centertext-center items-center space-y-2 text-black dark:text-white animate-bounce">
            <p className="underline">Scroll down to know why us?</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="currentColor"
              className="bg-light-secondary dark:bg-dark-secondary p-0 rounded-full size-16"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-cols justify-center items-center bg-dark-primary mt-64 py-2 w-full">
          <div className="border-dark-primary mx-4 lg:mx-48 -mt-52 border rounded-xl w-full overflow-hidden">
            <div className="bg-light-primary py-4 p-3 text-center text-xl md:text-3xl">
              <p>Here are the top 5 reasons to chose us ;)</p>
            </div>
            <div className="space-y-4 bg-light-secondary px-4 lg:px-24 py-4 lg:py-20 text-md md:text-xl">
              <div className="flex">
                <span className="px-4">⭐</span>
                <p>
                  We&apos;ll safeguard you from distractions, so next time you
                  post, you won&apos;t be scrolling for hours.
                </p>
              </div>
              <div className="flex">
                <span className="px-4">⭐</span>
                <p>If you wanna be more productive, you&apos;ll love us.</p>
              </div>
              <div className="flex">
                <span className="px-4">⭐</span>
                <p>
                  And if you&apos;re worried we won&apos;t keep you up to date
                  with all imp notifications, then you&apos;re wrong my brother
                  ; we&apos;ll notify you.
                </p>
              </div>
              <div className="flex">
                <span className="px-4">⭐</span>
                <p>
                  We&apos;ll take care of your audience; you just focus on your
                  content.
                </p>
              </div>
              <div className="flex">
                <span className="px-4">⭐</span>
                <p>
                  Tired of replying to every &apos;congrats&apos; comment?
                  Don&apos;t worry, we&apos;ll handle that too, and trust me,
                  they won&apos;t even know.
                </p>
              </div>
            </div>
            <div className="py-6 text-center">
              <p className="text-white">
                Made with &lsaquo;❤️&rsaquo; by -<br /> @arghya, @mayank, &
                @saakshi
              </p>
            </div>
            <div className="flex gap-6 py-4 text-left">
              <p className="text-white">Privacy Policy</p>
              <p className="text-white">Terms and Conds.</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
