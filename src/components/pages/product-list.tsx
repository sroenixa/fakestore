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

export default function ProductList({categoriesData, productsResponseData,filterData}: ProductListProps  ) {
    const [filters, setFilters] = useState<ProductFilters>(filterData)
    const [searchTerm, setSearchTerm] = useState(filterData.search ?? "")
    const [page, setPage] = useState(filterData.page ?? undefined)
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

    }, [filters]);

    const handleFiltersChange = (newFilters: ProductFilters) => {
        setFilters({...newFilters,page:"1"})
    }

    const handleClearFilters = () => {
        setFilters({})
    }

    const handleSearch = () => {
        setFilters({ ...filters,search: searchTerm })
    }

    const handlePage = (page:string) => {
        setPage(page);
        setFilters({ ...filters,page:page})
    }

    return (
        <>
            <SearchBar value={searchTerm} onChange={setSearchTerm} onSearch={handleSearch}></SearchBar>
            <Filters filters={filterData} categories={categoriesData} onFiltersChange={handleFiltersChange} onClearFilters={handleClearFilters}/>
            <ProductGrid products={productsResponseData.products}/>
            <Pagination currentPage={parseInt(page ?? "1")} totalItems={productsResponseData.total} itemsPerPage={parseInt(filterData.limit ?? "10")} onPageChange={handlePage}/>
        </>
    );
}
