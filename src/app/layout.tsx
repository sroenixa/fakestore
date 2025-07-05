import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "@/src/lib/styled-components-registry";
import {CustomThemeProvider} from "@/src/contexts/theme-context";
import {LanguageProvider} from "@/src/contexts/language-context";


const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})


export const metadata: Metadata = {
  title: "FakeStore - Your Online Shopping Destination",
  description: "Shop electronics, clothing, jewelry and more.",
  keywords: "online shopping, electronics, clothing, jewelry, accessories, e-commerce"
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
      <CustomThemeProvider >
        <LanguageProvider>
          <StyledComponentsRegistry>
            {children}
          </StyledComponentsRegistry>
        </LanguageProvider>
      </CustomThemeProvider>
      </body>
    </html>
  );
}
