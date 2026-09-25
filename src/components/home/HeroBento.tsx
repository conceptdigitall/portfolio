import Wolf from './Wolf';
import WhatsAppLink, { WhatsAppIcon } from './WhatsAppLink';
import { projects, nicheCount } from '@/data/projects';
import { WHATSAPP_DISPLAY } from '@/lib/whatsapp';

const Corner = ({ tone = 'ink' }: { tone?: 'ink' | 'light' }) => (
    <span
        aria-hidden="true"
        className={`absolute right-5 top-5 w-3.5 h-3.5 border-t-[3px] border-r-[3px] ${tone === 'light' ? 'border-white' : 'border-concept-ink'}`}
    />
);

const RAIL = [
    { href: '#contato', label: 'Contato' },
    { href: '#processo', label: 'Processo' },
    { href: '#solucoes', label: 'Soluções' },
    { href: '#projetos', label: 'Projetos' },
];

const HeroBento = () => (
    <section id="inicio" className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 pt-2 pb-8">
        <div className="flex gap-10">
            {/* Navegação vertical (telas grandes) */}
            <nav aria-label="Seções" className="hidden xl:flex w-10 flex-col justify-between items-center pt-28 pb-16">
                {RAIL.map((r) => (
                    <a
                        key={r.href}
                        href={r.href}
                        className="[writing-mode:vertical-rl] rotate-180 text-[15px] font-medium text-concept-ink hover:text-concept-blue transition-colors"
                    >
                        {r.label}
                    </a>
                ))}
            </nav>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-[minmax(0,500px)_minmax(0,1fr)] xl:grid-cols-[540px_minmax(0,1fr)] lg:grid-rows-[auto_1fr] gap-6 lg:gap-x-10 lg:gap-y-8">
                {/* Título */}
                <div className="order-1 lg:col-start-2 lg:row-start-1 flex items-start gap-1.5">
                    <h1 className="font-poppins font-extrabold text-concept-ink leading-[1.02] tracking-[-0.05em] text-[76px] sm:text-[112px] lg:text-[96px] xl:text-[128px] 2xl:text-[150px] whitespace-nowrap">
                        Portfólio
                    </h1>
                    <span aria-hidden="true" className="mt-2 xl:mt-4 w-4 h-4 xl:w-[30px] xl:h-[30px] border-t-[5px] border-r-[5px] xl:border-t-[7px] xl:border-r-[7px] border-concept-blue" />
                </div>

                {/* Card Sobre a Concept */}
                <div className="order-2 lg:col-start-1 lg:row-start-1 lg:row-span-2 flex flex-col">
                    <div className="w-[190px] lg:w-[250px] h-12 lg:h-[60px] bg-concept-blue rounded-t-[22px] lg:rounded-t-[28px] flex items-center gap-3 px-6 lg:px-7 text-white">
                        <svg viewBox="0 0 20 20" className="w-[18px] h-[18px] hidden lg:block" fill="none" stroke="#FCE026" strokeWidth={1.8} aria-hidden="true">
                            <rect x="7" y="1.5" width="6" height="6" rx="1.5" transform="rotate(45 10 4.5)" />
                            <rect x="7" y="12.5" width="6" height="6" rx="1.5" transform="rotate(45 10 15.5)" />
                            <rect x="1.5" y="7" width="6" height="6" rx="1.5" transform="rotate(45 4.5 10)" />
                            <rect x="12.5" y="7" width="6" height="6" rx="1.5" transform="rotate(45 15.5 10)" />
                        </svg>
                        <span className="font-poppins text-sm lg:text-base font-semibold">Sobre a Concept</span>
                    </div>
                    <div className="relative flex-1 bg-concept-blue rounded-b-3xl rounded-tr-3xl lg:rounded-b-[28px] lg:rounded-tr-[28px] p-6 lg:px-11 lg:py-10 text-white flex flex-col gap-6 lg:justify-end overflow-hidden lg:min-h-[760px]">
                        {/* Círculo com o lobo */}
                        <div className="relative self-center lg:absolute lg:top-7 lg:right-8 w-[290px] h-[290px] lg:w-[380px] lg:h-[380px] rounded-full border-[3px] border-white/90 flex items-center justify-center">
                            <span aria-hidden="true" className="absolute inset-4 lg:inset-[22px] rounded-full bg-white/[0.07]" />
                            <svg viewBox="0 0 380 380" className="orbit absolute -inset-[3px] w-[calc(100%+6px)] h-[calc(100%+6px)]" aria-hidden="true">
                                <circle cx="190" cy="190" r="188.5" fill="none" stroke="#FCE026" strokeWidth={3} strokeDasharray="90 1100" strokeLinecap="round" />
                            </svg>
                            <Wolf label="Lobo-guará em traço geométrico" className="relative w-[250px] h-[188px] lg:w-[330px] lg:h-[248px]" />
                        </div>

                        <div className="relative z-10 flex flex-col">
                            <span className="font-poppins font-light text-5xl lg:text-[76px] leading-none">Somos,</span>
                            <span className="font-poppins font-bold text-5xl lg:text-[76px] leading-[1.04]">Concept</span>
                            <span className="font-poppins font-bold text-5xl lg:text-[76px] leading-[1.04]">Digital</span>
                            <p className="mt-4 lg:mt-5 text-base lg:text-[17px] leading-relaxed max-w-[330px] text-white/90">
                                Engenharia de vendas e design para negócios que querem ser vistos como premium.
                            </p>
                        </div>

                        <div className="relative z-10 flex justify-between items-end gap-4">
                            <WhatsAppLink
                                buttonId="hero_card_whatsapp"
                                className="text-white text-sm lg:text-base font-medium pb-2.5 border-b-2 border-dashed border-white/55 flex gap-2.5 items-center hover:border-concept-yellow transition-colors"
                            >
                                {WHATSAPP_DISPLAY}
                                <WhatsAppIcon className="w-5 h-5" />
                            </WhatsAppLink>
                            <div className="relative w-[92px] h-[92px] lg:w-32 lg:h-32 rounded-full bg-concept-ink flex items-center justify-center flex-shrink-0">
                                <svg viewBox="0 0 120 120" className="spin absolute inset-0 w-full h-full" aria-hidden="true">
                                    <defs>
                                        <path id="badgeCircle" d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0" />
                                    </defs>
                                    <text fill="#FFFFFF" fontSize="9.6" fontWeight={600} letterSpacing="2.6" style={{ fontFamily: 'var(--font-poppins)' }}>
                                        <textPath href="#badgeCircle">CONCEPT DIGITAL · PORTFÓLIO ·</textPath>
                                    </text>
                                </svg>
                                <span className="w-4 h-4 lg:w-[22px] lg:h-[22px] rounded-full bg-concept-yellow" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bento */}
                <div className="order-3 lg:col-start-2 lg:row-start-2 grid grid-cols-2 xl:grid-cols-3 xl:grid-rows-[330px_250px] gap-4 lg:gap-6">
                    {/* Destaque */}
                    <a
                        href="#projetos"
                        className="relative col-span-2 min-h-[330px] bg-concept-ink rounded-3xl lg:rounded-[28px] p-6 lg:p-7 flex flex-col justify-between text-white overflow-hidden group"
                    >
                        <Corner tone="light" />
                        <div className="flex gap-2.5 items-center">
                            <span className="bg-concept-yellow text-concept-ink text-[13px] font-semibold px-3 py-1.5 rounded-full">Cliente</span>
                            <span className="text-sm text-white/75">Projeto em destaque</span>
                        </div>
                        {/* Ilustração do painel (Kanban de pedidos) */}
                        <div aria-hidden="true" className="my-5 sm:my-0 sm:absolute sm:left-[230px] sm:right-7 sm:top-[72px] sm:bottom-7 h-40 sm:h-auto rounded-2xl bg-[#1A2150] border border-white/10 flex flex-col overflow-hidden">
                            <div className="h-[30px] flex gap-1.5 items-center px-3 border-b border-white/10">
                                <span className="w-2 h-2 rounded-full bg-white/35" /><span className="w-2 h-2 rounded-full bg-white/35" /><span className="w-2 h-2 rounded-full bg-white/35" />
                            </div>
                            <div className="flex-1 grid grid-cols-3 gap-3 p-3">
                                {[['#FCE026', 3], ['#3B5BFF', 2], ['#25D366', 4]].map(([c, n], i) => (
                                    <div key={i} className="flex flex-col gap-2">
                                        <span className="h-1.5 w-10 rounded-full" style={{ background: c as string }} />
                                        {Array.from({ length: n as number }).map((_, j) => (
                                            <span key={j} className="h-7 rounded-lg bg-white/10 group-hover:bg-white/[0.14] transition-colors" />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative flex flex-col gap-2 sm:w-[190px]">
                            <span className="font-poppins text-[26px] font-bold leading-tight">Adega Teles Delivery</span>
                            <span className="text-sm leading-normal text-white/80">Vitrine, pedidos em tempo real e caixa por motoboy.</span>
                        </div>
                    </a>

                    {/* Números */}
                    <div className="col-span-2 xl:col-span-1 grid grid-cols-2 xl:grid-cols-1 rounded-3xl lg:rounded-[28px] overflow-hidden">
                        <div className="relative bg-concept-tint p-6 min-h-[140px] flex flex-col justify-end">
                            <Corner />
                            <span className="font-poppins text-[40px] lg:text-[52px] font-bold leading-none">{projects.length}</span>
                            <span className="text-sm lg:text-[17px] mt-1.5">Projetos no portfólio</span>
                        </div>
                        <div className="relative bg-concept-blue text-white p-6 min-h-[140px] flex flex-col justify-end">
                            <Corner tone="light" />
                            <span className="font-poppins text-[40px] lg:text-[52px] font-bold leading-none">{nicheCount}</span>
                            <span className="text-sm lg:text-[17px] mt-1.5">Nichos atendidos</span>
                        </div>
                    </div>

                    {/* Região */}
                    <div className="relative col-span-2 xl:col-span-1 bg-white border border-concept-line rounded-3xl lg:rounded-[28px] p-6 min-h-[200px] flex flex-col justify-between">
                        <Corner />
                        <svg viewBox="0 0 24 24" className="w-[30px] h-[30px]" fill="none" stroke="#0624C7" strokeWidth={1.8} strokeLinejoin="round" aria-hidden="true">
                            <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
                            <circle cx="12" cy="9.5" r="2.5" />
                        </svg>
                        <div className="flex flex-col gap-2">
                            <span className="font-poppins text-2xl font-bold leading-tight">Baixada Santista</span>
                            <span className="text-sm leading-relaxed text-concept-muted">Santos · Guarujá · São Vicente · Praia Grande · Cubatão</span>
                        </div>
                    </div>

                    {/* Ecossistema */}
                    <a href="#solucoes" className="col-span-2 flex rounded-3xl lg:rounded-[28px] overflow-hidden min-h-[200px]">
                        <div className="w-[38%] sm:w-[42%] bg-concept-ink flex items-center justify-center">
                            <svg viewBox="0 0 160 160" className="w-28 h-28 lg:w-[150px] lg:h-[150px]" aria-hidden="true">
                                <g className="orbit"><ellipse cx="80" cy="80" rx="62" ry="24" fill="none" stroke="#0624C7" strokeWidth={2.5} /></g>
                                <g className="spin"><ellipse cx="80" cy="80" rx="24" ry="62" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth={2} /></g>
                                <circle cx="80" cy="80" r="44" fill="none" stroke="#FFFFFF" strokeWidth={2.5} />
                                <circle cx="80" cy="80" r="7" fill="#FCE026" />
                            </svg>
                        </div>
                        <div className="relative flex-1 bg-concept-yellow text-concept-ink p-6 lg:px-8 flex flex-col justify-end">
                            <Corner />
                            <span className="font-poppins text-[34px] lg:text-[44px] font-bold leading-none">3 em 1</span>
                            <span className="text-base lg:text-lg leading-snug mt-2.5">Landing page + CRM próprio + Dashboard de métricas.</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </section>
);

export default HeroBento;
