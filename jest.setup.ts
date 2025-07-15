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
                'add':'Product Added To Cart'
            };
            return dictionary[key] || key;
        };
    },
    useLocale: () => 'en',
}));
