import {Header} from "@/src/components/organisms/header";
import {ProductsResponse} from "@/src/types/product";

export default async function ProductListPage() {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL+`/api/products?page=1&limit=20&category=electronics&sortBy=rating`)
    if (!res.ok) throw new Error('Ürünler getirilemedi')
    const data: ProductsResponse = await res.json()

    return (
        <>

        </>
    );
}
