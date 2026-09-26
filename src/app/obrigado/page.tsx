import type { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/PageShell';
import WhatsAppLink, { WhatsAppIcon } from '@/components/home/WhatsAppLink';
import { RESPONSE_PROMISE } from '@/lib/site';

export const metadata: Metadata = {
    title: 'Obrigado pelo contato',
    description: 'Recebemos seu contato. Veja os próximos passos com a Concept Digital.',
    // Página de conversão: fora do Google. No GA4, a visita a /obrigado vira conversão.
    robots: { index: false, follow: false },
};

const NEXT = [
    { title: 'Conversa rápida', text: 'Entendemos o momento do seu negócio e onde está o gargalo.' },
    { title: 'Diagnóstico', text: 'Indicamos a solução certa, com escopo e investimento claros.' },
    { title: 'Protótipo visual', text: 'Você aprova o design antes de qualquer linha de código.' },
];

export default function Obrigado() {
    return (
        <PageShell crumbs={[{ name: 'Obrigado', href: '/obrigado' }]} eyebrow="Contato recebido" title="Obrigado! Já estamos com você.">
            <p className="text-base lg:text-lg leading-relaxed text-night-muted max-w-[640px]">
                Sua conversa abriu no WhatsApp em outra aba. {RESPONSE_PROMISE}. Se a aba não abriu, use o botão abaixo.
            </p>
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {NEXT.map((s, i) => (
                    <li key={s.title} className="bg-night-card border border-night-line rounded-[28px] p-7 flex flex-col gap-3">
                        <span className="font-poppins text-[15px] font-semibold text-concept-sky">{String(i + 1).padStart(2, '0')}</span>
                        <span className="font-poppins text-[21px] font-semibold">{s.title}</span>
                        <span className="text-[15px] leading-relaxed text-night-muted">{s.text}</span>
                    </li>
                ))}
            </ol>
            <div className="flex flex-col sm:flex-row gap-3.5">
                <WhatsAppLink
                    buttonId="obrigado_whatsapp"
                    className="bg-concept-yellow text-concept-ink font-semibold text-base pl-5 pr-7 min-h-[52px] rounded-full flex items-center justify-center gap-2.5 whitespace-nowrap hover:brightness-95 transition"
                >
                    <WhatsAppIcon className="w-5 h-5" />
                    Abrir o WhatsApp
                </WhatsAppLink>
                <Link
                    href="/#projetos"
                    className="text-night-text font-medium text-base px-7 min-h-[52px] rounded-full border-[1.5px] border-night-edge flex items-center justify-center hover:border-night-text transition-colors"
                >
                    Ver projetos enquanto isso
                </Link>
            </div>
        </PageShell>
    );
}
