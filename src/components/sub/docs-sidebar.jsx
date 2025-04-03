const DocsSidebar = () => {
  return (
    <aside className="w-1/4 min-h-screen p-4 bg-black text-white">
      <h2 className="text-lg font-semibold border-b pb-2">Documentation</h2>
      <nav className="mt-4 space-y-2">
        <p className="font-semibold">Section</p>
        <ul className="space-y-1 pl-2">
          <li className="flex items-center">
            <span className="mr-2">›</span> Introduction
          </li>
          <li className="flex items-center">
            <span className="mr-2">›</span> Usage
          </li>
          <li className="flex items-center">
            <span className="mr-2">›</span> API
          </li>
          <li className="flex items-center">
            <span className="mr-2">›</span> Examples
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default DocsSidebar