export const WHATSAPP_NUMBER = '5513991353207';
export const WHATSAPP_DISPLAY = '(13) 99135-3207';

const DEFAULT_MESSAGE =
    'Olá! Vim pelo portfólio da Concept Digital e gostaria de um diagnóstico para o meu negócio.';

export const whatsappLink = (message: string = DEFAULT_MESSAGE) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

/** Registra o clique no CRM (tabela cta_clicks) sem bloquear a navegação. */
export const trackWhatsAppClick = (buttonId: string) => {
    if (typeof window === 'undefined') return;
    import('@/lib/supabase').then(({ trackEvent }) => {
        trackEvent('cta_clicks', { button_id: buttonId, path: window.location.pathname || '/' });
    });
};
