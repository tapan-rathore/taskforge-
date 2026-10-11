import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addProject, updateProject } from '../../redux/project/projectSlice';
import ProjectIconPicker from "./ProjectIconPicker"

const ProjectModal = ({ selectedProject, onClose }) => {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const isEditMode = Boolean(selectedProject)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: "#6366f1",
    status: "Active",
    icon: "Rocket",
    members: []
  })

  useEffect(() => {
    if (selectedProject) {
      setFormData({
        name: selectedProject.name || "",
        description: selectedProject.description || "",
        color: selectedProject.color || "#6366f1",
        status: selectedProject.status || "Active",
        icon: selectedProject.icon || "Rocket",
        members: selectedProject.members || []
      })
    } else {
      setFormData({
        name: "",
        description: "",
        color: "#6366f1",
        status: "Active",
        icon: "Rocket",
        members: []
      })
    }

  }, [selectedProject])

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      toast.error("Project name is required")
      return
    }

    setIsLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (isEditMode) {
        const updatedProject = {
          ...selectedProject,
          ...formData
        }

        dispatch(updateProject(updatedProject))
        toast.success("Project updated successfully!")

      } else {
        const newProject = {
          id: Date.now(),
          ...formData,
          createdAt: new Date().toISOString()
        }

        dispatch(addProject(newProject))
        toast.success("Project created successfully!")
      }

      onClose()
    } finally {
      setIsLoading(false)
    }

  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 py-0.5 sm:items-center">

      {/* Modal */}
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-lg border app-border elevated-surface shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b app-border p-5">

          <div>
            <h2 className="text-lg font-semibold primary-text">
              {isEditMode
                ? "Edit Project"
                : "Create Project"}
            </h2>
            <p className="m-1 text-sm secondary-text">
              {isEditMode
                ? "Update project information"
                : "Create a new project"}
            </p>
          </div>

          <button
            type='button'
            onClick={onClose}
            className='rounded-lg p-2 secondary-text hover:bg-slate-500/10'>
            <X size={18} />
          </button>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className='flex-1 space-y-4 overflow-y-auto p-4 custom-scrollbar'
        >

          {/* Project Name */}
          <div>
            <label
              htmlFor="name"
              className='mb-1 block text-sm font-medium primary-text'
            >
              Project Name
            </label>
            <input
              type="text"
              name='name'
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder='Enter project Name'
              className='w-full rounded-lg border app-border elevated-surface px-3 py-2 text-sm primary-text outline-none focus:border-indigo-500'
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className='mb-1 block text-sm font-medium primary-text'
            >
              Description
            </label>
            <textarea
              name='description'
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder='Enter project description'
              className='w-full rounded-lg border app-border elevated-surface px-3 py-2 text-sm primary-text outline-none focus:border-indigo-500'
            />
          </div>

          {/* Color */}
          <div className='flex justify-between gap-2'>
            <div>
              <label className='mb-1 block text-sm font-medium primary-text'>
                Project Color
              </label>

              <div className='flex items-center gap-3'>
                <input
                  type="color"
                  name='color'
                  value={formData.color}
                  onChange={handleChange}
                  className='h-10 w-14 cursor-pointer rounded border app-border'
                />
                <span className='text-sm secondary-text'>
                  {formData.color}
                </span>
              </div>
            </div>

            <ProjectIconPicker
              value={formData.icon}
              color={formData.color}
              onChange={(icon) =>
                setFormData(prev => ({
                  ...prev,
                  icon
                }))
              }
            />
          </div>

          {/* Status */}
          <div>
            <label className="mb-1 block text-sm font-medium primary-text">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full appearance-none rounded-lg border app-border elevated-surface px-3 py-2 text-sm primary-text outline-none focus:border-indigo-500"
            >
              <option value="Active">
                Active
              </option>

              <option value="Planning">
                Planning
              </option>

              <option value="On Hold">
                On Hold
              </option>

              <option value="Completed">
                Completed
              </option>
            </select>

          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 border-t app-border pt-4">

            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className={`rounded-lg border app-border px-4 py-2 text-sm secondary-text hover:bg-slate-500/10 ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className={`rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              {isEditMode
                ? isLoading ? "Updating..." : "Update Project"
                : isLoading ? "Creating..." : "Create Project"}
            </button>

          </div>

        </form>



      </div>

    </div>
  )
}

export default ProjectModal
