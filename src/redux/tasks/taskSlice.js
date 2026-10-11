import { createSlice } from "@reduxjs/toolkit";
import mockTasks from "../../tasks/mockTasks";

const initialState = {
    tasks: mockTasks,
    filters: {
        search: "",
        projectId: "All",
        status: "All",
        priority: "All",
        sort: "newest"
    },
}

const taskSlice = createSlice({
    name: "tasks",
    initialState,

    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload)
        },

        updateTask: (state, action) => {
            const index = state.tasks.findIndex(
                task => task.id === action.payload.id
            )

            if (index !== -1) {
                state.tasks[index] = action.payload
            }
        },

        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(
                task => task.id !== action.payload
            )
        },

        setSearchFilter: (state, action) => {
            state.filters.search = action.payload
        },

        setProjectFilter: (state, action) => {
            state.filters.projectId = action.payload
        },

        setStatusFilter: (state, action) => {
            state.filters.status = action.payload
        },

        setPriorityFilter: (state, action) => {
            state.filters.priority = action.payload
        },

        setSortFilter: (state, action) => {
            state.filters.sort = action.payload
        },

        clearFilters: (state) => {
            state.filters = {
                search: "",
                projectId: "All",
                status: "All",
                priority: "All",
                sort: "newest"
            }
        },

    }
})

export const {
    addTask,
    updateTask,
    deleteTask,
    setSearchFilter,
    setStatusFilter,
    setProjectFilter,
    setPriorityFilter,
    setSortFilter,
    clearFilters,
} = taskSlice.actions

export default taskSlice.reducer