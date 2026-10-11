import {
    CalendarRange,
    CheckSquare,
    FolderKanban,
    LayoutDashboard,
    LogOut,
    Settings,
    UserRound,
    Users,
    ChevronLeft,
    ChevronRight,
    Presentation,
} from "lucide-react";

import logo from "../../assets/logo.png"
import Logo from "../common/Logo";
import { NavLink } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../redux/ui/uiSlice";

const navigationItems = [
    {
        name: "Dashboard",
        path: "/app/dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "Tasks",
        path: "/app/tasks",
        icon: CheckSquare,
    },
    {
        name: "KanbanBoard",
        path: "/app/board",
        icon: Presentation
    },
    {
        name: "Projects",
        path: "/app/projects",
        icon: FolderKanban,
    },
    {
        name: "Calendar",
        path: "/app/calendar",
        icon: CalendarRange,
    },
    {
        name: "Team",
        path: "/app/team",
        icon: Users,
    },
    {
        name: "Settings",
        path: "/app/settings",
        icon: Settings,
    },
];

const Sidebar = () => {
    const { logout } = useAuth();

    const dispatch = useDispatch();

    const sidebarOpen = useSelector(
        (state) => state.ui.sidebarOpen
    );

    return (
        <aside
            className={`fixed inset-y-0 left-0 z-40 hidden lg:flex flex-col justify-between border-r app-border bg-[#0f172a] transition-all duration-300 ${sidebarOpen ? "w-56" : "w-20"
                }`}
        >
            <nav className="p-2">
                <div className="relative flex items-center  justify-center">
                    <span className={sidebarOpen ? "" : "hidden"}>
                        <Logo />
                    </span>
                    <span className={sidebarOpen ? "hidden" : ""}>
                        <img width={50} src={logo} alt="Logo" />
                    </span>
                </div>

                <ul className="space-y-1 pt-4">
                    {navigationItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <li key={item.name}>
                                <NavLink
                                    to={item.path}
                                    title={
                                        sidebarOpen
                                            ? undefined
                                            : item.name
                                    }
                                    className={({ isActive }) =>
                                        `flex w-full items-center rounded-lg py-3 text-sm font-semibold transition ${sidebarOpen
                                            ? "gap-3 px-4"
                                            : "justify-center px-2"
                                        } ${isActive
                                            ? "bg-indigo-600 text-white"
                                            : "text-white/60 hover:bg-white/10 hover:text-white"
                                        }`
                                    }
                                >
                                    <Icon size={20} />

                                    {sidebarOpen && (
                                        <span>
                                            {item.name}
                                        </span>
                                    )}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="p-2">
                <NavLink
                    to="/app/profile"
                    title={
                        sidebarOpen
                            ? undefined
                            : "Profile"
                    }
                    className={`flex w-full items-center rounded-lg py-3 text-sm font-semibold transition text-white/55 hover:bg-gray-700 ${sidebarOpen
                        ? "gap-3 px-4"
                        : "justify-center px-2"
                        }`}
                >
                    <UserRound size={20} />

                    {sidebarOpen && (
                        <span>Profile</span>
                    )}
                </NavLink>

                <button
                    onClick={logout}
                    title={
                        sidebarOpen
                            ? undefined
                            : "Logout"
                    }
                    className={`flex w-full items-center rounded-lg py-3 text-sm font-semibold transition text-white/55 hover:bg-gray-700 ${sidebarOpen
                        ? "gap-3 px-4"
                        : "justify-center px-2"
                        }`}
                >
                    <LogOut size={20} />

                    {sidebarOpen && (
                        <span>Logout</span>
                    )}
                </button>

                <button
                    onClick={() =>
                        dispatch(toggleSidebar())
                    }
                    className="mt-2 flex w-full items-center justify-center rounded-lg py-2 text-white/60 transition hover:bg-white/10 hover:text-white"
                    aria-label={
                        sidebarOpen
                            ? "Collapse sidebar"
                            : "Expand sidebar"
                    }
                >
                    {sidebarOpen ? (
                        <ChevronLeft size={18} />
                    ) : (
                        <ChevronRight size={18} />
                    )}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;