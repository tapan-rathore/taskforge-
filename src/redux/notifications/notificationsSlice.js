
import { createSlice, nanoid } from "@reduxjs/toolkit"

const initialState = {
    notifications: [
        {
            id: "notification-1",
            title: "Welcome to TaskForge",
            message: "Your workspace is ready. Start organizing your tasks.",
            type: "general",
            isRead: false,
            createdAt: new Date().toISOString(),
        },
        {
            id: "notification-2",
            title: "Task assigned",
            message: "A new task has been added to your workspace.",
            type: "task",
            isRead: false,
            createdAt: new Date().toISOString(),
        },
        {
            id: "notification-3",
            title: "Workspace updated",
            message: "Your TaskForge workspace has been updated.",
            type: "general",
            isRead: true,
            createdAt: new Date().toISOString(),
        },
    ],
}

const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        addNotification: {
            reducer(state, action) {
                state.notifications.unshift(action.payload)
            },
            prepare(notification) {
                return {
                    payload: {
                        id: nanoid(),
                        title: notification.title,
                        message: notification.message,
                        type: notification.type || "general",
                        isRead: false,
                        createdAt: new Date().toISOString(),
                    },
                }
            },
        },

        markAsRead(state, action) {
            const notification = state.notifications.find(
                (item) => item.id === action.payload
            )

            if (notification) {
                notification.isRead = true
            }
        },

        markAllAsRead(state) {
            state.notifications.forEach((notification) => {
                notification.isRead = true
            })
        },

        deleteNotification(state, action) {
            state.notifications = state.notifications.filter(
                (item) => item.id !== action.payload
            )
        },

        clearNotifications(state) {
            state.notifications = []
        },
    },
})

export const {
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearNotifications,
} = notificationsSlice.actions

export default notificationsSlice.reducer
