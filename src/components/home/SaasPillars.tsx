"use client";

import React, { useState } from 'react';
import WhatsAppLink, { WhatsAppIcon } from './WhatsAppLink';
import { AI_DEMO_HASH } from './AiReceptionistModal';

type PillarKey = 'lp' | 'ia' | 'automacao';

interface PillarItem {
    id: PillarKey;
    code: string;
    tabLabel: string;
    badge: string;
    headline: string;
    description: string;
    bullets: string[];
    whatsappText: string;
    whatsappMessage: string;
    buttonId: string;
    secondaryHref: string;
    secondaryLabel: string;
}

const PILLARS: PillarItem[] = [
    {
        id: 'lp',
        code: '01',
        tabLabel: 'Landing Pages & E-commerce',
        badge: 'Engenharia de Conversão',
        headline: 'Páginas ultra-rápidas desenhadas para transformar visitantes em clientes.',
        description:
            'Esqueça templates lentos e genéricos. Projetamos ativos digitais sob medida com estética minimalista, carregamento instantâneo e narrativa de vendas que conduz o cliente direto ao seu WhatsApp ou checkout.',
        bullets: [
            'Carregamento sub-segundo e nota máxima em Core Web Vitals',
            'Design autoral pensado para médicos, advogados, clínicas e marcas premium',
            'Rastreamento nativo de cliques, Meta Pixel, GA4 e integração direta com o CRM',
        ],
        whatsappText: 'Quero uma Landing Page de alto padrão',
        whatsappMessage: 'Olá! Quero criar uma Landing Page / E-commerce de alta conversão com a Concept Digital.',
        buttonId: 'pillar_lp_whatsapp',
        secondaryHref: '#projetos',
        secondaryLabel: 'Ver páginas e lojas no ar →',
    },
    {
        id: 'ia',
        code: '02',
        tabLabel: 'Atendimento com IA 24/7',
        badge: 'Recepcionista Inteligente no WhatsApp',
        headline: 'Atende em segundos, tira dúvidas e agenda horários 24 horas por dia.',
        description:
            'Quem demora 15 minutos para responder no WhatsApp perde a venda para o concorrente. Nossa Recepcionista de IA conversa de forma humana, apresenta seus serviços e já marca o horário na sua agenda.',
        bullets: [
            'Linguagem natural e polida, treinada com os preços e regras do seu negócio',
            'Agendamento automático com envio de lembrete para cortar faltas pela metade',
            'Transbordo inteligente para sua equipe quando o atendimento exige humano',
        ],
        whatsappText: 'Quero colocar a IA no meu WhatsApp',
        whatsappMessage: 'Olá! Quero conhecer a Recepcionista de IA para atender e agendar clientes no meu WhatsApp.',
        buttonId: 'pillar_ia_whatsapp',
        secondaryHref: AI_DEMO_HASH,
        secondaryLabel: 'Testar simulador ao vivo agora →',
    },
    {
        id: 'automacao',
        code: '03',
        tabLabel: 'Automação de Marketing & CRM',
        badge: 'Crescimento Previsível & Controle',
        headline: 'Marketing automatizado, prospecção ativa e todas as vendas num só funil.',
        description:
            'Conectamos a atração de clientes ao fechamento. Da geração de vídeos curtos para Reels até a captura do lead no CRM próprio da Concept, você enxerga exatamente de onde vem cada real faturado.',
        bullets: [
            'Funil Kanban integrado ao WhatsApp: nenhum orçamento fica esquecido',
            'Automação de vídeos curtos, follow-ups e reativação de clientes antigos',
            'Dashboard em tempo real com tempo de resposta, agendamentos e taxa de conversão',
        ],
        whatsappText: 'Quero automatizar meu marketing e vendas',
        whatsappMessage: 'Olá! Quero entender como funciona a Automação de Marketing e o CRM da Concept Digital.',
        buttonId: 'pillar_automacao_whatsapp',
        secondaryHref: '#sistemas',
        secondaryLabel: 'Ver o ecossistema completo →',
    },
];

