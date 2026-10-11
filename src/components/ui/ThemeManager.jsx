import { useEffect } from "react"
import { useSelector } from "react-redux"

const ThemeManager = () => {
    const theme = useSelector((state) => state.ui.theme)

    useEffect(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)")

        const applyTheme = () => {
            const isDark =
                theme === "system"
                    ? media.matches
                    : theme === "dark"

            document.documentElement.classList.toggle("dark", isDark)
        }

        applyTheme()

        if (theme === "system") {
            media.addEventListener("change", applyTheme)
        }

        localStorage.setItem("theme", theme)

        return () => {
            media.removeEventListener("change", applyTheme)
        }
    }, [theme])

    return null
}

export default ThemeManager