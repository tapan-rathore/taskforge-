import { Check, Circle, Clock3, Eye, Plus } from "lucide-react"
import TaskCard from "../tasks/TaskCard"

const columnConfig = {
    Todo: {
        icon: Circle,
        iconStyle: "bg-slate-500",
    },
    "In Progress": {
        icon: Clock3,
        iconStyle: "bg-blue-500",
    },

    Review: {
        icon: Eye,
        iconStyle: "bg-violet-500",
    },

    Done: {
        icon: Check,
        iconStyle: "bg-emerald-500",
    },
}

const Column = ({ status, tasks, onEdit, openDeleteModal, onDropTask, onAddTask }) => {
    const config = columnConfig[status]
    const Icon = config.icon

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const handleDrop = (e) => {
        e.preventDefault()

        const taskId = e.dataTransfer.getData("taskId")

        if (!taskId) return

        onDropTask(taskId, status)
    }

    return (
        <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`flex min-h-105 flex-col rounded-xl border app-border p-4 surface shadow-sm mt-4`}>

            {/* Header */}
            <div className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg  ${config.iconStyle}`}>
                        <Icon size={16} className="text-white" />
                    </div>
                    <span className="font-semibold primary-text">
                        {status}
                    </span>
                </div>
                <span className="text-sm secondary-text">
                    {tasks.length}
                </span>
            </div>

            {/* Tasks */}
            <div className="mt-3 flex-1">
                <TaskCard
                    tasks={tasks}
                    onEdit={onEdit}
                    openDeleteModal={openDeleteModal}
                    onDragStart={(e, task) => {
                        e.dataTransfer.setData(
                            "taskId", 
                            String(task.id)
                        )
                    }}
                />
            </div>

            {/* Add task */}
            <button
                onClick={() => onAddTask(status)}
                className="flex w-full p-2 rounded-lg items-center justify-center gap-2 elevated-surface secondary-text border app-border shadow-sm transition hover:-translate-y-0.5 cursor-pointer mt-4">

                <Plus size={18}/>
                <span>Add Task</span>
            </button>
        </div>
    )
}

export default Column
