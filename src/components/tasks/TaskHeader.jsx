import { Plus } from "lucide-react"
import Button from "../common/Button"

const TaskHeader = ({handleAddTask}) => {

    return (
        <div className="flex items-center gap-4 justify-between">
            {/* Left */}
            <div>
                <h2 className="text-2xl sm:text-3xl font-bold primary-text">
                    Tasks
                </h2>
                <p className="mt-1 text-sm sm:text-base secondary-text">
                    Manage and organise your tasks
                </p>
            </div>

            <Button
                name="Add Task"
                icon={Plus}
                handleAddTask={handleAddTask}
            />
        </div>
    )
}

export default TaskHeader
