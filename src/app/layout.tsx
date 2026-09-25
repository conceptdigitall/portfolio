import type { Metadata, Viewport } from "next";
import { Inter, Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import { Suspense } from "react";
import PixelTracker from "../components/PixelTracker";
import CookieConsent from "../components/CookieConsent";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AnalyticsTracker } from "../components/AnalyticsTracker";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", weight: ["400", "500", "600", "700", "800"] });
const poppins = Poppins({ subsets: ["latin"], variable: "--font-poppins", weight: ["300", "400", "600", "700", "800"] });

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
};

export const metadata: Metadata = {
    metadataBase: new URL("https://concept-digital-portfolio.vercel.app"),
    title: "Concept Digital | Desenvolvimento Web de Alta Performance",
    description: "Transformamos sua presença digital com sites de alta conversão, design premium e estratégias de SEO avançadas. Especialistas em Landing Pages e E-commerce.",
    keywords: ["desenvolvimento web", "sites de alta conversão", "SEO", "landing pages", "e-commerce", "design premium", "next.js", "react"],
    openGraph: {
        title: "Concept Digital | Desenvolvimento Web de Alta Performance",
        description: "Transformamos sua presença digital com sites de alta conversão, design premium e estratégias de SEO avançadas.",
        url: "https://concept-digital-portfolio.vercel.app",
        siteName: "Concept Digital",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Concept Digital Portfolio",
            },
        ],
        locale: "pt_BR",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR" className={`${inter.variable} ${montserrat.variable} ${poppins.variable} scroll-smooth`}>
            <body className={inter.className}>
                <Suspense fallback={null}>
                    <PixelTracker />
                    <AnalyticsTracker />
                </Suspense>
                <CookieConsent />
                <Suspense fallback={<nav className="py-6" />}>
                    <Header />
                </Suspense>
                <main className="min-h-screen relative overflow-x-hidden">
                    {children}
                </main>
                <SpeedInsights />

                {/* Simple Footer */}
                <footer className="py-8 text-center text-digital-primary text-xs uppercase tracking-widest border-t border-white/5 bg-[#020408]">
                    &copy; {new Date().getFullYear()} Concept Digital. Todos os Direitos Reservados.
                </footer>
            </body>
        </html>
    );
}
