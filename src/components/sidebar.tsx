import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCode, FaBook, FaTerminal } from "react-icons/fa";
import { SiMaterialformkdocs } from "react-icons/si";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-64 h-screen bg-black text-white flex flex-col items-center p-4 relative">
      <h1 className="text-2xl font-bold mb-8 absolute top-4">Edubash</h1>
      <div className="mt-20 flex flex-col gap-4 w-full">
        <button
          className="w-full py-2 rounded bg-transparent flex items-center justify-start gap-2 px-4 hover:bg-white hover:text-black"
          onClick={() => navigate("/")}
        >
          <FaTerminal size={24} />
          Terminal
        </button>
        <button
          className="w-full py-2 rounded bg-transparent flex items-center justify-start gap-2 px-4 hover:bg-white hover:text-black"

        >
          <FaCode size={24} />
          Scripting
        </button>
        <button
          className="w-full py-2 rounded bg-transparent flex items-center justify-start gap-2 px-4 hover:bg-white hover:text-black"
          onClick={() => navigate("/docs")}
        >
          <SiMaterialformkdocs size={24} />
          Docs
        </button>
        <button
          className="w-full py-2 rounded bg-transparent flex items-center justify-start gap-2 px-4 hover:bg-white hover:text-black"
          onClick={() => navigate("/about")}
        >
          <FaBook size={24} />
          About
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
