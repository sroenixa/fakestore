import { NextRequest, NextResponse } from 'next/server'
import {Product} from "@/src/types/product";

const BASE_URL = 'https://fakestoreapi.com/products/'

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const slug = (await params).id;

        const response = await fetch(BASE_URL+slug, {
            next: { revalidate: 60 },
        })

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch product' }, { status: 502 })
        }

        let product: Product = await response.json()

        return NextResponse.json(product)

    } catch (error) {
        console.error('API error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