const PillarVisual = ({ id }: { id: PillarKey }) => {
    if (id === 'lp') {
        return (
            <div className="flex flex-col gap-4 rounded-2xl bg-night border border-night-line p-5">
                <div className="flex items-center justify-between border-b border-night-rule pb-3">
                    <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-concept-yellow" />
                        <span className="w-2.5 h-2.5 rounded-full bg-concept-electric" />
                        <span className="text-xs font-mono text-night-dim ml-2">conceptdigital · alta-conversao</span>
                    </div>
                    <span className="text-xs font-semibold text-whatsapp bg-whatsapp/10 px-2.5 py-0.5 rounded-full">
                        99 Performance
                    </span>
                </div>
                <div className="rounded-xl bg-night-card border border-night-line p-5 flex flex-col gap-3">
                    <span className="text-[11px] font-montserrat uppercase tracking-widest text-concept-yellow">
                        Arquitetura de Conversão
                    </span>
                    <div className="h-4 w-3/4 rounded bg-white/90" />
                    <div className="h-3 w-1/2 rounded bg-night-muted/40" />
                    <div className="mt-2 flex items-center gap-3">
                        <span className="px-4 py-2 rounded-full bg-concept-yellow text-concept-ink text-xs font-bold">
                            CTA Direto pro WhatsApp
                        </span>
                        <span className="text-xs text-night-muted">Zero distração · 80% respiro</span>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="rounded-xl bg-night-card border border-night-line p-3">
                        <strong className="block font-poppins text-xl text-white">0.6s</strong>
                        <span className="text-xs text-night-dim">Tempo de abertura</span>
                    </div>
                    <div className="rounded-xl bg-night-card border border-night-line p-3">
                        <strong className="block font-poppins text-xl text-concept-yellow">+3.2x</strong>
                        <span className="text-xs text-night-dim">Leads no WhatsApp</span>
                    </div>
                    <div className="rounded-xl bg-night-card border border-night-line p-3">
                        <strong className="block font-poppins text-xl text-white">100%</strong>
                        <span className="text-xs text-night-dim">Mobile-first</span>
                    </div>
                </div>
            </div>
        );
    }

    if (id === 'ia') {
        return (
            <div className="flex flex-col gap-3.5 rounded-2xl bg-night border border-night-line p-5">
                <div className="flex items-center justify-between border-b border-night-rule pb-3">
                    <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-full bg-concept-blue flex items-center justify-center font-poppins font-bold text-xs text-white">
                            IA
                        </span>
                        <div>
                            <span className="block text-sm font-semibold text-white">Recepcionista Concept</span>
                            <span className="block text-[11px] text-whatsapp">Online agora · Responde em 12s</span>
                        </div>
                    </div>
                    <span className="text-[11px] font-semibold text-concept-yellow border border-concept-yellow/30 bg-concept-yellow/10 px-2.5 py-1 rounded-full">
                        WhatsApp Oficial
                    </span>
                </div>
                <div className="flex flex-col gap-2.5 py-1 text-xs sm:text-[13px]">
                    <div className="self-start max-w-[82%] rounded-2xl rounded-tl-sm bg-night-card border border-night-line px-3.5 py-2.5 text-night-text">
                        Boa noite! Vocês ainda têm vaga para avaliação essa semana?
                    </div>
                    <div className="self-end max-w-[86%] rounded-2xl rounded-tr-sm bg-[#0A2568] border border-concept-electric/40 px-3.5 py-2.5 text-white">
                        Boa noite! Temos sim: quinta às 14h ou sexta às 10h30. Qual desses horários fica melhor para eu reservar na agenda?
                    </div>
                    <div className="self-start max-w-[75%] rounded-2xl rounded-tl-sm bg-night-card border border-night-line px-3.5 py-2.5 text-night-text">
                        Quinta às 14h fica ótimo!
                    </div>
                    <div className="self-end max-w-[86%] rounded-2xl rounded-tr-sm bg-concept-blue px-3.5 py-2.5 text-white font-medium">
                        Agendado! Quinta às 14h confirmado. Te envio um lembrete 2h antes por aqui.
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3.5 rounded-2xl bg-night border border-night-line p-5">
            <div className="flex items-center justify-between border-b border-night-rule pb-3">
                <span className="text-xs font-mono text-night-soft">Pipeline de Automação · Concept CRM</span>
                <span className="text-xs font-semibold text-concept-yellow">Tempo real</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                    { step: '01 · Atração', title: 'Reels & Anúncios', status: 'Vídeos gerados por IA' },
                    { step: '02 · Qualificação', title: 'WhatsApp 24/7', status: 'Lead filtrado e agendado' },
                    { step: '03 · Fechamento', title: 'Funil CRM', status: 'Lembrete + ROI medido' },
                ].map((col) => (
                    <div key={col.step} className="rounded-xl bg-night-card border border-night-line p-3.5 flex flex-col gap-1.5">
                        <span className="text-[11px] font-montserrat font-bold text-concept-yellow uppercase">{col.step}</span>
                        <strong className="font-poppins text-sm text-white">{col.title}</strong>
                        <span className="text-xs text-night-muted">{col.status}</span>
                    </div>
                ))}
            </div>
            <div className="rounded-xl bg-concept-blue/25 border border-concept-electric/40 p-3.5 flex items-center justify-between">
                <span className="text-xs sm:text-sm text-white font-medium">
                    Zero leads esquecidos no WhatsApp · Follow-up automático ativo
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-whatsapp" />
            </div>
        </div>
    );
};

