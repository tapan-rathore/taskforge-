
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    profile: {
        name: "TaskForge User",
        username: "taskforge-user",
        email: "",
        avatar: "",
    },
    notifications: {
        taskAssignments: true,
        taskUpdates: true,
        projectUpdates: true,
    },
    preferences: {
        defaultTaskView: "list",
        defaultTaskSorting: "newest",
    },
}

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        updateProfile(state, action) {
            state.profile = {
                ...state.profile,
                ...action.payload,
            }
        },

        updateNotificationPreference(state, action) {
            const { key, value } = action.payload

            if (Object.hasOwn(state.notifications, key)) {
                state.notifications[key] = value
            }
        },

        updateTaskPreference(state, action) {
            const { key, value } = action.payload

            if (Object.hasOwn(state.preferences, key)) {
                state.preferences[key] = value
            }
        },

        resetSettings(state) {
            state.profile = initialState.profile
            state.notifications = initialState.notifications
            state.preferences = initialState.preferences
        },
    },
})

export const {
    updateProfile,
    updateNotificationPreference,
    updateTaskPreference,
    resetSettings,
} = settingsSlice.actions

export default settingsSlice.reducer
