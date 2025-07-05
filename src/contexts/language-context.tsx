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
    //header
    "header.title": {
        en: "FakeStore",
        tr: "FakeStore",
    },

    // category
    "category.electronics": {
        en: "Electronics",
        tr: "Elektronik",
    },
    "category.jewelery": {
        en: "Jewelry",
        tr: "Mücevher",
    },
    "category.men's clothing": {
        en: "Men's Clothing",
        tr: "Erkek Giyim",
    },
    "category.women's clothing": {
        en: "Women's Clothing",
        tr: "Kadın Giyim",
    },

    // filters
    "filters.category": {
        en: "Category",
        tr: "Kategori",
    },
    "filters.allCategories": {
        en: "All Categories",
        tr: "Tüm Kategoriler",
    },
    "filters.sortBy": {
        en: "Sort By",
        tr: "Sırala",
    },
    "filters.default": {
        en: "Default",
        tr: "Varsayılan",
    },
    "filters.priceLowHigh": {
        en: "Price: Low to High",
        tr: "Fiyat: Düşükten Yükseğe",
    },
    "filters.priceHighLow": {
        en: "Price: High to Low",
        tr: "Fiyat: Yüksekten Düşüğe",
    },
    "filters.highestRated": {
        en: "Highest Rated",
        tr: "En Yüksek Puanlı",
    },
    "filters.nameAZ": {
        en: "Name A-Z",
        tr: "İsim A-Z",
    },
    "filters.priceRange": {
        en: "Price Range",
        tr: "Fiyat Aralığı",
    },
    "filters.min": {
        en: "Min",
        tr: "Min",
    },
    "filters.max": {
        en: "Max",
        tr: "Maks",
    },
    "filters.clear": {
        en: "Clear Filters",
        tr: "Filtreleri Temizle",
    },

    // search
    "search.button": {
        en: "Search",
        tr: "Ara",
    },
    "search.placeholder": {
        en: "Search for products...",
        tr: "Ürün ara...",
    },

    // pagination
    "pagination.previous": {
        en: "Previous",
        tr: "Önceki",
    },
    "pagination.next": {
        en: "Next",
        tr: "Sonraki",
    },
    "pagination.showing": {
        en: "Showing",
        tr: "Gösterilen",
    },
    "pagination.of": {
        en: "of",
        tr: "/",
    },
    "pagination.products": {
        en: "products",
        tr: "ürün",
    },

    //product
    "product.addToCart": {
        en: "Add To Cart",
        tr: "Sepete Ekle",
    },
    "products.noFound": {
        en: "No products found",
        tr: "Ürün bulunamadı",
    },
    "products.adjustFilters": {
        en: "Try adjusting your search or filters",
        tr: "Arama veya filtrelerinizi ayarlamayı deneyin",
    },

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
