import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { Pagination } from "@/src/components/molecules/product-list/pagination"
import { CustomThemeProvider } from "@/src/contexts/theme-context"
import {CartProvider} from "@/src/contexts/cart-context";

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <CustomThemeProvider>
        <CartProvider>
            {children}
        </CartProvider>
    </CustomThemeProvider>
)

describe("Pagination", () => {
    const mockOnPageChange = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("does not render if only one page", () => {
        const { container } = render(
            <TestWrapper>
                <Pagination
                    currentPage={1}
                    totalItems={5}
                    itemsPerPage={10}
                    onPageChange={mockOnPageChange}
                />
            </TestWrapper>
        )

        expect(container).toBeEmptyDOMElement()
    })

    it("renders correct page info", () => {
        render(
            <TestWrapper>
                <Pagination
                    currentPage={2}
                    totalItems={45}
                    itemsPerPage={20}
                    onPageChange={mockOnPageChange}
                />
            </TestWrapper>
        )

        expect(screen.getByText("Showing 21-40 of 45 products")).toBeInTheDocument()
    })

    it("disables 'Previous' button on first page", () => {
        render(
            <TestWrapper>
                <Pagination
                    currentPage={1}
                    totalItems={30}
                    itemsPerPage={10}
                    onPageChange={mockOnPageChange}
                />
            </TestWrapper>
        )

        const prevButton = screen.getByRole("button", { name: "Previous" })
        expect(prevButton).toBeDisabled()
    })

    it("disables 'Next' button on last page", () => {
        render(
            <TestWrapper>
                <Pagination
                    currentPage={3}
                    totalItems={30}
                    itemsPerPage={10}
                    onPageChange={mockOnPageChange}
                />
            </TestWrapper>
        )

        const nextButton = screen.getByRole("button", { name: "Next" })
        expect(nextButton).toBeDisabled()
    })

    it("calls onPageChange with correct page when next/prev clicked", () => {
        render(
            <TestWrapper>
                <Pagination
                    currentPage={2}
                    totalItems={30}
                    itemsPerPage={10}
                    onPageChange={mockOnPageChange}
                />
            </TestWrapper>
        )

        const prevButton = screen.getByRole("button", { name: "Previous" })
        const nextButton = screen.getByRole("button", { name: "Next" })

        fireEvent.click(prevButton)
        fireEvent.click(nextButton)

        expect(mockOnPageChange).toHaveBeenCalledWith(1)
        expect(mockOnPageChange).toHaveBeenCalledWith(3)
    })
})
