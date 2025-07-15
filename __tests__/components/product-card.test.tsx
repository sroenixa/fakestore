import type React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { ThemeProvider } from "styled-components"
import { ProductCard } from "@/src/components/molecules/product-list/product-card"
import { CartProvider } from "@/src/contexts/cart-context"
import { CustomThemeProvider, lightTheme } from "@/src/contexts/theme-context"
import type { Product } from "@/src/types/product"
import { toast } from "react-hot-toast"

const mockProduct: Product = {
    id: 1,
    title: "Test Product",
    price: 29.99,
    description: "Test description",
    category: "electronics",
    image: "https://fakestoreapi.com/img/test.jpg",
    rating: {
        rate: 4.5,
        count: 100,
    },
}

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <CustomThemeProvider>
            <CartProvider>
                {children}
            </CartProvider>
        </CustomThemeProvider>
    )
}

describe("ProductCard", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("renders product information correctly", () => {
        render(
            <TestWrapper>
                <ProductCard product={mockProduct} />
            </TestWrapper>,
        )

        expect(screen.getByText("Test Product")).toBeInTheDocument()
        expect(screen.getByText("$29.99")).toBeInTheDocument()
        expect(screen.getByText("Electronics")).toBeInTheDocument()
        expect(screen.getByRole("button", { name: "Add To Cart" })).toBeInTheDocument()
    })

    it("displays product image with correct attributes", () => {
        render(
            <TestWrapper>
                <ProductCard product={mockProduct} />
            </TestWrapper>,
        )

        const image = screen.getByRole("img", { name: "Test Product" })
        expect(image).toBeInTheDocument()
        expect(image).toHaveAttribute("src", "/_next/image?url=https%3A%2F%2Ffakestoreapi.com%2Fimg%2Ftest.jpg&w=3840&q=75")
    })

    it("shows rating information", () => {
        render(
            <TestWrapper>
                <ProductCard product={mockProduct} />
            </TestWrapper>,
        )

        expect(screen.getByText("(100)")).toBeInTheDocument()
    })

    it("adds product to cart when button is clicked", async () => {
        render(
            <TestWrapper>
                <ProductCard product={mockProduct} />
            </TestWrapper>,
        )

        const addToCartButton =  screen.getByRole("button", { name: "Add To Cart" })

        fireEvent.click(addToCartButton)

        await waitFor(() => {
            expect(toast.success).toHaveBeenCalled()
        })
    })


    it("handles missing image gracefully", () => {
        const productWithoutImage = { ...mockProduct, image: "" }

        render(
            <TestWrapper>
                <ProductCard product={productWithoutImage} />
            </TestWrapper>,
        )

        const image = screen.getByRole("img", { name: "Test Product" })
        expect(image).toHaveAttribute("src", "/placeholder.svg")
    })

    it("translates category names correctly", () => {
        const productWithJewelry = { ...mockProduct, category: "jewelery" }

        render(
            <TestWrapper>
                <ProductCard product={productWithJewelry} />
            </TestWrapper>,
        )

        expect(screen.getByText("Jewelry")).toBeInTheDocument()
    })
})
