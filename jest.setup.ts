"use client"

import { jest } from "@jest/globals"
import "@testing-library/jest-dom"


jest.mock("react-hot-toast", () => {
    const mockToast = {
        success: jest.fn(),
        error: jest.fn(),
        loading: jest.fn(),
        dismiss: jest.fn(),
    }

    return {
        __esModule: true,
        default: mockToast,
        toast: mockToast,
    }
})

jest.mock('next-intl', () => ({
    useTranslations: () => {
        return (key: string) => {
            const dictionary: Record<string, string> = {
                'electronics': 'Electronics',
                'jewelery': 'Jewelry',
                'addToCart': 'Add To Cart',
                'add':'Product Added To Cart',
                'category': "Category",
                'allCategories': "All Categories",
                'sortBy': "Sort By",
                'default': "Default",
                'priceLowHigh': "Price: Low to High",
                'priceHighLow': "Price: High to Low",
                'highestRated': "Highest Rated",
                'nameAZ': "Name: A-Z",
                'priceRange': "Price Range",
                'min': "Min",
                'max': "Max",
                'clear': "Clear",
                "placeholder": "Search products...",
                "button": "Search",
                "previous": "Previous",
                "next": "Next",
                "showing": "Showing",
                "of": "of",
                "products": "products"
            };
            return dictionary[key] || key;
        };
    },
    useLocale: () => 'en',
}));


jest.mock('@/src/hooks/useDebouncedEffect', () => ({
    useDebouncedEffect: (effect: () => void, _deps: any[], _delay: number) => {
        effect()
    },
}))
