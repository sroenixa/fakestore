"use client"

import styled from "styled-components"
import { Select, Input } from "@/src/components/atoms/input"
import { Button } from "@/src/components/atoms/button"
import type { ProductFilters } from "@/src/types/product"
import {useDebouncedEffect} from "@/src/hooks/useDebouncedEffect";
import {useEffect, useRef, useState} from "react";
import {useTranslations} from "next-intl";

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 20px;
  background: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 12px;
  margin-bottom: 24px;
  
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 150px;
  
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    min-width: 100%;
  }
`

const ClearButtonGroup = styled.div`
  display: flex;
    align-items: end;
  min-width: 150px;
    margin-bottom: 2px;
  
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`




const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.text};
`

const PriceInputs = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`

const PriceInput = styled(Input)`
  width: 80px;
`

interface FiltersProps {
    filters: ProductFilters
    categories: string[]
    onFiltersChange: (filters: ProductFilters) => void
    onClearFilters: () => void
}

export function Filters({ filters, categories, onFiltersChange, onClearFilters }: FiltersProps) {
    const _t = useTranslations('filters');
    const _t_c = useTranslations('category');
    const handleFilterChange = (key: keyof ProductFilters, value: any) => {
        onFiltersChange({
            ...filters,
            [key]: value === "" ? undefined : value,
        })
    }

    const getCategoryTranslation = (category: string) => {
        const categoryKey = `${category}`
        const translation = _t_c(categoryKey)
        return translation === categoryKey ? category.charAt(0).toUpperCase() + category.slice(1) : translation
    }

    const [minPrice, setMinPrice] = useState<string>(filters.minPrice ?? "")
    const [maxPrice, setMaxPrice] = useState<string>(filters.maxPrice ?? "")
    const initialMinPrice = useRef<string>(filters.minPrice ?? "")
    const initialMaxPrice = useRef<string>(filters.maxPrice ?? "")
    const isFirstRender = useRef(true)

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            initialMinPrice.current = filters.minPrice ?? ""
            initialMaxPrice.current = filters.maxPrice ?? ""
            return
        }

        setMinPrice(filters.minPrice ?? "");
        setMaxPrice(filters.maxPrice ?? "");
    }, [filters]);

    useDebouncedEffect(
        () => {
            if (minPrice !== initialMinPrice.current) {
                handleFilterChange("minPrice", minPrice ? Number.parseFloat(minPrice) : undefined)
            }
        },
        [minPrice],
        1000,
    )

    useDebouncedEffect(
        () => {
            if (maxPrice !== initialMaxPrice.current) {
                handleFilterChange("maxPrice", maxPrice ? Number.parseFloat(maxPrice) : undefined)
            }
        },
        [maxPrice],
        1000,
    )

    return (
        <FiltersContainer>
            <FilterGroup>
                <Label htmlFor={'category'}>{_t("category")}</Label>
                <Select
                    id={'category'}
                    value={filters.category || "all"}
                    onChange={(e) => handleFilterChange("category", e.target.value === "all" ? undefined : e.target.value)}
                >
                    <option value="all">{_t("allCategories")}</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {getCategoryTranslation(category)}
                        </option>
                    ))}
                </Select>
            </FilterGroup>

            <FilterGroup>
                <Label htmlFor={'sortBy'}>{_t("sortBy")}</Label>
                <Select id={'sortBy'} value={filters.sortBy || ""} onChange={(e) => handleFilterChange("sortBy", e.target.value)}>
                    <option value="">{_t("default")}</option>
                    <option value="price-asc">{_t("priceLowHigh")}</option>
                    <option value="price-desc">{_t("priceHighLow")}</option>
                    <option value="rating">{_t("highestRated")}</option>
                    <option value="title">{_t("nameAZ")}</option>
                </Select>
            </FilterGroup>

            <FilterGroup>
                <Label htmlFor={'priceRange'}>{_t("priceRange")}</Label>
                <PriceInputs>
                    <PriceInput
                        type="number"
                        id={'priceRange'}
                        placeholder={_t("min")}
                        value={minPrice}
                        onChange={(e) =>
                            setMinPrice(e.target.value === "" ? "" : e.target.value)
                        }
                    />
                    <span>-</span>
                    <PriceInput
                        type="number"
                        value={maxPrice}
                        placeholder={_t("max")}
                        onChange={(e) =>
                            setMaxPrice(e.target.value === "" ? "" : e.target.value)
                        }
                    />
                </PriceInputs>
            </FilterGroup>

            <ClearButtonGroup>
                <Button variant="outline" onClick={onClearFilters}>
                    {_t("clear")}
                </Button>
            </ClearButtonGroup>
        </FiltersContainer>
    )
}
