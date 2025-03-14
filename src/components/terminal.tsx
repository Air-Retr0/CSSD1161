import React, { useState } from "react";
import { ReactTerminal } from "react-terminal";

function Terminal() {
  const [fileSystem, setFileSystem] = useState({
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
          "main.jsx": "dummy code comes here",
        },
        node: {
          "middleware.js": "no api abuse allowed.",
        },
      },
      desktop: {
        images: "fam",
      },
    },
  });

  const [currentPath, setCurrentPath] = useState(["home"]);

  const getCurrentDir = () => {
    return currentPath.reduce((acc, dir) => acc[dir], fileSystem);
  };

  const updateFileSystem = (path, newData) => {
    setFileSystem((prevFS) => { // mein gott
      const copy = JSON.parse(JSON.stringify(prevFS));
      let indexof = copy;
      for (let i = 0; i < path.length; i++) {
        indexof = indexof[path[i]];
      }
      Object.assign(indexof, newData);
      return copy;
    });
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
    mkdir: (dirName) => {
      const currentDir = getCurrentDir();
      if (currentDir[dirName]) return `mkdir: cannot create directory '${dirName}': File exists`;

      updateFileSystem(currentPath, { [dirName]: {} });
      return `Created directory: ${dirName}`;
    },
    touch: (fileName) => {
      const currentDir = getCurrentDir();
      if (currentDir[fileName]) return `touch: cannot create file '${fileName}': File exists`;

      updateFileSystem(currentPath, { [fileName]: "" });
      return `Created file: ${fileName}`;
    },
    help: `Commands List:
    whoami -- displays current username
    ls -- view all current items in the directory
    cd [directory] -- change directories
    pwd -- show current path
    mkdir [folder] -- create a new folder
    touch [file] -- create a new file`,
  };

  return (
    <div className="w-full">
      <ReactTerminal
        welcomeMessage=""
        commands={commands}
        prompt="$"
        theme="dark"
        errorMessage="Invalid command, type help to view commands."
      />
    </div>
  );
}

export default Terminal;
