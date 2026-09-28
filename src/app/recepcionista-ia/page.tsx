import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import AiReceptionistDemo from '@/components/home/AiReceptionistDemo';
import WhatsAppLink, { WhatsAppIcon } from '@/components/home/WhatsAppLink';
import { RESPONSE_PROMISE } from '@/lib/site';
import { 
  Bot, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  Zap, 
  UserCheck, 
  HelpCircle, 
  CheckCircle2, 
  XCircle 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Recepcionista de IA para WhatsApp | Concept Digital',
  description:
    'Agente de inteligência artificial no WhatsApp que atende 24h, responde com as regras do seu negócio, qualifica leads e agenda horários automaticamente.',
  alternates: { canonical: '/recepcionista-ia' },
};

const COMPARISON = [
  {
    feature: 'Velocidade de Resposta',
    bot: 'Demorado ou fila de espera',
    concept: 'Em segundos, 24 horas por dia',
  },
  {
    feature: 'Tipo de Conversa',
    bot: 'Menu engessado ("Digite 1 para orçamentos")',
    concept: 'Diálogo humanizado no tom da sua marca',
  },
  {
    feature: 'Compreensão de Áudios',
    bot: 'Não entende áudios de clientes',
    concept: 'Transcreve o áudio e responde em texto',
  },
  {
    feature: 'Conexão com Agenda & CRM',
    bot: 'Só envia mensagem de aviso',
    concept: 'Bloqueia horário na agenda e alimenta o CRM',
  },
  {
    feature: 'Segurança & Regras',
    bot: 'Alucina ou inventa dados não cadastrados',
    concept: 'Responde só com as informações que você aprovou',
  },
];

const FAQ_RECEPTIONIST = [
  {
    q: 'A IA pode passar valores errados ou inventar dados?',
    a: 'A IA é configurada para responder só com as informações que você aprovou no manual do seu negócio (preços, horários, serviços). Quando a pergunta foge disso ou é sensível, ela não improvisa: passa a conversa para a sua equipe.',
  },
  {
    q: 'Como funciona se o cliente enviar mensagens de áudio?',
    a: 'Sim. A IA transcreve o áudio, entende o pedido e responde em texto, como faria com uma mensagem digitada. Áudios muito longos ou com muito ruído podem ser encaminhados para a sua equipe.',
  },
  {
    q: 'Preciso trocar de número de telefone ou chip do WhatsApp?',
    a: 'Na maioria dos casos, dá para usar o número que sua empresa já tem. Isso depende de como o WhatsApp está configurado hoje, e a gente avalia junto com você no diagnóstico, antes de qualquer contrato.',
  },
  {
    q: 'E quando um caso exige atendimento humano?',
    a: 'A IA reconhece a intenção de falar com alguém da equipe ou situações que demandam negociação personalizada, pausando o atendimento automatizado e notificando seu atendente humano com o resumo de tudo o que foi conversado.',
  },
  {
    q: 'Ela se conecta com meu calendário ou sistema atual?',
    a: 'Sim! Integramos com Google Agenda, CRM Concept, planilhas ou plataformas próprias do seu nicho (como sistemas odontológicos, barbearias ou imobiliários).',
  },
];

