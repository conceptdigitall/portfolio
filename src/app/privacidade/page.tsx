import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import PageShell from '@/components/PageShell';
import WhatsAppLink from '@/components/home/WhatsAppLink';
import { WHATSAPP_DISPLAY } from '@/lib/whatsapp';

export const metadata: Metadata = {
    title: 'Política de privacidade',
    description: 'Como a Concept Digital trata os dados de quem visita o site, conforme a LGPD.',
    alternates: { canonical: '/privacidade' },
};

/*
 * Modelo baseado no que o site realmente coleta hoje (set/2026).
 * Revise se adicionar formulário, newsletter ou outra ferramenta.
 * Não é aconselhamento jurídico: vale uma revisão de um advogado.
 */
const UPDATED = '26 de setembro de 2026';

const H = ({ children }: { children: ReactNode }) => (
    <h2 className="font-poppins text-2xl lg:text-[28px] font-bold leading-tight pt-4">{children}</h2>
);
const P = ({ children }: { children: ReactNode }) => (
    <p className="text-base leading-relaxed text-night-muted">{children}</p>
);
const LI = ({ children }: { children: ReactNode }) => (
    <li className="text-base leading-relaxed text-night-muted pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[0.7em] before:w-2 before:h-[2px] before:bg-concept-yellow">{children}</li>
);

export default function Privacidade() {
    return (
        <PageShell crumbs={[{ name: 'Política de privacidade', href: '/privacidade' }]} eyebrow="LGPD" title="Política de privacidade">
            <div className="flex flex-col gap-5 max-w-[760px]">
                <P>Última atualização: {UPDATED}.</P>
                <P>
                    Esta política explica quais dados a Concept Digital coleta quando você visita este site, para que usamos e quais são os
                    seus direitos pela Lei Geral de Proteção de Dados (Lei 13.709/2018).
                </P>

                <H>Quem é o responsável</H>
                <P>Concept Digital, Baixada Santista, SP. [CNPJ, se houver]. Contato: WhatsApp {WHATSAPP_DISPLAY} e [E-MAIL OFICIAL].</P>

                <H>O que coletamos</H>
                <ul className="flex flex-col gap-3">
                    <LI><strong className="text-night-text">Métricas de uso do site:</strong> páginas visitadas, tempo na página, quanto rolou, tipo de aparelho (celular ou computador) e cliques em projetos e botões. Não coletamos nome, e-mail ou telefone nessas métricas.</LI>
                    <LI><strong className="text-night-text">Google Analytics e Meta Pixel:</strong> só são ativados se você clicar em &quot;Aceitar&quot; no aviso de cookies. Ajudam a medir de onde vêm as visitas e quais anúncios funcionam.</LI>
                    <LI><strong className="text-night-text">Vercel Analytics:</strong> contagem de visitas e desempenho do site, sem cookies e sem identificar você.</LI>
                    <LI><strong className="text-night-text">Assistente virtual (chat):</strong> as mensagens que você escreve são enviadas à Anthropic, empresa que fornece a inteligência artificial, apenas para gerar a resposta. Não escreva dados sensíveis no chat.</LI>
                    <LI><strong className="text-night-text">WhatsApp:</strong> ao clicar em um botão de WhatsApp, a conversa acontece no aplicativo do WhatsApp (Meta), com as regras de privacidade dele.</LI>
                </ul>

                <H>Para que usamos</H>
                <P>Para entender como o site é usado, melhorar o conteúdo, medir campanhas e responder quem entra em contato. Não vendemos seus dados.</P>

                <H>Base legal</H>
                <P>Consentimento (cookies do Google Analytics e do Meta Pixel) e legítimo interesse (métricas sem identificação e segurança do site).</P>

                <H>Com quem compartilhamos</H>
                <P>Apenas com os fornecedores que fazem o site funcionar: Vercel (hospedagem), Supabase (banco de dados das métricas), Google, Meta e Anthropic, nas situações descritas acima. Alguns deles guardam dados fora do Brasil.</P>

                <H>Por quanto tempo</H>
                <P>Métricas de uso ficam guardadas por até [PRAZO, ex.: 24 meses]. Conversas de WhatsApp ficam enquanto houver relação comercial ou até você pedir a exclusão.</P>

                <H>Seus direitos</H>
                <P>
                    Você pode pedir a confirmação de que tratamos seus dados, acesso, correção, exclusão, e retirar o consentimento de cookies a
                    qualquer momento (limpando os cookies do navegador, o aviso aparece de novo).
                </P>
                <P>
                    Para qualquer pedido, fale com a gente pelo{' '}
                    <WhatsAppLink buttonId="privacidade_whatsapp" message="Olá! Tenho um pedido sobre meus dados (LGPD)." className="text-concept-yellow underline underline-offset-4">
                        WhatsApp
                    </WhatsAppLink>
                    .
                </P>
            </div>
        </PageShell>
    );
}
