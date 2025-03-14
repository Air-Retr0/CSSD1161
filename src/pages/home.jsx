import Sidebar from "../components/sidebar";
import Terminal from "../components/terminal";

export default function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex justify-end">
        <Terminal />
      </div>
    </div>
  );
}
