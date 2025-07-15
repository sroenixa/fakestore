import {Header} from "@/src/components/organisms/header";
import {Product} from "@/src/types/product";
import ProductDetail from "@/src/components/pages/product-detail";
import {Metadata} from "next";


export async function generateMetadata(context: { params: { id: string } }): Promise<Metadata> {
    const { id } = await context.params;
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL+`/api/products/`+id)
    if (!res.ok) throw new Error('Ürün getirilemedi')
    const product: Product = await res.json()

    return {
        title: `${product.title} - FakeStore`,
        description: product.description,
        keywords: `${product.category}, ${product.title}, online shopping`,
        openGraph: {
            title: product.title,
            description: product.description,
            images: [product.image],
        },
    }
}

export default async function ProductDetailPage(context: { params: { id: string } }) {
    const { id } = await context.params;
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL+`/api/products/`+id)
    if (!res.ok) throw new Error('Ürün getirilemedi')
    const data: Product = await res.json()

    return (
        <>
            <ProductDetail product={data}/>
        </>
    );
}
