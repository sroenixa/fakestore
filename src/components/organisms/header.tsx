"use client"

import styled from "styled-components"
import Link from "next/link"
import { Heading2 } from "@/src/components/atoms/typography"
import { ThemeToggle } from "@/src/components/atoms/theme-toggle"
import { LanguageToggle } from "@/src/components/atoms/language-toggle"
import {CartIconComponent} from "@/src/components/molecules/cart/cart-icon";
import {useTranslations} from "next-intl";

const HeaderContainer = styled.header`
  background: ${(props) => props.theme.colors.surface};
  box-shadow: ${(props) => props.theme.shadows.small};
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 16px;
  
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    gap: 12px;
  }
`

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export function Header() {
    const _t = useTranslations('header');

    return (
        <HeaderContainer>
            <HeaderContent>
                <Link href="/">
                    <Heading2>{_t("title")}</Heading2>
                </Link>
                <Nav>
                    <Controls>
                        <LanguageToggle />
                        <ThemeToggle />
                        <CartIconComponent/>
                    </Controls>
                </Nav>
            </HeaderContent>
        </HeaderContainer>
    )
}
