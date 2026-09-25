/** @type {import('next').NextConfig} */
const securityHeaders = [
    // Impede o navegador de "adivinhar" o tipo de arquivo
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    // Impede que o site seja embutido em iframes de terceiros (clickjacking)
    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
    // Envia só a origem (sem o caminho) para outros sites
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    // Desliga recursos do navegador que o site não usa
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
];

const nextConfig = {
    reactStrictMode: true,
    poweredByHeader: false,
    async headers() {
        return [{ source: '/:path*', headers: securityHeaders }];
    },
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
};

export default nextConfig;
