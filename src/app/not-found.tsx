import type { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/PageShell';
import WhatsAppLink, { WhatsAppIcon } from '@/components/home/WhatsAppLink';
import Wolf from '@/components/home/Wolf';

export const metadata: Metadata = {
    title: 'Página não encontrada',
    robots: { index: false, follow: true },
};

export default function NotFound() {
    return (
        <PageShell crumbs={[{ name: 'Página não encontrada', href: '/404' }]} eyebrow="Erro 404" title="Essa página saiu da trilha.">
            <div className="flex flex-col lg:flex-row gap-10 lg:items-center">
                <div className="flex flex-col gap-6 max-w-[560px]">
                    <p className="text-base lg:text-lg leading-relaxed text-night-muted">
                        O endereço pode ter mudado ou foi digitado errado. Volte para o início ou fale direto com a gente.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3.5">
                        <Link
                            href="/"
                            className="bg-concept-yellow text-concept-ink font-semibold text-base px-7 min-h-[52px] rounded-full flex items-center justify-center hover:brightness-95 transition"
                        >
                            Voltar para o início
                        </Link>
                        <Link
                            href="/#projetos"
                            className="text-night-text font-medium text-base px-7 min-h-[52px] rounded-full border-[1.5px] border-night-edge flex items-center justify-center hover:border-night-text transition-colors"
                        >
                            Ver projetos
                        </Link>
                        <WhatsAppLink
                            buttonId="404_whatsapp"
                            className="text-night-soft font-medium text-base px-3 min-h-[52px] flex items-center justify-center gap-2 hover:text-concept-yellow transition-colors"
                        >
                            <WhatsAppIcon className="w-5 h-5" />
                            WhatsApp
                        </WhatsAppLink>
                    </div>
                </div>
                <Wolf className="w-[240px] h-[180px] lg:w-[320px] lg:h-[240px]" label="Lobo-guará da Concept" />
            </div>
        </PageShell>
    );
}
