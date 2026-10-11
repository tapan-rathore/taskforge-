
import {
    ClipboardList,
    LoaderCircle,
    SquareCheckBig,
} from "lucide-react"

const ProjectStatCard = ({
    totalTasks,
    completedTasks,
    inProgressTasks,
}) => {
    const stats = [
        {
            title: "Total Tasks",
            icon: ClipboardList,
            background: "bg-blue-500",
            value: totalTasks,
        },
        {
            title: "Completed",
            icon: SquareCheckBig,
            background: "bg-green-500",
            value: completedTasks,
        },
        {
            title: "In Progress",
            icon: LoaderCircle,
            background: "bg-amber-300",
            value: inProgressTasks,
        },
    ]

    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {stats.map((stat) => {
                const Icon = stat.icon

                return (
                    <div
                        key={stat.title}
                        className="elevated-surface app-border border rounded-xl p-4 shadow-sm"
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className={`${stat.background} flex h-9 w-9 items-center justify-center rounded-lg text-slate-200`}
                            >
                                <Icon size={19} />
                            </div>

                            <div>
                                <p className="text-xs secondary-text">
                                    {stat.title}
                                </p>
                                <h2 className="text-xl font-bold primary-text">
                                    {stat.value}
                                </h2>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ProjectStatCard
