/** @format */

"use client";

import { useToast } from "@/components/ui/use-toast";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Dash() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("email: ", email);

    if (!email) {
      toast({
        title: "oops! email is required",
        description: "please enter correct email!",
      });
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch("/api/email-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast({
          title: "thanks! you are added to waitlist!",
          description:
            "keep an eye up on your email while we work to get it done quickly",
        });
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);

        toast({
          variant: "destructive",
          title: "caught up with an error",
          description: errorData.message.toLowerCase(),
        });
      }
    } catch (error) {
      console.log("error: ", error);
      toast({
        variant: "destructive",
        title: "caught up with an error",
        description: "Error adding you to waitlist, try again!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 dark:bg-dark-secondary px-10 py-10 w-full h-full dark:text-white">
      <h2 className="text-center text-lg">
        <span className="font-bold">feedback.</span> an easy way for collecting
        and managing user feedback and reviews.
        <br />
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-4 text-center"
      >
        <h2 className="text-lg">Stay up-to-date with our newsletter 📩</h2>
        <p>
          Get the latest updates, and exclusive content delivered straight
          <br />
          to your inbox. Don&apos;t miss out on the latest features.
        </p>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          className="bg-light-primary dark:bg-accent-darkinput px-4 py-1 border border-l-2 border-l-black dark:border-l-[#ffffff] w-full md:w-2/3 text-md dark:text-white outline-none hover:outline focus:outline"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-accent-link hover:bg-accent-buttonhover my-2 px-4 p-1 rounded-full w-1/3 w-fit text-white transition-all"
        >
          subscribe now!
        </button>
      </form>
    </div>
  );
}
