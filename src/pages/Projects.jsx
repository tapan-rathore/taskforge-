import { useDispatch, useSelector } from "react-redux"
import ProjectHeader from "../components/projects/ProjectHeader"
import TaskModal from "../components/tasks/TaskModal"
import { useState } from "react"
import ProjectCard from "../components/projects/ProjectCard"
import { deleteProject } from "../redux/project/projectSlice"
import toast from "react-hot-toast"
import ProjectModal from "../components/projects/ProjectModal"
import DeleteModal from "../components/common/DeleteModal"

const Projects = () => {
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.tasks.tasks)
    const projects = useSelector(state => state.projects.projects)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isdeleteModal, setIsDeleteModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null)

    const handleAddProject = () => {
        setSelectedProject(null)
        setIsModalOpen(true)
    }

    const handleEditProject = (project) => {
        setSelectedProject(project)
        setIsModalOpen(true)
    }

    const openDeleteModal = (project) => {
        setIsDeleteModal(true)
        setSelectedProject(project)
    }

    const handleDeleteProject = (projectId) => {
        const projectTasks = tasks.filter(
            task => String(task.projectId) === String(projectId)
        )

        if (projectTasks.length > 0) {
            toast.error(
                "This project cannot be deleted while it has tasks."
            )
            return
        }
        dispatch(deleteProject(projectId))
        setIsDeleteModal(false)
        setSelectedProject(null)

        toast.success("Project deleted successfully!")
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setIsDeleteModal(false)
        setSelectedProject(null)
    }

    return (
        <div>
            <ProjectHeader handleAddProject={handleAddProject} />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 mt-4">
                {projects.map(project => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        onEdit={handleEditProject}
                        openDeleteModal={openDeleteModal}
                    />
                ))}
            </div>

            {isModalOpen && <ProjectModal
                selectedProject={selectedProject}
                onClose={handleCloseModal}
            />}

            {isdeleteModal && <DeleteModal
                item={selectedProject}
                itemType="project"
                onClose={handleCloseModal}
                onDelete={handleDeleteProject}
            />
            }
        </div>
    )
}

export default Projects