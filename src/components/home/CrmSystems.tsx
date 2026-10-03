import type { ReactNode } from 'react';
import { Check, Clapperboard, Search, Sparkles } from 'lucide-react';
import WhatsAppLink, { WhatsAppIcon } from './WhatsAppLink';

/**
 * Seção "Dentro do CRM Concept": apresenta os dois sistemas do CRM (geração de vídeo e prospecção).
 * As telas são ilustrações com dados FICTÍCIOS — nunca usar nomes, telefones ou leads reais aqui.
 */

const Eyebrow = ({ children }: { children: ReactNode }) => (
    <span className="text-sm font-semibold tracking-[0.14em] uppercase text-concept-yellow">{children}</span>
);

const DemoBadge = () => (
    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-concept-yellow/15 border border-concept-yellow/30 text-concept-yellow">
        Dados fictícios
    </span>
);

const Benefits = ({ items }: { items: string[] }) => (
    <ul className="flex flex-col gap-3">
        {items.map((t) => (
            <li key={t} className="flex gap-3 text-base leading-relaxed text-night-soft">
                <Check aria-hidden="true" className="w-5 h-5 mt-0.5 flex-shrink-0 text-concept-yellow" />
                <span>{t}</span>
            </li>
        ))}
    </ul>
);

/* ---------------- Ilustração: gerador de vídeos ---------------- */

const FORMATS = ['9:16', '1:1', '16:9'];
const TONES = ['Leve', 'Elegante', 'Anúncio', 'Cinema'];

