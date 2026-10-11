import { Funnel, Plus } from "lucide-react"
import Button from "../common/Button"
import FilterButton from "../tasks/FilterButton"
import { useDispatch, useSelector } from "react-redux"
import { setProjectFilter } from "../../redux/tasks/taskSlice"

const BoardHeader = ({ handleAddTask }) => {
    const dispatch = useDispatch()

    const value = useSelector(state => state.tasks.filters.projectId)
    const projects = useSelector(state => state.projects.projects)

    const projectFilter = {
        btnName: "All Projects",
        type: "project",
        icon: Funnel,
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
    }

    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
            {/* Left */}
            <div className="flex items-center gap-2">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold primary-text">
                        Board
                    </h2>
                    <p className="mt-1 text-sm sm:text-base secondary-text">
                        Drag and drop task to update their status
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between gap-2">
                <FilterButton
                    item={projectFilter}
                    value={Array.isArray(value) ? "All" : value}
                    onChange={(value) => dispatch(setProjectFilter(value))}
                />
                <Button
                    name="New Task"
                    icon={Plus}
                    handleAddTask={() => handleAddTask("Todo")}
                />
            </div>
        </div>
    )
}

export default BoardHeader
