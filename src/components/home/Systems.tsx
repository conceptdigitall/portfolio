"use client";

import { Fragment, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import Image from 'next/image';
import { AI_DEMO_HASH } from './AiReceptionistModal';
import WhatsAppLink from './WhatsAppLink';
import {
    DEMO_KPIS,
    SYSTEM_CASES,
    SYSTEM_NICHES,
    SYSTEM_STEPS,
    type ChatLine,
    type StepId,
    type SystemNiche,
    type SystemNicheId,
} from '@/data/systems';
import s from './Systems.module.css';

type Vars = CSSProperties & Record<`--${string}`, string | number>;
const d = (delay: number): Vars => ({ '--d': `${delay}s` });

const DAYS = ['Seg 5', 'Ter 6', 'Qua 7', 'Qui 8', 'Sex 9'];
const HOURS = ['9h', '10h', '11h', '14h', '15h', '16h'];
/** Horários ocupados na agenda: [dia, hora] → índice em `otherEvents`. O novo agendamento fica em Qua 15h. */
const BUSY: Record<string, number> = { '0-1': 0, '1-3': 1, '4-0': 2 };

/* ---------- Telas da jornada ---------- */

const ProspectingScreen = ({ n }: { n: SystemNiche }) => (
    <>
        <div className={`${s.label} ${s.a}`} style={d(0)}>Nova busca</div>
        <div className={`${s.panel} ${s.search} ${s.a}`} style={d(0.1)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
            </svg>
            <span className={s.typed} style={{ '--n': n.query.length } as Vars}>{n.query}</span>
        </div>
        <div className={`${s.panel} ${s.leads}`}>
            {n.leads.map((l, i) => (
                <div key={l.name} className={`${s.lead} ${s.a}`} style={d(1.5 + i * 0.15)}>
                    <div className="min-w-0 truncate">{l.name}<small>{l.detail}</small></div>
                    <div className={`${s.score} ${l.score >= 80 ? s.hot : ''}`}>
                        <i style={{ '--w': `${l.score}%`, '--d': `${1.7 + i * 0.15}s` } as Vars} />
                    </div>
                    <div className={s.pct}>{l.score}%</div>
                </div>
            ))}
        </div>
        <div className={`${s.predict} ${s.a}`} style={d(2.6)}>
            <span className={s.dot} />Planilha Preditiva: {n.leads.filter((l) => l.score >= 80).length} leads com perfil acima de 80%
        </div>
    </>
);

const MarketingScreen = ({ n }: { n: SystemNiche }) => (
    <div className={s.mk}>
        <div className="min-w-0">
            <div className={`${s.label} ${s.a}`} style={d(0)}>Gerar vídeo</div>
            <div className={`${s.panel} ${s.brief} ${s.a}`} style={d(0.15)}><b>Tema</b>{n.videoTheme}</div>
            <div className={`${s.panel} ${s.brief} ${s.a} mt-2.5`} style={d(0.3)}><b>Formato</b>Reels · 9:16 · 15 s · legenda automática</div>
            <div className={`${s.panel} ${s.gen} ${s.a}`} style={d(0.45)}>
                <div className={s.genRow}><span>Renderizando</span><span>cena 3 de 3</span></div>
                <div className={s.track}><i /></div>
                <div className={`${s.ready} ${s.a}`} style={d(3)}>✓ Vídeo pronto · agendado para 18h</div>
            </div>
        </div>
        <div className={`${s.phone} ${s.a}`} style={d(0.6)}>
            <div className={s.glow} />
            <div className={s.playIcon}><i /></div>
            <div className={s.cap}><span>{n.videoCaption}</span></div>
            <div className={s.handle}>@seunegocio</div>
        </div>
    </div>
);

/** Tempo de entrada de cada linha da conversa: "digitando…" antes de cada resposta, horários logo depois da oferta. */
const chatTimeline = (chat: ChatLine[]) =>
    chat.reduce<{ items: { line: ChatLine; typingAt?: number; at: number }[]; t: number }>(
        ({ items, t }, line) => {
            if (line.kind === 'slots') return { items: [...items, { line, at: t }], t: t + 0.6 };
            const typingAt = line.kind === 'out' ? t : undefined;
            const at = line.kind === 'out' ? t + 1.2 : t;
            return { items: [...items, { line, typingAt, at }], t: at + (line.kind === 'in' ? 1 : 0.7) };
        },
        { items: [], t: 0.2 }
    ).items;

const ReceptionistScreen = ({ n }: { n: SystemNiche }) => {
    const items = chatTimeline(n.chat).map(({ line, typingAt, at }, i) =>
        line.kind === 'slots' ? (
            <div key={i} className={`${s.slots} ${s.a}`} style={d(at)}>
                {line.options.map((o) => <span key={o}>{o}</span>)}
            </div>
        ) : (
            <Fragment key={i}>
                {typingAt !== undefined && <div className={`${s.typing} ${s.a}`} style={d(typingAt)}><i /><i /><i /></div>}
                <div className={`${s.msg} ${s[line.kind]} ${s.a}`} style={d(at)}>
                    {line.text}<time>14:0{Math.min(9, Math.round(at))}</time>
                </div>
            </Fragment>
        )
    );
    return (
        <div className={s.wa}>
            <div className={s.waHead}>
                <div className={s.avatar}>{n.avatar}</div>
                <div>{n.businessName}<small>online</small></div>
            </div>
            <div className={s.waBody}>
                <span className={`${s.aiBadge} ${s.a}`} style={d(0)}>Respondido pela IA · 12 s</span>
                {items}
            </div>
        </div>
    );
};

const AgendaScreen = ({ n }: { n: SystemNiche }) => (
    <>
        <div className={`${s.label} ${s.a}`} style={d(0)}>{n.calendarLabel}</div>
        <div className={`${s.cal} ${s.a}`} style={d(0.1)}>
            <div className={s.calH} />
            {DAYS.map((day, i) => (
                <div key={day} className={`${s.calH} ${s[`d${i + 1}`] ?? ''} ${i === 1 ? s.today : ''}`}>{day}</div>
            ))}
            {HOURS.map((h, hi) => [
                <div key={h} className={s.calT}>{h}</div>,
                ...DAYS.map((_, di) => {
                    const busy = BUSY[`${di}-${hi}`];
                    return (
                        <div key={`${h}-${di}`} className={`${s.calC} ${s[`d${di + 1}`] ?? ''}`}>
                            {di === 2 && hi === 4 && <div className={`${s.ev} ${s.evNew}`}>{n.newEvent}</div>}
                            {busy !== undefined && <div className={s.ev}>{n.otherEvents[busy]}</div>}
                        </div>
                    );
                }),
            ])}
        </div>
        <div className={`${s.toast} ${s.a}`} style={d(2)}>
            <span className={s.dot} />
            <div className="min-w-0"><b>Lembrete agendado</b><br />{n.reminder}</div>
        </div>
    </>
);

/** Conta de 0 até o valor quando a tela aparece. Remontar o componente reinicia a contagem. */
const CountUp = ({ value, suffix }: { value: number; suffix: string }) => {
    const [shown, setShown] = useState(0);
    useEffect(() => {
        // Com "reduzir movimento" ligado, mostra o número final direto.
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let raf = 0;
        const t0 = performance.now() + (reduced ? 0 : 400);
        const tick = (now: number) => {
            const p = reduced ? 1 : Math.min(1, Math.max(0, (now - t0) / 1200));
            setShown(Math.round(value * (1 - Math.pow(1 - p, 3))));
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [value]);
    return <strong>{shown}{suffix}</strong>;
};

const CrmScreen = ({ n }: { n: SystemNiche }) => {
    const [name, detail] = n.movedCard;
    const cols: [string, [string, string, string?][]][] = [
        ['Novo contato', [[name, detail, s.leaving], ['Bruno', 'Orçamento enviado']]],
        ['Em conversa', [['Ana', 'Pediu preço'], ['Lucas', 'Aguardando resposta']]],
        ['Agendado', [[name, detail, s.moved], ['Carla', 'Ontem 16h']]],
        ['Fechado', [['Pedro', 'R$ 120'], ['Sofia', 'R$ 890']]],
    ];
    return (
        <>
            <div className={s.kpis}>
                {DEMO_KPIS.map((k, i) => (
                    <div key={k.label} className={`${s.panel} ${s.kpi} ${s.a}`} style={d(i * 0.1)}>
                        <small>{k.label}</small>
                        <CountUp value={k.value} suffix={k.suffix} />
                    </div>
                ))}
            </div>
            <div className={`${s.kanban} ${s.a}`} style={d(0.35)}>
                {cols.map(([title, cards]) => (
                    <div key={title} className={s.col}>
                        <h4>{title}<span>{cards.length}</span></h4>
                        {cards.map(([a, b, extra = ''], i) => (
                            <div key={i} className={`${s.card} ${extra}`}>{a}<small>{b}</small></div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
};

const SCREENS: Record<StepId, (p: { n: SystemNiche }) => ReactNode> = {
    prospeccao: ProspectingScreen,
    marketing: MarketingScreen,
    recepcionista: ReceptionistScreen,
    agenda: AgendaScreen,
    crm: CrmScreen,
};

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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {SYSTEM_CASES.map((c) => (
                        <article key={c.name} className="flex flex-col rounded-[28px] overflow-hidden border border-night-line bg-night-card hover:border-night-edge transition-colors">
                            <div className="relative aspect-[16/10] overflow-hidden border-b border-night-line bg-black">
                                <div className={`absolute inset-x-0 top-0 h-[118%] ${s.shotImg}`}>
                                    <Image
                                        src={c.image}
                                        alt={`Tela do projeto ${c.name}`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
