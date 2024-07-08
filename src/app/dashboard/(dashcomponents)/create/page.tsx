/** @format */

const Connect = () => {
  return (
    <div className="flex flex-col dark:bg-dark-secondary px-10 py-10 w-full h-full dark:text-white">
      <div className="flex flex-col justify-start gap-3 w-full text-left">
        <p className="text-xl">create form for various apps.</p>
        <p className="text-md">we do not store any info. trust us 🥹</p>
      </div>
      <div className="flex flex-col justify-center items-center gap-5 py-10 w-full">
        <input
          type="text"
          placeholder="app name"
          className="bg-light-primary dark:bg-accent-darkinput px-4 py-1 border-l-2 border-l-black dark:border-l-[#ffffff] w-96 text-md dark:text-white outline-none hover:outline focus:outline"
        />
        <input
          type="text"
          placeholder="form name"
          className="bg-light-primary dark:bg-accent-darkinput px-4 py-1 border-l-2 border-l-black dark:border-l-[#ffffff] w-96 text-md dark:text-white outline-none hover:outline focus:outline"
        />
        <input
          type="text"
          placeholder="form data"
          className="bg-light-primary dark:bg-accent-darkinput px-4 py-1 border-l-2 border-l-black dark:border-l-[#ffffff] w-96 text-md dark:text-white outline-none hover:outline focus:outline"
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-accent-link hover:bg-accent-buttonhover p-1 rounded-full w-48 text-white"
          >
            create
          </button>
        </div>
      </div>
    </div>
  );
};

export default Connect;
