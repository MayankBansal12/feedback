"use client";
import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { Send, Star } from "lucide-react";

type Props = {
  formLink: string;
  formHeading: string;
};

const BigForm = ({ formLink, formHeading }: Props) => {
  const [Stars, setStars] = useState(-1);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 border-slate-300 px-3 py-2 border rounded-md max-w-80"
    >
      <h1 className="text-center">{formHeading || "How would you rate us"}</h1>
      <div className="flex flex-row justify-center items-center gap-2">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className="cursor-pointer size-10"
            fill={i <= Stars ? "gold" : "#1111"}
            strokeWidth={0.5}
            onClick={() => setStars(i)}
          ></Star>
        ))}
        {/* <Send className="text-blue-500" /> */}
      </div>
      <textarea
        name="review"
        placeholder="How was your experience?"
        className="border-slate-400 mt-1 px-2 py-1 border rounded-md focus:outline-none min-h-24"
      />
      <button className="flex flex-row justify-center gap-2 bg-blue-500 py-1 rounded-md w-full text-white">
        <p>Send</p>
        <Send />
      </button>
    </form>
  );
};

export default BigForm;
