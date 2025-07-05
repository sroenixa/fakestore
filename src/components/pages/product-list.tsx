"use client"

import {Header} from "@/src/components/organisms/header";
import {ProductFilters, ProductsResponse} from "@/src/types/product";
import {Filters} from "@/src/components/molecules/filter";
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import {SearchBar} from "@/src/components/molecules/search";
import {Pagination} from "@/src/components/molecules/pagination";
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

        // Blocked When First Render
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }

        const query = new URLSearchParams(filters as any)
        router.push(`?${query.toString()}`)

    }, [filters]);

    //filter events
    const handleFiltersChange = (newFilters: ProductFilters) => {
        setFilters({...newFilters,page:"1"})
    }

    const handleClearFilters = () => {
        setFilters({})
    }

    //search events
    const handleSearch = () => {
        setFilters({ ...filters,search: searchTerm })
    }

    // pagination events
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
