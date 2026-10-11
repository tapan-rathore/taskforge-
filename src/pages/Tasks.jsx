import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TaskHeader from "../components/tasks/TaskHeader"
import TaskTable from "../components/tasks/TaskTable"
import { deleteTask, setPriorityFilter, setStatusFilter, setProjectFilter, setSortFilter } from "../redux/tasks/taskSlice"
import TaskModal from "../components/tasks/TaskModal"
import toast from "react-hot-toast"
import DeleteModal from "../components/common/DeleteModal"

const Tasks = () => {
    const dispatch = useDispatch()

    const tasks = useSelector((state) => state.tasks.tasks)
    const filters = useSelector((state) => state.tasks.filters)
    const projects = useSelector(
        state => state.projects.projects
    )

    const [showTaskModal, setShowTaskModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedTask, setSelectedTask] = useState(null)

    const handleAddTask = () => {
        setSelectedTask(null)
        setShowTaskModal(true)
    }

    const handleEditTask = (task) => {
        setSelectedTask(task)
        setShowTaskModal(true)
    }

    const openDeleteModal = (task) => {
        setShowDeleteModal(true)
        setSelectedTask(task)
    }

    const handleDeleteTask = (taskId) => {
        dispatch(deleteTask(taskId))
        setShowDeleteModal(false)
        setSelectedTask(null)
        toast.success(`Task #${taskId} deleted successfully!`)
    }

    const handleCloseModal = () => {
        setShowTaskModal(false)
        setShowDeleteModal(false)
        setSelectedTask(null)
    }

    const filteredTasks = useMemo(() => {
        const search = filters.search.toLowerCase()

        const result = tasks.filter(task => {
            const project = projects.find(
                project =>
                    String(project.id) === String(task.projectId)
            )

            const projectName = project?.name || task.project || ""

            const searchMatch =
                task.title?.toLowerCase().includes(search) ||
                task.description?.toLowerCase().includes(search) ||
                projectName.toLowerCase().includes(search) ||
                task.assignee?.toLowerCase().includes(search)


            const projectMatch =
                filters.projectId === "All" ||
                (
                    Array.isArray(filters.projectId)
                        ? filters.projectId.includes(String(task.projectId))
                        : String(filters.projectId) === String(task.projectId)
                )

            const statusMatch =
                filters.status === "All" ||
                filters.status.includes(task.status)

            const priorityMatch =
                filters.priority === "All" ||
                filters.priority.includes(task.priority)

            return (
                searchMatch && projectMatch && statusMatch && priorityMatch
            )
        })

        return [...result.sort((a, b) => {
            if (filters.sort === "newest") {
                return new Date(b.createdAt) - new Date(a.createdAt)
            }

            if (filters.sort === "oldest") {
                return new Date(a.createdAt) - new Date(b.createdAt)
            }

            if (filters.sort === "dueDate") {
                return new Date(a.dueDate) - new Date(b.dueDate)
            }

            if (filters.sort === "alphabetical") {
                return a.title.localeCompare(b.title)
            }

            if (filters.sort === "priority") {
                const priorityOrder = {
                    Urgent: 4,
                    High: 3,
                    Medium: 2,
                    Low: 1,
                }

                return (
                    priorityOrder[b.priority] -
                    priorityOrder[a.priority]
                )
            }

            return new Date(b.createdAt) - new Date(a.createdAt)
        })]
    }, [tasks, filters, projects])
    
    return (
        <div className="space-y-6">
            <TaskHeader handleAddTask={handleAddTask} />
            <TaskTable
                filteredTasks={filteredTasks}
                onEdit={handleEditTask}
                openDeleteModal={openDeleteModal}
            />

            {showTaskModal && (
                <TaskModal
                    isOpen={showTaskModal}
                    selectedTask={selectedTask}
                    onClose={handleCloseModal}

                />
            )}

            {showDeleteModal && (
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

export default Tasks