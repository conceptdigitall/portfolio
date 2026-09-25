/**
 * Endereço público do site (usado no sitemap, robots, links canônicos e Open Graph).
 * Ordem: NEXT_PUBLIC_SITE_URL (defina na Vercel com o domínio final)
 *        → domínio de produção que a Vercel informa automaticamente
 *        → http://localhost:3000
 */
const vercelProd = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;

export const SITE_URL = (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (vercelProd ? `https://${vercelProd}` : 'http://localhost:3000')
).replace(/\/$/, '');

export const SITE_NAME = 'Teles Adega Delivery';
