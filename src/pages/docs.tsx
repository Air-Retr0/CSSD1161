import React from "react";
import Breadcrumbs from "../components/sub/breadcrumbs";
import DocsSidebar from "../components/sub/docs-sidebar";

const Contents = () => {
  return (
    // contents of docs page
    <main className="w-3/4 p-6 bg-black/95 text-white">
      <Breadcrumbs path={["Home", "Documentation", "Introduction", "Getting Started"]} />

      <h1 className="text-2xl font-bold mb-4">Getting Started with the Web Terminal</h1>

      <p className="mb-4">
        Welcome to the "Getting Started" section! In this guide, we'll help you set up and start using the interactive
        web terminal directly within your browser. This terminal allows you to run various commands and interact with the
        system without leaving your webpage. If you are familiar with traditional command-line interfaces (CLI), you’ll
        feel right at home.
      </p>

      <p className="mb-4">
        In the sections below, we'll cover how to use the terminal, explain basic terminal commands, and guide you through
        some examples. This documentation will also help you understand the core limitations of the terminal in this environment.
      </p>

      {/* Usage section subtitle */}
      <h2 className="text-xl font-semibold mt-6 mb-2">How to Use the Web Terminal</h2>

      {/* Explanation of terminal usage */}
      <p className="mb-4">
        The web terminal allows you to enter commands just as you would in a regular terminal, except here, it’s embedded
        directly into your browser. To get started, simply click into the terminal window and begin typing commands. As you
        type, you’ll notice that the terminal responds just like a standard terminal would, providing output below your
        commands.
      </p>

      <p className="mb-4">
        Here’s how to begin using the web terminal:
      </p>

      <ol className="list-decimal list-inside mb-4">
        <li>
          First, focus on the terminal by clicking inside the terminal window.
        </li>
        <li>
          You can start typing commands directly. For example, try typing <code>help</code> to get a list of available
          commands or <code>clear</code> to clear the terminal screen.
        </li>
        <li>
          Once you type a command, press <code>Enter</code> to execute it. The terminal will process the command and show the
          results directly below your input.
        </li>
      </ol>

      <img
        src="images/docs.png"
        alt="web terminal usage"
        className="w-full h-40 object-cover border rounded mb-4"
      />

      <p className="mb-4">
        In the image above, you can see the terminal in action. Commands like <code>help</code> will provide feedback,
        listing all available commands you can use, while other commands might display system information, run processes, or
        perform actions on the system within the webpage context.
      </p>

      <p>
        While this terminal behaves similarly to a native terminal, please note that it is sandboxed. This means it can
        only interact with the environment within the web page itself and cannot access your local system or files. For
        example, you cannot open files from your computer, and commands that attempt to access local files or processes
        will not function.
      </p>

      <p className="mt-6">
        The web terminal is ideal for performing tasks related to the web environment, such as interacting with the website’s
        backend, running predefined scripts, or experimenting with certain commands designed to run in this terminal context.
      </p>

      <h3 className="text-lg font-semibold mt-6">Common Commands</h3>
      <p className="mb-4">
        Here are some common commands to get you started:
      </p>

      <ul className="list-disc list-inside mb-4">
        <li><code>help</code> – Lists all available commands.</li>
        <li><code>clear</code> – Clears the terminal screen.</li>
        <li><code>ls</code> – Lists the files and directories in the current directory.</li>
        <li><code>cd [directory]</code> – Changes to a specified directory.</li>
      </ul>

      <p>
        As you get familiar with the terminal, you can experiment with these commands and explore the software's features
        by running different terminal commands. If you need more details about a specific command, type <code>help [command] </code>
        to get further information on its usage.
      </p>
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
