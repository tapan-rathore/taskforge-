import {
    CalendarRange,
    CheckSquare,
    FolderKanban,
    LayoutDashboard,
    MoreHorizontal,
} from "lucide-react"
import { NavLink } from "react-router"

const navigationItems = [
    {
        name: "Home",
        path: "/app/dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "Tasks",
        path: "/app/tasks",
        icon: CheckSquare,
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
]

const MobileNav = () => {
    return (
        <nav className="
            fixed
            bottom-0
            left-0
            right-0
            z-50
            border-t
            app-border
            surface
            lg:hidden
        ">
            <div className="grid grid-cols-5 h-14">

                {navigationItems.map((item) => {
                    const Icon = item.icon

                    return (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex flex-col items-center justify-center gap-1 text-xs font-medium transition ${
                                    isActive
                                        ? "text-indigo-600"
                                        : "secondary-text"
                                }`
                            }
                        >
                            <Icon size={20} />

                            <span>
                                {item.name}
                            </span>
                        </NavLink>
                    )
                })}

                <NavLink
                    to="/app/settings"
                    className={({ isActive }) =>
                        `flex flex-col items-center justify-center gap-1 text-xs font-medium ${
                            isActive
                                ? "text-indigo-600"
                                : "secondary-text"
                        }`
                    }
                >
                    <MoreHorizontal size={20} />
                    <span>More</span>
                </NavLink>
            </div>
        </nav>
    )
}

export default MobileNav