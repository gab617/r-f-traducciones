export default function BtnVolver ({text}) {
    return (
      <button
        type="button"
        className="bg-white text-center w-32 sm:w-48 rounded-2xl h-8  sm:h-14 relative font-sans text-black text-xl font-semibold group"
      >
        <div className="bg-purple-400 rounded-xl sm:h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
          <svg
            width="25px"
            height="25px"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#000000"
              d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
            ></path>
            <path
              fill="#000000"
              d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
            ></path>
          </svg>
        </div>
        <p className="ml-6 text-base sm:text-xl">{text} </p>
      </button>
    );
  };
  