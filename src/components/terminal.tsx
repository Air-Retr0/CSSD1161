import React, { useState } from "react";
import { ReactTerminal } from "react-terminal";

function Terminal() {
  const fileSystem = { // dummy data can come here
    home: {
      documents: {
        "file1.txt": "type shit",
        "file2.txt": "RAHHHHHHHHHHHH",
      },
      downloads: {
        "setup.exe": "installer",
      },
      projects: {
        react: {
          "main.jsx": "dummy code comes here"
        },
        node: {
          "middleware.js": "no api abuse allowed."
        },
      },
      desktop: {
        "images": "fam"
      },
    },
  };

  const [currentPath, setCurrentPath] = useState(["home"]);

  const getCurrentDir = () => {
    return currentPath.reduce((acc, dir) => acc[dir], fileSystem);
  };

  const commands = {
    whoami: "Jahiem Allen",
    ls: () => Object.keys(getCurrentDir()).join("  ") || "(empty)",
    cd: (directory) => {
      if (directory === "..") {
        if (currentPath.length > 1) {
          setCurrentPath((prev) => prev.slice(0, -1));
          return `Moved to ${currentPath.slice(0, -1).join("/") || "/"}`;
        }
        return "Already at root.";
      }

      const currentDir = getCurrentDir();
      if (currentDir[directory] && typeof currentDir[directory] === "object") {
        setCurrentPath((prev) => [...prev, directory]);
        return `Moved to ${[...currentPath, directory].join("/")}`;
      }

      return `Directory not found: ${directory}`;
    },
    pwd: () => `/${currentPath.join("/")}`,
    help: " Commands List | whoami --displays current username | ls --view all current items in the directory | cd --change directories"
  };

  return (
    <>
      <div className="w-full">
        <ReactTerminal
          welcomeMessage=""
          commands={commands}
          prompt={`$`}
          theme="dark"
          errorMessage="invalid command, type help to view commands."
        />
      </div>
    </>
  );
}

export default Terminal;
