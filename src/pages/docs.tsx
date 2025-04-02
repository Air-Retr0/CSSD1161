import React from "react";
import Breadcrumbs from "../components/sub/breadcrumbs";
import DocsSidebar from "../components/sub/docs-sidebar";

const Contents = () => {
  return (
    // contents of docs page
    <main className="w-3/4 p-6 bg-slate-950 text-white">
      <Breadcrumbs path={["Home", "Documentation", "Getting Started"]} />
      <h1 className="text-2xl font-bold mb-4">Getting Started</h1>
      <p className="mb-4">This section covers the basics of using the terminal in respect to commands.</p>
      <div className="flex items-center">
        <p className="flex-1">Here is an example prompt.</p>
        <img src="" alt="example" className="w-32 h-32 ml-4 border rounded" />
      </div>
      <h2 className="text-xl font-semibold mt-6 mb-2">Usage</h2>
      <p className="mb-4">How to use the software efficiently.</p>
      <img
        src="" alt="usage" className="w-full h-40 object-cover border rounded" />
    </main>
  );
};

const DocumentationPage = () => {
  return (
    <div className="flex">
      <DocsSidebar />
      <Contents />
    </div>
  );
};

export default DocumentationPage;
