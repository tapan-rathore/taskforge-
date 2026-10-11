import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { X } from 'lucide-react'
import { addTask, updateTask } from '../../redux/tasks/taskSlice'
import toast from 'react-hot-toast'

const TaskModal = ({
    isOpen,
    selectedTask,
    onClose,
    initialStatus = "Todo",
    initialProjectId = "",
}) => {
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const projects = useSelector(
        state => state.projects.projects
    )

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: "",
            description: "",
            status: "Todo",
            priority: "Medium",
            dueDate: "",
            projectId: initialProjectId,
            project: "",
            assignee: "",
            tags: "",
        },
    })

    useEffect(() => {
        if (selectedTask) {
            reset({
                title: selectedTask.title || "",
                description: selectedTask.description || "",
                status: selectedTask.status || "Todo",
                priority: selectedTask.priority || "Medium",
                dueDate: selectedTask.dueDate || "",
                projectId: selectedTask.projectId || "",
                project: selectedTask.project || "",
                assignee: selectedTask.assignee || "",
                tags: selectedTask.tags?.join(", ") || "",
            })
        } else {
            reset({
                title: "",
                description: "",
                status: initialStatus,
                priority: "Medium",
                dueDate: "",
                projectId: initialProjectId,
                project: "",
                assignee: "",
                tags: "",
            })
        }
    }, [selectedTask, reset, initialStatus, initialProjectId])

    const onSubmit = async (data) => {
        const selectedProject = projects.find(
            project =>
                String(project.id) === String(data.projectId)
        )

        setIsLoading(true)
        try {
            const formattedTags = data.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean)

            await new Promise(resolve => setTimeout(resolve, 1000))

            if (selectedTask) {
                const updatedTask = {
                    ...selectedTask,
                    ...data,
                    projectId: Number(data.projectId),
                    project: selectedProject?.name || "",
                    tags: formattedTags,
                }

                dispatch(updateTask(updatedTask))
                toast.success("Task updated successfully!")
            } else {
                const newTask = {
                    id: Date.now(),
                    ...data,
                    projectId: Number(data.projectId),
                    project: selectedProject?.name || "",
                    tags: formattedTags,
                    createdAt: new Date().toISOString(),
                }

                dispatch(addTask(newTask))
                toast.success("Task created successfully!")
            }

            onClose()
        } finally {
            setIsLoading(false)
        }
    }

    if (!isOpen) {
        return null
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm">

            <div className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-xl border app-border surface shadow-2xl overflow-hidden">

                {/* Modal Header */}
                <div className="surface app-border sticky top-0 z-10 flex items-center justify-between border-b px-6 py-4">

                    <div>
                        <h2 className="text-xl font-semibold primary-text">
                            {selectedTask
                                ? "Edit Task"
                                : "Create New Task"}
                        </h2>

                        <p className="mt-1 text-sm secondary-text">
                            {selectedTask
                                ? "Update your task details"
                                : "Add a new task to your workspace"}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="secondary-text flex h-9 w-9 items-center justify-center rounded-lg transition hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                        <X size={20} />
                    </button>

                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex-1 overflow-y-auto custom-scrollbar pb-10 p-5 space-y-2"
                >

                    {/* Title */}
                    <div>
                        <label className="mb-2 block text-sm font-medium primary-text">
                            Title
                        </label>

                        <input
                            type="text"
                            placeholder="Enter task title"
                            {...register("title", {
                                required: "Task title is required",
                            })}
                            className="w-full rounded-lg border app-border surface px-3 py-2.5 text-sm primary-text outline-none placeholder:text-slate-400 focus:border-indigo-500"
                        />

                        {errors.title && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="mb-2 block text-sm font-medium primary-text">
                            Description
                        </label>

                        <textarea
                            rows={4}
                            placeholder="Describe the task..."
                            {...register("description", {
                                required: "Task description is required",
                            })}
                            className="w-full resize-none rounded-lg border app-border surface px-3 py-2.5 text-sm primary-text outline-none placeholder:text-slate-400 focus:border-indigo-500"
                        />

                        {errors.description && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    {/* Status + Priority */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        <div>
                            <label className="mb-2 block text-sm font-medium primary-text">
                                Status
                            </label>

                            <select
                                {...register("status")}
                                className="w-full rounded-lg border app-border surface px-3 py-2.5 text-sm primary-text outline-none focus:border-indigo-500"
                            >
                                <option value="Todo">
                                    Todo
                                </option>

                                <option value="In Progress">
                                    In Progress
                                </option>

                                <option value="Review">
                                    Review
                                </option>

                                <option value="Done">
                                    Done
                                </option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium primary-text">
                                Priority
                            </label>

                            <select
                                {...register("priority")}
                                className="w-full rounded-lg border app-border surface px-3 py-2.5 text-sm primary-text outline-none focus:border-indigo-500"
                            >
                                <option value="Low">
                                    Low
                                </option>

                                <option value="Medium">
                                    Medium
                                </option>

                                <option value="High">
                                    High
                                </option>

                                <option value="Urgent">
                                    Urgent
                                </option>
                            </select>
                        </div>

                    </div>

                    {/* Due Date + Project */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        <div>
                            <label className="mb-2 block text-sm font-medium primary-text">
                                Due Date
                            </label>

                            <input
                                type="date"
                                {...register("dueDate", {
                                    required: "Due date is required",
                                })}
                                className="w-full rounded-lg border app-border surface px-3 py-2.5 text-sm primary-text outline-none focus:border-indigo-500"
                            />

                            {errors.dueDate && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.dueDate.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium primary-text">
                                Project Name
                            </label>

                            <select
                                {...register("projectId", {
                                    required: "Project is required",
                                })}
                                className="w-full rounded-lg border app-border surface px-3 py-2.5 text-sm primary-text outline-none focus:border-indigo-500"
                            >
                                <option value="">
                                    Select project
                                </option>

                                {projects.map(project => (
                                    <option
                                        key={project.id}
                                        value={project.id}
                                    >
                                        {project.name}
                                    </option>
                                ))}

                            </select>

                            {errors.projectId && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.projectId.message}
                                </p>
                            )}
                        </div>

                    </div>

                    {/* Assignee + Tags */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        <div>
                            <label className="mb-2 block text-sm font-medium primary-text">
                                Assignee
                            </label>

                            <input
                                type="text"
                                placeholder="Enter assignee"
                                {...register("assignee", {
                                    required: "Assignee is required",
                                })}
                                className="w-full rounded-lg border app-border surface px-3 py-2.5 text-sm primary-text outline-none placeholder:text-slate-400 focus:border-indigo-500"
                            />

                            {errors.assignee && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.assignee.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium primary-text">
                                Tags
                            </label>

                            <input
                                type="text"
                                placeholder="react, redux, ui"
                                {...register("tags")}
                                className="w-full rounded-lg border app-border surface px-3 py-2.5 text-sm primary-text outline-none placeholder:text-slate-400 focus:border-indigo-500"
                            />

                            <p className="mt-1 text-xs secondary-text">
                                Separate tags with commas
                            </p>
                        </div>

                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 border-t app-border pt-5">

                        <button
                            type="button"
                            disabled={isLoading}
                            onClick={onClose}
                            className="rounded-lg border app-border px-4 py-2.5 text-sm font-medium secondary-text transition hover:bg-slate-100 dark:hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {selectedTask
                                ? isLoading ? "Updating..." : "Update Task"
                                : isLoading ? "Creating..." : "Create Task"}
                        </button>

                    </div>

                </form>
            </div>
        </div>
    )
}

export default TaskModal