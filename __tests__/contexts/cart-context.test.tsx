import React from "react";
import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCart } from "@/src/contexts/cart-context";

const product = {
    id: 1,
    title: "Test Product",
    price: 100,
    category: "electronics",
    image: "/test.jpg",
    rating: { rate: 5, count: 10 },
} as any;

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
);

beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
});

describe("CartContext", () => {
    it("returns an empty cart initially", () => {
        const { result } = renderHook(() => useCart(), { wrapper });
        expect(result.current.totalItems).toBe(0);
        expect(result.current.totalPrice).toBe(0);
        expect(result.current.items).toHaveLength(0);
    });

    it("updates total quantity and price when a product is added", () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addItem(product);
        });

        expect(result.current.totalItems).toBe(1);
        expect(result.current.totalPrice).toBe(product.price);
        expect(result.current.items[0].quantity).toBe(1);
    });

    it("correctly calculates quantity and price when updating quantity", () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addItem(product);
            result.current.updateQuantity(1, 3);
        });

        expect(result.current.totalItems).toBe(3);
        expect(result.current.totalPrice).toBe(product.price * 3);
    });

    it("removeItem ve clearCart clears cart", () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addItem(product);
            result.current.removeItem(1);
        });
        expect(result.current.items).toHaveLength(0);

        act(() => {
            result.current.addItem(product);
            result.current.clearCart();
        });
        expect(result.current.totalItems).toBe(0);
        expect(result.current.items).toHaveLength(0);
    });

    it("empties the cart when removeItem and clearCart are called", () => {
        localStorage.setItem(
            "cart",
            JSON.stringify([{ ...product, quantity: 2 }]),
        );

        const { result } = renderHook(() => useCart(), { wrapper });

        expect(result.current.totalItems).toBe(2);
        expect(result.current.totalPrice).toBe(product.price * 2);
        expect(result.current.items[0].quantity).toBe(2);
    });

    it("calls localStorage.setItem when the state changes", () => {
        const setItemSpy = jest.spyOn(Storage.prototype, "setItem");
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addItem(product);
        });

        expect(setItemSpy).toHaveBeenCalledWith(
            "cart",
            JSON.stringify([{ ...product, quantity: 1 }]),
        );
    });
});
