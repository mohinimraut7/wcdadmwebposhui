




import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "./SidebarContext";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <div style={{ display: "flex", minHeight: "100vh", position: "relative" }}>

        {/* Sidebar - LEFT, full height, in front */}
        <div style={{ position: "sticky", top: 0, height: "100vh", zIndex: 50, flexShrink: 0 }}>
          <Sidebar />
        </div>
        

        {/* Right: Navbar + Content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ position: "sticky", top: 0, zIndex: 40 }} className="hidden md:block">
            <Navbar />
          </div>
          <div style={{ flex: 1, overflowY: "auto", background: "#f3f4f6" }}>
            <Outlet />
          </div>
        </div>

      </div>
    </SidebarProvider>
  );
}