export default function SaasPillars() {
    const [selected, setSelected] = useState<PillarKey>('lp');

    return (
        <section id="pilares" className="scroll-mt-8 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-20 pt-16 lg:pt-24">
            <div className="flex flex-col gap-3.5 mb-10">
                <span className="text-sm font-semibold tracking-[0.14em] uppercase text-concept-yellow">
                    Plataforma de Serviços
                </span>
                <h2 className="font-poppins text-[32px] sm:text-5xl lg:text-[52px] font-bold leading-[1.08] tracking-[-0.02em] max-w-[820px]">
                    Três pilares. Uma máquina de vendas.
                </h2>
                <p className="text-base sm:text-lg text-night-muted max-w-[640px]">
                    Contrate o módulo que resolve sua dor hoje ou conecte os três para rodar aquisição, atendimento e gestão no piloto automático.
                </p>
            </div>

            {/* Tablist horizontal com rolagem suave em telas menores */}
            <div
                role="tablist"
                aria-label="Pilares de serviço da Concept Digital"
                className="flex gap-3 overflow-x-auto pb-2 mb-6 border-b border-night-line"
            >
                {PILLARS.map((p) => {
                    const isSelected = p.id === selected;
                    return (
                        <button
                            key={p.id}
                            id={`tab-${p.id}`}
                            type="button"
                            role="tab"
                            aria-selected={isSelected}
                            onClick={() => setSelected(p.id)}
                            className="saas-tab flex-none min-h-[52px] px-5 rounded-t-2xl text-sm sm:text-base font-medium text-night-soft aria-selected:text-white hover:text-white transition-colors flex items-center gap-2.5"
                        >
                            <span className="font-montserrat text-xs font-bold text-concept-yellow">{p.code}</span>
                            <span>{p.tabLabel}</span>
                        </button>
                    );
                })}
            </div>

            {/* Tabpanels: estado inicial no HTML com hidden e estilos no wrapper filho */}
            <div>
                {PILLARS.map((p) => {
                    const isSelected = p.id === selected;
                    return (
                        <div
                            key={p.id}
                            id={`pilares-${p.id}`}
                            role="tabpanel"
                            aria-labelledby={`tab-${p.id}`}
                            hidden={!isSelected}
                        >
                            <div className="rounded-[32px] bg-night-card border border-night-line p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-center">
                                <div className="flex flex-col gap-5">
                                    <span className="inline-flex self-start text-xs font-semibold uppercase tracking-[0.12em] px-3 py-1 rounded-full bg-concept-yellow/15 text-concept-yellow border border-concept-yellow/30">
                                        {p.badge}
                                    </span>
                                    <h3 className="font-poppins text-2xl sm:text-3xl lg:text-[36px] font-bold leading-[1.12] text-white">
                                        {p.headline}
                                    </h3>
                                    <p className="text-base leading-relaxed text-night-muted">{p.description}</p>
                                    <ul className="flex flex-col gap-2.5 pt-1">
                                        {p.bullets.map((b) => (
                                            <li key={b} className="flex items-start gap-2.5 text-sm sm:text-[15px] text-night-soft">
                                                <span className="mt-1.5 w-2 h-2 rounded-full bg-concept-yellow flex-shrink-0" aria-hidden="true" />
                                                <span>{b}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-3">
                                        <WhatsAppLink
                                            buttonId={p.buttonId}
                                            thankYou
                                            message={p.whatsappMessage}
                                            className="bg-concept-yellow text-concept-ink font-poppins font-bold text-sm sm:text-[15px] px-6 min-h-[52px] rounded-full inline-flex items-center justify-center gap-2.5 hover:bg-white transition-colors"
                                        >
                                            <WhatsAppIcon className="w-5 h-5 flex-shrink-0" />
                                            <span>{p.whatsappText}</span>
                                        </WhatsAppLink>
                                        <a
                                            href={p.secondaryHref}
                                            className="text-sm font-semibold text-concept-yellow hover:text-white underline-offset-4 hover:underline px-2 py-2"
                                        >
                                            {p.secondaryLabel}
                                        </a>
                                    </div>
                                </div>

                                <PillarVisual id={p.id} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
