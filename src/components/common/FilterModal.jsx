import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearFilters, setPriorityFilter, setProjectFilter, setStatusFilter } from "../../redux/tasks/taskSlice"
import { ChevronDown, Filter, RotateCcw } from "lucide-react"
import FilterSection from "./FilterSection"

const statuses = ["Todo", "In Progress", "Review", "Done",]
const priorities = ["Low", "Medium", "High", "Urgent",]

const FilterModal = () => {
  const dispatch = useDispatch()
  const filters = useSelector(state => state.tasks.filters)

  const [isOpen, setIsOpen] = useState(false)

  const projects = useSelector(
    state => state.projects.projects
  )

  const [selectedProjects, setSelectedProjects] = useState([])
  const [selectedStatus, setSelectedStatus] = useState([])
  const [selectedPriorities, setSelectedPriorities] = useState([])

  useEffect(() => {
    if (isOpen) {
      setSelectedProjects(filters.projectId === "All"
        ? []
        : Array.isArray(filters.projectId)
          ? filters.projectId
          : [filters.projectId])

      setSelectedStatus(filters.status === "All"
        ? []
        : Array.isArray(filters.status)
          ? filters.status
          : [filters.status])

      setSelectedPriorities(filters.priority === "All"
        ? []
        : Array.isArray(filters.priority)
          ? filters.priority
          : [filters.priority])
    }
  }, [isOpen, filters])

  const toggleAll = (item, selected, setSelected) => {
    if (selected.length === item.length) {
      setSelected([])
    } else {
      setSelected(item)
    }
  }

  // action
  const handleApply = () => {
    dispatch(
      setProjectFilter(
        selectedProjects.length
          ? selectedProjects
          : "All"
      )
    )

    dispatch(
      setStatusFilter(
        selectedStatus.length
          ? selectedStatus
          : "All"
      )
    )

    dispatch(
      setPriorityFilter(
        selectedPriorities.length
          ? selectedPriorities
          : "All"
      )
    )

    setIsOpen(false)
  }

  const handleReset = () => {
    setSelectedProjects([])
    setSelectedStatus([])
    setSelectedPriorities([])

    dispatch(clearFilters())

    setIsOpen(false)
  }

  const projectOptions = projects.map(project => ({
    label: project.name,
    value: String(project.id)
  }))

  const isAllProjects = projects.length > 0 &&
    selectedProjects.length === projects.length

  const isAllStatuses = selectedStatus.length === statuses.length

  const isAllPriorities = selectedPriorities.length === priorities.length


  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="flex items-center gap-2 rounded-lg border app-border elevated-surface px-3 py-2 text-sm primary-text hover:bg-indigo-500/10">
        <Filter size={16} />
        <span>Filter</span>
        <ChevronDown
          size={16}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Filter Dropdown */}
      {isOpen && (
        <div
          className="absolute left-0 top-full z-50 mt-2 w-64 rounded-xl border app-border surface p-3 shadow-xl">
          {/* Project filter Section */}
          <FilterSection
            title="Projects"
            items={projectOptions}
            selected={selectedProjects}
            setSelected={setSelectedProjects}
            allSelected={isAllProjects}
            onAll={() =>
              toggleAll(
                projectOptions.map(project => project.value),
                selectedProjects,
                setSelectedProjects
              )
            }
          />
          {/* Status filter Section */}
          <FilterSection
            title="Status"
            items={statuses}
            selected={selectedStatus}
            setSelected={setSelectedStatus}
            allSelected={isAllStatuses}
            onAll={() =>
              toggleAll(
                statuses, selectedStatus, setSelectedStatus
              )
            }
          />

          {/* Priority filter Section */}
          <FilterSection
            title="Priority"
            items={priorities}
            selected={selectedPriorities}
            setSelected={setSelectedPriorities}
            allSelected={isAllPriorities}
            onAll={() =>
              toggleAll(
                priorities, selectedPriorities, setSelectedPriorities
              )
            }
          />

          <div className="flex gap-2 border-t app-border pt-3 mt-3">
            <button
              onClick={handleReset}
              className="flex flex-1 items-center justify-center gap-1 rounded-lg border app-border px-3 py-2 text-sm secondary-text hover:bg-slate-500/10">
              <RotateCcw size={14} />
              Reset
            </button>

            <button
              onClick={handleApply}
              className="flex-1 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700">

              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterModal
