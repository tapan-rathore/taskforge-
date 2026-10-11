import { Funnel, ListSortDescending, SquarePen, Trash } from 'lucide-react'
import FilterButton from './FilterButton'
import PriorityBadge from '../dashboard/PriorityBadge'
import StatusBadge from '../common/StatusBadge'
import TaskCard from './TaskCard'
import { useDispatch, useSelector } from 'react-redux'
import { setPriorityFilter, setProjectFilter, setSortFilter, setStatusFilter } from '../../redux/tasks/taskSlice'
import { useNavigate } from 'react-router'
import FilterModal from '../common/FilterModal'

const TaskTable = ({ filteredTasks, onEdit, openDeleteModal }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const tasks = useSelector(state => state.tasks.tasks)
    const filters = useSelector(state => state.tasks.filters)

    const projects = useSelector(
        state => state.projects.projects
    )
    const filterItems = [
        {
            btnName: "All Projects",
            type: "project",
            options: [
                {
                    label: "All Projects",
                    value: "All"
                },
                ...projects.map(project => ({
                    label: project.name,
                    value: String(project.id)
                }))

            ]
        },
        {
            btnName: "All Status",
            type: "status",
            options: [
                {
                    label: "All Status",
                    value: "All"
                },
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
        },
        {
            btnName: "All Priority",
            type: "priority",
            options: [
                {
                    label: "All Priority",
                    value: "All"
                },
                {
                    label: "Low",
                    value: "Low"
                },
                {
                    label: "Medium",
                    value: "Medium"
                },
                {
                    label: "High",
                    value: "High"
                },
                {
                    label: "Urgent",
                    value: "Urgent"
                }
            ]
        },
        {
            btnName: "Sort",
            type: "sort",
            icon: ListSortDescending,
            options: [
                {
                    label: "Newest",
                    value: "newest"
                },
                {
                    label: "Oldest",
                    value: "oldest"
                },
                {
                    label: "Due Date",
                    value: "dueDate"
                },
                {
                    label: "Alphabetical",
                    value: "alphabetical"
                },
                {
                    label: "Priority",
                    value: "priority"
                }
            ]
        }
    ]

    const handleFilterChange = (type, value) => {
        switch (type) {
            case "project":
                dispatch(setProjectFilter(value))
                break

            case "status":
                dispatch(setStatusFilter(value))
                break

            case "priority":
                dispatch(setPriorityFilter(value))
                break

            case "sort":
                dispatch(setSortFilter(value))
                break

            default:
                break
        }
    }

    return (
        <div className='w-full overflow-x-auto rounded-lg border elevated-surface app-border shadow-sm p-2'>
            {/* Desktop Filter View */}
            <div className='hidden sm:flex gap-2'>
                <FilterModal />
                {filterItems.map((item) => (
                    <FilterButton
                        key={item.type}
                        item={item}
                        value={
                            item.type === "project"
                                ? (
                                    Array.isArray(filters.projectId)
                                        ? "All"
                                        : filters.projectId
                                )
                                : filters[item.type]
                        }
                        onChange={(value) => handleFilterChange(item.type, value)}
                    />
                ))}
            </div>
            {/* Mobile filter view */}
            <div className='flex sm:hidden justify-start gap-2'>
                <FilterModal />
                <FilterButton
                    item={filterItems[3]}
                    value={filters.sort}
                    onChange={(value) => handleFilterChange("sort", value)}
                />
            </div>

            {/* Result Count */}
            <div className='flex items-center justify-between m-1'>
                <p className='text-sm secondary-text'>
                    Showing{" "}
                    <span className='font-semibold primary-text'>
                        {filteredTasks.length}
                    </span>
                    {" "}of{" "}
                    <span className="font-semibold primary-text">
                        {tasks.length}
                    </span>
                    {" "}tasks
                </p>
            </div>

            {/* Desktop Table */}
            <div className='hidden sm:block w-full min-h-[calc(100vh-260px)] overflow-x-auto rounded-lg border elevated-surface app-border shadow-sm mt-1'>
                <table className='w-full table-auto border-collapse text-left text-sm'>

                    {/* Table Header */}
                    <thead className='primary-text'>
                        <tr className='elevated-surface app-border border shadow-sm'>
                            <th className='px-4 py-3 text-center'>
                                <input type="checkbox" className='mt-1 h-4 w-4 cursor-pointer appearance-none rounded border app-border bg-transparent checked:bg-indigo-600 checked:border-indigo-600 focus:ring-2 focus:ring-indigo-500/30' />
                            </th>
                            <th className='px-4 py-3'>
                                Title
                            </th>
                            <th className='px-4 py-3'>
                                Project
                            </th>
                            <th className='px-4 py-3'>
                                Priority
                            </th>
                            <th className='px-4 py-3'>
                                Due Date
                            </th>
                            <th className='px-4 py-3'>
                                Status
                            </th>
                            <th className='px-4 py-3'>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className='text-sm font-medium surface secondary-text'>
                        {filteredTasks.map(task => (
                            <tr key={task.id}
                                className='app-border border shadow-sm'>
                                <td className='px-4 py-3 text-center'>
                                    <input type="checkbox" className='mt-1 h-4 w-4 cursor-pointer appearance-none rounded border app-border bg-transparent checked:bg-indigo-600 checked:border-indigo-600 focus:ring-2 focus:ring-indigo-500/30' />
                                </td>
                                <td
                                    onClick={() => navigate(`/app/tasks/${task.id}`)}
                                    className='px-4 py-3 cursor-pointer hover:underline hover:text-indigo-500'>
                                    {task.title}
                                </td>
                                <td className='px-4 py-3'>
                                    {task.project}
                                </td>
                                <td className='px-4 py-3'>
                                    <PriorityBadge priority={task.priority} />
                                </td>
                                <td className='px-4 py-3 whitespace-nowrap'>
                                    {task.dueDate}
                                </td>
                                <td className='px-4 py-3'>
                                    <StatusBadge status={task.status} />
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
            </div>

            {/* Mobile Card Table */}
            <div className='sm:hidden min-h-[calc(100vh-300px)]'>
                <TaskCard
                    tasks={filteredTasks}
                    onEdit={onEdit}
                    openDeleteModal={openDeleteModal}
                />
            </div>
        </div>
    )
}

export default TaskTable
