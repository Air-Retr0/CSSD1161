import { useState } from "react";
import { Link } from "react-router-dom";

// The DocsSidebar component provides a collapsible menu for documentation sections.
const DocsSidebar = () => {
  // Keeps track of which sections (Introduction, Usage, API, Examples) are expanded (true) or collapsed (false).
  const [openSections, setOpenSections] = useState({
    Introduction: false,
    Usage: false,
    API: false,
    Examples: false
  });

  // Flips the boolean value of the specified section, thereby toggling its visibility.
  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <aside className="w-1/4 min-h-screen p-4 bg-black text-white">
      {/* Sidebar Title */}
      <h2 className="text-lg font-semibold border-b pb-2">Documentation</h2>
      <nav className="mt-4 space-y-2">

        {/* Common Label for All Sections */}
        <p className="font-semibold">Section</p>

        {/* Introduction Section */}
        <div className="pl-2">
          {/* Clicking this line toggles the Introduction portion */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => toggleSection("Introduction")}
          >
            <span className="mr-2">›</span> Introduction
          </div>
          {/* Conditional rendering for sublinks based on openSections.Introduction */}
          {openSections.Introduction && (
            <ul className="ml-6 mt-1 space-y-1">
              <li>
                <Link to="/docs">Getting Started</Link>
              </li>
              <li>
                <Link to="/docs/introduction/overview">Overview</Link>
              </li>
            </ul>
          )}
        </div>

        <div className="pl-2">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => toggleSection("Usage")}
          >
            <span className="mr-2">›</span> Usage
          </div>
          {openSections.Usage && (
            <ul className="ml-6 mt-1 space-y-1">
              <li>
                <Link to="/docs/usage/basic-usage">Basic Usage</Link>
              </li>
              <li>
                <Link to="/docs/usage/advanced-usage">Advanced Usage</Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default DocsSidebar;
