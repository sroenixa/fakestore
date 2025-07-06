"use client"

import {Product} from "@/src/types/product";
import styled from "styled-components";
import {Text, SmallText, Heading1} from "@/src/components/atoms/typography";
import {Button} from "@/src/components/atoms/button";
import {Rating} from "@/src/components/atoms/rating";
import {useCart} from "@/src/contexts/cart-context";
import {useLanguage} from "@/src/contexts/language-context";
import Image from "next/image"
import toast from "react-hot-toast";


const ProductLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  background: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 12px;
  overflow: hidden;
  
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    height: 400px;
  }
`

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  background: ${(props) => props.theme.colors.surface};
  padding: 32px;
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.colors.border};
  box-shadow: ${(props) => props.theme.shadows.small};
`

const Category = styled(SmallText)`
  text-transform: uppercase;
  font-weight: 600;
  color: ${(props) => props.theme.colors.primary};
  letter-spacing: 0.5px;
`

const Price = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.success};
`

const Description = styled(Text)`
  font-size: 16px;
  line-height: 1.7;
`

const ActionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 32px;
`

const BackButton = styled(Button)`
  margin-bottom: 24px;
  align-self: flex-start;
`
interface ProductListProps {
    product: Product
}
export default function ProductDetail({product}: ProductListProps  ) {

    const { addItem } = useCart()
    const { t } = useLanguage()

    const handleAddToCart = () => {
        addItem(product)
        toast.success(t("cart.add"))
    }

    const getCategoryTranslation = (category: string) => {
        const categoryKey = `category.${category}`
        const translation = t(categoryKey)
        return translation === categoryKey ? category : translation
    }

    return (
        <>
            <ProductLayout>
                <ImageContainer>
                    <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        fill
                        style={{ objectFit: "contain" }}
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </ImageContainer>

                <ProductInfo>
                    <div>
                        <Category>{getCategoryTranslation(product.category)}</Category>
                        <Heading1 style={{ marginTop: "8px" }}>{product.title}</Heading1>
                    </div>

                    <Rating rating={product.rating.rate} count={product.rating.count} />

                    <Price>${product.price.toFixed(2)}</Price>

                    <Description>{product.description}</Description>

                    <ActionSection>
                        <Button size="large" onClick={handleAddToCart}>
                            {t("product.addToCart")}
                        </Button>
                    </ActionSection>
                </ProductInfo>
            </ProductLayout>
        </>
    );
}
