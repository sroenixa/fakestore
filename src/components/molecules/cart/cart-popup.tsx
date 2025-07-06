"use client"

import type React from "react"

import { useEffect } from "react"
import styled, { keyframes } from "styled-components"
import Image from "next/image"
import { useCart } from "@/src/contexts/cart-context"
import { useLanguage } from "@/src/contexts/language-context"
import { Button } from "@/src/components/atoms/button"
import { Heading2, Text } from "@/src/components/atoms/typography"
import { Input } from "@/src/components/atoms/input"
import toast from "react-hot-toast";


const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: ${(props) => (props.$isOpen ? "block" : "none")};
`

const CartContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100%;
  background: ${(props) => props.theme.colors.surface};
  box-shadow: ${(props) => props.theme.shadows.large};
  z-index: 1001;
  display: flex;
  flex-direction: column;
  transform: translateX(${(props) => (props.$isOpen ? "0" : "100%")});
  transition: transform 0.3s ease-in-out;
  
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${(props) => props.theme.colors.text};
  padding: 4px;
  border-radius: 4px;
  
  &:hover {
    background: ${(props) => props.theme.colors.border};
  }
`

const CartContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`

const CartFooter = styled.div`
  padding: 20px;
  border-top: 1px solid ${(props) => props.theme.colors.border};
  background: ${(props) => props.theme.colors.background};
`

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const CartItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px;
  background: ${(props) => props.theme.colors.background};
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.border};
`

const ItemImage = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  background: ${(props) => props.theme.colors.surface};
  border-radius: 4px;
  flex-shrink: 0;
`

const ItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const ItemTitle = styled.h4`
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  color: ${(props) => props.theme.colors.text};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const ItemPrice = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.success};
`

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`

const QuantityButton = styled.button`
  width: 28px;
  height: 28px;
  border: 1px solid ${(props) => props.theme.colors.border};
  background: ${(props) => props.theme.colors.surface};
  color: ${(props) => props.theme.colors.text};
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  
  &:hover {
    background: ${(props) => props.theme.colors.border};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const QuantityInput = styled(Input)`
  width: 50px;
  text-align: center;
  padding: 4px 8px;
  height: 28px;
  font-size: 12px;
`

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.error};
  cursor: pointer;
  font-size: 12px;
  padding: 4px 0;
    text-align: right;
  
  &:hover {
    text-decoration: underline;
  }
`

const EmptyCart = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: ${(props) => props.theme.colors.textSecondary};
`

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
    padding-top: 12px;
    border-top: 1px solid ${(props) => props.theme.colors.border};
    font-weight: 600;
  }
`

interface CartPopupProps {
    isOpen: boolean
    onClose: () => void
}

export function CartPopup({ isOpen, onClose }: CartPopupProps) {
    const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart()
    const { t } = useLanguage()

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }

        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", handleEscape)
        }

        return () => {
            document.removeEventListener("keydown", handleEscape)
        }
    }, [isOpen, onClose])

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    if (!isOpen) return null

    return (
        <>
            <Overlay $isOpen={isOpen} onClick={handleOverlayClick} />
            <CartContainer $isOpen={isOpen}>
                <CartHeader>
                    <Heading2>
                        {t("cart.title")} ({totalItems})
                    </Heading2>
                    <CloseButton onClick={onClose}>×</CloseButton>
                </CartHeader>

                <CartContent>
                    {items.length === 0 ? (
                        <EmptyCart>
                            <Text>{t("cart.empty")}</Text>
                            <Text style={{ fontSize: "14px", marginTop: "8px" }}>{t("cart.emptyDescription")}</Text>
                        </EmptyCart>
                    ) : (
                        <CartItems>
                            {items.map((item) => (
                                <CartItem key={item.id}>
                                    <ItemImage>
                                        <Image
                                            src={item.image || "/placeholder.svg"}
                                            alt={item.title}
                                            fill
                                            style={{ objectFit: "contain" }}
                                            sizes="60px"
                                        />
                                    </ItemImage>

                                    <ItemInfo>
                                        <ItemTitle>{item.title}</ItemTitle>
                                        <ItemPrice>${item.price.toFixed(2)}</ItemPrice>

                                        <QuantityControls>
                                            <QuantityButton
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                -
                                            </QuantityButton>
                                            <QuantityInput
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) => {
                                                    updateQuantity(item.id, Number.parseInt(e.target.value) || 1);
                                                    toast.success(t("cart.update"))
                                                }}
                                                min="1"
                                            />
                                            <QuantityButton onClick={() => {updateQuantity(item.id, item.quantity + 1);  toast.success(t("cart.update")) }}>+</QuantityButton>
                                        </QuantityControls>

                                        <RemoveButton onClick={() => {removeItem(item.id);  toast.success(t("cart.remove"))} }>{t("cart.removeFromCart")}</RemoveButton>
                                    </ItemInfo>
                                </CartItem>
                            ))}
                        </CartItems>
                    )}
                </CartContent>

                {items.length > 0 && (
                    <CartFooter>
                        <SummaryRow>
                            <Text>{t("cart.subtotal")}</Text>
                            <Text>${totalPrice.toFixed(2)}</Text>
                        </SummaryRow>

                        <SummaryRow>
                            <Text>{t("cart.tax")}</Text>
                            <Text>${(totalPrice * 0.08).toFixed(2)}</Text>
                        </SummaryRow>

                        <SummaryRow>
                            <Text>{t("cart.total")}</Text>
                            <Text>${(totalPrice * 1.08).toFixed(2)}</Text>
                        </SummaryRow>

                        <Button size={"large"} variant="outline" onClick={() => {toast.success(t("cart.clear")); clearCart()} } style={{ marginTop: "8px" }}>
                            {t("cart.clearCart")}
                        </Button>
                    </CartFooter>
                )}
            </CartContainer>
        </>
    )
}
