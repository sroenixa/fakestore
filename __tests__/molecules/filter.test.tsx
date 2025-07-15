import React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { CustomThemeProvider } from "@/src/contexts/theme-context"
import type { ProductFilters } from "@/src/types/product"
import {Filters} from "@/src/components/molecules/product-list/filter";
import ProductDetail from "@/src/components/pages/product-detail";
import {toast} from "react-hot-toast";
import {ProductCard} from "@/src/components/molecules/product-list/product-card";


const categories = ["electronics", "jewelery", "men's clothing"]

const renderFilters = (props?: Partial<React.ComponentProps<typeof Filters>>) => {
    const defaultFilters: ProductFilters = {
        category: "electronics",
        sortBy: "price-asc",
        minPrice: "10",
        maxPrice: "100",
    }

    const onFiltersChange = jest.fn()
    const onClearFilters = jest.fn()

    render(
        <CustomThemeProvider>
                <Filters
                    filters={defaultFilters}
                    categories={categories}
                    onFiltersChange={onFiltersChange}
                    onClearFilters={onClearFilters}
                    {...props}
                />
        </CustomThemeProvider>
    )

    return { onFiltersChange, onClearFilters }
}


describe("ProductFilter", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("renders filter controls", () => {

        renderFilters()

        expect(screen.getByLabelText("Category")).toBeInTheDocument()
        expect(screen.getByLabelText("Sort By")).toBeInTheDocument()
        expect(screen.getByLabelText("Price Range")).toBeInTheDocument()

        expect(screen.getByRole("combobox", { name: "Category" })).toHaveValue("electronics")
        expect(screen.getByRole("combobox", { name: "Sort By" })).toHaveValue("price-asc")

        expect(screen.getByPlaceholderText("Min")).toHaveValue(10)
        expect(screen.getByPlaceholderText("Max")).toHaveValue(100)
    })

    it("calls onFiltersChange when category is changed", () => {
        const { onFiltersChange } = renderFilters()

        fireEvent.change(screen.getByLabelText("Category"), {
            target: { value: "jewelery" },
        })

        expect(onFiltersChange).toHaveBeenCalledWith(
            expect.objectContaining({ category: "jewelery" })
        )
    })

    it("calls onFiltersChange when sort option is changed", () => {
        const { onFiltersChange } = renderFilters()

        fireEvent.change(screen.getByLabelText("Sort By"), {
            target: { value: "rating" },
        })

        expect(onFiltersChange).toHaveBeenCalledWith(
            expect.objectContaining({ sortBy: "rating" })
        )
    })


    it("calls onClearFilters when clear button is clicked", () => {
        const { onClearFilters } = renderFilters()

        fireEvent.click(screen.getByRole("button", { name: "Clear" }))
        expect(onClearFilters).toHaveBeenCalled()
    })


    it("calls onFiltersChange when price inputs change", async () => {
        const { onFiltersChange } = renderFilters()

        fireEvent.change(screen.getByPlaceholderText("Min"), {
            target: { value: "20" },
        })

        fireEvent.change(screen.getByPlaceholderText("Max"), {
            target: { value: "200" },
        })

        await waitFor(() =>
            expect(onFiltersChange).toHaveBeenCalledWith(
                expect.objectContaining({ minPrice: 20 })
            )
        )

        await waitFor(() =>
            expect(onFiltersChange).toHaveBeenCalledWith(
                expect.objectContaining({ maxPrice: 200 })
            )
        )
    })

})
