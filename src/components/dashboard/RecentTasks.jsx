import { Link } from 'react-router'
import PriorityBadge from './PriorityBadge'
import StatusBadge from '../common/StatusBadge'
import TaskCard from '../tasks/TaskCard'
import { useSelector } from 'react-redux'

const RecentTasks = () => {
    const tasks = useSelector((state) => state.tasks.tasks)

    const recentTasks = [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5)

    return (
        <div className="surface app-border border rounded-xl p-5 space-y-2 shadow-sm">
            <div className='flex justify-between'>
                <div>
                    <h2 className="text-lg font-semibold primary-text">
                        Recent Tasks
                    </h2>

                    <p className="text-sm secondary-text">
                        Your Recent tasks
                    </p>
                </div>

                <Link to="/app/tasks"
                    className='text-sm font-medium text-indigo-600 hover:text-indigo-800'>
                    View all
                </Link>
            </div>

            {/* Recent task table */}
            <div className='hidden sm:block w-full overflow-x-auto rounded-lg border elevated-surface app-border shadow-sm'>
                <table className='w-full table-auto border-collapse text-left text-sm'>

                    {/* Table Header */}
                    <thead className='primary-text'>
                        <tr>
                            <th className='px-4 py-3 text-center'>
                                <input type="checkbox" className='mt-1 h-4 w-4 cursor-pointer appearance-none rounded border app-border bg-transparent checked:bg-indigo-600 checked:border-indigo-600 focus:ring-2 focus:ring-indigo-500/30' />
                            </th>
                            <th className='px-4 py-3'>
                                Task
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
                        </tr>
                    </thead>
                    <tbody className='text-sm font-medium surface secondary-text'>
                        {recentTasks.map((task) => (
                            <tr
                                key={task.id}
                                className='border-t app-border hover:elevated-surface transition'>
                                <td className='px-4 py-3 text-center'>
                                    <input type="checkbox" className='mt-1 h-4 w-4 cursor-pointer appearance-none rounded border app-border bg-transparent checked:bg-indigo-600 checked:border-indigo-600 focus:ring-2 focus:ring-indigo-500/30' />
                                </td>
                                <td className='px-4 py-3'>
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
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

            {/* Mobile task table */}
            <div className='sm:hidden'>
                <TaskCard tasks={recentTasks} />
            </div>
        </div>
    )
}

export default RecentTasks
