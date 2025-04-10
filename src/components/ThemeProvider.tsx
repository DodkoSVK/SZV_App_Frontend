import React, { createContext, useEffect, useState, useContext } from "react"

type Theme = "light" | "dark" | "system"

interface ThemeContextType {
    theme: Theme
    setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType>({
    theme: "system",
    setTheme: () => {},
})

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setThemeState] = useState<Theme>("system")

    const applyTheme = (theme: Theme) => {
        const root = document.documentElement
        if (theme === "dark") {
        root.classList.add("dark")
        } else if (theme === "light") {
        root.classList.remove("dark")
        } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        root.classList.toggle("dark", prefersDark)
        }
    }

    const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem("theme", newTheme)
    applyTheme(newTheme)
    }

    useEffect(() => {
        const stored = localStorage.getItem("theme") as Theme | null
        const initial = stored ?? "system"
        setThemeState(initial)
        applyTheme(initial)
    }, [])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)
