import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/** /robots.txt — diz aos buscadores o que podem ler e onde está o sitemap. */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/admin', '/checkout', '/pedido', '/motoboy'] }],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
}
