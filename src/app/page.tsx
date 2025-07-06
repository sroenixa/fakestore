import {Header} from "@/src/components/organisms/header";
import {ProductsResponse} from "@/src/types/product";
import {Filters} from "@/src/components/molecules/product-list/filter";
import ProductList from "@/src/components/pages/product-list";
import dynamic from "next/dynamic";

interface SearchParams {
    page?: number;
    limit?: number;
    category?: string;
    sortBy?: "title" | "price-asc" | "price-desc" | "rating";
    minPrice?: string;
    maxPrice?: string;
    search?: string;
}

export default async function Home(context: { searchParams: SearchParams }) {
    const { page, limit, sortBy, category, minPrice, maxPrice, search } = await context.searchParams;

    const query = new URLSearchParams()

    if (page)      query.set("page", page.toString())
    if (limit)     query.set("limit", limit.toString())
    if (category)  query.set("category", category)
    if (minPrice)  query.set("minPrice", minPrice)
    if (maxPrice)  query.set("maxPrice", maxPrice)
    if (search)    query.set("search", search)
    if (sortBy)    query.set("sortBy", sortBy)

    const productsRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?${query.toString()}`,
        { cache: "no-store" },
    )

    if (!productsRes.ok) throw new Error('Ürünler getirilemedi')
    const productData: ProductsResponse = await productsRes.json()

    const categoryRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`)
    if (!categoryRes.ok) throw new Error('Kategoriler getirilemedi')
    const categoryData: string[] = await categoryRes.json()

    const filterData = {
        page,
        limit,
        sortBy,
        category,
        minPrice,
        maxPrice,
        search
    }

    const ProductList = dynamic(() => import('@/src/components/pages/product-list'), {
        loading: () => <p>Loading products...</p>,
        ssr: true,
    })


    return (
        <>
            <ProductList categoriesData={categoryData} productsResponseData={productData} filterData={filterData} />
        </>
    )
}
