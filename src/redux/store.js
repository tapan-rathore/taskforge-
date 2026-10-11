import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui/uiSlice"
import taskReducer from './tasks/taskSlice'
import projectReducer from './project/projectSlice'
import notificationsReducer from "./notifications/notificationsSlice"
import settingsReducer from "./settings/settingsSlice"

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        tasks: taskReducer,
        projects: projectReducer,
        notifications: notificationsReducer,
        settings: settingsReducer,

    }
})