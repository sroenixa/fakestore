import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import {SearchBar} from "@/src/components/molecules/product-list/search";
import {CustomThemeProvider} from "@/src/contexts/theme-context";
import {CartProvider} from "@/src/contexts/cart-context";


const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <CustomThemeProvider>
            <CartProvider>
                {children}
            </CartProvider>
        </CustomThemeProvider>
    )
}

describe("SearchBar", () => {
    const mockOnChange = jest.fn()
    const mockOnSearch = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()
    })


    it("renders with given value and placeholder", () => {
        render(
            <TestWrapper>
                <SearchBar
                    value="laptop"
                    onChange={mockOnChange}
                    onSearch={mockOnSearch}
                    placeholder="Custom placeholder"
                />
            </TestWrapper>
        )

        const input = screen.getByPlaceholderText("Custom placeholder")
        expect(input).toBeInTheDocument()
        expect(input).toHaveValue("laptop")
    })

    it("calls onChange when input changes", () => {
        render(
            <TestWrapper>
                <SearchBar
                    value=""
                    onChange={mockOnChange}
                    onSearch={mockOnSearch}
                />
            </TestWrapper>
        )

        const input = screen.getByPlaceholderText("Search products...")
        fireEvent.change(input, { target: { value: "headphones" } })

        expect(mockOnChange).toHaveBeenCalledWith("headphones")
    })

    it("calls onSearch when search button is clicked", () => {
        render(
            <TestWrapper>
                <SearchBar
                    value=""
                    onChange={mockOnChange}
                    onSearch={mockOnSearch}
                />
            </TestWrapper>
        )

        const button = screen.getByRole("button", { name: "Search" })
        fireEvent.click(button)

        expect(mockOnSearch).toHaveBeenCalled()
    })

    it("calls onSearch when Enter key is pressed", () => {
        render(
            <TestWrapper>
                <SearchBar
                    value=""
                    onChange={mockOnChange}
                    onSearch={mockOnSearch}
                />
            </TestWrapper>
        )

        const input = screen.getByPlaceholderText("Search products...")
        fireEvent.keyPress(input, { key: "Enter", code: "Enter", charCode: 13 })

        expect(mockOnSearch).toHaveBeenCalled()
    })
})