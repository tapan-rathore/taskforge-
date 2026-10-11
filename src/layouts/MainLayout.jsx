import { Outlet } from "react-router"
import Sidebar from "../components/layout/Sidebar"
import Navbar from "../components/layout/Navbar"
import MobileNav from "../components/layout/MobileNav"
import { useSelector } from "react-redux"

const MainLayout = () => {
    const sidebarOpen = useSelector(
        (state) => state.ui.sidebarOpen
    );

    return (
        <div className="h-screen overflow-hidden app-background primary-text">
            <div className="flex h-full">
                <Sidebar />

                {/* Main Content */}
                <div className={`flex min-w-0 flex-1 flex-col transition-all duration-300 ${sidebarOpen
                        ? "lg:ml-56"
                        : "lg:ml-20"
                    }`}>
                    <Navbar />
                    <main className="flex-1 min-h-0 overflow-y-auto p-2 pb-16 sm:p-4 sm:pb-18 lg:p-3">
                        <Outlet />
                    </main>
                </div>
            </div>
            <MobileNav />
        </div>
    )
}

export default MainLayout