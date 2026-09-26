"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import WhatsAppLink, { WhatsAppIcon } from './WhatsAppLink';
import Wolf from './Wolf';
import { WHATSAPP_DISPLAY } from '@/lib/whatsapp';

/** Páginas internas (admin e dashboard) não recebem cabeçalho, rodapé nem botão flutuante. */
const useIsInternal = () => {
    const pathname = usePathname();
    return !!pathname && (pathname.startsWith('/admin') || pathname.startsWith('/dashboard'));
};

const Wordmark = ({ size = 'text-base' }: { size?: string }) => (
    <span className="flex flex-col gap-1.5">
        <span className={`font-poppins ${size} tracking-[0.32em] text-night-text`}>
            <strong className="font-bold">CONCEPT</strong> <span className="font-normal">DIGITAL</span>
        </span>
        <span className="flex w-[72px] h-[3px]" aria-hidden="true">
            <span className="flex-1 bg-concept-electric" />
            <span className="flex-1 bg-concept-yellow" />
        </span>
    </span>
);

const NAV = [
    { href: '/#projetos', label: 'Projetos' },
    { href: '/#solucoes', label: 'Soluções' },
    { href: '/#processo', label: 'Processo' },
    { href: '/#faq', label: 'Dúvidas' },
    { href: '/#contato', label: 'Contato' },
];

export const SiteHeader = () => {
    if (useIsInternal()) return null;
    return (
        <header className="relative z-40 border-b border-night-rule">
            <div className="mx-auto max-w-[1440px] h-[88px] px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-6">
                <Link href="/" aria-label="Concept Digital, página inicial">
                    <Wordmark />
                </Link>
                <nav aria-label="Principal" className="hidden md:flex items-center gap-8 xl:hidden">
                    {NAV.map((n) => (
                        <Link key={n.href} href={n.href} className="text-[15px] font-medium text-night-soft hover:text-concept-yellow transition-colors">
                            {n.label}
                        </Link>
                    ))}
                </nav>
                <WhatsAppLink
                    buttonId="header_whatsapp"
                    className="flex items-center gap-2.5 min-h-[48px] pl-2 pr-5 rounded-full bg-night-card border border-night-edge text-night-text text-[15px] font-semibold hover:border-concept-yellow transition-colors"
                >
                    <span className="w-8 h-8 rounded-full bg-whatsapp flex items-center justify-center">
                        <WhatsAppIcon className="w-[18px] h-[18px] text-white" />
                    </span>
                    <span className="hidden sm:inline">Fale no WhatsApp</span>
                    <span className="sm:hidden">WhatsApp</span>
                </WhatsAppLink>
            </div>
        </header>
    );
};

export const SiteFooter = () => {
    if (useIsInternal()) return null;
    return (
        <footer className="bg-night border-t border-night-rule">
            <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-20 pt-16 lg:pt-20 pb-28 lg:pb-10 flex flex-col gap-14">
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(300px,1.2fr)] gap-10 xl:gap-12">
                    <div className="col-span-2 lg:col-span-3 xl:col-span-1 flex flex-col gap-5">
                        <Wordmark size="text-lg" />
                        <p className="text-base leading-relaxed text-night-muted max-w-sm">
                            Engenharia de vendas e design para negócios premium. Ativos digitais rápidos, elegantes e feitos para converter.
                        </p>
                        <Wolf animated={false} className="w-[120px] h-[90px]" />
                    </div>

                    <nav aria-label="Navegação do rodapé" className="flex flex-col gap-3.5">
                        <span className="text-[13px] font-semibold tracking-[0.14em] uppercase text-night-dim">Navegação</span>
                        {NAV.map((n) => (
                            <Link key={n.href} href={n.href} className="text-[15px] text-night-soft hover:text-concept-yellow transition-colors">{n.label}</Link>
                        ))}
                    </nav>

                    <div className="flex flex-col gap-3.5">
                        <span className="text-[13px] font-semibold tracking-[0.14em] uppercase text-night-dim">Soluções</span>
                        <Link href="/#solucoes" className="text-[15px] text-night-soft hover:text-concept-yellow transition-colors">Landing pages</Link>
                        <Link href="/#solucoes" className="text-[15px] text-night-soft hover:text-concept-yellow transition-colors">CRM e gestão de leads</Link>
                        <Link href="/#solucoes" className="text-[15px] text-night-soft hover:text-concept-yellow transition-colors">Sistemas sob demanda</Link>
                        <Link href="/#solucoes" className="text-[15px] text-night-soft hover:text-concept-yellow transition-colors">Ecossistema integrado</Link>
                    </div>

                    <div className="col-span-2 sm:col-span-1 flex flex-col gap-3.5">
                        <span className="text-[13px] font-semibold tracking-[0.14em] uppercase text-night-dim">Contato</span>
                        <WhatsAppLink buttonId="footer_whatsapp_link" className="text-[15px] text-night-soft hover:text-concept-yellow transition-colors">
                            WhatsApp {WHATSAPP_DISPLAY}
                        </WhatsAppLink>
                        <span className="text-[15px] text-night-muted">Baixada Santista, SP</span>
                        <Link href="/privacidade" className="text-[15px] text-night-soft hover:text-concept-yellow transition-colors">Política de privacidade</Link>
                    </div>

                    <div className="col-span-2 lg:col-span-3 xl:col-span-1 self-start sm:max-w-[420px] xl:max-w-none bg-concept-blue rounded-3xl p-7 flex flex-col gap-4 text-white">
                        <span className="font-poppins text-[22px] font-bold leading-tight">Tem um projeto em mente?</span>
                        <span className="text-[15px] leading-relaxed text-white/90">Resposta direta, sem enrolação.</span>
                        <WhatsAppLink
                            buttonId="footer_whatsapp_card"
                            className="bg-concept-yellow text-concept-ink font-semibold text-sm sm:text-[15px] min-h-[50px] px-5 py-2.5 rounded-full flex items-center justify-center text-center gap-2 hover:brightness-95 transition"
                        >
                            <WhatsAppIcon className="w-5 h-5 flex-shrink-0" />
                            Chamar no WhatsApp
                        </WhatsAppLink>
                    </div>
                </div>

                <div className="border-t border-night-rule pt-7 flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
                    <span className="text-sm text-night-dim">© {new Date().getFullYear()} Concept Digital. Todos os direitos reservados.</span>
                    <a href="#" className="text-sm font-medium text-night-soft hover:text-concept-yellow transition-colors">Voltar ao topo</a>
                </div>
            </div>
        </footer>
    );
};

export const WhatsAppFloat = () => {
    if (useIsInternal()) return null;
    return (
        <WhatsAppLink
            buttonId="floating_whatsapp"
            aria-label="Falar com a Concept Digital no WhatsApp"
            className="group fixed right-4 bottom-5 sm:right-8 sm:bottom-8 z-50 flex items-center gap-3"
        >
            <span className="hidden sm:inline-block bg-night-card border border-night-edge text-night-text text-sm font-semibold px-4 py-2.5 rounded-full opacity-90 group-hover:opacity-100 transition-opacity">
                Fale com a gente
            </span>
            <span className="w-[60px] h-[60px] sm:w-16 sm:h-16 rounded-full bg-whatsapp border-[3px] border-night flex items-center justify-center group-hover:scale-105 transition-transform">
                <WhatsAppIcon className="w-8 h-8 text-white" />
            </span>
        </WhatsAppLink>
    );
};
