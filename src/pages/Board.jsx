import { useMemo, useState } from 'react'
import BoardHeader from '../components/board/BoardHeader'
import KanbanBoard from '../components/board/KanbanBoard'
import { useDispatch, useSelector } from 'react-redux'
import TaskModal from '../components/tasks/TaskModal'
import DeleteModal from '../components/common/DeleteModal'
import { deleteTask, updateTask } from '../redux/tasks/taskSlice'
import toast from 'react-hot-toast'

const Board = () => {
    const dispatch = useDispatch()

    const tasks = useSelector((state) => state.tasks.tasks)
    const projectFilter = useSelector((state) => state.tasks.filters.projectId)

    const [showTaskModal, setShowTaskModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedTask, setSelectedTask] = useState(null)
    const [initialStatus, setInitialStatus] = useState("Todo")

    const handleAddTask = (status) => {
        setSelectedTask(null)
        setInitialStatus(status)
        setShowTaskModal(true)
    }

    const handleEditTask = (task) => {
        setSelectedTask(task)
        setInitialStatus(task.status)
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

    const handleDropTask = (taskId, newStatus) => {
        const task = tasks.find(
            task => String(task.id) === String(taskId)
        )

        if (!task) return

        if (task.status === newStatus) return

        dispatch(
            updateTask({
                ...task,
                status: newStatus,
            })
        )

        toast.success(
            `Task moved to ${newStatus}`
        )
    }

    const filteredTasks = useMemo(() => {
        if (projectFilter === "All") {
            return tasks
        }

        if (Array.isArray(projectFilter)) {
            return tasks.filter(task =>
                projectFilter.includes(String(task.projectId))
            )
        }

        return tasks.filter(
            task => String(task.projectId) === String(projectFilter)
        )
    }, [tasks, projectFilter])

    return (
        <div>
            <BoardHeader handleAddTask={handleAddTask} />
            <KanbanBoard
                filteredTasks={filteredTasks}
                onEdit={handleEditTask}
                openDeleteModal={openDeleteModal}
                onDropTask={handleDropTask}
                onAddTask={handleAddTask}
            />

            {showTaskModal && (
                <TaskModal
                    isOpen={showTaskModal}
                    selectedTask={selectedTask}
                    onClose={handleCloseModal}
                    initialStatus={initialStatus}
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

export default Board 
