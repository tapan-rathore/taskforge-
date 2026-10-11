import { CalendarDays, EllipsisVertical, FolderKanban, SquarePen, Trash, } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router"
import PriorityBadge from "../dashboard/PriorityBadge"
import StatusBadge from "../common/StatusBadge"

const TaskCard = ({ tasks, onEdit, openDeleteModal, onDragStart }) => {

    const navigate = useNavigate()

    // Store the ID of the task whose menu is open
    const [openTaskId, setOpenTaskId] = useState(null)

    const handleMenuToggle = (taskId) => {
        setOpenTaskId(prev =>
            prev === taskId ? null : taskId
        )
    }

    const handleEdit = (task) => {
        setOpenTaskId(null)
        onEdit(task)
    }

    const handleDelete = (task) => {
        setOpenTaskId(null)
        openDeleteModal(task)
    }

    return (
        <div className="w-full space-y-2">

            {tasks?.map((task) => (

                <div
                    key={task.id}
                    draggable={Boolean(onDragStart)}
                    onDragStart={(event) => onDragStart?.(event, task)
                    }
            className="relative w-full rounded-lg border app-border elevated-surface p-3 shadow-sm mt-2"
                >

            {/* Top section */}
            <div className="flex items-start justify-between gap-3">

                {/* Task information */}
                <div className="min-w-0 flex-1 space-y-2">

                    {/* Title */}
                    <button
                        type="button"
                        onClick={() =>
                            navigate(`/app/tasks/${task.id}`)
                        }
                        className="block max-w-full truncate text-left text-sm font-bold primary-text transition hover:text-indigo-500 hover:underline"
                    >
                        {task.title}
                    </button>

                    {/* Description */}
                    <p className="
                                line-clamp-2
                                text-xs
                                leading-5
                                secondary-text
                            ">
                        {task.description}
                    </p>

                    {/* Project */}
                    <div className="
                                flex
                                items-center
                                gap-1.5
                                text-xs
                                secondary-text
                            ">
                        <FolderKanban size={15} />

                        <span className="truncate">
                            {task.project}
                        </span>
                    </div>

                </div>

                {/* Action menu */}
                {(onEdit || openDeleteModal) &&
                <div className="relative shrink-0">

                    <button
                        type="button"
                        onClick={() => handleMenuToggle(task.id)}
                        className="
                                    rounded-lg
                                    p-1.5
                                    secondary-text
                                    transition
                                    hover:bg-slate-500/10
                                    hover:primary-text
                                "
                        aria-label="Task actions"
                    >
                        <EllipsisVertical size={18} />
                    </button>

                    {openTaskId === task.id && (
                        <div
                            className="
                                        absolute
                                        right-0
                                        top-full
                                        z-50
                                        mt-1
                                        flex
                                        items-center
                                        gap-1
                                        rounded-lg
                                        border
                                        app-border
                                        surface
                                        p-1
                                        shadow-lg
                                    "
                        >

                            {/* Edit */}
                            <button
                                type="button"
                                onClick={() => handleEdit(task)}
                                className="
                                            rounded-lg
                                            p-2
                                            text-indigo-500
                                            transition
                                            hover:bg-indigo-50
                                            hover:text-indigo-600
                                            dark:text-indigo-400
                                            dark:hover:bg-indigo-500/10
                                            dark:hover:text-indigo-300
                                        "
                                aria-label="Edit task"
                            >
                                <SquarePen size={18} />
                            </button>

                            {/* Delete */}
                            <button
                                type="button"
                                onClick={() => handleDelete(task)}
                                className="
                                            rounded-lg
                                            p-2
                                            text-red-500
                                            transition
                                            hover:bg-red-50
                                            hover:text-red-600
                                            dark:text-red-400
                                            dark:hover:bg-red-500/10
                                            dark:hover:text-red-300
                                        "
                                aria-label="Delete task"
                            >
                                <Trash size={18} />
                            </button>

                        </div>
                    )}

                </div>
                }

            </div>

            {/* Bottom information */}
            <div className="
                        mt-3
                        flex
                        flex-wrap
                        items-center
                        justify-between
                        gap-2
                    ">

                {/* Priority + Status */}
                <div className="flex flex-wrap items-center gap-2">
                    <PriorityBadge priority={task.priority} />
                    <StatusBadge status={task.status} />
                </div>

                {/* Due date */}
                <div className="
                            flex
                            items-center
                            gap-1.5
                            text-xs
                            secondary-text
                        ">
                    <CalendarDays size={15} />

                    <span>
                        {task.dueDate}
                    </span>
                </div>

            </div>

        </div>
    ))
}
        </div >
    )
}

export default TaskCard