"use client"

import {Header} from "@/src/components/organisms/header";
import {ProductFilters, ProductsResponse} from "@/src/types/product";
import {Filters} from "@/src/components/molecules/product-list/filter";
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import {SearchBar} from "@/src/components/molecules/product-list/search";
import {Pagination} from "@/src/components/molecules/product-list/pagination";
import {ProductGrid} from "@/src/components/organisms/product-grid";

interface ProductListProps {
    categoriesData: string[]
    productsResponseData: ProductsResponse
    filterData: ProductFilters
}

export default function ProductList({categoriesData, productsResponseData,filterData}: ProductListProps) {
    const [filters, setFilters] = useState<ProductFilters>(filterData)
    const [searchTerm, setSearchTerm] = useState(filterData.search ?? "")
    const [page, setPage] = useState<number>(filterData.page ? Number(filterData.page) : 1)
    const router = useRouter()
    const isFirstRender = useRef(true)

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        const query = new URLSearchParams(
            Object.entries(filters)
                .filter(([, v]) => v !== undefined && v !== "" && v !== null)
                .map(([k, v]) => [k, String(v)]),
        )
        router.push(`?${query.toString()}`)
    }, [filters, router])

    const handleFiltersChange = (newFilters: ProductFilters) => {
        setFilters({ ...newFilters, page: 1 })
        setPage(1)
    }

    const handleClearFilters = () => {
        setFilters({})
        setPage(1)
        setSearchTerm("")
    }

    const handleSearch = () => {
        setFilters({ ...filters, search: searchTerm, page: 1 })
        setPage(1)
    }

    const handlePage = (newPage: number) => {
        setPage(newPage)
        setFilters({ ...filters, page: newPage })
    }

    return (
        <>
            <SearchBar value={searchTerm} onChange={setSearchTerm} onSearch={handleSearch} />
            <Filters filters={filters} categories={categoriesData} onFiltersChange={handleFiltersChange} onClearFilters={handleClearFilters} />
            <ProductGrid products={productsResponseData.products} />
            <Pagination
                currentPage={page}
                totalItems={productsResponseData.total}
                itemsPerPage={Number(filterData.limit ?? 10)}
                onPageChange={handlePage}
            />
        </>
    )
}
