import type { ReactNode } from 'react';
import Image from 'next/image';
import { testimonials, team } from '@/data/trust';

const Eyebrow = ({ children }: { children: ReactNode }) => (
    <span className="text-sm font-semibold tracking-[0.14em] uppercase text-concept-yellow">{children}</span>
);
const H2 = ({ children }: { children: ReactNode }) => (
    <h2 className="font-poppins text-[34px] sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-[-0.02em] max-w-[820px]">{children}</h2>
);

/* ---------------- FAQ (5 perguntas + dados estruturados) ---------------- */

const FAQ = [
    {
        q: 'Quanto custa um site com a Concept?',
        a: 'Depende do escopo. O Ecossistema Integrado (landing page, CRM próprio e dashboard de métricas) fica em média entre R$ 1.000 e R$ 1.500. O valor exato sai no diagnóstico, antes de qualquer compromisso.',
    },
    {
        q: 'Quanto tempo leva para o site ficar pronto?',
        a: 'O prazo é definido no diagnóstico, junto com o escopo, e só começa a contar depois que você aprova o protótipo visual.',
    },
    {
        q: 'Vou ver o design antes de ele ser desenvolvido?',
        a: 'Sim. Você recebe um protótipo visual e só depois da sua aprovação começamos o desenvolvimento.',
    },
    {
        q: 'Vocês atendem fora da Baixada Santista?',
        a: 'Sim. A base é na Baixada Santista (Santos, Guarujá, São Vicente, Praia Grande e Cubatão), mas atendemos todo o Brasil de forma remota.',
    },
    {
        q: 'E depois que o site vai ao ar?',
        a: 'Você recebe o onboarding para usar tudo e pode contratar o plano de manutenção mensal: atualizações, segurança, backups, SEO e relatórios de acesso.',
    },
];

export const Faq = () => {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQ.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
    };
    return (
        <section id="faq" className="scroll-mt-6 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-20 pt-24 lg:pt-28 grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 lg:gap-16">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <div className="flex flex-col gap-3.5">
                <Eyebrow>Perguntas frequentes</Eyebrow>
                <H2>O que todo mundo pergunta antes de começar.</H2>
            </div>
            <div className="flex flex-col border-t border-night-edge">
                {FAQ.map((f) => (
                    <details key={f.q} className="group border-b border-night-edge py-6">
                        <summary className="flex items-start justify-between gap-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden min-h-[44px]">
                            <span className="font-poppins text-lg lg:text-[21px] font-semibold leading-snug">{f.q}</span>
                            <span aria-hidden="true" className="mt-1 flex-shrink-0 w-7 h-7 rounded-full border border-night-edge flex items-center justify-center text-concept-yellow transition-transform group-open:rotate-45">+</span>
                        </summary>
                        <p className="mt-4 text-base leading-relaxed text-night-muted max-w-[640px]">{f.a}</p>
                    </details>
                ))}
            </div>
        </section>
    );
};

/* ---------------- Avaliações reais (só aparece se houver) ---------------- */

export const Testimonials = () => {
    if (testimonials.length === 0) return null;
    return (
        <section id="avaliacoes" className="scroll-mt-6 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-20 pt-24 lg:pt-28 flex flex-col gap-10 lg:gap-12">
            <div className="flex flex-col gap-3.5">
                <Eyebrow>Avaliações</Eyebrow>
                <H2>O que dizem os clientes.</H2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((t) => (
                    <figure key={t.name + t.text.slice(0, 20)} className="bg-night-card border border-night-line rounded-[28px] p-8 flex flex-col gap-5">
                        {t.rating && (
                            <span className="text-concept-yellow tracking-[0.2em]" aria-label={`${t.rating} de 5 estrelas`}>
                                {'★'.repeat(t.rating)}<span className="text-night-edge">{'★'.repeat(5 - t.rating)}</span>
                            </span>
                        )}
                        <blockquote className="text-base lg:text-[17px] leading-relaxed">“{t.text}”</blockquote>
                        <figcaption className="mt-auto text-sm text-night-muted">
                            <strong className="text-night-text font-semibold">{t.name}</strong>
                            {t.role ? ` · ${t.role}` : ''}
                            {t.source ? ` · via ${t.source}` : ''}
                        </figcaption>
                    </figure>
                ))}
            </div>
        </section>
    );
};

/* ---------------- Quem faz (foto real; só aparece se houver) ---------------- */

export const Team = () => {
    if (team.length === 0) return null;
    return (
        <section id="equipe" className="scroll-mt-6 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-20 pt-24 lg:pt-28 flex flex-col gap-10 lg:gap-12">
            <div className="flex flex-col gap-3.5">
                <Eyebrow>Quem faz</Eyebrow>
                <H2>Gente de verdade por trás de cada projeto.</H2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {team.map((m) => (
                    <div key={m.name} className="bg-night-card border border-night-line rounded-[28px] overflow-hidden flex flex-col">
                        <div className="relative aspect-[4/5] m-2.5 rounded-[20px] overflow-hidden bg-night-raise">
                            <Image src={m.photo} alt={`Foto de ${m.name}, ${m.role}`} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
                        </div>
                        <div className="px-6 pt-3 pb-7 flex flex-col gap-2">
                            <span className="font-poppins text-[22px] font-semibold">{m.name}</span>
                            <span className="text-sm font-semibold tracking-[0.08em] uppercase text-concept-sky">{m.role}</span>
                            <span className="text-[15px] leading-relaxed text-night-muted">{m.bio}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
