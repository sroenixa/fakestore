"use client"

import styled from "styled-components"
import {useTheme} from "@/src/contexts/theme-context";

const ToggleButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border: 2px solid ${(props) => props.theme.colors.border};
    border-radius: 8px;
    background-color: ${(props) => props.theme.colors.surface};
    color: ${(props) => props.theme.colors.text};
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    font-size: 20px;
    box-shadow: ${(props) => props.theme.shadows.small};
  
  &:hover {
    background-color: ${(props) => props.theme.colors.border};
    transform: translateY(-2px);
  }
`

export function ThemeToggle() {
    const { isDark, toggleTheme } = useTheme()

    return (
        <ToggleButton onClick={toggleTheme} aria-label="Toggle theme">
            {isDark ? "☀️" : "🌙"}
        </ToggleButton>
    )
}