const VideoMock = () => (
    <div
        role="img"
        aria-label="Ilustração da tela de criação de vídeo: formulário à esquerda e prévia do vídeo vertical à direita"
        className="bg-night-raise border border-night-line rounded-3xl p-4 sm:p-6 grid grid-cols-[minmax(0,1fr)_132px] sm:grid-cols-[minmax(0,1fr)_170px] gap-4 sm:gap-6"
    >
        <div className="flex flex-col gap-3.5 min-w-0">
            <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-night-muted">Novo vídeo</span>
                <DemoBadge />
            </div>
            <div className="rounded-xl bg-night border border-night-line p-3 text-[13px] leading-snug text-night-soft">
                Promoção de sexta: corte + barba por R$ 59. Agende pelo WhatsApp.
            </div>
            <div className="grid grid-cols-4 gap-2">
                {['from-[#3D5BFF] to-[#0624C7]', 'from-[#FCE026] to-[#d9a400]', 'from-[#25D366] to-[#0b7a3a]', 'from-[#6E86FF] to-[#2A3160]'].map((g) => (
                    <span key={g} className={`aspect-square rounded-lg bg-gradient-to-br ${g} opacity-90`} />
                ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
                {FORMATS.map((f, i) => (
                    <span key={f} className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${i === 0 ? 'bg-concept-yellow text-concept-ink border-concept-yellow' : 'border-night-edge text-night-muted'}`}>
                        {f}
                    </span>
                ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
                {TONES.map((t, i) => (
                    <span key={t} className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${i === 2 ? 'bg-concept-sky/20 text-white border-concept-sky' : 'border-night-edge text-night-muted'}`}>
                        {t}
                    </span>
                ))}
            </div>
            <span className="mt-auto self-start text-[13px] font-semibold bg-concept-yellow text-concept-ink rounded-full px-4 py-2">Gerar vídeo</span>
        </div>
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#0624C7] via-[#0A1C9A] to-[#06081A] border border-night-edge aspect-[9/16] self-start flex flex-col justify-between p-3">
            <span className="text-[9px] font-bold uppercase tracking-wider text-concept-yellow">Sexta de oferta</span>
            <div className="flex flex-col gap-1.5">
                <span className="font-poppins text-[17px] sm:text-xl font-bold leading-tight text-white">Corte + barba por R$ 59</span>
                <span className="text-[10px] text-white/80">Agende pelo WhatsApp</span>
                <span className="h-1 rounded-full bg-white/20 overflow-hidden"><span className="block h-full w-2/3 bg-concept-yellow" /></span>
            </div>
        </div>
    </div>
);

/* ---------------- Ilustração: prospecção ---------------- */

const LEADS = [
    { name: 'Barbearia Nova Era', city: 'Santos', score: 'Alta', money: '✓ sim · 88%', niche: 'Beleza · 91%' },
    { name: 'Estúdio Lótus', city: 'Guarujá', score: 'Alta', money: '✓ sim · 82%', niche: 'Beleza · 87%' },
    { name: 'Clínica Sorriso Real', city: 'Santos', score: 'Média', money: '✓ sim · 74%', niche: 'Saúde · 93%' },
    { name: 'Mercadinho do Bairro', city: 'São Vicente', score: 'Média', money: '✕ não · 69%', niche: 'Alimentação · 78%' },
    { name: 'Oficina Rápida 24h', city: 'Cubatão', score: 'Baixa', money: '✕ não · 58%', niche: 'Serviços · 64%' },
];

const SCORE_STYLE: Record<string, string> = {
    Alta: 'bg-whatsapp/20 text-whatsapp',
    Média: 'bg-concept-yellow/20 text-concept-yellow',
    Baixa: 'bg-night-edge text-night-muted',
};

const LeadsMock = () => (
    <div
        role="img"
        aria-label="Ilustração de uma lista de empresas ordenada por oportunidade, com colunas de resposta automática"
        className="bg-night-raise border border-night-line rounded-3xl p-4 sm:p-6 flex flex-col gap-4 overflow-hidden"
    >
        <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2 rounded-full bg-night border border-night-line px-3.5 py-2 text-[13px] text-night-soft">
                <Search aria-hidden="true" className="w-4 h-4 text-night-muted" />
                barbearia · Baixada Santista
            </span>
            <DemoBadge />
        </div>
        <div className="overflow-x-auto -mx-1 px-1">
            <table className="w-full min-w-[480px] text-left text-[12px] sm:text-[13px]">
                <thead>
                    <tr className="text-night-muted">
                        <th className="font-semibold pb-2 pr-3">Empresa</th>
                        <th className="font-semibold pb-2 pr-3">Oportunidade</th>
                        <th className="font-semibold pb-2 pr-3">Parece ter dinheiro?</th>
                        <th className="font-semibold pb-2">Nicho</th>
                    </tr>
                </thead>
                <tbody>
                    {LEADS.map((l) => (
                        <tr key={l.name} className="border-t border-night-line">
                            <td className="py-2.5 pr-3">
                                <span className="block font-semibold text-night-text">{l.name}</span>
                                <span className="block text-night-dim">{l.city}</span>
                            </td>
                            <td className="py-2.5 pr-3">
                                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${SCORE_STYLE[l.score]}`}>{l.score}</span>
                            </td>
                            <td className="py-2.5 pr-3 text-night-soft whitespace-nowrap">{l.money}</td>
                            <td className="py-2.5 text-night-soft whitespace-nowrap">{l.niche}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <span className="text-[12px] text-night-dim">As colunas “Parece ter dinheiro?” e “Nicho” foram criadas escrevendo só o título.</span>
    </div>
);

/* ---------------- Seção ---------------- */

const Panel = ({
    icon,
    kicker,
    title,
    lead,
    benefits,
    note,
    mock,
    reverse,
}: {
    icon: ReactNode;
    kicker: string;
    title: string;
    lead: string;
    benefits: string[];
    note?: ReactNode;
    mock: ReactNode;
    reverse?: boolean;
}) => (
    <div className="bg-night-card border border-night-line rounded-[28px] p-6 sm:p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
        <div className={`flex flex-col gap-5 ${reverse ? 'lg:order-2' : ''}`}>
            <span className="flex items-center gap-2 text-xs font-semibold tracking-[0.08em] uppercase text-concept-sky">
                {icon}
                {kicker}
            </span>
            <h3 className="font-poppins text-[28px] lg:text-[36px] font-bold leading-[1.1]">{title}</h3>
            <p className="text-base lg:text-[17px] leading-relaxed text-night-muted">{lead}</p>
            <Benefits items={benefits} />
            {note}
        </div>
        <div className={reverse ? 'lg:order-1' : ''}>{mock}</div>
    </div>
);

const CrmSystems = () => (
    <section id="crm" className="scroll-mt-6 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-20 pt-24 lg:pt-36 flex flex-col gap-10 lg:gap-12">
        <div className="flex flex-col gap-3.5">
            <Eyebrow>Dentro do CRM Concept</Eyebrow>
            <h2 className="font-poppins text-[34px] sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-[-0.02em] max-w-[820px]">
                Divulgar e encontrar clientes sem complicação.
            </h2>
            <p className="text-base lg:text-lg leading-relaxed text-night-muted max-w-[680px]">
                Além de organizar seus contatos e o WhatsApp, o CRM Concept ajuda a criar conteúdo para as redes e a descobrir quem procurar primeiro.
            </p>
        </div>

        <Panel
            icon={<Clapperboard aria-hidden="true" className="w-4 h-4" />}
            kicker="Vídeos para redes sociais"
            title="Do texto ao vídeo pronto para postar."
            lead="Conte a promoção ou envie até 4 fotos do seu negócio. O sistema monta um vídeo curto, no formato certo para Reels, Stories ou feed."
            benefits={[
                'Sem contratar editor e sem pagar ferramenta de vídeo à parte.',
                'Modelos prontos: oferta, destaque de serviço, conheça o espaço e prova social.',
                'Legenda e hashtags prontas para copiar, com atalho para publicar.',
            ]}
            mock={<VideoMock />}
        />

        <Panel
            reverse
            icon={<Search aria-hidden="true" className="w-4 h-4" />}
            kicker="Prospecção de clientes"
            title="Saiba quem procurar primeiro."
            lead="Busque empresas por segmento e cidade e veja a lista já ordenada por chance de negócio, para gastar seu tempo com quem mais vale a pena."
            benefits={[
                'Cada empresa recebe uma nota de oportunidade, por exemplo: não tem site ou tem poucas avaliações.',
                'Um clique leva a empresa para o seu CRM como contato.',
                'Nada é enviado sozinho: você decide quando e como chamar.',
            ]}
            note={
                <div className="rounded-2xl border border-concept-yellow/30 bg-concept-yellow/[0.06] p-4 flex gap-3">
                    <Sparkles aria-hidden="true" className="w-5 h-5 mt-0.5 flex-shrink-0 text-concept-yellow" />
                    <span className="text-[15px] leading-relaxed text-night-soft">
                        <strong className="text-white">Colunas inteligentes:</strong> escreva uma pergunta, como “Parece ter dinheiro?”, e o sistema responde para cada empresa da lista. Corrigiu uma resposta? Ele aprende com você.
                    </span>
                </div>
            }
            mock={<LeadsMock />}
        />

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <WhatsAppLink
                buttonId="crm_systems_whatsapp"
                thankYou
                message="Olá! Vi os vídeos e a prospecção do CRM Concept no portfólio e gostaria de saber como funciona para o meu negócio."
                className="self-start bg-concept-yellow text-concept-ink font-semibold text-base px-6 min-h-[52px] rounded-full flex items-center gap-2 hover:brightness-95 transition"
            >
                <WhatsAppIcon className="w-5 h-5" />
                Quero ver no meu negócio
            </WhatsAppLink>
            <span className="text-sm text-night-dim">As telas acima são ilustrações com dados fictícios.</span>
        </div>
    </section>
);

export default CrmSystems;
