import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "@/src/lib/styled-components-registry";
import {CustomThemeProvider} from "@/src/contexts/theme-context";
import {Header} from "@/src/components/organisms/header";
import {StyledContainer} from "@/src/components/atoms/container";
import {CartProvider} from "@/src/contexts/cart-context";
import {Toaster} from 'react-hot-toast';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';

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


export default async function RootLayout({
  children,
    params
}: Readonly<{
  children: React.ReactNode;
    params: Promise<{ locale: string }>
}>) {

    const messages = await getMessages();
    const { locale } = await params;

    if (!['tr', 'en'].includes(locale)) {
        notFound();
    }
    return (
    <html lang={locale}>
      <body className={`${inter.className}`}>
      <NextIntlClientProvider  messages={messages}>
      <CustomThemeProvider >
        <CartProvider>
            <StyledComponentsRegistry>
              <Header/>
                <StyledContainer>
                    <Toaster position="bottom-right"
                       reverseOrder={false}
                    />
                    {children}
                </StyledContainer>
            </StyledComponentsRegistry>
        </CartProvider>
      </CustomThemeProvider>
      </NextIntlClientProvider>
      </body>
    </html>
  );
}
