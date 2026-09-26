"use client";

import React from 'react';
import { whatsappLink, trackWhatsAppClick } from '@/lib/whatsapp';

type Props = {
    /** Identificador gravado em cta_clicks no CRM */
    buttonId: string;
    message?: string;
    className?: string;
    children: React.ReactNode;
    'aria-label'?: string;
    /** Depois de abrir o WhatsApp em nova aba, leva esta aba para /obrigado (página de conversão). */
    thankYou?: boolean;
};

const WhatsAppLink = ({ buttonId, message, className, children, thankYou, ...rest }: Props) => (
    <a
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={() => {
            trackWhatsAppClick(buttonId);
            if (thankYou) setTimeout(() => window.location.assign('/obrigado'), 400);
        }}
        {...rest}
    >
        {children}
    </a>
);

export const WhatsAppIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
        <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z" />
        <path d="M9 8.3c-.2 3.6 3 6.9 6.7 6.7l.9-1.6-2-1.1-.9.8a5 5 0 0 1-2.8-2.8l.8-.9-1.1-2z" />
    </svg>
);

export default WhatsAppLink;
