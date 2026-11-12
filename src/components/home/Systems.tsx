"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { AI_DEMO_HASH } from './AiReceptionistModal';
import WhatsAppLink from './WhatsAppLink';
import {
    SYSTEM_CASES,
    SYSTEM_NICHES,
    SYSTEM_STEPS,
    type SystemNiche,
    type SystemNicheId,
} from '@/data/systems';
import { SCREENS } from './SystemsScreens';
import s from './Systems.module.css';

/* ---------- Botão do simulador: abre o modal da Recepcionista já no nicho escolhido ---------- */

const SimulatorLink = ({ niche, children, className = '' }: { niche: SystemNiche; children: ReactNode; className?: string }) => (
    <a
        href={AI_DEMO_HASH}
        data-niche={niche.simulatorNiche}
        className={`inline-flex items-center gap-2.5 min-h-[48px] px-5 rounded-full bg-concept-yellow text-concept-ink text-[15px] font-semibold hover:bg-white transition-colors w-max max-w-full ${className}`}
    >
        {children}
    </a>
);

/* ---------- Seção ---------- */

export default function Systems() {
    const [nicheId, setNicheId] = useState<SystemNicheId>('barbearia');
    const [current, setCurrent] = useState(0);
    // Muda a cada repetição: remonta a tela ativa e reinicia as animações dela.
    const [replay, setReplay] = useState(0);
    const stepRefs = useRef<(HTMLElement | null)[]>([]);

    const niche = SYSTEM_NICHES.find((n) => n.id === nicheId) ?? SYSTEM_NICHES[0];
    const steps = useMemo(
        () => SYSTEM_STEPS.filter((st) => st.id !== 'prospeccao' || niche.showProspecting),
        [niche.showProspecting]
    );
    const active = Math.min(current, steps.length - 1);

    // Etapa ativa = a que cruza o meio da tela.
    useEffect(() => {
        const io = new IntersectionObserver(
            (entries) => entries.forEach((e) => {
                if (e.isIntersecting) setCurrent(Number((e.target as HTMLElement).dataset.index));
            }),
            { rootMargin: '-45% 0px -45% 0px' }
        );
        stepRefs.current.slice(0, steps.length).forEach((el) => el && io.observe(el));
        return () => io.disconnect();
    }, [steps.length]);

    // Repete a animação da etapa atual a cada 10 s, para quem parar de rolar.
    // O relógio recomeça quando a etapa ou o nicho mudam, para não cortar uma animação no meio.
    useEffect(() => {
        const id = setInterval(() => setReplay((r) => r + 1), 10000);
        return () => clearInterval(id);
    }, [active, nicheId]);

    const chooseNiche = (id: SystemNicheId) => {
        setNicheId(id);
        setReplay((r) => r + 1);
    };

    return (
        <section id="sistemas" className={`${s.root} scroll-mt-6 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-20 pt-24 lg:pt-36`}>
            {/* Cabeçalho */}
            <div className="flex flex-col gap-3.5">
                <span className="text-sm font-semibold tracking-[0.14em] uppercase text-concept-yellow">Sistemas</span>
                <h2 className="font-poppins text-[34px] sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-[-0.02em] max-w-[820px]">
                    Do primeiro contato ao horário marcado. <span className="text-concept-yellow">Num sistema só.</span>
                </h2>
                <p className="text-lg leading-relaxed text-night-muted max-w-[620px]">
                    Prospecção, marketing, atendimento com IA, agenda e CRM conectados. Role a página e veja cada etapa funcionando.
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-4 text-sm text-night-dim" role="group" aria-label="Escolha o nicho">
                    <span className="mr-1">Veja no seu negócio:</span>
                    {SYSTEM_NICHES.map((n) => (
                        <button
                            key={n.id}
                            type="button"
                            aria-pressed={n.id === nicheId}
                            onClick={() => chooseNiche(n.id)}
                            className={`min-h-[40px] px-4 rounded-full border transition-colors ${
                                n.id === nicheId
                                    ? 'bg-night-text text-night border-night-text'
                                    : 'border-night-edge text-night-soft hover:border-concept-sky'
                            }`}
                        >
                            {n.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Jornada: texto rolando + tela fixa */}
            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-16 pb-12 md:pb-20">
                <div className="pt-[4vh] pb-[10vh] md:pt-[8vh] md:pb-[22vh]">
                    {steps.map((st, i) => (
                        <article
                            key={st.id}
                            ref={(el) => { stepRefs.current[i] = el; }}
                            data-index={i}
                            className={`${s.step} ${i === active ? s.stepOn : ''}`}
                        >
                            <span className="font-montserrat text-[13px] font-bold tracking-[0.12em] uppercase text-concept-yellow">
                                {String(i + 1).padStart(2, '0')} · {st.label}
                            </span>
                            <h3 className="font-poppins text-[26px] lg:text-[34px] font-bold leading-[1.15] tracking-[-0.01em] mt-2.5 mb-3">
                                {st.title}
                            </h3>
                            <p className="text-base leading-relaxed text-night-muted max-w-[42ch]">{st.text}</p>
                            {st.tag && (
                                <span className="inline-block w-max mt-3.5 pt-2.5 text-xs text-night-dim border-t border-night-line">{st.tag}</span>
                            )}
                            {st.id === 'recepcionista' && (
                                <SimulatorLink niche={niche} className="mt-6">Conversar com a recepcionista</SimulatorLink>
                            )}
                        </article>
                    ))}
                </div>

                <div className={s.stageCol}>
                    <div className={s.stage}>
                        <div className={s.progress} style={{ width: `${((active + 1) / steps.length) * 100}%` }} />
                        <div className={s.bar}>
                            <i /><i /><i />
                            <span className={s.title}>{steps[active].screenTitle}</span>
                            <span className={s.demoBadge}>Demonstração</span>
                        </div>
                        {steps.map((st, i) => {
                            const Screen = SCREENS[st.id];
                            const on = i === active;
                            return (
                                <div key={st.id} className={`${s.scene} ${on ? s.sceneActive : ''}`} aria-hidden={!on}>
                                    {/* A key nova remonta a tela e reinicia as animações (etapa, nicho ou repetição). */}
                                    <div key={on ? `${nicheId}-${replay}` : 'idle'} className={`h-full ${on ? s.play : ''}`}>
                                        <Screen n={niche} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Faixa do simulador */}
            <div className="rounded-[28px] border border-night-line p-6 sm:p-10 lg:p-11 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 lg:gap-10 items-center bg-[radial-gradient(90%_120%_at_100%_50%,rgba(6,36,199,0.35),transparent_60%)] bg-night-card">
                <div className="flex flex-col gap-3">
                    <span className="text-sm font-semibold tracking-[0.14em] uppercase text-concept-yellow">Teste agora</span>
                    <h3 className="font-poppins text-2xl lg:text-[30px] font-bold leading-[1.15]">
                        Converse com a recepcionista como se fosse seu cliente.
                    </h3>
                    <p className="text-night-muted">Escolha o nicho, faça uma pergunta e tente marcar um horário. Funciona no navegador, sem cadastro.</p>
                    <SimulatorLink niche={niche} className="mt-3">Abrir simulador</SimulatorLink>
                </div>
                <div className={`${s.wa} !h-auto`} aria-hidden="true">
                    <div className={`${s.waBody} !overflow-visible`}>
                        <div className={`${s.msg} ${s.in}`}>Quanto custa e tem horário hoje?</div>
                        <div className={`${s.msg} ${s.out}`}>Tenho às 15h30 e 17h. Quer que eu reserve?</div>
                        <div className={s.slots}><span>15h30</span><span>17h</span></div>
                    </div>
                </div>
            </div>

            {/* Clientes reais */}
            <div className="pt-24 lg:pt-28 flex flex-col gap-10">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-4">
                    <div className="flex flex-col gap-3.5">
                        <span className="text-sm font-semibold tracking-[0.14em] uppercase text-concept-yellow">Clientes reais</span>
                        <h3 className="font-poppins text-[30px] lg:text-[40px] font-bold leading-[1.1] tracking-[-0.01em]">
                            Sistemas no ar, com gente usando.
                        </h3>
                    </div>
                    <p className="text-night-muted max-w-[40ch]">Cada projeto resolve um gargalo do dia a dia do negócio. Clique para ver o site funcionando.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {SYSTEM_CASES.map((c) => (
                        <article key={c.name} className="flex flex-col rounded-[28px] overflow-hidden border border-night-line bg-night-card hover:border-night-edge transition-colors">
                            <div className="relative aspect-[16/10] overflow-hidden border-b border-night-line bg-black">
                                <div className={`absolute inset-x-0 top-0 h-[118%] ${s.shotImg}`}>
                                    <Image
                                        src={c.image}
                                        alt={`Tela do projeto ${c.name}`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        className="object-cover object-top"
                                    />
                                </div>
                                <span className="absolute left-3 top-3 flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-night/75 backdrop-blur">
                                    <span className="w-1.5 h-1.5 rounded-full bg-whatsapp" />No ar
                                </span>
                            </div>
                            <div className="flex flex-col gap-3 p-5 flex-1">
                                <span className="text-xs font-semibold tracking-[0.08em] uppercase text-concept-sky">{c.niche}</span>
                                <span className="font-poppins text-[19px] font-semibold leading-tight">{c.name}</span>
                                <div className="text-[13.5px] text-night-muted">
                                    <b className="block text-[11px] tracking-[0.1em] uppercase font-semibold text-night-dim mb-0.5">Problema</b>
                                    {c.problem}
                                </div>
                                <div className="text-[13.5px] text-night-muted">
                                    <b className="block text-[11px] tracking-[0.1em] uppercase font-semibold text-night-dim mb-0.5">Entrega</b>
                                    {c.delivery}
                                </div>
                                {c.result && (
                                    <div className="rounded-xl border border-night-edge px-3 py-2.5 text-[13px] text-night-dim">
                                        <strong className="block font-montserrat text-lg text-concept-yellow">{c.result.value}</strong>
                                        {c.result.label}
                                    </div>
                                )}
                                <a
                                    href={c.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-auto pt-3.5 border-t border-night-line text-sm font-semibold text-night-text hover:text-concept-yellow transition-colors"
                                >
                                    Ver o site no ar <span className="sr-only">(abre em nova aba)</span>
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            {/* Fechamento */}
            <div className="pt-20 lg:pt-24 flex flex-col items-center text-center gap-3">
                <h3 className="font-poppins text-[28px] lg:text-[40px] font-bold leading-[1.15]">Quer ver isso funcionando no seu negócio?</h3>
                <p className="text-night-muted max-w-[46ch]">Em 20 minutos mostramos o sistema com o seu nicho, os seus serviços e os seus horários.</p>
                <WhatsAppLink
                    buttonId="systems_diagnostico"
                    message={`Olá! Vi a seção de sistemas no portfólio (nicho: ${niche.label}) e quero agendar um diagnóstico.`}
                    className="mt-4 inline-flex items-center min-h-[52px] px-6 rounded-full bg-concept-yellow text-concept-ink text-[15px] font-semibold hover:bg-white transition-colors"
                >
                    Agendar diagnóstico
                </WhatsAppLink>
            </div>
        </section>
    );
}
