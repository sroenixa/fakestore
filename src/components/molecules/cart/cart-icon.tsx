"use client"

import { useState } from "react"
import styled from "styled-components"
import { useCart } from "@/src/contexts/cart-context"
import {CartPopup} from "@/src/components/molecules/cart/cart-popup";

const CartButton = styled.button`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background-color: ${(props) => props.theme.colors.surface};
    color: ${(props) => props.theme.colors.text};
    border: 2px solid ${(props) => props.theme.colors.border};
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`

const CartBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: ${(props) => props.theme.colors.error};
  color: ${(props) => props.theme.colors.surface};
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  border: 2px solid ${(props) => props.theme.colors.surface};
`

const CartIcon = styled.span`
  font-size: 20px;
`

export function CartIconComponent() {
    const { totalItems } = useCart()
    const [isCartOpen, setIsCartOpen] = useState(false)

    const handleCartClick = () => {
        setIsCartOpen(true)
    }

    const handleCartClose = () => {
        setIsCartOpen(false)
    }

    return (
        <>
            <CartButton onClick={handleCartClick} aria-label="Open shopping cart">
                <CartIcon>🛒</CartIcon>
                {totalItems > 0 && <CartBadge>{totalItems > 99 ? "99+" : totalItems}</CartBadge>}
            </CartButton>

            <CartPopup isOpen={isCartOpen} onClose={handleCartClose} />
        </>
    )
}
