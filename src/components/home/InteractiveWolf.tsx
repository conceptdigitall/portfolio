"use client";

import React, { useEffect, useRef, useState, type CSSProperties } from 'react';

export type WolfPillarId = 'lp' | 'ia' | 'automacao';

interface PillarNode {
    id: WolfPillarId;
    code: string;
    label: string;
    short: string;
    metric: string;
    detail: string;
    cx: number;
    cy: number;
    highlightPath: string;
    href: string;
}

export const WOLF_PILLARS: PillarNode[] = [
    {
        id: 'lp',
        code: '01',
        label: 'Landing Pages & E-commerce',
        short: 'Landing Pages',
        metric: '< 0.8s load · Alta Conversão',
        detail: 'Design minimalista autoral, velocidade sub-segundo e jornada desenhada para levar o cliente ao WhatsApp.',
        cx: 150,
        cy: 134,
        highlightPath: 'M40 212 L108 150 L150 134 L144 178 L118 214 L104 250 L116 252',
        href: '#pilares-lp',
    },
    {
        id: 'ia',
        code: '02',
        label: 'Atendimento com IA 24/7',
        short: 'Atendimento IA',
        metric: 'Resposta em 12s no WhatsApp',
        detail: 'Recepcionista treinada para o seu negócio: tira dúvidas, qualifica o lead e agenda horários sozinha.',
        cx: 332,
        cy: 90,
        highlightPath: 'M255 118 L292 98 L302 62 L314 84 L326 58 L332 90 L366 110 L338 115 L312 119',
        href: '#simulador-ia',
    },
    {
        id: 'automacao',
        code: '03',
        label: 'Automação de Marketing & CRM',
        short: 'Automação & CRM',
        metric: 'Funil + Vídeos + Prospecção',
        detail: 'Captação ativa B2B, vídeos curtos automáticos, lembretes anti-falta e funil Kanban em tempo real.',
        cx: 284,
        cy: 196,
        highlightPath: 'M312 119 L300 142 L290 152 L284 196 L300 246 L316 250',
        href: '#sistemas',
    },
];

const VERTICES: [number, number][] = [
    [40, 212], [108, 150], [150, 134], [255, 118],
    [292, 98], [332, 90], [366, 110], [290, 152],
    [284, 196], [300, 246], [176, 172], [118, 214],
];

