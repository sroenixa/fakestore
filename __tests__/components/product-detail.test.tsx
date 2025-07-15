import type React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { ThemeProvider } from "styled-components"
import { ProductCard } from "@/src/components/molecules/product-list/product-card"
import { CartProvider } from "@/src/contexts/cart-context"
import { CustomThemeProvider, lightTheme } from "@/src/contexts/theme-context"
import type { Product } from "@/src/types/product"
import { toast } from "react-hot-toast"
import ProductDetail from "@/src/components/pages/product-detail";



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

describe("ProductDetail", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("renders product detail info", () => {

        render(
            <TestWrapper>
                <ProductDetail product={mockProduct} />
            </TestWrapper>
        )

        expect(screen.getByText("Electronics")).toBeInTheDocument()
        expect(screen.getByText("Test Product")).toBeInTheDocument()
        expect(screen.getByText("$29.99")).toBeInTheDocument()
        expect(screen.getByText("Test description")).toBeInTheDocument()
        expect(screen.getByRole("button", { name: "Add To Cart" })).toBeInTheDocument()
    })

    it("adds product to cart and shows toast when button clicked", async () => {
        render(
            <TestWrapper>
                <ProductDetail product={mockProduct} />
            </TestWrapper>
        )

        const button = screen.getByRole("button", { name: "Add To Cart" })
        fireEvent.click(button)

        await waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith("Product Added To Cart")
        })
    })

    it("uses placeholder if image is missing", () => {
        const productWithoutImage = { ...mockProduct, image: "" }

        render(
            <TestWrapper>
                <ProductCard product={productWithoutImage} />
            </TestWrapper>
        )

        const image = screen.getByRole("img", { name: "Test Product" })
        expect(image).toHaveAttribute("src", expect.stringContaining("/placeholder.svg"))
    })
})
