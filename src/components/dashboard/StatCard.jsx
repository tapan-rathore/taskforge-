import { ClipboardList, FolderKanban, LoaderCircle, SquareCheckBig } from "lucide-react"
import { useSelector } from "react-redux"

const StatCard = () => {
    const tasks = useSelector(state => state.tasks.tasks)

    const totalProject = new Set(tasks.map((task) => task.project)).size
    const totalTasks = tasks.length
    const completedTasks = tasks.filter((task) => task.status === "Done").length
    const inProgressTasks = tasks.filter((task) => task.status === "In Progress").length

    const stats = [
        {
            title: "Total Project",
            icon: FolderKanban,
            background: "bg-purple-600",
            value: totalProject,

        },
        {
            title: "Total Tasks",
            icon: ClipboardList,
            background: "bg-blue-500",
            value: totalTasks,
        },
        {
            title: "Completed",
            icon: SquareCheckBig,
            background: "bg-amber-300",
            value: completedTasks,

        },
        {
            title: "In Progress",
            icon: LoaderCircle,
            background: "bg-green-500",
            value: inProgressTasks,
        }
    ]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {stats.map((stat) => {
                const Icon = stat.icon

                return (
                    <div key={stat.title} className="surface app-border border rounded-xl p-5 flex items-center gap-2 shadow-sm">
                        <div className={`${stat.background} w-10 h-10 text-slate-200 flex items-center justify-center rounded-lg`}>
                            <Icon size={20} />
                        </div>
                        <div className="">
                            <p className="text-sm secondary-text">
                                {stat.title}
                            </p>
                            <h2 className="text-2xl font-bold primary-text text-center">
                                {stat.value}
                            </h2>
                        </div>

                        <div>

                        </div>

                    </div>
                )
            })}
        </div>
    )
}

export default StatCard