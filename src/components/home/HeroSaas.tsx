import InteractiveWolf from './InteractiveWolf';
import WhatsAppLink, { WhatsAppIcon } from './WhatsAppLink';
import { AI_DEMO_HASH } from './AiReceptionistModal';
import { projects, nicheCount } from '@/data/portfolio';
import { RESPONSE_PROMISE } from '@/lib/site';

const PILLAR_BADGES = [
    { href: '#pilares', code: '01', label: 'Landing Pages de Alta Conversão' },
    { href: AI_DEMO_HASH, code: '02', label: 'Atendimento com IA 24/7' },
    { href: '#sistemas', code: '03', label: 'Automação de Marketing & CRM' },
];

const HeroSaas = () => {
    const clientCount = projects.filter((p) => p.client).length;

    return (
        <section
            id="inicio"
            className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-20 pt-10 sm:pt-14 lg:pt-20 pb-16 lg:pb-28 overflow-hidden"
        >
            {/* Luz de fundo sutil azul Concept (#0624C7) mantendo 80% de respiro */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-28 left-1/4 w-[620px] h-[620px] rounded-full bg-[radial-gradient(circle,rgba(6,36,199,0.22)_0%,rgba(6,36,199,0)_70%)]"
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)] gap-12 lg:gap-16 items-center">
                {/* Coluna Principal: Proposta de Valor SaaS + CTAs WhatsApp */}
                <div className="flex flex-col gap-7">
                    {/* Pill de posicionamento */}
                    <div className="inline-flex items-center gap-2.5 self-start rounded-full bg-night-card border border-night-edge px-4 py-2">
                        <span className="w-2 h-2 rounded-full bg-concept-yellow" aria-hidden="true" />
                        <span className="font-montserrat text-xs font-semibold tracking-[0.14em] uppercase text-night-soft">
                            Engenharia de Vendas · IA · Alta Conversão
                        </span>
                    </div>

                    {/* Headline imponente com alto contraste */}
                    <div className="flex flex-col gap-5">
                        <h1 className="font-poppins font-extrabold text-white text-[40px] sm:text-[56px] xl:text-[66px] leading-[1.04] tracking-[-0.03em]">
                            A infraestrutura digital que transforma acessos em{' '}
                            <span className="text-concept-yellow">clientes.</span>
                        </h1>
                        <p className="text-base sm:text-lg lg:text-[19px] leading-relaxed text-night-muted max-w-[600px]">
                            Criamos <strong className="font-semibold text-white">landing pages de alto padrão</strong>,{' '}
                            <strong className="font-semibold text-white">atendimento com IA no WhatsApp</strong> e{' '}
                            <strong className="font-semibold text-white">automação de marketing</strong> conectados em um único ecossistema para o seu negócio vender todos os dias.
                        </p>
                    </div>

                    {/* Pílulas de acesso rápido aos 3 pilares */}
                    <div className="flex flex-wrap gap-2.5" aria-label="Pilares da Concept Digital">
                        {PILLAR_BADGES.map((b) => (
                            <a
                                key={b.code}
                                href={b.href}
                                className="group inline-flex items-center gap-2 rounded-full bg-night-card/90 border border-night-line hover:border-concept-yellow px-3.5 py-2 text-xs sm:text-[13px] font-medium text-night-soft hover:text-white transition-colors"
                            >
                                <span className="font-montserrat font-bold text-concept-yellow">{b.code}</span>
                                <span>{b.label}</span>
                            </a>
                        ))}
                    </div>

                    {/* Botões atrativos de conversão para WhatsApp + Simulador */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                        <WhatsAppLink
                            buttonId="hero_saas_whatsapp"
                            thankYou
                            message="Olá! Vi a plataforma da Concept Digital e quero conversar sobre como aplicar o ecossistema (Landing Page, Atendimento com IA ou Automação) no meu negócio."
                            className="group bg-concept-yellow text-concept-ink font-poppins font-bold text-base sm:text-[17px] px-7 min-h-[60px] rounded-full flex items-center justify-center gap-3 shadow-[0_0_32px_rgba(252,224,38,0.22)] hover:bg-white transition-all"
                        >
                            <WhatsAppIcon className="w-[22px] h-[22px] flex-shrink-0 transition-transform group-hover:scale-110" />
                            <span>Falar com especialista no WhatsApp</span>
                        </WhatsAppLink>

                        <a
                            href={AI_DEMO_HASH}
                            className="min-h-[60px] px-6 rounded-full bg-night-card border border-night-edge hover:border-concept-yellow text-white font-medium text-[15px] sm:text-base flex items-center justify-center gap-2.5 transition-colors"
                        >
                            <span className="w-2 h-2 rounded-full bg-whatsapp" aria-hidden="true" />
                            <span>Testar IA ao vivo</span>
                        </a>
                    </div>

                    {/* Micro-compromisso de confiança e métricas */}
                    <div className="pt-4 border-t border-night-line grid grid-cols-3 gap-4 max-w-[560px]">
                        <div className="flex flex-col">
                            <span className="font-poppins text-2xl sm:text-3xl font-bold text-white">
                                {projects.length}+
                            </span>
                            <span className="text-xs sm:text-sm text-night-muted">Ativos digitais entregues</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-poppins text-2xl sm:text-3xl font-bold text-concept-yellow">
                                {clientCount} cases
                            </span>
                            <span className="text-xs sm:text-sm text-night-muted">Em operação real ({nicheCount} nichos)</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-poppins text-2xl sm:text-3xl font-bold text-white">
                                24/7
                            </span>
                            <span className="text-xs sm:text-sm text-night-muted">{RESPONSE_PROMISE}</span>
                        </div>
                    </div>
                </div>

                {/* Coluna Direita: Lobo-Guará Interativo */}
                <InteractiveWolf />
            </div>
        </section>
    );
};

export default HeroSaas;
