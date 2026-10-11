import { useState } from "react"
import StatCard from "../components/dashboard/StatCard"
import TaskOverview from "../components/dashboard/TaskOverview"
import RecentTasks from "../components/dashboard/RecentTasks"
import RecentActivity from "../components/dashboard/RecentActivity"
import DashboardHeader from "../components/dashboard/DashboardHeader"
import ProjectModal from "../components/projects/ProjectModal"

const Dashboard = () => {
    const [showProjectModal, setShowProjectModal] = useState(false)

    const handleAddProject = () => {
        setShowProjectModal(true)
    }

    const handleCloseProjectModal = () => {
        setShowProjectModal(false)
    }

    return (
        <div className="space-y-4">
            <DashboardHeader handleAddProject={handleAddProject} />

            <StatCard />

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <TaskOverview />
                <RecentActivity />
            </div>

            <RecentTasks />

            {showProjectModal && (
                <ProjectModal
                    selectedProject={null}
                    onClose={handleCloseProjectModal}
                />
            )}
        </div>
    )
}

export default Dashboard
