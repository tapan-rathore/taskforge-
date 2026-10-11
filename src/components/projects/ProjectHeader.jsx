import { Plus } from "lucide-react"
import Button from "../common/Button"

const ProjectHeader = ({handleAddProject}) => {

    return (
        <div className="flex items-center gap-4 justify-between">
            {/* Left */}
            <div>
                <h2 className="text-2xl sm:text-3xl font-bold primary-text">
                    Projects
                </h2>
                <p className="mt-1 text-sm sm:text-base secondary-text">
                    Manage your projects, track progress and keep your team aligned.
                </p>
            </div>

            <Button
                name="Create Project"
                icon={Plus}
                handleAddTask={handleAddProject}
            />
        </div>
    )
}

export default ProjectHeader
