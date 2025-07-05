"use client"

import styled from "styled-components"
import { Select, Input } from "@/src/components/atoms/input"
import { Button } from "@/src/components/atoms/button"
import { useLanguage } from "@/src/contexts/language-context"
import type { ProductFilters } from "@/src/types/product"

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
    const { t } = useLanguage()

    const handleFilterChange = (key: keyof ProductFilters, value: any) => {
        onFiltersChange({
            ...filters,
            [key]: value === "" ? undefined : value,
        })
    }

    const getCategoryTranslation = (category: string) => {
        const categoryKey = `category.${category}`
        const translation = t(categoryKey)
        return translation === categoryKey ? category.charAt(0).toUpperCase() + category.slice(1) : translation
    }

    return (
        <FiltersContainer>
            <FilterGroup>
                <Label>{t("filters.category")}</Label>
                <Select
                    value={filters.category || "all"}
                    onChange={(e) => handleFilterChange("category", e.target.value === "all" ? undefined : e.target.value)}
                >
                    <option value="all">{t("filters.allCategories")}</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {getCategoryTranslation(category)}
                        </option>
                    ))}
                </Select>
            </FilterGroup>

            <FilterGroup>
                <Label>{t("filters.sortBy")}</Label>
                <Select value={filters.sortBy || ""} onChange={(e) => handleFilterChange("sortBy", e.target.value)}>
                    <option value="">{t("filters.default")}</option>
                    <option value="price-asc">{t("filters.priceLowHigh")}</option>
                    <option value="price-desc">{t("filters.priceHighLow")}</option>
                    <option value="rating">{t("filters.highestRated")}</option>
                    <option value="title">{t("filters.nameAZ")}</option>
                </Select>
            </FilterGroup>

            <FilterGroup>
                <Label>{t("filters.priceRange")}</Label>
                <PriceInputs>
                    <PriceInput
                        type="number"
                        placeholder={t("filters.min")}
                        value={filters.minPrice || ""}
                        onChange={(e) =>
                            handleFilterChange("minPrice", e.target.value ? Number.parseFloat(e.target.value) : undefined)
                        }
                    />
                    <span>-</span>
                    <PriceInput
                        type="number"
                        placeholder={t("filters.max")}
                        value={filters.maxPrice || ""}
                        onChange={(e) =>
                            handleFilterChange("maxPrice", e.target.value ? Number.parseFloat(e.target.value) : undefined)
                        }
                    />
                </PriceInputs>
            </FilterGroup>

            <ClearButtonGroup>
                <Button variant="outline" onClick={onClearFilters}>
                    {t("filters.clear")}
                </Button>
            </ClearButtonGroup>
        </FiltersContainer>
    )
}
