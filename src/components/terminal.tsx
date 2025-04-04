import React, { useState } from "react";
import { ReactTerminal } from "react-terminal";

function Terminal() {
  const [fileSystem, setFileSystem] = useState({
    home: {
      documents: {
        "file1.txt": "type shit",
        "file2.txt": "RAHHHHHHHHHHHH"
      },
      downloads: {
        "setup.exe": "installer"
      },
      projects: {
        react: {
          "main.jsx": "dummy code comes here"
        },
        node: {
          "middleware.js": "no api abuse allowed."
        }
      },
      desktop: {
        images: "image1"
      }
    }
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
    cat: (fileName) => {
      const currentDir = getCurrentDir();
      if (!currentDir[fileName]) return `cat: ${fileName}: No such file or directory`;
      if (typeof currentDir[fileName] === "object") return `cat: ${fileName}: Is a directory`;
      return currentDir[fileName];
    },
    cp: (args) => {
      const [sourceName, destinationPath] = args.split(" ");
      if (!sourceName || !destinationPath) return `cp: missing file operand`;
      const currentDir = getCurrentDir();
      if (!currentDir[sourceName]) return `cp: cannot copy '${sourceName}': No such file or directory`;
      const destinationParts = destinationPath.startsWith("/")
        ? destinationPath.slice(1).split("/")
        : [...currentPath, ...destinationPath.split("/")];
      const destParentPath = destinationParts.slice(0, -1);
      const destName = destinationParts[destinationParts.length - 1];
      let destParentDir = fileSystem;
      for (const dir of destParentPath) {
        if (!destParentDir[dir] || typeof destParentDir[dir] !== "object")
          return `cp: cannot copy '${sourceName}': Destination path does not exist`;
        destParentDir = destParentDir[dir];
      }
      if (typeof destParentDir[destName] === "object") {
        destParentDir[destName][sourceName] = JSON.parse(JSON.stringify(currentDir[sourceName]));
        updateFileSystem(currentPath, currentDir);
        return `Copied '${sourceName}' into '${destinationPath}/${sourceName}'`;
      }
      if (destParentDir[destName]) return `cp: cannot copy '${sourceName}': Target exists`;
      destParentDir[destName] = JSON.parse(JSON.stringify(currentDir[sourceName]));
      updateFileSystem(currentPath, currentDir);
      return `Copied and renamed '${sourceName}' to '${destinationPath}'`;
    },
    clear: () => {
      return "";
    },
    echo: (text) => {
      return text;
    },
    help: `Commands List:
    whoami -- displays current username |
    ls -- view directory items |
    cd -- change directories |
    pwd -- show current path |
    mkdir -- create a new folder |
    touch -- create a new file |
    rm -- remove a file |
    rmdir -- remove an empty folder |
    mv -- move/rename a file/folder |
    cp -- copy a file/folder |
    cat -- display file contents |
    clear -- clear the terminal output |
    echo -- echo text`
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
