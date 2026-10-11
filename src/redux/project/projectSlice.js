import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    projects: [
        {
            id: 1,
            name: "TaskForge",
            description: "Task management application",
            color: "#6366f1",
            status: "Active",
            icon: "Rocket",
            members: ["Tapan", "Rahul", "Aman", "Jitu"],
            createdAt: "2026-09-20"
        },
        {
            id: 2,
            name: "Portfolio",
            description: "Personal portfolio website",
            color: "#10b981",
            status: "Active",
            members: ["Tapan"],
            createdAt: "2026-09-22"
        },
        {
            id: 3,
            name: "Backend",
            description: "Backend development and API project",
            color: "#f59e0b",
            status: "Active",
            icon: "API",
            members: ["Tapan", "Aman"],
            createdAt: "2026-09-24"
        }
    ]
}

const projectSlice = createSlice({
    name: "projects",
    initialState,

    reducers: {
        addProject: (state, action) => {
            state.projects.push(action.payload)
        },

        updateProject: (state, action) => {
            const index = state.projects.findIndex(
                project => project.id === action.payload.id
            )

            if (index !== -1) {
                state.projects[index] = action.payload
            }
        },

        deleteProject: (state, action) => {
            state.projects = state.projects.filter(
                project => project.id !== action.payload
            )
        }
    }
})

export const {
    addProject,
    updateProject,
    deleteProject
} = projectSlice.actions

export default projectSlice.reducer