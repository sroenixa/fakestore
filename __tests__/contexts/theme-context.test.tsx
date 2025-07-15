import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { CustomThemeProvider, useTheme, lightTheme, darkTheme } from "@/src/contexts/theme-context"

const ThemeToggleComponent = () => {
    const { isDark, toggleTheme } = useTheme()

    return (
        <>
            <span>Current Theme: {isDark ? "dark" : "light"}</span>
            <button onClick={toggleTheme}>Toggle</button>
        </>
    )
}


beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute("data-theme")
})

describe("CustomThemeProvider", () => {

    it("defaults to light theme", () => {
        render(
            <CustomThemeProvider>
                <ThemeToggleComponent />
            </CustomThemeProvider>
        )

        expect(screen.getByText("Current Theme: light")).toBeInTheDocument()
        expect(localStorage.getItem("theme")).toBe("light")
        expect(document.documentElement.getAttribute("data-theme")).toBe("light")
    })

    it("loads dark theme from localStorage", () => {
        localStorage.setItem("theme", "dark")
        render(
            <CustomThemeProvider>
                <ThemeToggleComponent />
            </CustomThemeProvider>
        )

        expect(screen.getByText("Current Theme: dark")).toBeInTheDocument()
        expect(document.documentElement.getAttribute("data-theme")).toBe("dark")
    })

    it("toggles theme from light to dark", () => {
        render(
            <CustomThemeProvider>
                <ThemeToggleComponent />
            </CustomThemeProvider>
        )

        const toggleBtn = screen.getByText("Toggle")
        fireEvent.click(toggleBtn)

        expect(screen.getByText("Current Theme: dark")).toBeInTheDocument()
        expect(localStorage.getItem("theme")).toBe("dark")
        expect(document.documentElement.getAttribute("data-theme")).toBe("dark")
    })

    it("toggles theme from dark to light", () => {
        localStorage.setItem("theme", "dark")
        render(
            <CustomThemeProvider>
                <ThemeToggleComponent />
            </CustomThemeProvider>
        )

        const toggleBtn = screen.getByText("Toggle")
        fireEvent.click(toggleBtn)

        expect(screen.getByText("Current Theme: light")).toBeInTheDocument()
        expect(localStorage.getItem("theme")).toBe("light")
        expect(document.documentElement.getAttribute("data-theme")).toBe("light")
    })

})
