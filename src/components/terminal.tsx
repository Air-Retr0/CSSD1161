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
        images: "image1",
      },
    },
  });

  const [currentPath, setCurrentPath] = useState(["home"]);

  const getCurrentDir = () => {
    return currentPath.reduce((acc, dir) => acc[dir], fileSystem);
  };

  const updateFileSystem = (path, newData) => {
    setFileSystem((prevFS) => {
      const copy = JSON.parse(JSON.stringify(prevFS));
      let indexof = copy;
      for (let i = 0; i < path.length - 1; i++) {
        indexof = indexof[path[i]];
      }
      Object.assign(indexof, newData);
      return copy;
    });
  };

  const deleteFromFileSystem = (path, key) => {
    setFileSystem((prevFS) => {
      const copy = JSON.parse(JSON.stringify(prevFS));
      let indexof = copy;
      for (let i = 0; i < path.length - 1; i++) {
        indexof = indexof[path[i]];
      }
      delete indexof[key];
      return copy;
    });
  };

  const moveFileOrFolder = (sourceName, destinationPath) => {
    setFileSystem((prevFS) => {
      const copy = JSON.parse(JSON.stringify(prevFS));
      let srcDir = copy;
      let destDir = copy;

      for (let i = 0; i < currentPath.length - 1; i++) {
        srcDir = srcDir[currentPath[i]];
      }

      let destSegments = destinationPath.split("/").filter(Boolean);
      if (destSegments[0] === "home") destSegments.shift();

      try {
        for (let segment of destSegments) {
          if (!destDir[segment] || typeof destDir[segment] !== "object") {
            return prevFS;
          }
          destDir = destDir[segment];
        }

        if (!srcDir[sourceName]) return prevFS;

        destDir[sourceName] = srcDir[sourceName];
        delete srcDir[sourceName];

        return copy;
      } catch {
        return prevFS;
      }
    });
  };

  const commands = {
    whoami: "Developer",
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
    rm: (fileName) => {
      const currentDir = getCurrentDir();
      if (!currentDir[fileName]) return `rm: cannot remove '${fileName}': No such file`;
      if (typeof currentDir[fileName] === "object") return `rm: cannot remove '${fileName}': Is a directory`;

      deleteFromFileSystem(currentPath, fileName);
      return `Removed file: ${fileName}`;
    },
    rmdir: (dirName) => {
      const currentDir = getCurrentDir();
      if (!currentDir[dirName]) return `rmdir: failed to remove '${dirName}': No such directory`;
      if (typeof currentDir[dirName] !== "object") return `rmdir: failed to remove '${dirName}': Not a directory`;
      if (Object.keys(currentDir[dirName]).length > 0) return `rmdir: failed to remove '${dirName}': Directory not empty`;

      deleteFromFileSystem(currentPath, dirName);
      return `Removed directory: ${dirName}`;
    },
    mv: (args) => {
      const [sourceName, destinationPath] = args.split(" ");
      if (!sourceName || !destinationPath) return `mv: missing file operand`;

      const currentDir = getCurrentDir();
      if (!currentDir[sourceName]) return `mv: cannot move '${sourceName}': No such file or directory`;

      const destinationParts = destinationPath.startsWith("/")
        ? destinationPath.slice(1).split("/")
        : [...currentPath, ...destinationPath.split("/")];

      const destParentPath = destinationParts.slice(0, -1);
      const destName = destinationParts[destinationParts.length - 1];

      let destParentDir = fileSystem;
      for (const dir of destParentPath) {
        if (!destParentDir[dir] || typeof destParentDir[dir] !== "object")
          return `mv: cannot move '${sourceName}': Destination path does not exist`;
        destParentDir = destParentDir[dir];
      }

      if (typeof destParentDir[destName] === "object") {
        destParentDir[destName][sourceName] = currentDir[sourceName];
        delete currentDir[sourceName];
        updateFileSystem(currentPath, currentDir);
        return `Moved '${sourceName}' to '${destinationPath}/${sourceName}'`;
      }

      if (destParentDir[destName]) return `mv: cannot move '${sourceName}': Target exists`;


      destParentDir[destName] = currentDir[sourceName];
      delete currentDir[sourceName];
      updateFileSystem(currentPath, currentDir);
      return `Renamed '${sourceName}' to '${destinationPath}'`;
    },


    help: `Commands List:
    whoami -- displays current username |
    ls -- view all current items in the directory |
    cd -- change directories |
    pwd -- show current path |
    mkdir -- create a new folder |
    touch -- create a new file |
    rm -- delete a file |
    rmdir -- delete an empty folder |
    mv -- move or rename a file/folder`
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
