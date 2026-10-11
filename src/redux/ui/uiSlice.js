import { createSlice } from "@reduxjs/toolkit"

const getSavedTheme = () => {
    const theme = localStorage.getItem("theme")

    return ["light", "dark", "system"].includes(theme)
        ? theme
        : "light"
}

const initialState = {
    isLoading: false,
    theme: getSavedTheme(),
    sidebarOpen: true,
}

const uiSlice = createSlice({
    name: "ui",
    initialState,

    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },

        setTheme: (state, action) => {
            if (["light", "dark", "system"].includes(action.payload)) {
                state.theme = action.payload
            }
        },

        toggleTheme: (state) => {
            state.theme =
                state.theme === "light"
                    ? "dark"
                    : "light";
        },

        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        },

    }
})

export const {
    setLoading,
    setTheme,
    toggleTheme,
    toggleSidebar,
} = uiSlice.actions;

export default uiSlice.reducer;