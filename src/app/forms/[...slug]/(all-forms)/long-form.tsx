"use client";
import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { Send, Star } from "lucide-react";

type Props = {
  formLink: string;
  formHeading: string;
};

const LongForm = ({ formLink, formHeading }: Props) => {
  const [Stars, setStars] = useState(-1);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 border-slate-300 px-3 py-2 border rounded-md max-w-[450px]"
    >
      <h1 className="mr-5 text-center">
        {formHeading || "On a scale of 1 to 10 how much would you rate us?"}
      </h1>
      <div className="flex flex-row justify-center items-center gap-2">
        {Array.from({ length: 10 }, (_, i) => (
          <Star
            key={i}
            className="cursor-pointer size-10"
            fill={i <= Stars ? "gold" : "#1111"}
            strokeWidth={0.5}
            onClick={() => setStars(i)}
          ></Star>
        ))}
      </div>
      <button className="flex flex-row justify-center gap-2 bg-blue-500 py-1 rounded-md w-full text-white">
        <p>Send</p>
        <Send />
      </button>
    </form>
  );
};

export default LongForm;
