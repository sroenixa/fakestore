"use client"

import styled from "styled-components"
import type { Product } from "@/src/types/product"
import { ProductCard } from "@/src/components/molecules/product-list/product-card"
import {useTranslations} from "next-intl";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  
  @media (min-width: ${(props) => props.theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 64px 20px;
  color: ${(props) => props.theme.colors.textSecondary};
  background: ${(props) => props.theme.colors.surface};
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.colors.border};
`

interface ProductGridProps {
    products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
    const _t = useTranslations('products');

    if (products.length === 0) {
        return (
            <Grid>
                <EmptyState>
                    <h3>{_t("noFound")}</h3>
                    <p>{_t("adjustFilters")}</p>
                </EmptyState>
            </Grid>
        )
    }

    return (
        <Grid>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </Grid>
    )
}
