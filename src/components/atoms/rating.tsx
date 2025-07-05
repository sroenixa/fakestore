"use client"

import styled from "styled-components"

const RatingContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`

/* 🔑  $filled = transient prop → DOM'a yazılmaz */
const Star = styled.span<{ $filled: boolean }>`
    color: ${({ $filled }) => ($filled ? "#fbbf24" : "#d1d5db")};
    font-size: 16px;
`

const RatingText = styled.span`
    font-size: 14px;
    color: #6b7280;
    margin-left: 4px;
`

interface RatingProps {
    rating: number
    count?: number
    showCount?: boolean
}

export function Rating({ rating, count, showCount = true }: RatingProps) {
    const stars = Array.from({ length: 5 }, (_, i) => (
        <Star key={i} $filled={i < Math.floor(rating)}>
            ★
        </Star>
    ))

    return (
        <RatingContainer>
            {stars}
            {showCount && !!count && <RatingText>({count})</RatingText>}
        </RatingContainer>
    )
}
