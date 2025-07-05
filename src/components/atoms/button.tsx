"use client"

import styled, { css } from "styled-components"

interface ButtonProps {
    variant?: "primary" | "secondary" | "outline"
    size?: "small" | "medium" | "large"
    fullWidth?: boolean
    disabled?: boolean
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  border: none;
  text-decoration: none;
  
  ${(props) =>
    props.fullWidth &&
    css`
    width: 100%;
  `}
  
  ${(props) =>
    props.disabled &&
    css`
    opacity: 0.5;
    cursor: not-allowed;
  `}
  
  ${(props) => {
    switch (props.size) {
        case "small":
            return css`
          padding: 8px 16px;
          font-size: 14px;
          height: 36px;
        `
        case "large":
            return css`
          padding: 16px 24px;
          font-size: 16px;
          height: 52px;
        `
        default:
            return css`
          padding: 12px 20px;
          font-size: 15px;
          height: 44px;
        `
    }
}}
  
  ${(props) => {
    switch (props.variant) {
        case "secondary":
            return css`
          background-color: ${props.theme.colors.surface};
          color: ${props.theme.colors.text};
          border: 2px solid ${props.theme.colors.border};
          
          &:hover:not(:disabled) {
            background-color: ${props.theme.colors.border};
          }
        `
        case "outline":
            return css`
          background-color: transparent;
          color: ${props.theme.colors.primary};
          border: 2px solid ${props.theme.colors.primary};
          
          &:hover:not(:disabled) {
            background-color: ${props.theme.colors.primary};
            color: ${props.theme.colors.surface};
          }
        `
        default:
            return css`
          background-color: ${props.theme.colors.primary};
          color: ${props.theme.colors.surface};
          
          &:hover:not(:disabled) {
            opacity: 0.9;
          }
        `
    }
}}
`

export const Button = styled(StyledButton)``
