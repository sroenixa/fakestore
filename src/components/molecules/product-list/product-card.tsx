"use client"

import type React from "react"
import styled from "styled-components"
import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/src/types/product"
import { Button } from "@/src/components/atoms/button"
import {Heading3, SmallText, Text} from "@/src/components/atoms/typography"
import { Rating } from "@/src/components/atoms/rating"
import { useLanguage } from "@/src/contexts/language-context"
import { useCart } from "@/src/contexts/cart-context"
import toast from "react-hot-toast";


const Card = styled.div`
  background: ${(props) => props.theme.colors.surface};
  border-radius: 12px;
  box-shadow: ${(props) => props.theme.shadows.small};
  overflow: hidden;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  border: 1px solid ${(props) => props.theme.colors.border};
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${(props) => props.theme.shadows.large};
  }
`

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  background: ${(props) => props.theme.colors.background};
`

const Content = styled.div`
    padding: 20px;
    gap: 10px;
    min-height: calc(36vh - 80px);
`

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 16px 0;
`

const Price = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.success};
`


const ButtonContainer = styled.div`
    padding:0 20px 20px 20px ;
`

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    const { t } = useLanguage()
    const { addItem } = useCart()

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        addItem(product)
        toast.success(t("cart.add"))
    }

    const getCategoryTranslation = (category: string) => {
        const categoryKey = `category.${category}`
        const translation = t(categoryKey)
        return translation === categoryKey ? category : translation
    }

    return (
        <Card>
            <Link href={`/products/${product.id}`}>
                <ImageContainer>
                    <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        fill
                        style={{ objectFit: "contain" }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    />
                </ImageContainer>
                <Content>
                    <SmallText>{getCategoryTranslation(product.category)}</SmallText>
                    <Text>{product.title}</Text>
                    <Rating rating={product.rating.rate} count={product.rating.count} />
                    <PriceContainer>
                        <Price>${product.price.toFixed(2)}</Price>
                    </PriceContainer>
                </Content>
                <ButtonContainer>
                    <Button size={"large"} onClick={handleAddToCart} type="button">
                        {t("product.addToCart")}
                    </Button>
                </ButtonContainer>
            </Link>
        </Card>
    )
}
