/** @format */

const Connect = () => {
  return (
    <div className="flex flex-col dark:bg-dark-secondary px-10 py-10 w-full h-full dark:text-white">
      <div className="flex flex-col justify-start gap-3 w-full text-left">
        <p className="text-xl">connect various apps.</p>
        <p className="text-md">we do not store your passwords. trust us 🥹</p>
      </div>
      <div className="flex flex-col justify-center items-center gap-5 py-10 w-full">
        <input
          type="email"
          placeholder="Select App"
          className="bg-light-primary dark:bg-accent-darkinput px-4 py-1 border-l-2 border-l-black dark:border-l-[#ffffff] w-96 text-md dark:text-white outline-none hover:outline focus:outline"
        />
        <input
          type="text"
          placeholder="Username"
          className="bg-light-primary dark:bg-accent-darkinput px-4 py-1 border-l-2 border-l-black dark:border-l-[#ffffff] w-96 text-md dark:text-white outline-none hover:outline focus:outline"
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-light-primary dark:bg-accent-darkinput px-4 py-1 border-l-2 border-l-black dark:border-l-[#ffffff] w-96 text-md dark:text-white outline-none hover:outline focus:outline"
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-accent-link hover:bg-accent-buttonhover p-1 rounded-full w-48 text-white"
          >
            Connect
          </button>
        </div>
      </div>
    </div>
  );
};

export default Connect;
