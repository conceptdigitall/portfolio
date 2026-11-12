"use client";

import { Fragment, useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import {
    DEMO_KPIS,
    type ChatLine,
    type StepId,
    type SystemNiche,
} from '@/data/systems';
import s from './Systems.module.css';

type Vars = CSSProperties & Record<`--${string}`, string | number>;
const d = (delay: number): Vars => ({ '--d': `${delay}s` });

const DAYS = ['Seg 5', 'Ter 6', 'Qua 7', 'Qui 8', 'Sex 9'];
const HOURS = ['9h', '10h', '11h', '14h', '15h', '16h'];
/** Horários ocupados na agenda: [dia, hora] → índice em `otherEvents`. O novo agendamento fica em Qua 15h. */
const BUSY: Record<string, number> = { '0-1': 0, '1-3': 1, '4-0': 2 };

export const ProspectingScreen = ({ n }: { n: SystemNiche }) => (
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

export const MarketingScreen = ({ n }: { n: SystemNiche }) => (
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

export const ReceptionistScreen = ({ n }: { n: SystemNiche }) => {
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

export const AgendaScreen = ({ n }: { n: SystemNiche }) => (
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

const CountUp = ({ value, suffix }: { value: number; suffix: string }) => {
    const [shown, setShown] = useState(0);
    useEffect(() => {
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

export const CrmScreen = ({ n }: { n: SystemNiche }) => {
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

export const SCREENS: Record<StepId, (p: { n: SystemNiche }) => ReactNode> = {
    prospeccao: ProspectingScreen,
    marketing: MarketingScreen,
    recepcionista: ReceptionistScreen,
    agenda: AgendaScreen,
    crm: CrmScreen,
};
