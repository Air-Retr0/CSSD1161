import Breadcrumbs from "../../components/sub/breadcrumbs";
import DocsSidebar from "../../components/sub/docs-sidebar";

const BasicUsage = () => {
  return (
    <div className="flex">
      <DocsSidebar />
      <main className="w-3/4 p-6 bg-black/95 text-white">
        <Breadcrumbs path={["Home", "Documentation", "Usage", "Basic Usage"]} />
        <h1 className="text-2xl font-bold mb-4">Basic Usage</h1>

        <p className="mb-4">
          Here you’ll learn the fundamental commands and operations for the web terminal. Whether you're
          familiar with standard CLI or just getting started, these basics will set you on the right path.
        </p>

        <h2 className="text-xl font-semibold mb-2">Starting the Terminal</h2>
        <ol className="list-decimal ml-6 mb-4">
          <li>Open the webpage containing the web terminal component.</li>
          <li>Click inside the terminal area to focus it.</li>
          <li>Type any command you want to execute (e.g., <code>help</code>) and press <code>Enter</code>.</li>
        </ol>

        <h2 className="text-xl font-semibold mb-2">Essential Commands</h2>
        <ul className="list-disc ml-6 mb-4">
          <li><code>help</code> - Displays a list of all available commands.</li>
          <li><code>clear</code> - Clears the current terminal screen.</li>
          <li><code>ls</code> - Shows files and directories in the current directory.</li>
          <li><code>cd [directory]</code> - Changes the current directory.</li>
        </ul>

        <p>
          These commands provide a solid base for navigating the environment and discovering what’s possible with
          the web terminal. Experiment freely—since the environment is sandboxed, you won’t affect the host OS.
        </p>
      </main>
    </div>
  );
};

export default BasicUsage;
