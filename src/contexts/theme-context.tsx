"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import {DefaultTheme, ThemeProvider as StyledThemeProvider} from "styled-components"

export interface Theme extends DefaultTheme{
    colors: {
        primary: string
        secondary: string
        background: string
        surface: string
        text: string
        textSecondary: string
        border: string
        success: string
        error: string
        warning: string
    }
    shadows: {
        small: string
        medium: string
        large: string
    }
    breakpoints: {
        mobile: string
        tablet: string
        desktop: string
        large: string
    }
}

export const lightTheme: Theme = {
    colors: {
        primary: "#3b82f6",
        secondary: "#6b7280",
        background: "#fafafa",
        surface: "#ffffff",
        text: "#1f2937",
        textSecondary: "#6b7280",
        border: "#e5e7eb",
        success: "#059669",
        error: "#ef4444",
        warning: "#f59e0b",
    },
    shadows: {
        small: "0 2px 8px rgba(0, 0, 0, 0.1)",
        medium: "0 4px 16px rgba(0, 0, 0, 0.12)",
        large: "0 8px 24px rgba(0, 0, 0, 0.15)",
    },
    breakpoints: {
        mobile: "768px",
        tablet: "1024px",
        desktop: "1280px",
        large: "1536px",
    },
}

export const darkTheme: Theme = {
    colors: {
        primary: "#60a5fa",
        secondary: "#9ca3af",
        background: "#0f172a",
        surface: "#1e293b",
        text: "#f8fafc",
        textSecondary: "#cbd5e1",
        border: "#334155",
        success: "#10b981",
        error: "#f87171",
        warning: "#fbbf24",
    },
    shadows: {
        small: "0 2px 8px rgba(0, 0, 0, 0.3)",
        medium: "0 4px 16px rgba(0, 0, 0, 0.4)",
        large: "0 8px 24px rgba(0, 0, 0, 0.5)",
    },
    breakpoints: {
        mobile: "768px",
        tablet: "1024px",
        desktop: "1280px",
        large: "1536px",
    },
}

interface ThemeContextType {
    theme: Theme
    isDark: boolean
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function CustomThemeProvider({ children }: { children: React.ReactNode }) {
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme")

        if (savedTheme === "dark") {
            setIsDark(true)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("theme", isDark ? "dark" : "light")
        document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light")
    }, [isDark])

    const toggleTheme = () => {
        setIsDark(!isDark)
    }

    const theme = isDark ? darkTheme : lightTheme

    return (
        <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
            <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error("useTheme must be used within a CustomThemeProvider")
    }
    return context
}
