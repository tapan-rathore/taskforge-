// import { useTheme } from "../../context/ThemeContext"
import { Bell, Menu, Moon, Search, Sun } from "lucide-react"
import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useDispatch, useSelector } from "react-redux"
import { toggleTheme } from "../../redux/ui/uiSlice"
import { setSearchFilter } from "../../redux/tasks/taskSlice"
import { useNavigate } from "react-router"

const Navbar = () => {
    // const { darkmode, toggleTheme } = useTheme()
    const { user } = useAuth()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const unreadCount = useSelector(
        (state) =>
            state.notifications.notifications.filter(
                (notification) => !notification.isRead
            ).length
    )

    const theme = useSelector((state) => state.ui.theme)

    const sidebarOpen = useSelector(
        (state) => state.ui.sidebarOpen
    );

    return (
        <header className="sticky top-0 z-30 flex h-16 w-full items-center app-background justify-between border-b app-border px-4 sm:px-6">

            {/* Search */}
            <div className="hidden h-10 w-full max-w-sm items-center gap-2 rounded-lg border app-border surface px-3 md:flex">
                <Search size={18}
                    className="muted-text" />
                <input
                    onChange={(e) => dispatch(setSearchFilter(e.target.value))}
                    type="text"
                    placeholder="Search tasks, projects..."
                    className="w-full bg-transparent text-sm primary-text placeholder:text-slate-400 outline-none"
                />
            </div>

            {/* Mobile search */}
            <button className="
                flex
                items-center
                justify-center
                primary-text
                md:hidden
            ">
                <Search size={20} />
            </button>

            {/* Right side */}
            <div className="ml-auto flex items-center gap-3 sm:gap-4">
                {/* Notification */}
                <button
                    type="button"
                    onClick={() => navigate("/app/notifications")}
                    aria-label={`Notifications, ${unreadCount} unread`}
                    className="relative rounded-lg p-2 transition hover:bg-slate-500/10"
                >
                    <Bell size={21} />

                    {unreadCount > 0 && (
                        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                            {unreadCount > 99 ? "99+" : unreadCount}
                        </span>
                    )}
                </button>

                <button
                    onClick={() => dispatch(toggleTheme())}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg secondary-text ${theme === "dark"
                        ? "hover:bg-gray-800"
                        : "hover:bg-gray-100"
                        }`}>
                    {theme === "dark"
                        ? <Sun size={20} />
                        : <Moon size={20} />
                    }
                </button>


                {/* User */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 flex shrink-0 items-center justify-center primary-button text-sm primary-text font-semibold rounded-full">
                        {user?.fullName[0]?.toUpperCase()}
                    </div>

                    <div className="hidden sm:flex sm:flex-col">
                        <span className="text-sm font-semibold primary-text">
                            {user?.fullName}
                        </span>
                        <span className="max-w-32 text-xs secondary-text">
                            {user?.email}
                        </span>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar