import type { ReactNode } from 'react';
import Wolf from './Wolf';
import WhatsAppLink, { WhatsAppIcon } from './WhatsAppLink';
import { RESPONSE_PROMISE } from '@/lib/site';

const Eyebrow = ({ children }: { children: ReactNode }) => (
    <span className="text-sm font-semibold tracking-[0.14em] uppercase text-concept-yellow">{children}</span>
);

const H2 = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
    <h2 className={`font-poppins text-[34px] sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-[-0.02em] ${className}`}>{children}</h2>
);

const SOLUTIONS = [
    { title: 'Landing page de alta conversão', text: 'Design minimalista, velocidade extrema e um caminho direto até o WhatsApp.' },
    { title: 'CRM próprio e gestão de leads', text: 'Para quem já tem tráfego e não quer mais perder vendas no WhatsApp.' },
    { title: 'Sistemas sob demanda', text: 'Web apps, plataformas internas, automações, integrações e e-commerce.' },
];

export const Solutions = () => (
    <section id="solucoes" className="scroll-mt-6 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-20 pt-24 lg:pt-28 flex flex-col gap-10 lg:gap-12">
        <div className="flex flex-col gap-3.5">
            <Eyebrow>Soluções</Eyebrow>
            <H2 className="max-w-[820px]">Do primeiro clique ao cliente fechado.</H2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SOLUTIONS.map((s, i) => (
                <div key={s.title} className="bg-night-card border border-night-line rounded-[28px] p-8 flex flex-col gap-4 min-h-[240px]">
                    <span className="font-poppins text-[15px] font-semibold text-concept-sky">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-poppins text-[26px] font-bold leading-tight">{s.title}</span>
                    <span className="text-base leading-relaxed text-night-muted">{s.text}</span>
                </div>
            ))}
        </div>
        <div className="bg-concept-blue rounded-[28px] p-8 lg:px-12 lg:py-11 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8 lg:gap-10 text-white">
            <div className="flex flex-col gap-3 max-w-[700px]">
                <span className="text-sm font-semibold tracking-[0.14em] uppercase text-concept-yellow">Pacote principal</span>
                <span className="font-poppins text-[28px] lg:text-[38px] font-bold leading-[1.1]">Ecossistema Integrado de Conversão</span>
                <span className="text-base lg:text-[17px] leading-relaxed text-white/90">
                    Landing page premium, CRM próprio integrado e dashboard de tráfego pago em tempo real, funcionando como um só sistema.
                </span>
            </div>
            <div className="flex flex-col lg:items-end gap-4 flex-shrink-0">
                <span className="text-[15px] text-white/85">Proposta sob medida após um diagnóstico rápido. {RESPONSE_PROMISE}.</span>
                <WhatsAppLink
                    buttonId="package_whatsapp"
                    thankYou
                    message="Olá! Quero um diagnóstico para o Ecossistema Integrado de Conversão (landing page + CRM + dashboard)."
                    className="self-start lg:self-end bg-concept-yellow text-concept-ink font-semibold text-base px-6 min-h-[52px] rounded-full flex items-center gap-2 hover:brightness-95 transition"
                >
                    <WhatsAppIcon className="w-5 h-5" />
                    Solicitar diagnóstico no WhatsApp
                </WhatsAppLink>
            </div>
        </div>
    </section>
);

const STEPS = [
    { title: 'Diagnóstico', text: 'Entendemos o gargalo de vendas ou de atendimento.' },
    { title: 'Protótipo visual', text: 'Você aprova o design antes de uma linha de código.' },
    { title: 'Desenvolvimento', text: 'Full-stack, com tecnologia moderna e rápida.' },
    { title: 'Entrega e onboarding', text: 'Colocamos no ar e mostramos como usar.' },
    { title: 'Manutenção recorrente', text: 'Plano mensal para o sistema seguir evoluindo.' },
];

export const Process = () => (
    <section id="processo" className="scroll-mt-6 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-20 pt-24 lg:pt-28 flex flex-col gap-10 lg:gap-12">
        <div className="flex flex-col gap-3.5">
            <Eyebrow>Processo</Eyebrow>
            <H2>Direto, do diagnóstico à entrega.</H2>
        </div>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
            {STEPS.map((s, i) => (
                <li key={s.title} className={`flex flex-col gap-3 pt-5 ${i === STEPS.length - 1 ? 'border-t-2 border-concept-yellow' : 'border-t border-night-edge'}`}>
                    <span className={`font-poppins text-[15px] font-semibold ${i === STEPS.length - 1 ? 'text-concept-yellow' : 'text-concept-sky'}`}>{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-poppins text-[21px] font-semibold">{s.title}</span>
                    <span className="text-[15px] leading-relaxed text-night-muted">{s.text}</span>
                </li>
            ))}
        </ol>
    </section>
);

export const ContactCTA = () => (
    <section id="contato" className="scroll-mt-6 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-20 pt-24 lg:pt-32 pb-24 lg:pb-32">
        <div className="relative bg-night-card border border-night-line rounded-3xl lg:rounded-[32px] p-7 sm:p-10 lg:p-16 flex flex-col lg:flex-row justify-between items-center gap-10 lg:gap-12 text-white overflow-hidden">
            <span aria-hidden="true" className="absolute -right-16 -top-20 w-[560px] h-[560px] rounded-full bg-[radial-gradient(circle,rgba(61,91,255,0.22)_0%,rgba(61,91,255,0)_65%)] pointer-events-none" />
            <div className="relative flex flex-col gap-6 max-w-[700px]">
                <H2 className="lg:text-[58px] leading-[1.05]">Vamos resolver o gargalo do seu negócio.</H2>
                <p className="text-base lg:text-lg leading-relaxed text-night-muted">
                    Uma conversa rápida para entender o momento da sua empresa e indicar a solução certa.
                </p>
                <div className="flex flex-col sm:flex-row gap-3.5 mt-2">
                    <WhatsAppLink
                        buttonId="whatsapp_contact"
                        thankYou
                        className="bg-concept-yellow text-concept-ink font-semibold text-[17px] pl-5 pr-7 min-h-[58px] rounded-full flex items-center justify-center gap-2.5 hover:brightness-95 transition"
                    >
                        <WhatsAppIcon className="w-[22px] h-[22px]" />
                        Falar no WhatsApp
                    </WhatsAppLink>
                    <a href="#projetos" className="text-white font-medium text-[17px] px-7 min-h-[58px] rounded-full border-[1.5px] border-night-edge flex items-center justify-center hover:border-white transition-colors">
                        Ver projetos
                    </a>
                </div>
                <span className="flex items-center gap-2 text-sm text-night-muted">
                    <span aria-hidden="true" className="w-2 h-2 rounded-full bg-whatsapp" />
                    {RESPONSE_PROMISE}.
                </span>
            </div>
            <Wolf className="relative w-[260px] h-[195px] lg:w-[380px] lg:h-[285px] flex-shrink-0" />
        </div>
    </section>
);
