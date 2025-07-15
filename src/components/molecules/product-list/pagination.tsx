"use client"

import styled from "styled-components"
import { Button } from "@/src/components/atoms/button"
import {useTranslations} from "next-intl";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin: 32px 0;
`

const PageInfo = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.colors.textSecondary};
  margin: 0 16px;
`

interface PaginationProps {
    currentPage: number
    totalItems: number
    itemsPerPage: number
    onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange }: PaginationProps) {
    const _t = useTranslations('pagination');

    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const startItem = (currentPage - 1) * itemsPerPage + 1
    const endItem = Math.min(currentPage * itemsPerPage, totalItems)

    if (totalPages <= 1) return null

    return (
        <PaginationContainer>

            <Button variant="outline" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
                {_t("previous")}
            </Button>

            <PageInfo>
                {_t("showing")} {startItem}-{endItem} {_t("of")} {totalItems} {_t("products")}
            </PageInfo>

            <Button variant="outline" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
                {_t("next")}
            </Button>
        </PaginationContainer>
    )
}
