import { Plus } from "lucide-react"
import { useAuth } from "../../context/AuthContext"
import Button from "../common/Button"

const DashboardHeader = ({ handleAddProject }) => {
    const { user } = useAuth()

    const today = new Date()

    const formattedDate = today.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
    })

    return (
        <div className="flex flex-col gap-4 pb-5 md:flex-row md:items-end md:justify-between">

            {/* Left */}
            <div>
                <h1 className="text-sm font-medium secondary-text mb-1">
                    Dashboard
                </h1>
                <h2 className="text-2xl sm:text-3xl font-bold primary-text">
                    Good morning, {user?.fullName || "Guest"} 👋
                </h2>
                <p className="mt-1 text-sm sm:text-base secondary-text">
                    Here's whats's happening with your tasks today.
                </p>
            </div>

            {/* Right */}
            <div className="flex items-center justify-between gap-4 md:justify-end">
                <p className="text-sm muted-text whitespace-nowrap">{formattedDate}</p>
                <Button
                    name="New Project"
                    icon={Plus}
                    handleAddTask={handleAddProject}
                />
            </div>
        </div>
    )
}

export default DashboardHeader
