"use client"
import styled from "styled-components"
import { Button } from "@/src/components/atoms/button"
import { useTranslations } from "next-intl"

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

const PageButton = styled(Button)<{ $isActive?: boolean }>`
  ${(props) =>
    props.$isActive &&
    `
    background-color: ${props.theme.colors.primary};
    color: white;
    border-color: ${props.theme.colors.primary};
  `}
`

interface PaginationProps {
    currentPage: number
    totalItems: number
    itemsPerPage: number
    onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange }: PaginationProps) {
    const _t = useTranslations("pagination")
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const startItem = (currentPage - 1) * itemsPerPage + 1
    const endItem = Math.min(currentPage * itemsPerPage, totalItems)

    if (totalPages <= 1) return null

    const getPageNumbers = () => {
        const pages = []
        const maxPagesToShow = 5

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            const start = Math.max(1, currentPage - 2)
            const end = Math.min(totalPages, start + maxPagesToShow - 1)

            for (let i = start; i <= end; i++) {
                pages.push(i)
            }
        }

        return pages
    }

    const pageNumbers = getPageNumbers()

    return (
        <PaginationContainer>
            <Button variant="outline" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
                {_t("previous")}
            </Button>

            {pageNumbers.map((pageNum) => (
                <PageButton
                    key={pageNum}
                    variant="outline"
                    $isActive={pageNum === currentPage}
                    onClick={() => onPageChange(pageNum)}
                >
                    {pageNum}
                </PageButton>
            ))}

            <Button variant="outline" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
                {_t("next")}
            </Button>

            <PageInfo>
                {_t("showing")} {startItem}-{endItem} {_t("of")} {totalItems} {_t("products")}
            </PageInfo>
        </PaginationContainer>
    )
}
