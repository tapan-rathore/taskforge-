import { ClipboardList, Plus, SquarePen, Trash } from 'lucide-react'
import PriorityBadge from '../dashboard/PriorityBadge'
import StatusBadge from '../common/StatusBadge'
import { useNavigate } from 'react-router'

const ProjectTable = ({ projectTasks, onEdit, openDeleteModal, onAddTask }) => {

    const navigate = useNavigate()

    return (
        <div className='rounded-xl border app-border elevated-surface p-4 shadow-sm'>

            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-2">

                    <ClipboardList
                        size={20}
                        className="text-indigo-500"
                    />

                    <h2 className="text-base font-semibold primary-text">
                        Project Tasks
                    </h2>
                </div>

                <button
                    type="button"
                    onClick={onAddTask}
                    className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
                >
                    <Plus size={16} />
                    Add Task
                </button>

            </div>

            {/* Desktop Table */}
            <div className='mt-4 overflow-x-auto'>
                <table className='w-full min-w-175 text-left text-sm'>

                    {/* Table Header */}
                    <thead>
                        <tr className='border-b app-border text-xs secondary-text'>
                            <th className='px-4 py-3'>
                                Task
                            </th>
                            <th className='px-4 py-3'>
                                Priority
                            </th>
                            <th className='px-4 py-3'>
                                Status
                            </th>
                            <th className='px-4 py-3'>
                                Due Date
                            </th>
                            <th className='px-4 py-3'>
                                Assignee
                            </th>
                            <th className='px-4 py-3'>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {projectTasks.slice(0, 8).map(task => (
                            <tr key={task.id}
                                className='border-b app-border last:border-b-0'>
                                <td className='px-4 py-3 flex-1'>
                                    <button
                                        className='font-medium primary-text hover:text-indigo-500 hover:underline'
                                        onClick={() => navigate(`/app/tasks/${task.id}`)}>

                                        {task.title}
                                    </button>
                                    <p className='mt-1 max-w-xs line-clamp-2 text-xs secondary-text'>
                                        {task.description}
                                    </p>
                                </td>
                                <td className='px-4 py-3'>
                                    <PriorityBadge priority={task.priority} />
                                </td>
                                <td className='px-4 py-3'>
                                    <StatusBadge status={task.status} />
                                </td>
                                <td className='px-4 py-3 whitespace-nowrap'>
                                    {task.dueDate}
                                </td>
                                <td className='px-4 py-3'>
                                    <div className='flex gap-1 items-center justify-center'>
                                        <div
                                            className={`mx-auto flex h-6 w-6 items-center justify-center rounded-full border-2 elevated-surface text-[8px] font-semibold primary-text`}
                                        >
                                            {task.assignee?.trim()?.charAt(0)?.toUpperCase() || "U"}                                        </div>
                                        <span className='text-xs'>
                                            {task.assignee || "Unassigned"}                                        </span>
                                    </div>
                                </td>
                                <td className='px-4 py-3 flex gap-2'>
                                    <button type='button'
                                        onClick={() => onEdit(task)} className='rounded-lg p-2 text-indigo-500 hover:bg-indigo-50 hover:text-indigo-600 dark:text-indigo-400 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-300 transition'>
                                        <SquarePen size={18} />
                                    </button>

                                    <button type='button'
                                        onClick={() => openDeleteModal(task)}
                                        className='rounded-lg p-2 text-red-500 hover:bg-red-50 hover:text-red-600 dark:text-red-400 dark:hover:bg-red-500/10 dark:hover:text-red-300 transition'>
                                        <Trash size={18} />
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>

                {projectTasks.length === 0 && (
                    <div className="py-12 text-center">

                        <ClipboardList
                            size={32}
                            className="mx-auto secondary-text"
                        />

                        <p className="mt-3 text-sm font-medium primary-text">
                            No tasks in this project
                        </p>

                        <p className="mt-1 text-xs secondary-text">
                            Add your first task to this project.
                        </p>

                    </div>
                )}
            </div>

            {/* Footer */}
            {projectTasks.length > 8 && (
                <div className="mt-3 flex items-center justify-between border-t app-border pt-3">

                    <span className="text-xs secondary-text">
                        Showing 8 of {projectTasks.length} tasks
                    </span>

                    <button
                        type="button"
                        onClick={() => navigate("/app/tasks")}
                        className="text-xs font-medium text-indigo-500 hover:underline"
                    >
                        View all tasks →
                    </button>

                </div>
            )}
        </div>
    )
}

export default ProjectTable
