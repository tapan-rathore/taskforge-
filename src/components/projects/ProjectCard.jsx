import { CalendarDays, CircleCheck, ClipboardList, EllipsisVertical, SquarePen, Trash } from "lucide-react"
import { useNavigate } from "react-router"
import StatusBadge from "../common/StatusBadge"
import { projectIcons } from "../../constants/projectIcons"
import { useState } from "react"
import { useSelector } from "react-redux"

const ProjectCard = ({ project, onEdit, openDeleteModal }) => {
    const navigate = useNavigate()
    const tasks = useSelector(state => state.tasks.tasks)
    const projectTasks = tasks.filter(
        task => String(task.projectId) === String(project.id)
    )

    const [openProjectId, setOpenProjectId] = useState(null)

    const handleMenuToggle = (projectId) => {
        setOpenProjectId(prev =>
            prev === projectId ? null : projectId
        )
    }

    const handleEdit = (project) => {
        setOpenProjectId(null)
        onEdit(project)
    }

    const handleDelete = (project) => {
        setOpenProjectId(null)
        openDeleteModal(project)
    }

    const totalTasks = projectTasks.length
    const completedTasks = projectTasks.filter(
        task => task.status === "Done"
    ).length

    const progress = totalTasks
        ? Math.round((completedTasks / totalTasks) * 100)
        : 0

    const backgroundColor = project?.color || "#25c55e"
    const ProjectIcon = projectIcons[project.icon] || projectIcons.Rocket

    return (
        <div className="space-y-2 relative w-full rounded-lg border app-border elevated-surface p-3 shadow-sm">

            {/* Top section */}
            <div className="flex gap-4 min-h-16">
                {/* project logo */}
                <div className="w-10 h-10 text-slate-200 flex items-center justify-center rounded-lg"
                    style={{ backgroundColor }} >
                    <ProjectIcon />
                </div>

                {/* task information */}
                <div className="min-w-0 flex-1 space-y-1">
                    <button
                        type="button"
                        onClick={() =>
                            navigate(`/app/projects/${project.id}`)
                        }
                        className="block max-w-full truncate text-left text-sm font-bold primary-text transition hover:text-indigo-500 hover:underline cursor-pointer">
                        {project.name}
                    </button>
                    <p className="line-clamp-2 text-xs leading-5 secondary-text">
                        {project.description}
                    </p>
                </div>

                {/* Action button */}
                <div className="relative shrink-0">
                    <button
                        onClick={() => handleMenuToggle(project.id)}
                        className="rounded-lg p-1.5 secondary-text transition hover:bg-slate-500/10 hover:primary-text" aria-label="Task actions">
                        <EllipsisVertical size={18} />
                    </button>

                    {/* Action buttons modal */}
                    {openProjectId === project.id && (
                        <div className="absolute right-0 top-7 z-50 mt-1 flex items-center gap-1 rounded-lg border app-border surface p-1 shadow-lg">
                            {/* Edit */}
                            <button
                                type="button"
                                onClick={() => handleEdit(project)}
                                className="rounded-lg p-2 text-indigo-500 transition hover:bg-indigo-50 hover:text-indigo-600 dark:text-indigo-400 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-300"
                                aria-label="Edit Project task"
                            >
                                <SquarePen size={18} />
                            </button>

                            {/* Delete */}
                            <button
                                type="button"
                                onClick={() => handleDelete(project)}
                                className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-600 dark:text-red-400 dark:hover:bg-red-500/10 dark:hover:text-red-300"
                                aria-label="Delete project task"                            >
                                <Trash size={18} />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Middle section */}
            <div className="mt-2 space-y-2">

                <StatusBadge status={project.status} />

                {/* Progres bar */}
                <div className="flex items-center gap-2">
                    <div className="bg-slate-500/20 h-2 w-full rounded-lg">
                        <div
                            className="h-2 rounded-lg"
                            style={{
                                width: `${progress}%`,
                                backgroundColor,
                            }}
                        />
                    </div>

                    <span className="text-[10px] font-bold primary-text">
                        {progress}%
                    </span>
                </div>

                <div className="flex justify-between gap-1">
                    <div className="secondary-text flex gap-2 items-center">
                        <ClipboardList size={16} />
                        <div className="flex flex-col">
                            <span className="primary-text text-sm font-medium">
                                {totalTasks}
                            </span>
                            <span className="text-xs text-[10px]">
                                Total Tasks
                            </span>
                        </div>
                    </div>
                    <div className="secondary-text flex gap-2 items-center">
                        <CircleCheck size={16} />
                        <div className="flex flex-col">
                            <span className="primary-text text-sm font-medium">
                                {completedTasks}
                            </span>
                            <span className="text-xs text-[10px]">
                                Completed
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center">
                        {project.members?.slice(0, 3).map((member, index) => (
                            <div
                                key={member}
                                className={`flex h-6 w-6 items-center justify-center rounded-full border-2 elevated-surface text-[8px] font-semibold primary-text ${index !== 0 ? "-ml-2" : ""}`}
                            >
                                {member?.charAt(0).toUpperCase()}
                            </div>
                        ))}

                        {project.members?.length > 3 && (
                            <div className="-ml-2 flex h-6 w-6 items-center justify-center rounded-full border-2 elevated-surface text-[8px] font-semibold secondary-text">
                                +{project.members.length - 3}
                            </div>
                        )}
                    </div>
                </div>

            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center gap-2 border-t app-border pt-3">

                <CalendarDays
                    size={14}
                    className="secondary-text"
                />

                <span className="text-[11px] secondary-text">
                    Created{" "}
                    {new Date(project.createdAt).toLocaleDateString(
                        "en-US",
                        {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                        }
                    )}
                </span>

            </div>
        </div>
    )
}

export default ProjectCard
