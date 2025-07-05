"use client"

import styled from "styled-components"

export const Heading1 = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin: 0;
  color: ${(props) => props.theme.colors.text};
  
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`

export const Heading2 = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.3;
  margin: 0;
  color: ${(props) => props.theme.colors.text};
  
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 1.5rem;
  }
`

export const Heading3 = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.4;
  margin: 0;
  color: ${(props) => props.theme.colors.text};
`

export const Text = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
  color: ${(props) => props.theme.colors.text};
`

export const SmallText = styled.span`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.textSecondary};
`
