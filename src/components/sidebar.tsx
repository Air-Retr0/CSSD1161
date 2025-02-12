import React from 'react';
import { FaCode } from 'react-icons/fa';
import { SiMaterialformkdocs } from 'react-icons/si';



const Sidebar = () => {
  return (
    <div className="w-48 h-screen bg-gray-900 text-white flex flex-col items-center p-4 relative">
      <h1 className="text-2xl font-bold mb-8 absolute top-4">Edubash</h1>
      <div className="mt-20 flex flex-col gap-4 w-full">
        <button className='w-full py-2 rounded bg-transparent border border-b-white text-white hover:bg-black hover:text-white"'>Button</button>
        <button className='w-full py-2 rounded bg-transparent border border-b-white text-white hover:bg-black hover:text-white"'><FaCode />Scripting</button>
        <button className="w-full py-2 rounded bg-transparent border border-b-white text-white hover:bg-black hover:text-white"><SiMaterialformkdocs />Docs</button>
        <button className='w-full py-2 rounded bg-transparent border border-b-white text-white hover:bg-black hover:text-white"'>About</button>
      </div>
    </div>
  );
};

export default Sidebar;
