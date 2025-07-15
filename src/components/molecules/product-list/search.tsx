"use client"

import type React from "react"
import styled from "styled-components"
import { Input } from "@/src/components/atoms/input"
import { Button } from "@/src/components/atoms/button"
import {useTranslations} from "next-intl";

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
    margin-bottom: 24px;
  
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`

const SearchInput = styled(Input)`
    max-width: 500px;
  flex: 1;
`

interface SearchBarProps {
    value: string
    onChange: (value: string) => void
    onSearch: () => void
    placeholder?: string
}

export function SearchBar({ value, onChange, onSearch, placeholder }: SearchBarProps) {
    const _t = useTranslations('search');
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            onSearch()
        }
    }

    return (
        <SearchContainer>
            <SearchInput
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={placeholder || _t("placeholder")}
            />
            <Button onClick={onSearch}>{_t("button")}</Button>
        </SearchContainer>
    )
}
