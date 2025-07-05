import { NextRequest, NextResponse } from 'next/server'

const BASE_URL = 'https://fakestoreapi.com/products/categories'

export async function GET(req: NextRequest) {
    try {
        const response = await fetch(BASE_URL, {
            next: { revalidate: 60 },
        })

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 502 })
        }

        let categories: string[] = await response.json()

        return NextResponse.json(categories)

    } catch (error) {
        console.error('API error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
