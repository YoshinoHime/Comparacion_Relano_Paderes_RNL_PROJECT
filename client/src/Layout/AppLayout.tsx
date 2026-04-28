import { Outlet } from "react-router-dom"
import AppHeader from "./AppHeader"
import AppSidebar from "./AppSidebar"
import { SidebarProvider } from "../context/SidebarContext";
import { HeaderProvider } from "../context/HeaderContext";

const LayoutContent = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppSidebar />

      <div className="flex flex-col">
        <AppHeader />

        <main className="pt-20 pl-0 sm:pl-64 min-h-screen">
          <div className="p-4 sm:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

};

const AppLayout = () => {
  return (
    <>
        <HeaderProvider>
            <SidebarProvider>
                <LayoutContent />
            </SidebarProvider>
        </HeaderProvider>
    </>
  );
};

export default AppLayout