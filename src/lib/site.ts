/**
 * Endereço público do site (usado no sitemap, robots, links canônicos e Open Graph).
 * Ordem: NEXT_PUBLIC_SITE_URL (defina na Vercel com o domínio final)
 *        → domínio de produção que a Vercel informa automaticamente
 *        → https://conceptdigitalportfolio.vercel.app
 */
const vercelProd = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;

export const SITE_URL = (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (vercelProd ? `https://${vercelProd}` : 'https://conceptdigitalportfolio.vercel.app')
).replace(/\/$/, '');

export const SITE_NAME = 'Concept Digital';

/**
 * Promessa de resposta exibida perto dos botões de contato.
 * Ajuste para o prazo que você consegue cumprir sempre.
 */
export const RESPONSE_PROMISE = 'Resposta no WhatsApp no mesmo dia útil';