export default function AiReceptionistPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-20 pt-8 pb-28 flex flex-col gap-20 lg:gap-28">
      
      {/* 1. HERO SECTION */}
      <section className="flex flex-col gap-6 pt-4 max-w-4xl">
        <Breadcrumbs items={[{ name: 'Recepcionista de IA', href: '/recepcionista-ia' }]} />

        <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-concept-blue/20 border border-concept-sky/30 text-concept-sky text-xs font-bold uppercase tracking-wider">
          <Bot className="w-4 h-4 text-concept-yellow" />
          <span>Engenharia de Vendas · Inteligência Artificial</span>
        </div>

        <h1 className="font-poppins text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.06] tracking-[-0.03em] text-white">
          O atendente de IA que <span className="text-concept-yellow">qualifica, agenda</span> e fecha vendas no WhatsApp.
        </h1>

        <p className="text-base sm:text-lg text-night-muted leading-relaxed max-w-2xl font-light">
          Boa parte dos contatos chega à noite, no fim de semana ou no meio de um atendimento, e esfria esperando resposta. 
          A Recepcionista de IA da Concept responde em segundos, no tom do seu negócio, 24 horas por dia.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <WhatsAppLink
            buttonId="hero_ai_receptionist"
            thankYou
            message="Olá! Quero conhecer mais sobre a Recepcionista de IA para o meu negócio."
            className="bg-concept-yellow hover:bg-[#ebd01e] text-concept-ink font-semibold text-base px-7 min-h-[54px] rounded-full flex items-center gap-2.5 transition shadow-lg cursor-pointer"
          >
            <WhatsAppIcon className="w-5 h-5" />
            Testar demonstração personalizada
          </WhatsAppLink>
          <span className="text-xs text-night-dim">
            {RESPONSE_PROMISE}. Sem compromisso.
          </span>
        </div>
      </section>

      {/* 2. SIMULADOR INTERATIVO MULTI-NICHO & MULTI-TOM */}
      <section id="simulador" className="scroll-mt-10 flex flex-col gap-8 bg-night-card border border-night-line rounded-3xl lg:rounded-[36px] p-6 sm:p-10 lg:p-12 shadow-2xl">
        <div className="flex flex-col gap-2 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-concept-yellow">
            Demonstração Interativa ao Vivo
          </span>
          <h2 className="font-poppins text-2xl sm:text-4xl font-bold text-white leading-tight">
            Experimente a IA adaptada para diferentes nichos e tons
          </h2>
          <p className="text-sm text-night-muted leading-relaxed font-light">
            Alterne entre os setores abaixo e veja como a linguagem, as respostas e as ações no CRM mudam de acordo com o segmento.
          </p>
        </div>

        <AiReceptionistDemo />
      </section>

      {/* 3. COMPARAÇÃO: CHATBOT ANTIGO vs. IA CONCEPT */}
      <section className="flex flex-col gap-10">
        <div className="flex flex-col gap-3 text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-concept-sky">
            Engenharia vs. Chatbot Tradicional
          </span>
          <h2 className="font-poppins text-3xl sm:text-5xl font-bold text-white leading-tight">
            Por que seus clientes odeiam chatbots comuns — e amam essa IA
          </h2>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[620px] bg-night-card border border-night-line rounded-3xl p-6 lg:p-8">
            <div className="grid grid-cols-3 pb-4 border-b border-night-line text-xs uppercase tracking-wider font-bold">
              <span className="text-night-dim">Critério de Atendimento</span>
              <span className="text-rose-400 flex items-center gap-1.5">
                <XCircle className="w-4 h-4" /> Chatbot Comum (Menu)
              </span>
              <span className="text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-concept-yellow" /> Recepcionista IA Concept
              </span>
            </div>

            <div className="divide-y divide-night-line/60">
              {COMPARISON.map((row) => (
                <div key={row.feature} className="grid grid-cols-3 py-4 text-sm items-center">
                  <span className="font-semibold text-white">{row.feature}</span>
                  <span className="text-night-muted text-xs sm:text-sm pr-4 font-light">{row.bot}</span>
                  <span className="text-white font-medium text-xs sm:text-sm pl-2 text-concept-sky">{row.concept}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. PERGUNTAS FREQUENTES DA RECEPCIONISTA */}
      <section className="flex flex-col gap-8 max-w-3xl mx-auto w-full">
        <div className="text-center flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-concept-yellow">
            Transparência Técnica
          </span>
          <h2 className="font-poppins text-3xl sm:text-4xl font-bold text-white">
            Perguntas Frequentes
          </h2>
        </div>

        <div className="flex flex-col gap-3.5">
          {FAQ_RECEPTIONIST.map((faq) => (
            <details
              key={faq.q}
              className="group bg-night-card border border-night-line hover:border-night-edge rounded-2xl p-5 transition-all"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden font-poppins font-semibold text-base text-white">
                <span>{faq.q}</span>
                <span
                  aria-hidden="true"
                  className="w-6 h-6 rounded-full bg-night-edge flex items-center justify-center text-concept-yellow font-mono text-sm transition-transform group-open:rotate-45 shrink-0"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-night-muted leading-relaxed font-light border-t border-night-line/60 pt-3">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* 5. CTA FINAL */}
      <section className="relative bg-concept-blue rounded-3xl lg:rounded-[36px] p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 text-white overflow-hidden shadow-2xl">
        <span aria-hidden="true" className="absolute -right-20 -bottom-20 w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(252,224,38,0.2)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="flex flex-col gap-4 max-w-xl">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-concept-yellow">
            Implantação Personalizada
          </span>
          <h2 className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Pronto para nunca mais perder um cliente no WhatsApp?
          </h2>
          <p className="text-sm sm:text-base text-white/85 leading-relaxed font-light">
            Fazemos o mapeamento dos fluxos da sua empresa, programamos o tom de voz e entregamos a IA 100% pronta para atender.
          </p>
        </div>

        <div className="flex flex-col gap-3 shrink-0 w-full sm:w-auto">
          <WhatsAppLink
            buttonId="final_ai_receptionist"
            thankYou
            message="Olá João! Quero agendar uma demonstração da Recepcionista de IA para a minha empresa."
            className="bg-concept-yellow hover:bg-[#ebd01e] text-concept-ink font-bold text-base px-8 py-4 rounded-full flex items-center justify-center gap-2.5 transition shadow-xl cursor-pointer"
          >
            <WhatsAppIcon className="w-5 h-5" />
            Falar com a Concept Digital
          </WhatsAppLink>
          <span className="text-xs text-white/70 text-center sm:text-right">
            {RESPONSE_PROMISE}
          </span>
        </div>
      </section>

    </div>
  );
}
