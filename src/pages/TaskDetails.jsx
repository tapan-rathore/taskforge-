import { ArrowLeft, CalendarDays, ChevronDown, Circle, Edit, FileText, FolderKanban, Trash2, User } from "lucide-react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router"
import StatusBadge from "../components/common/StatusBadge"
import PriorityBadge from "../components/dashboard/PriorityBadge"
import TaskMeta from "../components/tasks/TaskMeta"
import TaskModal from "../components/tasks/TaskModal"
import { deleteTask, updateTask } from "../redux/tasks/taskSlice"
import DeleteModal from "../components/common/DeleteModal"
import toast from "react-hot-toast"

const TaskDetails = () => {
    const { taskId } = useParams()
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const tasks = useSelector((state) => state.tasks.tasks)

    const task = tasks.find(
        (task) => String(task.id) === String(taskId)
    )

    const [showTaskModal, setShowTaskModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedTask, setSelectedTask] = useState(null)

    const options = [
        {
            label: "Todo",
            value: "Todo"
        },
        {
            label: "In Progress",
            value: "In Progress"
        },
        {
            label: "Review",
            value: "Review"
        },
        {
            label: "Done",
            value: "Done"
        }
    ]

    const handleEditTask = (task) => {
        setSelectedTask(task)
        setShowTaskModal(true)
    }

    const openDeleteModal = (task) => {
        setSelectedTask(task)
        setShowDeleteModal(true)
    }

    const handleDeleteTask = (taskId) => {
        dispatch(deleteTask(taskId))
        setShowDeleteModal(false)
        setSelectedTask(null)
        navigate("/app/tasks")
        toast.success(`Task #${taskId} deleted successfully!`)

    }

    const handleCloseModal = () => {
        setShowTaskModal(false)
        setShowDeleteModal(false)
        setSelectedTask(null)
    }

    const handleSetStatus = (newStatus) => {
        const updatedTask = {
            ...task,
            status: newStatus
        }

        dispatch(updateTask(updatedTask))
    }

    // Task not found
    if (!task) {
        return (
            <div className="
                flex
                min-h-[60vh]
                flex-col
                items-center
                justify-center
                text-center
            ">
                <h2 className="text-xl font-semibold primary-text">
                    Task not found
                </h2>

                <p className="mt-1 text-sm secondary-text">
                    The task you're looking for doesn't exist.
                </p>

                <Link
                    to="/app/tasks"
                    className="
                        mt-4
                        rounded-lg
                        bg-indigo-600
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-white
                        hover:bg-indigo-700
                    "
                >
                    Back to Tasks
                </Link>
            </div>
        )
    }

    return (
        <div className="space-y-4">

            {/* ================= HEADER ================= */}
            <div className="flex gap-4 items-center justify-between">

                {/* Back */}
                <Link
                    to="/app/tasks"
                    className="flex w-fit items-center gap-2 text-sm secondary-text hover:primary-text">
                    <ArrowLeft size={18} />
                    Back to Tasks
                </Link>


                {/* Actions */}
                <div className="flex items-center gap-2">

                    <button
                        className="flex items-center gap-2 rounded-lg border app-border px-3 py-2 text-sm font-medium primary-text hover:bg-slate-500/10"
                        onClick={() => handleEditTask(task)}
                    >
                        <Edit size={16} />
                        <span className="hidden sm:inline">
                            Edit
                        </span>
                    </button>

                    <button
                        className="
                            flex
                            items-center
                            gap-2
                            rounded-lg
                            border
                            border-red-500/30
                            px-3
                            py-2
                            text-sm
                            font-medium
                            text-red-500
                            hover:bg-red-500/10
                        "
                        onClick={() => openDeleteModal(task)}
                    >
                        <Trash2 size={16} />
                        <span className="hidden sm:inline">
                            Delete
                        </span>
                    </button>
                </div>
            </div>

            {/* ================= MAIN GRID ================= */}

            <div className="
                grid
                grid-cols-1
                gap-4
                lg:grid-cols-[minmax(0,1fr)_320px]
            ">

                {/* ================= LEFT CONTENT ================= */}

                <div className="space-y-4">

                    {/* Task Header */}
                    <div className="
                        surface
                        app-border
                        rounded-xl
                        border
                        p-4
                        sm:p-6
                    ">

                        {/* Title */}
                        <div className="flex gap-3">

                            <button
                                className="
                                    mt-1
                                    shrink-0
                                    secondary-text
                                "
                            >
                                <Circle size={22} />
                            </button>

                            <div className="min-w-0">

                                <h1 className="
                                    text-xl
                                    font-bold
                                    primary-text
                                    sm:text-2xl
                                ">
                                    {task.title}
                                </h1>

                                <p className="
                                    mt-2
                                    text-sm
                                    leading-6
                                    secondary-text
                                ">
                                    {task.description ||
                                        "No description available for this task."}
                                </p>

                            </div>

                        </div>


                        {/* Badges */}
                        <div className="
                            mt-5
                            flex
                            flex-wrap
                            items-center
                            gap-2
                            border-t
                            app-border
                            pt-4
                        ">

                            <StatusBadge
                                status={task.status}
                            />

                            <PriorityBadge
                                priority={task.priority}
                            />

                            <div className="
                                flex
                                items-center
                                gap-2
                                text-sm
                                secondary-text
                            ">
                                <FolderKanban size={16} />
                                <span>
                                    Project {task.project}
                                </span>
                            </div>

                            <div className="
                                flex
                                items-center
                                gap-2
                                text-sm
                                secondary-text
                            ">
                                <User size={16} />
                                <span>
                                    {task.assignee || "Unassigned"}
                                </span>
                            </div>

                        </div>


                        {/* Dates */}
                        <div className="
                            mt-5
                            grid
                            grid-cols-2
                            gap-4
                            border-t
                            app-border
                            pt-4
                        ">

                            <div className="flex items-center gap-3">

                                <div className="
                                    flex
                                    h-9
                                    w-9
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-indigo-500/10
                                    text-indigo-500
                                ">
                                    <CalendarDays size={18} />
                                </div>

                                <div>
                                    <p className="text-xs secondary-text">
                                        Due Date
                                    </p>

                                    <p className="text-sm font-medium primary-text">
                                        {task.dueDate}
                                    </p>
                                </div>

                            </div>


                            <div className="flex items-center gap-3">

                                <div className="
                                    flex
                                    h-9
                                    w-9
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-indigo-500/10
                                    text-indigo-500
                                ">
                                    <CalendarDays size={18} />
                                </div>

                                <div>
                                    <p className="text-xs secondary-text">
                                        Created
                                    </p>

                                    <p className="text-sm font-medium primary-text">
                                        {task.createdAt}
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="lg:hidden surface app-border rounded-xl border p-5">
                        <h2 className="mb-3 text-base font-semibold primary-text">
                            Change Status
                        </h2>

                        <div className="relative">
                            <select
                                value={task.status}
                                onChange={(e) => handleSetStatus(e.target.value)}
                                className="
                appearance-none
                w-full
                rounded-lg
                border
                app-border
                elevated-surface
                px-4
                py-2
                text-sm
                primary-text
                outline-none
                cursor-pointer
                focus:border-indigo-500
            "
                            >
                                {options.map((item) => (
                                    <option
                                        key={item.value}
                                        value={item.value}
                                    >
                                        {item.label}
                                    </option>
                                ))}
                            </select>

                            <ChevronDown
                                size={16}
                                className=" pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 secondary-text"
                            />
                        </div>
                    </div>


                    {/* Description */}
                    <div className="
                        surface
                        app-border
                        rounded-xl
                        border
                        p-4
                        sm:p-6
                    ">

                        <div className="
                            mb-4
                            flex
                            items-center
                            gap-2
                        ">
                            <FileText
                                size={19}
                                className="text-indigo-500"
                            />

                            <h2 className="
                                text-base
                                font-semibold
                                primary-text
                            ">
                                Description
                            </h2>
                        </div>

                        <p className="
                            text-sm
                            leading-7
                            secondary-text
                        ">
                            {task.description ||
                                "No description has been added to this task."}
                        </p>

                    </div>

                    {/* Mobile Task Details */}
                    <div className="
                        surface
                        app-border
                        rounded-xl
                        border
                        p-4
                        lg:hidden
                    ">

                        <h2 className="
                            mb-4
                            text-base
                            font-semibold
                            primary-text
                        ">
                            Task Details
                        </h2>

                        <TaskMeta task={task} />

                    </div>


                    {/* Comments */}
                    <div className="
                        surface
                        app-border
                        rounded-xl
                        border
                        p-4
                        sm:p-6
                    ">

                        <h2 className="
                            text-base
                            font-semibold
                            primary-text
                        ">
                            Comments
                        </h2>

                        <div className="mt-4">

                            <textarea
                                rows={3}
                                placeholder="Add a comment..."
                                className="
                                    w-full
                                    resize-none
                                    rounded-lg
                                    border
                                    app-border
                                    surface
                                    p-3
                                    text-sm
                                    primary-text
                                    outline-none
                                    placeholder:text-slate-400
                                    focus:border-indigo-500
                                    focus:ring-2
                                    focus:ring-indigo-500/20
                                "
                            />

                            <div className="
                                mt-2
                                flex
                                justify-end
                            ">
                                <button
                                    className="
                                        rounded-lg
                                        bg-indigo-600
                                        px-4
                                        py-2
                                        text-sm
                                        font-medium
                                        text-white
                                        hover:bg-indigo-700
                                    "
                                >
                                    Add Comment
                                </button>
                            </div>

                        </div>

                    </div>

                </div>


                {/* ================= RIGHT SIDEBAR ================= */}

                <aside className="
                    hidden
                    space-y-4
                    lg:block
                ">

                    {/* Status */}
                    <div className="
                        surface
                        app-border
                        rounded-xl
                        border
                        p-5
                    ">

                        <h2 className="
                            mb-3
                            text-base
                            font-semibold
                            primary-text
                        ">
                            Change Status
                        </h2>

                        <div className="relative flex items-center gap-2">
                            <span className=" h-2.5 w-2.5 rounded-full bg-blue-500 pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 secondary-text"
                            />

                            <select
                                value={task.status}
                                onChange={(e) => handleSetStatus(e.target.value)}
                                className="text-sm appearance-none w-full rounded-lg border app-border elevated-surface px-9 py-2 primary-text outline-none cursor-pointer focus:border-indigo-500">
                                {options.map(item =>
                                    <option key={item.value} value={item.value}>
                                        {item.label}
                                    </option>
                                )}
                            </select>
                            <ChevronDown
                                size={16}
                                className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 secondary-text'
                            />

                        </div>

                    </div>


                    {/* Details */}
                    <div className="
                        surface
                        app-border
                        rounded-xl
                        border
                        p-5
                    ">

                        <h2 className="
                            mb-5
                            text-base
                            font-semibold
                            primary-text
                        ">
                            Task Details
                        </h2>

                        <TaskMeta task={task} />

                    </div>

                </aside>

            </div>

            {showTaskModal && (
                <TaskModal
                    isOpen={showTaskModal}
                    selectedTask={selectedTask}
                    onClose={handleCloseModal}
                />
            )}

            {showDeleteModal && selectedTask && (
                <DeleteModal
                    item={selectedTask}
                    itemType="task"
                    onClose={handleCloseModal}
                    onDelete={handleDeleteTask}
                />
            )}

        </div>
    )
}

export default TaskDetails