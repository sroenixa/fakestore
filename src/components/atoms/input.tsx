"use client"

import styled from "styled-components"

export const Input = styled.input`
    width: 100%;
    padding: 12px 16px;
    border: 2px solid ${(props) => props.theme.colors.border};
    border-radius: 8px;
    font-size: 15px;
    background-color: ${(props) => props.theme.colors.surface};
    color: ${(props) => props.theme.colors.text};
    transition: border-color 0.2s ease-in-out;
    
    &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    }
    
    &::placeholder {
    color: ${(props) => props.theme.colors.textSecondary};
    }

    &[type="number"]::-webkit-inner-spin-button,
    &[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    
    &[type="number"] {
        -moz-appearance: textfield;
    }
`

export const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  font-size: 15px;
  background-color: ${(props) => props.theme.colors.surface};
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  transition: border-color 0.2s ease-in-out;
  
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }
  
  option {
    background-color: ${(props) => props.theme.colors.surface};
    color: ${(props) => props.theme.colors.text};
  }
`
