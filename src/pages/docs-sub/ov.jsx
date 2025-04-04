import Breadcrumbs from "../../components/sub/breadcrumbs";
import DocsSidebar from "../../components/sub/docs-sidebar";

const Overview = () => {
  return (
    <div className="flex">
      <DocsSidebar />
      <main className="w-3/4 p-6 bg-black/95 text-white">
        <Breadcrumbs path={["Home", "Documentation", "Introduction", "Overview"]} />
        <h1 className="text-2xl font-bold mb-4">Overview</h1>

        <p className="mb-4">
          This overview page provides a high-level introduction to how the web terminal is integrated into
          your application. You’ll learn about its features, limitations, and how it fits into the broader
          architecture of your project.
        </p>

        <h2 className="text-xl font-semibold mb-2">Key Features</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>Interactive command-line interface within your browser.</li>
          <li>Sandboxed environment for safely executing commands.</li>
          <li>Customizable command set that can be tailored to your specific needs.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">System Requirements</h2>
        <p className="mb-4">
          The web terminal runs on most modern browsers. It does not require additional plugins or installations,
          though a JavaScript-enabled environment is essential.
        </p>

        <p>
          By combining a familiar CLI feel with browser-based controls, the web terminal makes it easy for users
          to explore backend endpoints, test scripts, and learn system commands without leaving the webpage.
        </p>
      </main>
    </div>
  );
};

export default Overview;