export default function InteractiveWolf() {
    const [activeId, setActiveId] = useState<WolfPillarId>('ia');
    const [isPaused, setIsPaused] = useState(false);
    const stageRef = useRef<HTMLDivElement>(null);

    const active = WOLF_PILLARS.find((p) => p.id === activeId) ?? WOLF_PILLARS[1];

    useEffect(() => {
        if (isPaused) return;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduced) return;
        const timer = setInterval(() => {
            setActiveId((prev) => {
                const idx = WOLF_PILLARS.findIndex((p) => p.id === prev);
                return WOLF_PILLARS[(idx + 1) % WOLF_PILLARS.length].id;
            });
        }, 4800);
        return () => clearInterval(timer);
    }, [isPaused]);

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        const el = stageRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rx = ((0.5 - y) * 14).toFixed(2);
        const ry = ((x - 0.5) * 16).toFixed(2);
        el.style.setProperty('--rx', `${rx}deg`);
        el.style.setProperty('--ry', `${ry}deg`);
        el.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
        el.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
    };

    const handlePointerLeave = () => {
        const el = stageRef.current;
        if (!el) return;
        el.style.setProperty('--rx', '0deg');
        el.style.setProperty('--ry', '0deg');
        el.style.setProperty('--mx', '50%');
        el.style.setProperty('--my', '45%');
    };

    const selectPillar = (id: WolfPillarId) => {
        setActiveId(id);
        setIsPaused(true);
    };

    return (
        <div
            ref={stageRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            style={{ '--rx': '0deg', '--ry': '0deg', '--mx': '50%', '--my': '45%' } as CSSProperties}
            className="wolf-interactive-stage relative rounded-[32px] bg-night-card border border-night-line p-6 sm:p-8 flex flex-col justify-between overflow-hidden select-none min-h-[490px] lg:min-h-[560px]"
        >
            {/* Luz reativa ao cursor */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                style={{
                    background:
                        'radial-gradient(420px circle at var(--mx) var(--my), rgba(6, 36, 199, 0.42), rgba(252, 224, 38, 0.06) 45%, transparent 72%)',
                }}
            />

            {/* Barra de topo estilo HUD SaaS */}
            <div className="relative z-10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-concept-yellow animate-pulse" aria-hidden="true" />
                    <span className="font-montserrat text-xs font-semibold tracking-[0.14em] uppercase text-night-soft">
                        Concept Core · Ecossistema Ativo
                    </span>
                </div>
                <button
                    type="button"
                    onClick={() => setIsPaused((p) => !p)}
                    className="text-xs font-medium text-night-dim hover:text-concept-yellow border border-night-edge rounded-full px-3 py-1 transition-colors"
                >
                    {isPaused ? 'Retomar rotação' : 'Pausar rotação'}
                </button>
            </div>

            {/* Palco 3D do Lobo-Guará */}
            <div className="relative z-10 my-auto py-4 flex items-center justify-center perspective-1000">
                <div className="wolf-3d-tilt relative w-full max-w-[440px] aspect-[4/3] flex items-center justify-center">
                    {/* Anéis orbitais sutis */}
                    <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
                        <circle cx="220" cy="155" r="128" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeDasharray="4 8" />
                        <circle cx="220" cy="155" r="96" fill="none" stroke="rgba(6,36,199,0.45)" strokeWidth="1.2" />
                    </svg>

                    {/* Lobo-guará em malha vetorial interativa */}
                    <svg
                        viewBox="0 0 400 300"
                        className="wolf relative w-full h-full drop-shadow-[0_12px_32px_rgba(6,36,199,0.55)]"
                        role="img"
                        aria-label="Lobo-guará geométrico interativo da Concept Digital: clique nos pontos amarelos para alternar entre os 3 serviços"
                    >
                        {/* Traços base do lobo */}
                        <g className="opacity-75">
                            <path className="wolf-draw" d="M40 212 L108 150 L150 134 L255 118 L292 98 L302 62 L314 84 L326 58 L332 90 L366 110 L338 115 L312 119" />
                            <path className="wolf-draw wolf-d2" d="M108 150 L122 184 L40 212" />
                            <path className="wolf-draw wolf-d3" d="M312 119 L300 142 L290 152" />
                            <path className="wolf-draw wolf-d4" d="M290 152 L284 196 L300 246 L316 250" />
                            <path className="wolf-draw wolf-d4" d="M272 164 L262 200 L272 248 L284 250" />
                            <path className="wolf-draw wolf-d5" d="M290 152 L272 164 L196 162 L176 172" />
                            <path className="wolf-draw wolf-d5" d="M176 172 L150 206 L168 248 L182 250" />
                            <path className="wolf-draw wolf-d4" d="M150 134 L144 178 L118 214 L104 250 L116 252" />
                        </g>

                        {/* Circuito em destaque do pilar selecionado */}
                        <path
                            d={active.highlightPath}
                            className="wolf-acc transition-all duration-500"
                            style={{ strokeWidth: 5.5, filter: 'drop-shadow(0 0 10px rgba(252,224,38,0.75))' }}
                        />

                        {/* Vértices da constelação */}
                        {VERTICES.map(([vx, vy], i) => (
                            <circle key={i} cx={vx} cy={vy} r="2.5" fill="#FFFFFF" opacity="0.45" />
                        ))}

                        {/* Nodes interativos dos 3 pilares */}
                        {WOLF_PILLARS.map((node) => {
                            const isSelected = node.id === activeId;
                            return (
                                <g
                                    key={node.id}
                                    onClick={() => selectPillar(node.id)}
                                    onPointerEnter={() => selectPillar(node.id)}
                                    className="cursor-pointer"
                                    role="button"
                                    tabIndex={0}
                                    aria-label={`Selecionar pilar ${node.label}`}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            selectPillar(node.id);
                                        }
                                    }}
                                >
                                    <circle
                                        cx={node.cx}
                                        cy={node.cy}
                                        r={isSelected ? 18 : 11}
                                        fill="rgba(252, 224, 38, 0.16)"
                                        stroke="#FCE026"
                                        strokeWidth={isSelected ? 2 : 1}
                                        className="transition-all duration-300"
                                    />
                                    <circle
                                        cx={node.cx}
                                        cy={node.cy}
                                        r={isSelected ? 6.5 : 4.5}
                                        fill={isSelected ? '#FCE026' : '#FFFFFF'}
                                    />
                                </g>
                            );
                        })}
                    </svg>
                </div>
            </div>

            {/* Seletor rápido de nodes + Card de Telemetria do Pilar Ativo */}
            <div className="relative z-10 flex flex-col gap-3.5">
                <div className="grid grid-cols-3 gap-2" role="group" aria-label="Pilares no Lobo-Guará">
                    {WOLF_PILLARS.map((p) => {
                        const on = p.id === activeId;
                        return (
                            <button
                                key={p.id}
                                type="button"
                                onClick={() => selectPillar(p.id)}
                                aria-pressed={on}
                                className={`min-h-[42px] px-3 py-2 rounded-2xl border text-left transition-all flex flex-col justify-center ${
                                    on
                                        ? 'bg-concept-blue/90 border-concept-yellow text-white'
                                        : 'bg-night/70 border-night-line text-night-soft hover:border-night-edge'
                                }`}
                            >
                                <span className="font-montserrat text-[10px] font-bold tracking-[0.12em] uppercase text-concept-yellow">
                                    {p.code}
                                </span>
                                <span className="font-poppins text-xs sm:text-[13px] font-semibold truncate">
                                    {p.short}
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div className="rounded-2xl bg-night/90 border border-night-edge p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <span className="font-poppins text-sm font-bold text-white">{active.label}</span>
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-concept-yellow/15 text-concept-yellow border border-concept-yellow/30">
                                {active.metric}
                            </span>
                        </div>
                        <p className="text-xs sm:text-[13px] text-night-muted leading-relaxed">{active.detail}</p>
                    </div>
                    <a
                        href={active.href}
                        className="flex-shrink-0 self-start sm:self-center text-xs font-semibold text-concept-yellow hover:text-white underline underline-offset-4 transition-colors"
                    >
                        Explorar →
                    </a>
                </div>
            </div>
        </div>
    );
}
