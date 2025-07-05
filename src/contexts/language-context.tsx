"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type Language = "en" | "tr"

interface Translations {
    [key: string]: {
        en: string
        tr: string
    }
}

const translations: Translations = {
    "header.title": {
        en: "FakeStore",
        tr: "FakeStore",
    }
}

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>("en")

    useEffect(() => {
        const savedLanguage = localStorage.getItem("language") as Language
        const browserLanguage = navigator.language.startsWith("tr") ? "tr" : "en"

        if (savedLanguage && (savedLanguage === "en" || savedLanguage === "tr")) {
            setLanguageState(savedLanguage)
        } else {
            setLanguageState(browserLanguage)
        }
    }, [])

    const setLanguage = (lang: Language) => {
        setLanguageState(lang)
        localStorage.setItem("language", lang)
        document.documentElement.setAttribute("lang", lang)
    }

    const t = (key: string): string => {
        return translations[key]?.[language] || key
    }

    return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider")
    }
    return context
}
