"use client"
import styled from "styled-components"

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px;
  min-height: calc(100vh - 80px);
`

export function StyledContainer({ children }: { children: React.ReactNode }) {
    return (
        <Container>
            {children}
        </Container>
    )
}
