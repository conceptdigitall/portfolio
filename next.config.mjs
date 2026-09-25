/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV !== 'production';
const isPreview = process.env.VERCEL_ENV === 'preview';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pkvlnhfzhjjsblotzoxn.supabase.co';
const supabaseWs = supabaseUrl.replace('https://', 'wss://');

/**
 * Content-Security-Policy: lista do que o site PODE carregar.
 * Qualquer script, conexão ou iframe fora desta lista é bloqueado pelo navegador.
 * Se adicionar um serviço novo, inclua o domínio dele aqui.
 * Google Analytics 4 já está liberado (googletagmanager + google-analytics).
 */
const ga = 'https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com';
const csp = [
    "default-src 'self'",
    // 'unsafe-inline' é necessário para os scripts de inicialização do Next.js
    `script-src 'self' 'unsafe-inline' https://connect.facebook.net https://www.googletagmanager.com${isDev ? " 'unsafe-eval'" : ''}${isPreview ? ' https://vercel.live' : ''}`,
    "style-src 'self' 'unsafe-inline'",
    `img-src 'self' data: blob: https://www.facebook.com ${ga}`,
    "font-src 'self' data:",
    `connect-src 'self' ${supabaseUrl} ${supabaseWs} https://www.facebook.com https://connect.facebook.net ${ga}${isPreview ? ' https://vercel.live wss://ws-us3.pusher.com' : ''}`,
    `frame-src 'self' https://www.facebook.com${isPreview ? ' https://vercel.live' : ''}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    'upgrade-insecure-requests',
].join('; ');

const securityHeaders = [
    { key: 'Content-Security-Policy', value: csp },
    // Força HTTPS por 2 anos, inclusive subdomínios
    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
    // Impede o navegador de "adivinhar" o tipo de arquivo
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    // Impede que o site seja embutido em iframes de terceiros (clickjacking)
    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
    // Envia só a origem (sem o caminho) para outros sites
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    // Isola a janela do site de janelas abertas por outros sites
    { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
    // Desliga recursos do navegador que o site não usa
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()' },
];

const nextConfig = {
    reactStrictMode: true,
    poweredByHeader: false,
    // O painel administrativo agora é o CRM Concept (login feito lá).
    async redirects() {
        return [
            { source: '/admin', destination: 'https://concept-crm-gamma.vercel.app/dashboard', permanent: false },
            { source: '/admin/:path*', destination: 'https://concept-crm-gamma.vercel.app/dashboard', permanent: false },
        ];
    },
    async headers() {
        return [{ source: '/:path*', headers: securityHeaders }];
    },
    images: {
        formats: ['image/avif', 'image/webp'],
        // Só imagens locais (/public). Liberar "qualquer domínio" abria brecha
        // para o otimizador de imagens ser usado por terceiros.
    },
};

export default nextConfig;
