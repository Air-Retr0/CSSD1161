/*
  This file defines a React-based Terminal component that simulates a simple file system and command-line interface.
  It enables users to navigate virtual directories, create or remove files/folders, and run basic shell commands.
  The fileSystem state is stored in a nested object structure and updated by cloning the state to ensure immutability.
*/

import React, { useState } from "react";
import { ReactTerminal } from "react-terminal";

function Terminal() {
  // This state object represents a nested file system, where each key is either a directory (object) or a file (string).
  const [fileSystem, setFileSystem] = useState({
    home: {
      documents: {
        "file1.txt": "Lorem ipsum dolor",
        "file2.txt": "RAHHHHHHHHHHHH"
      },
      downloads: {
        "setup.exe": "installer"
      },
      projects: {
        react: {
          "main.jsx": "export default function weMadeIt()"
        },
        node: {
          "middleware.js": "no api abuse allowed."
        }
      },
      desktop: {
        images: "jimbo.jpg",
        movies: "movie.mkv"
      }
    }
  });

  // currentPath is an array of directory names representing the user's current location in the virtual file system.
  // Example: ["home", "projects", "react"]
  const [currentPath, setCurrentPath] = useState(["home"]);

  // Traverses the fileSystem based on the currentPath array to retrieve the folder object the user is currently in.
  const getCurrentDir = () => {
    // reduce method iterates through each directory name and accesses the nested object at that path.
    return currentPath.reduce((acc, dir) => acc[dir], fileSystem);
  };

  // Takes a path array and newData object to merge into the file system at that path.
  const updateFileSystem = (path, newData) => {
    setFileSystem((prevFS) => {
      // JSON.parse / JSON.stringify is used for a deep clone, preventing direct mutation of state.
      const copy = JSON.parse(JSON.stringify(prevFS));
      let indexof = copy;
      // Loop until reaching the second-to-last folder in the path (the parent folder of the new data).
      for (let i = 0; i < path.length - 1; i++) {
        indexof = indexof[path[i]];
      }
      // Merge newData into the existing folder object.
      Object.assign(indexof, newData);
      return copy;
    });
  };

  // Removes the specified key from the file system at the given path, deleting either a file or a directory.
  const deleteFromFileSystem = (path, key) => {
    setFileSystem((prevFS) => {
      const copy = JSON.parse(JSON.stringify(prevFS));
      let indexof = copy;
      // As with updateFileSystem, descend into the path until reaching the parent folder.
      for (let i = 0; i < path.length - 1; i++) {
        indexof = indexof[path[i]];
      }
      // Delete the specified item (file or directory) from the parent folder object.
      delete indexof[key];
      return copy;
    });
  };

  // Each terminal command is defined as a key-value pair:
  // Key is the command name; value is either a function to run or a static string/number (for simple commands).
  const commands = {
    // whoami returns a simple string to identify the user.
    whoami: "Developer",

    // ls lists all items in the current directory, or "(empty)" if none are found.
    ls: () => Object.keys(getCurrentDir()).join("  ") || "(empty)",

    // cd changes the currentPath to navigate to another directory or go up with "..".
    cd: (directory) => {
      // directory === ".." attempts to move up one level.
      if (directory === "..") {
        // Only change path if we're not already at the root.
        if (currentPath.length > 1) {
          setCurrentPath((prev) => prev.slice(0, -1));
          // Show user feedback on the new location.
          return `Moved to ${currentPath.slice(0, -1).join("/") || "/"}`;
        }
        return "Already at root.";
      }
      // Otherwise, check if the directory is valid before going deeper.
      const currentDir = getCurrentDir();
      // currentDir[directory] should be an object for it to be treated as a folder.
      if (currentDir[directory] && typeof currentDir[directory] === "object") {
        setCurrentPath((prev) => [...prev, directory]);
        return `Moved to ${[...currentPath, directory].join("/")}`;
      }
      return `Directory not found: ${directory}`;
    },

    // pwd returns the current path in a slash-delimited format.
    pwd: () => `/${currentPath.join("/")}`,

    // mkdir creates a new folder in the current directory, if it doesn't already exist.
    mkdir: (dirName) => {
      const currentDir = getCurrentDir();
      // If the directory name already exists, return an error message.
      if (currentDir[dirName]) return `mkdir: cannot create directory '${dirName}': File exists`;
      // Otherwise, add a new empty object representing the folder.
      updateFileSystem(currentPath, { [dirName]: {} });
      return `Created directory: ${dirName}`;
    },

    // touch creates a new file in the current directory, if it doesn't already exist.
    touch: (fileName) => {
      const currentDir = getCurrentDir();
      if (currentDir[fileName]) return `touch: cannot create file '${fileName}': File exists`;
      // An empty string represents a newly created file with no content.
      updateFileSystem(currentPath, { [fileName]: "" });
      return `Created file: ${fileName}`;
    },

    // rm deletes a file. Will not work if the target is a directory.
    rm: (fileName) => {
      const currentDir = getCurrentDir();
      if (!currentDir[fileName]) return `rm: cannot remove '${fileName}': No such file`;
      // If the item is an object, it's a directory. Indicate that rm cannot remove directories.
      if (typeof currentDir[fileName] === "object") return `rm: cannot remove '${fileName}': Is a directory`;
      deleteFromFileSystem(currentPath, fileName);
      return `Removed file: ${fileName}`;
    },

    // rmdir deletes a directory, but only if it's empty (no child files/folders).
    rmdir: (dirName) => {
      const currentDir = getCurrentDir();
      if (!currentDir[dirName]) return `rmdir: failed to remove '${dirName}': No such directory`;
      if (typeof currentDir[dirName] !== "object") return `rmdir: failed to remove '${dirName}': Not a directory`;
      // Check if the directory is empty by seeing if it has any keys.
      if (Object.keys(currentDir[dirName]).length > 0) return `rmdir: failed to remove '${dirName}': Directory not empty`;
      deleteFromFileSystem(currentPath, dirName);
      return `Removed directory: ${dirName}`;
    },

    // mv can be used to move or rename a file/folder from one location to another.
    mv: (args) => {
      // Split the arguments into the sourceName and destinationPath.
      const [sourceName, destinationPath] = args.split(" ");
      if (!sourceName || !destinationPath) return `mv: missing file operand`;

      const currentDir = getCurrentDir();
      // If the source doesn't exist, we can't move it.
      if (!currentDir[sourceName]) return `mv: cannot move '${sourceName}': No such file or directory`;

      // Determine whether the user specified an absolute path or a relative path.
      const destinationParts = destinationPath.startsWith("/")
        ? destinationPath.slice(1).split("/")
        : [...currentPath, ...destinationPath.split("/")];

      // The parent path is everything but the last segment. The last segment may be a directory name or new filename.
      const destParentPath = destinationParts.slice(0, -1);
      const destName = destinationParts[destinationParts.length - 1];

      // Start from the root file system object to navigate toward the destination folder.
      let destParentDir = fileSystem;

      for (const dir of destParentPath) {
        if (!destParentDir[dir] || typeof destParentDir[dir] !== "object") {
          return `mv: cannot move '${sourceName}': Destination path does not exist`;
        }
        destParentDir = destParentDir[dir];
      }

      // If the final destination name is an existing directory, place sourceName inside it.
      if (typeof destParentDir[destName] === "object") {
        destParentDir[destName][sourceName] = currentDir[sourceName];
        delete currentDir[sourceName];
        updateFileSystem(currentPath, currentDir);
        return `Moved '${sourceName}' to '${destinationPath}/${sourceName}'`;
      }

      // If there's a file/folder with the same name, we can't overwrite it without warnings (not implemented here).
      if (destParentDir[destName]) return `mv: cannot move '${sourceName}': Target exists`;

      // Otherwise, rename the source to destName (basically a move + rename).
      destParentDir[destName] = currentDir[sourceName];
      delete currentDir[sourceName];
      updateFileSystem(currentPath, currentDir);
      return `Renamed '${sourceName}' to '${destinationPath}'`;
    },

    // cat displays the contents of a file; if it's a directory, it returns an error.
    cat: (fileName) => {
      const currentDir = getCurrentDir();
      if (!currentDir[fileName]) return `cat: ${fileName}: No such file or directory`;
      if (typeof currentDir[fileName] === "object") return `cat: ${fileName}: Is a directory`;
      return currentDir[fileName];
    },

    // cp duplicates a file or directory into a new location, leaving the source intact.
    cp: (args) => {
      const [sourceName, destinationPath] = args.split(" ");
      if (!sourceName || !destinationPath) return `cp: missing file operand`;

      const currentDir = getCurrentDir();
      if (!currentDir[sourceName]) return `cp: cannot copy '${sourceName}': No such file or directory`;

      // Determine absolute or relative path to the destination.
      const destinationParts = destinationPath.startsWith("/")
        ? destinationPath.slice(1).split("/")
        : [...currentPath, ...destinationPath.split("/")];

      const destParentPath = destinationParts.slice(0, -1);
      const destName = destinationParts[destinationParts.length - 1];
      let destParentDir = fileSystem;

      // Traverse to the parent directory in the filesystem for the new location.
      for (const dir of destParentPath) {
        if (!destParentDir[dir] || typeof destParentDir[dir] !== "object") {
          return `cp: cannot copy '${sourceName}': Destination path does not exist`;
        }
        destParentDir = destParentDir[dir];
      }

      // If destName already exists and is a directory, place sourceName within that directory.
      if (typeof destParentDir[destName] === "object") {
        destParentDir[destName][sourceName] = JSON.parse(JSON.stringify(currentDir[sourceName]));
        updateFileSystem(currentPath, currentDir);
        return `Copied '${sourceName}' into '${destinationPath}/${sourceName}'`;
      }

      // If the target name exists, block the copy to avoid overwriting.
      if (destParentDir[destName]) return `cp: cannot copy '${sourceName}': Target exists`;

      // Otherwise, create a copy with a new name under destName.
      destParentDir[destName] = JSON.parse(JSON.stringify(currentDir[sourceName]));
      updateFileSystem(currentPath, currentDir);
      return `Copied and renamed '${sourceName}' to '${destinationPath}'`;
    },

    // clear simply returns an empty string, effectively clearing the terminal output area.
    clear: () => {
      return "";
    },

    // echo outputs whatever text is passed in, useful for testing or basic feedback.
    echo: (text) => {
      return text;
    },

    // help lists all available commands. This is a static string containing brief command info.
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

  // Render the terminal with a custom prompt and error message. The commands object is passed in so each command is recognized.
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
