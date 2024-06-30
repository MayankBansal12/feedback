/** @format */
function ImageIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
      />
    </svg>
  );
}
function LinkIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function PaperclipIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

const Post = () => {
  return (
    <div className="flex flex-col dark:bg-dark-secondary px-10 py-10 w-full h-full dark:text-white">
      <div className="flex flex-col justify-start gap-3 w-full text-left">
        <p className="text-xl">what’s on your mind?</p>
        <p className="text-md">
          we’ll share your thoughts across the world 🌎️
        </p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="gap-2 dark:border-white grid my-10 border border-black w-full">
          <textarea
            placeholder="write it down..."
            className="bg-white dark:bg-dark-secondary px-4 py-1 dark:border-l-[#ffffff] dark:text-white text-md outline-none hover:outline focus:outline"
          />
          <div className="flex justify-between items-center bg-light-primary bg-muted dark:bg-dark-primary m-2 px-4 py-2">
            <div className="flex items-center gap-2">
              <button className="inline-flex justify-center items-center hover:bg-muted/50 disabled:opacity-50 rounded-full w-6 h-6 text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none">
                <ImageIcon />
              </button>
              <button className="inline-flex justify-center items-center hover:bg-muted/50 disabled:opacity-50 rounded-full w-6 h-6 text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none">
                <PaperclipIcon className="w-4 h-4" />
              </button>
              <button className="inline-flex justify-center items-center hover:bg-muted/50 disabled:opacity-50 rounded-full w-6 h-6 text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none">
                <LinkIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-accent-link hover:bg-accent-buttonhover p-1 rounded-full w-48 text-white"
        >
          post
        </button>
      </div>
    </div>
  );
};

export default Post;
