import type { Metadata, Viewport } from "next";
import { Inter, Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import { SiteHeader, SiteFooter } from "../components/home/SiteChrome";
import ChatWidget from "../components/home/ChatWidget";
import { Suspense } from "react";
import PixelTracker from "../components/PixelTracker";
import CookieConsent from "../components/CookieConsent";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AnalyticsTracker } from "../components/AnalyticsTracker";
import SiteAnalytics from "../components/SiteAnalytics";
import { SITE_URL, SITE_NAME } from "../lib/site";
import { WHATSAPP_NUMBER } from "../lib/whatsapp";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", weight: ["400", "500", "600", "700", "800"] });
const poppins = Poppins({ subsets: ["latin"], variable: "--font-poppins", weight: ["300", "400", "600", "700", "800"] });

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#06081A",
    colorScheme: "dark",
    // Sem maximumScale: bloquear o zoom prejudica a acessibilidade (e a nota do Lighthouse).
};

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: "Concept Digital | Landing Pages, CRMs e Sistemas na Baixada Santista",
        template: "%s | Concept Digital",
    },
    description: "Engenharia de vendas e design para negócios da Baixada Santista. Landing pages de alta conversão, CRM próprio, e-commerce e sistemas sob medida.",
    keywords: ["criação de sites", "landing page", "CRM", "WhatsApp", "e-commerce", "sistemas sob medida", "Santos", "Baixada Santista", "Cubatão", "São Vicente", "Guarujá"],
    alternates: { canonical: "/" },
    openGraph: {
        title: "Concept Digital | Sites e sistemas que vendem",
        description: "Landing pages de alta conversão, CRM próprio e sistemas sob medida para negócios da Baixada Santista.",
        url: "/",
        siteName: SITE_NAME,
        locale: "pt_BR",
        type: "website",
        // A imagem vem de src/app/opengraph-image.tsx (gerada automaticamente).
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
    icons: {
        icon: [
            { url: "/favicon.ico" },
            { url: "/favicon.svg", type: "image/svg+xml" },
            { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
        ],
        apple: [
            { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
        ],
    },
    manifest: "/site.webmanifest",
    // Google Search Console → "Tag HTML": cole só o valor do content em NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION.
    verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
        ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
        : undefined,
};

/** Dados estruturados (schema.org): ajudam o Google a entender quem é a empresa. */
const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    logo: `${SITE_URL}/logo-concept2.png`,
    description: "Landing pages de alta conversão, CRM próprio, e-commerce e sistemas sob medida.",
    telephone: `+${WHATSAPP_NUMBER}`,
    areaServed: ["Santos", "São Vicente", "Cubatão", "Guarujá", "Praia Grande", "Baixada Santista"],
    address: { "@type": "PostalAddress", addressRegion: "SP", addressCountry: "BR" },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR" className={`${inter.variable} ${montserrat.variable} ${poppins.variable} scroll-smooth`}>
            <body className={inter.className}>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <Suspense fallback={null}>
                    <PixelTracker />
                    <AnalyticsTracker />
                </Suspense>
                <CookieConsent />
                <SiteHeader />
                <main className="min-h-screen relative overflow-x-hidden">
                    {children}
                </main>
                <SiteFooter />
                <ChatWidget />
                <SpeedInsights />
                <SiteAnalytics />
            </body>
        </html>
    );
}
