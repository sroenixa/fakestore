import { NextRequest, NextResponse } from 'next/server'
import {Product} from "@/src/types/product";

const BASE_URL = 'https://fakestoreapi.com/products'

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = req.nextUrl

        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const category = searchParams.get('category') || undefined
        const minPrice = searchParams.get('minPrice')
        const maxPrice = searchParams.get('maxPrice')
        const search = searchParams.get('search') || undefined
        const sortBy = searchParams.get('sortBy') as
            | 'price-asc'
            | 'price-desc'
            | 'rating'
            | 'title'
            | undefined


        const response = await fetch(BASE_URL, {
            next: { revalidate: 60 },
        })

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch products' }, { status: 502 })
        }

        let products: Product[] = await response.json()

        if (category && category !== 'all') {
            products = products.filter(
                (p) => p.category.toLowerCase() === category.toLowerCase(),
            )
        }

        if (minPrice !== null) {
            products = products.filter((p) => p.price >= parseFloat(minPrice!))
        }

        if (maxPrice !== null) {
            products = products.filter((p) => p.price <= parseFloat(maxPrice!))
        }

        if (search) {
            products = products.filter((p) =>
                p.title.toLowerCase().includes(search.toLowerCase()),
            )
        }

        switch (sortBy) {
            case 'price-asc':
                products.sort((a, b) => a.price - b.price)
                break
            case 'price-desc':
                products.sort((a, b) => b.price - a.price)
                break
            case 'rating':
                products.sort((a, b) => b.rating.rate - a.rating.rate)
                break
            case 'title':
                products.sort((a, b) => a.title.localeCompare(b.title))
                break
        }

        const total = products.length
        const start = (page - 1) * limit
        const end = start + limit
        const paginatedProducts = products.slice(start, end)

        return NextResponse.json({
            products: paginatedProducts,
            total,
            hasMore: end < total,
        })
    } catch (error) {
        console.error('API error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
