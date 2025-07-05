"use client"

import styled from "styled-components"
import {useLanguage} from "@/src/contexts/language-context";

const LanguageButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.surface};
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-size: 14px;
  font-weight: 500;
  min-width: 48px;
  height: 48px;
  
  &:hover {
      background-color: ${(props) => props.theme.colors.border};
      transform: translateY(-2px);
  }
`

export function LanguageToggle() {
    const { language, setLanguage } = useLanguage()

    const toggleLanguage = () => {
        setLanguage(language === "en" ? "tr" : "en")
    }

    return (
        <LanguageButton onClick={toggleLanguage} aria-label="Toggle language">
            {language.toUpperCase()}
        </LanguageButton>
    )
}
