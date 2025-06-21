import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-400 ">
      <div className="mycontainer  text-white flex justify-between h-14 py-5 px-4 items-center">
        <div className="logo">
          <h1 className="text-xl font-semibold text-black">
            🔑 <span className="tracking-wide">Key</span>
            <span className="font-bold">Keep</span>
          </h1>
        </div>
        <button className="text-white bg-slate-600 my-5 mx-2 rounded-full flex  justify-between items-center ring-white ring-1 hover:bg-slate-900">
          <img
            className="invert  w-10 p-1"
            src="./icons/github.png"
            alt="github logo"
          />
          <span className="font-bold px-2">GitHub</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
