

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect if it's mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // For desktop: shift content. For mobile: full width.
  const contentPadding = !isMobile
    ? isSidebarExpanded
      ? "md:pl-64"
      : "md:pl-16"
    : "";

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-950 transition-all duration-300 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isExpanded={isSidebarExpanded}
        setIsExpanded={setIsSidebarExpanded}
      />

      {/* Main content wrapper */}
      <div
        className={`flex flex-col h-full transition-all duration-300 ${contentPadding}`}
      >
        {/* Header */}
        <Header
          toggleSidebar={() => setIsSidebarExpanded((prev) => !prev)}
          isSidebarExpanded={isSidebarExpanded}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto pt-20 pl-2 pr-2 md:pl-8 md:pr-2 transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;














