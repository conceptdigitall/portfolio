import type { Metadata, Viewport } from 'next';
import './globals.css';
import SiteAnalytics from '@/components/SiteAnalytics';
import CookieBanner from '@/components/CookieBanner';
import { SITE_URL, SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Teles Adega Delivery | Bebidas geladas com entrega rápida',
  description:
    'Peça cervejas, destilados, vinhos, energéticos e gelo na Teles Adega. Entrega rápida, pagamento por Pix ou dinheiro e acompanhamento do pedido em tempo real.',
  keywords: ['adega delivery', 'bebidas delivery', 'cerveja gelada', 'disk bebidas', 'Teles Adega'],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Teles Adega Delivery',
    description: 'Bebidas geladas com entrega rápida. Peça online e acompanhe em tempo real.',
    url: '/',
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
    // A imagem vem de src/app/opengraph-image.tsx (gerada automaticamente).
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  // Google Search Console → "Tag HTML": cole só o valor do content em NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION.
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0D0D0D',
};

/**
 * Dados estruturados (schema.org) para a busca local do Google.
 * TODO: acrescentar address (rua, bairro, cidade) e openingHoursSpecification reais.
 */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LiquorStore',
  name: SITE_NAME,
  url: SITE_URL,
  telephone: '+55 13 99765-0605',
  image: `${SITE_URL}/opengraph-image`,
  paymentAccepted: 'Pix, Dinheiro',
  address: { '@type': 'PostalAddress', addressRegion: 'SP', addressCountry: 'BR' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-[#0D0D0D] text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <CookieBanner accent="#F59E0B" accentText="#0D0D0D" />
        <SiteAnalytics />
      </body>
    </html>
  );
}
