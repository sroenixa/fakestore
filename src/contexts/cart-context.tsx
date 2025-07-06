"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import type {  Product } from "@/src/types/product"
import type { CartItem } from "@/src/types/cart"

interface CartState {
    items: CartItem[]
    totalItems: number
    totalPrice: number
}

type CartAction =
    | { type: "ADD_ITEM"; payload: Product }
    | { type: "REMOVE_ITEM"; payload: number }
    | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
    | { type: "CLEAR_CART" }
    | { type: "LOAD_CART"; payload: CartItem[] }


interface CartContextType extends CartState {
    addItem: (product: Product) => void
    removeItem: (id: number) => void
    updateQuantity: (id: number, quantity: number) => void
    clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case "ADD_ITEM": {
            const existingItem = state.items.find((item) => item.id === action.payload.id)

            let newItems: CartItem[]
            if (existingItem) {
                newItems = state.items.map((item) =>
                    item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
                )
            } else {
                newItems = [...state.items, { ...action.payload, quantity: 1 }]
            }

            return {
                items: newItems,
                totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
                totalPrice: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
            }
        }

        case "REMOVE_ITEM": {
            const newItems = state.items.filter((item) => item.id !== action.payload)
            return {
                items: newItems,
                totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
                totalPrice: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
            }
        }

        case "UPDATE_QUANTITY": {
            const newItems = state.items
                .map((item) =>
                    item.id === action.payload.id ? { ...item, quantity: Math.max(0, action.payload.quantity) } : item,
                )
                .filter((item) => item.quantity > 0)

            return {
                items: newItems,
                totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
                totalPrice: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
            }
        }

        case "CLEAR_CART":
            return {
                items: [],
                totalItems: 0,
                totalPrice: 0,
            }

        case "LOAD_CART": {
            const items = action.payload
            return {
                items,
                totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
                totalPrice: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
            }
        }

        default:
            return state
    }
}

export function CartProvider({ children }: { children: React.ReactNode }) {

    const [state, dispatch] = useReducer(cartReducer, {
        items: [],
        totalItems: 0,
        totalPrice: 0,
    })

    useEffect(() => {
        const savedCart = localStorage.getItem("cart")
        if (savedCart) {
            try {
                const cartItems = JSON.parse(savedCart)
                dispatch({ type: "LOAD_CART", payload: cartItems })
            } catch (error) {
                console.error("Error loading cart from localStorage:", error)
            }
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(state.items))
    }, [state.items])

    const addItem = (product: Product) => {
        dispatch({ type: "ADD_ITEM", payload: product })
    }

    const removeItem = (id: number) => {
        dispatch({ type: "REMOVE_ITEM", payload: id })
    }

    const updateQuantity = (id: number, quantity: number) => {
        dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })

    }

    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" })
    }

    return (
        <CartContext.Provider
            value={{
                ...state,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
