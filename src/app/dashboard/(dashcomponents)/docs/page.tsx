import React from "react";
import "./docs.css";

import Data from "./data";

const Docs = () => {
  return (
    <div className="flex flex-col dark:bg-dark-secondary px-10 py-10 w-full h-full dark:text-white leading-relaxed overflow-y-auto">
      <h1>Docs</h1>
      <p>
        Welcome to the Documentation section. You&apos;ll get the code
        references to using the feedback component UI, we are planning to
        provide external API&apos;s in the future
      </p>
      <p>
        We encourage you to use{" "}
        <span className="bg-slate-500 px-1 font-medium">iframe</span> with the
        provided{" "}
        <span className="bg-slate-500 px-1 font-medium">form link</span>.
      </p>

      <h2>Steps:</h2>
      <ol className="ml-4 list-decimal">
        <li>Create a project</li>
        <li>Create a form under the project</li>
        <li>Get the form link</li>
        <li>
          Embed the form link in your website using{" "}
          <span className="bg-slate-500 px-1 font-medium">iframe</span>
        </li>
      </ol>

      <h2 className="mt-3">Examples:</h2>
      {Data.map((item, index) => (
        <div key={index}>
          <h1 className="mt-3 capitalize">{`${item.name} Forms`}</h1>
          <iframe
            src={item.link}
            style={{
              border: 0,
              width: item.width,
              height: item.height,
              // height: "auto",
              display: "block",
              lineHeight: 0,
            }}
            scrolling="no"
            seamless
            className="rounded-md"
          ></iframe>
        </div>
      ))}
    </div>
  );
};

export default Docs;
