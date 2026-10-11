import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    
    const [darkmode, setDarkmode] = useState(() => {
        return localStorage.getItem("theme") === "dark"
    })

    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkmode)

        localStorage.setItem(
            "theme",
            darkmode ? "dark" : "light"
        )
    }, [darkmode])

    const toggleTheme = () => {
        setDarkmode(prev => !prev)
    }

    return (
        <ThemeContext.Provider value={{darkmode, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)