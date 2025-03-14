import React from "react";

const Breadcrumbs = ({ path }: { path: string[] }) => {
  return (
    <nav className="text-sm text-white mb-4">
      {path.map((item, index) => (
        <span key={index}>
          {index > 0 && " / "}
          <span className={index === path.length - 1 ? "font-bold" : ""}>
            {item}
          </span>
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs