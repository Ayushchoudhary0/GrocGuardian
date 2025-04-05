
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <header className="h-16 flex items-center justify-between px-6 border-b">
          <div className="flex items-center">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              className="p-2 rounded-md hover:bg-muted mr-4"
              aria-label="Toggle sidebar"
            >
              <Menu size={20} />
            </button>
            <h1 className="font-semibold text-lg">Fresh Find Grocer</h1>
          </div>
          <div>
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
