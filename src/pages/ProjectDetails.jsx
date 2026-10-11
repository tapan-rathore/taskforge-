import { ArrowLeft, CheckCircle2, Clock3, Pencil, Plus, Trash2, Users } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useParams, useNavigate } from "react-router"
import { useDispatch, useSelector } from 'react-redux'
import { projectIcons } from "../constants/projectIcons"
import ProjectStatCard from '../components/projects/ProjectStatCard'
import ProjectTable from '../components/projects/ProjectTable'
import Activity from '../components/projects/Activity'
import ProjectModal from '../components/projects/ProjectModal'
import DeleteModal from '../components/common/DeleteModal'
import { deleteProject } from '../redux/project/projectSlice'
import { deleteTask } from '../redux/tasks/taskSlice'
import TaskModal from '../components/tasks/TaskModal'
import toast from 'react-hot-toast'

const ProjectDetails = () => {
    const { projectId } = useParams()
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const projects = useSelector(state => state.projects.projects)
    const tasks = useSelector(state => state.tasks.tasks)

    const project = projects.find(
        project => String(project.id) === String(projectId)
    )

    const [selectedTask, setSelectedTask] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
    const [isProjectDeleteModalOpen, setIsProjectDeleteModalOpen] = useState(false)
    const [isTaskDeleteModalOpen, setIsTaskDeleteModalOpen] = useState(false)
    const [initialProjectId, setInitialProjectId] = useState("")

    // project not found!
    if (!project) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
                <h2 className="text-xl font-semibold primary-text">
                    Project not found
                </h2>

                <p className="mt-1 text-sm secondary-text">
                    The project you're looking for doesn't exist.
                </p>

                <Link
                    to="/app/projects"
                    className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                >
                    Back to Projects
                </Link>
            </div>
        )
    }

    const projectTasks = tasks.filter(
        task => String(task.projectId) === String(project.id)
    )

    const totalTasks = projectTasks.length

    const completedTasks = projectTasks.filter(
        task => task.status === "Done"
    ).length

    const inProgressTasks = projectTasks.filter(
        task => task.status === "In Progress"
    ).length

    const progress = totalTasks
        ? Math.round((completedTasks / totalTasks) * 100)
        : 0

    const members = project.members || []


    // 
    const ProjectIcon = projectIcons[project.icon] || projectIcons.Rocket
    const backgroundColor = project.color

    const handleAddTask = () => {
        setSelectedTask(null)
        setInitialProjectId(project.id)
        setIsTaskModalOpen(true)
    }

    const handleEditProject = (project) => {
        setIsModalOpen(true)
    }

    const handleEditTask = (task) => {
        setSelectedTask(task)
        setIsTaskModalOpen(true)
    }

    const openProjectDeleteModal = () => {
        setIsProjectDeleteModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setIsProjectDeleteModalOpen(false)
        setSelectedTask(null)
    }

    const handleCloseTaskModal = () => {
        setIsTaskDeleteModalOpen(false)
        setIsTaskModalOpen(false)
        setSelectedTask(null)
    }

    const handleDeleteProject = (projectId) => {
        const projectHasTasks = tasks.some(
            task => String(task.projectId) === String(projectId)
        )

        if (projectHasTasks) {
            toast.error(
                "This project cannot be deleted while it has tasks."
            )
            return
        }

        dispatch(deleteProject(projectId))
        setIsProjectDeleteModalOpen(false)

        toast.success("Project deleted successfully!")
        navigate("/app/projects")
    }

    const openTaskDeleteModal = (task) => {
        setSelectedTask(task)
        setIsTaskDeleteModalOpen(true)
    }

    const handleDeleteTask = (taskId) => {
        dispatch(deleteTask(taskId))

        setIsTaskDeleteModalOpen(false)
        setSelectedTask(null)

        toast.success("Task deleted successfully!")
    }

    return (
        <div className='space-y-4'>
            {/* Back */}
            <Link
                to="/app/projects"
                className="flex items-center gap-2 text-sm secondary-text transition hover:text-indigo-500">
                <ArrowLeft size={18} />
                Back to Projects
            </Link>

            {/* Main layout */}
            <div className='grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,2fr)_310px]'>

                {/* Left content */}
                <div className='space-y-4'>

                    {/* Project Header */}
                    <div className='surface border app-border p-2 rounded-lg sm:p-4 shadow-sm space-y-2'>

                        <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>

                            <div className='flex min-w-0 gap-4'>

                                {/* Icon */}
                                <div className='flex h-20 w-20 shrink-0 items-center justify-center rounded-xl text-white shadow-sm'
                                    style={{ backgroundColor }}>
                                    <ProjectIcon size={38} />
                                </div>

                                {/* Project Info */}
                                <div className='min-w-0'>
                                    <h1 className='text-2xl font-bold primary-text'>
                                        {project.name}
                                    </h1>
                                    <p className='mt-1 text-sm font-medium secondary-text'>
                                        {project.description}
                                    </p>
                                </div>
                            </div>

                            {/* Action */}
                            <div className='flex shrink-0 gap-2'>
                                <button
                                    onClick={handleEditProject}
                                    className='flex items-center gap-2 rounded-lg border app-border px-3 py-2 text-sm font-medium primary-text transition hover:bg-slate-500/10'>
                                    <Pencil size={15} />
                                    <span className='hidden sm:block'>
                                        Edit Project
                                    </span>
                                </button>

                                <button
                                    onClick={openProjectDeleteModal}
                                    className='flex items-center gap-2 rounded-lg border border-red-500/30 px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-500/10'>
                                    <Trash2 size={15} />
                                    <span className='hidden sm:block'>
                                        Delete Project
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Progres bar */}
                        <div>
                            <div className='mb-2 flex items-center justify-between'>
                                <span className='text-sm font-semibold primary-text'>
                                    Project Progress
                                </span>

                                <span className="text-sm font-bold primary-text">
                                    {progress}%
                                </span>

                            </div>

                            <div className="bg-slate-500/10 h-2.5 w-full rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all"
                                    style={{
                                        width: `${progress}%`,
                                        backgroundColor,
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex items-center">

                            {members.slice(0, 5).map((member, index) => (

                                <div
                                    key={`${member}-${index}`}
                                    className={`flex h-8 w-8 items-center justify-center rounded-full border-2 elevated-surface text-xs font-semibold primary-text ${index > 0 ? "-ml-2" : ""
                                        }`}
                                >
                                    {member?.charAt(0).toUpperCase()}
                                </div>

                            ))}

                            {members.length > 5 && (
                                <div className="-ml-2 flex h-8 w-8 items-center justify-center rounded-full border-2 elevated-surface text-[10px] font-semibold secondary-text">
                                    +{members.length - 5}
                                </div>
                            )}

                        </div>
                    </div>

                    <ProjectStatCard
                        totalTasks={totalTasks}
                        completedTasks={completedTasks}
                        inProgressTasks={inProgressTasks}
                    />

                    <ProjectTable
                        projectTasks={projectTasks}
                        onEdit={handleEditTask}
                        openDeleteModal={openTaskDeleteModal}
                        onAddTask={handleAddTask}
                    />
                </div>

                <div className='space-y-4'>
                    {/* Member */}
                    <div className='rounded-xl border app-border elevated-surface p-5 shadow-sm'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <Users
                                    size={16}
                                />

                                <h2 className='font-semibold primary-text'>
                                    Project Members
                                </h2>
                            </div>

                            <button className='flex items-center gap-1 rounded-lg border border-indigo-500/30 px-3 py-1.5 text-xs font-medium text-indigo-500'>
                                <Plus size={14} />
                                Add member
                            </button>
                        </div>


                        <div className="mt-5 space-y-4">

                            {members.slice(0, 5).map((member, index) => (

                                <div
                                    key={`${member}`}
                                    className="flex items-center gap-3"
                                >

                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full elevated-surface border app-border text-sm font-semibold primary-text">
                                        {member?.charAt(0).toUpperCase()}
                                    </div>

                                    <div className="min-w-0">

                                        <div className="flex items-center gap-1">

                                            <p className="truncate text-sm font-semibold primary-text">
                                                {member}
                                            </p>

                                            {index === 0 && (
                                                <span className="text-xs text-orange-500">
                                                    ★
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-xs secondary-text">
                                            {index === 0
                                                ? "Owner"
                                                : index === 1
                                                    ? "Developer"
                                                    : "Designer"}
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>

                        {members.length > 5 && (
                            <button
                                type="button"
                                className="mt-5 border-t app-border w-full pt-4 text-left text-xs font-medium text-indigo-500"
                            >
                                +{members.length - 5} more members
                            </button>
                        )}
                    </div>

                    {/* Activity */}
                    <div className="rounded-xl border app-border elevated-surface p-5 shadow-sm">

                        <div className="flex items-center gap-2">

                            <Clock3
                                size={19}
                                className="text-indigo-500"
                            />

                            <h2 className="font-semibold primary-text">
                                Activity
                            </h2>

                        </div>


                        <div className="mt-5 space-y-5">
                            <Activity
                                icon={CheckCircle2}
                                text="Tapan completed"
                                highlight='"Build Navbar"'
                                time="2 hours ago"
                            />

                            <Activity
                                icon={Plus}
                                text="Rahul created"
                                highlight='"API Integration"'
                                time="5 hours ago"
                            />

                            <Activity
                                icon={Plus}
                                text="Priya moved"
                                highlight='"Dashboard UI" to Review'
                                time="Yesterday"
                            />
                            <Activity
                                icon={Users}
                                text="Rahul added a new member"
                                highlight=""
                                time="2 days ago"
                            />

                            <Activity
                                icon={Pencil}
                                text="Tapan updated project details"
                                highlight=""
                                time="2 days ago"
                            />

                        </div>

                    </div>
                </div>
            </div>

            {isModalOpen && (
                <ProjectModal
                    selectedProject={project}
                    onClose={handleCloseModal}
                />
            )}

            {isTaskModalOpen && (
                <TaskModal
                    isOpen={isTaskModalOpen}
                    selectedTask={selectedTask}
                    onClose={handleCloseTaskModal}
                    initialProjectId={initialProjectId}
                />
            )}

            {isTaskDeleteModalOpen && selectedTask && (
                <DeleteModal
                    item={selectedTask}
                    itemType="task"
                    onClose={() => {
                        setIsTaskDeleteModalOpen(false)
                        setSelectedTask(null)
                    }}
                    onDelete={handleDeleteTask}
                />
            )}

            {isProjectDeleteModalOpen && (
                <DeleteModal
                    item={project}
                    itemType="project"
                    onClose={() => setIsProjectDeleteModalOpen(false)}
                    onDelete={handleDeleteProject}
                />
            )}
        </div>
    )
}

export default ProjectDetails
