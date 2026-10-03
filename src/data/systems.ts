/**
 * Conteúdo da seção "Sistemas" da home (jornada Prospecção → Marketing → Recepcionista → Agenda → CRM).
 * Tudo aqui é demonstração com dados fictícios: a tela mostra o selo "Demonstração" para deixar isso claro.
 */

export type SystemNicheId = 'barbearia' | 'clinica' | 'reuniao';
export type StepId = 'prospeccao' | 'marketing' | 'recepcionista' | 'agenda' | 'crm';

export type ChatLine =
    | { kind: 'in' | 'out'; text: string }
    | { kind: 'slots'; options: string[] };

export interface SystemNiche {
    id: SystemNicheId;
    label: string;
    /** Nicho correspondente no simulador da Recepcionista (`aiReceptionistData.ts`). */
    simulatorNiche?: string;
    /** A Prospecção é para quem vende para empresas: só aparece nos nichos B2B. */
    showProspecting: boolean;
    query: string;
    leads: { name: string; detail: string; score: number }[];
    videoTheme: string;
    videoCaption: string;
    avatar: string;
    businessName: string;
    chat: ChatLine[];
    calendarLabel: string;
    newEvent: string;
    otherEvents: [string, string, string];
    reminder: string;
    movedCard: [string, string];
}

export interface SystemStep {
    id: StepId;
    label: string;
    title: string;
    text: string;
    tag?: string;
    screenTitle: string;
}

export const SYSTEM_STEPS: SystemStep[] = [
    {
        id: 'prospeccao',
        label: 'Prospecção',
        title: 'Encontra quem precisa de você.',
        text: 'Busca empresas por nicho e região. A Planilha Preditiva dá uma nota a cada lead conforme o perfil do seu cliente ideal, e quanto mais você corrige, mais ela acerta.',
        tag: 'Para quem vende para empresas',
        screenTitle: 'concept.app / prospeccao',
    },
    {
        id: 'marketing',
        label: 'Marketing',
        title: 'Atrai com vídeo, sem estúdio.',
        text: 'Gera vídeos curtos para Reels e Status a partir do seu serviço, com legenda e identidade visual, prontos para postar.',
        screenTitle: 'concept.app / marketing',
    },
    {
        id: 'recepcionista',
        label: 'Recepcionista de IA',
        title: 'Atende no WhatsApp em segundos, 24 horas.',
        text: 'Responde dúvidas, informa preços e oferece os horários livres. Quando precisa, passa a conversa para uma pessoa da equipe.',
        screenTitle: 'WhatsApp · recepcionista de IA',
    },
    {
        id: 'agenda',
        label: 'Agenda',
        title: 'Marca sozinha. Lembra sozinha.',
        text: 'Corte, consulta ou reunião entram direto na agenda do profissional certo, com lembrete automático para reduzir as faltas.',
        screenTitle: 'concept.app / agenda',
    },
    {
        id: 'crm',
        label: 'CRM',
        title: 'Tudo num funil só, com números.',
        text: 'Cada conversa vira um card no funil. O painel mostra o tempo de resposta, os agendamentos e a conversão da semana.',
        screenTitle: 'concept.app / crm',
    },
];

export const SYSTEM_NICHES: SystemNiche[] = [
    {
        id: 'barbearia',
        label: 'Barbearia',
        simulatorNiche: 'barbearia',
        showProspecting: false,
        query: '',
        leads: [],
        videoTheme: 'Degradê perfeito em 40 minutos',
        videoCaption: 'Degradê perfeito em 40 min',
        avatar: 'B',
        businessName: 'Barbearia do Lucas',
        chat: [
            { kind: 'in', text: 'Oi, tem horário pra corte amanhã?' },
            { kind: 'out', text: 'Tenho sim! Amanhã com o Lucas: 10h, 14h ou 15h30. Corte R$ 45 e corte + barba R$ 65. Qual prefere?' },
            { kind: 'slots', options: ['10h', '14h', '15h30'] },
            { kind: 'in', text: '15h30, corte e barba' },
            { kind: 'out', text: 'Fechado, Rafael! Corte + barba amanhã às 15h30 com o Lucas. Mando um lembrete 2h antes.' },
        ],
        calendarLabel: 'Agenda · Lucas',
        newEvent: 'Corte + barba · Rafael',
        otherEvents: ['Corte · Diego', 'Barba · André', 'Corte · Paulo'],
        reminder: 'Rafael · amanhã às 13h30',
        movedCard: ['Rafael', 'Corte + barba · R$ 65'],
    },
    {
        id: 'clinica',
        label: 'Clínica',
        simulatorNiche: 'clinica',
        showProspecting: false,
        query: '',
        leads: [],
        videoTheme: 'Harmonização com resultado natural',
        videoCaption: 'Harmonização: natural, não exagerada',
        avatar: 'C',
        businessName: 'Clínica Dra. Camila',
        chat: [
            { kind: 'in', text: 'Boa tarde! Quanto custa a avaliação de harmonização?' },
            { kind: 'out', text: 'Boa tarde! A avaliação com a Dra. Camila é gratuita e leva 30 min. Tenho quinta às 9h ou 11h, ou sexta às 16h. Qual fica melhor?' },
            { kind: 'slots', options: ['Qui 9h', 'Qui 11h', 'Sex 16h'] },
            { kind: 'in', text: 'Sexta às 16h' },
            { kind: 'out', text: 'Agendado, Juliana: avaliação sexta às 16h com a Dra. Camila. A confirmação chega 24h antes.' },
        ],
        calendarLabel: 'Agenda · Dra. Camila',
        newEvent: 'Avaliação · Juliana',
        otherEvents: ['Botox · Renata', 'Retorno · Carla', 'Bioestimulador · Ana'],
        reminder: 'Juliana · quinta às 16h (24h antes)',
        movedCard: ['Juliana', 'Avaliação · ticket R$ 1.800'],
    },
    {
        id: 'reuniao',
        label: 'Reuniões e vendas',
        showProspecting: true,
        query: 'clínicas odontológicas em Santos',
        leads: [
            { name: 'Clínica Sorriso Exemplo', detail: 'Santos · 4 dentistas', score: 94 },
            { name: 'Odonto Modelo', detail: 'São Vicente · 3 dentistas', score: 88 },
            { name: 'Instituto Dental Demo', detail: 'Santos · 6 dentistas', score: 83 },
            { name: 'Consultório Fictício', detail: 'Praia Grande · 1 dentista', score: 47 },
        ],
        videoTheme: 'Pare de perder cliente no WhatsApp',
        videoCaption: 'Pare de perder cliente no WhatsApp',
        avatar: 'C',
        businessName: 'Concept Digital',
        chat: [
            { kind: 'in', text: 'Vi o anúncio, queria entender o CRM de vocês' },
            { kind: 'out', text: 'Claro! Em 20 minutos mostramos o CRM com os dados do seu negócio. Tenho hoje às 17h ou amanhã às 10h e 14h. Qual prefere?' },
            { kind: 'slots', options: ['Hoje 17h', 'Amanhã 10h', 'Amanhã 14h'] },
            { kind: 'in', text: 'Amanhã às 10h' },
            { kind: 'out', text: 'Confirmado, Marcos: reunião amanhã às 10h. O link do Google Meet chega por aqui.' },
        ],
        calendarLabel: 'Agenda · Comercial',
        newEvent: 'Demo do CRM · Marcos',
        otherEvents: ['Diagnóstico · Clínica', 'Proposta · Adega', 'Onboarding · Evento'],
        reminder: 'Marcos · amanhã às 9h (1h antes)',
        movedCard: ['Marcos', 'Demo do CRM · R$ 4.500'],
    },
];

/** Números do painel do CRM na demonstração (ilustrativos; a tela mostra o selo "Demonstração"). */
export const DEMO_KPIS = [
    { label: 'Tempo médio de resposta', value: 38, suffix: ' s' },
    { label: 'Agendamentos na semana', value: 27, suffix: '' },
    { label: 'Conversão', value: 31, suffix: '%' },
];

export interface SystemCase {
    niche: string;
    name: string;
    problem: string;
    delivery: string;
    image: string;
    link: string;
    /** Só aparece quando houver número real, autorizado pelo cliente. Ex.: { value: '+120', label: 'agendamentos por mês' } */
    result?: { value: string; label: string };
}

export const SYSTEM_CASES: SystemCase[] = [
    {
        niche: 'Barbearia',
        name: 'Barbearia do Alemão',
        problem: 'Agenda no caderno e cliente perguntando preço pelo WhatsApp o dia todo.',
        delivery: 'Landing page, agendamento sem atrito e painel do barbeiro com métricas e agenda.',
        image: '/projects/barbearia-do-alemao-mockup.jpeg',
        link: 'https://barbeariadoalemao.vercel.app/',
    },
    {
        niche: 'Delivery',
        name: 'Adega Teles Delivery',
        problem: 'Pedidos perdidos no WhatsApp e fiado controlado no papel.',
        delivery: 'Vitrine, pedidos em tempo real (Kanban), caixa por motoboy, estoque e controle de fiado.',
        image: '/projects/adega-teles-mockup.jpeg',
        link: 'https://adega-teles.vercel.app/',
    },
    {
        niche: 'Eventos esportivos',
        name: 'Circuito FTV Cubatão',
        problem: 'Inscrições e patrocínios controlados por planilha e WhatsApp.',
        delivery: 'Inscrição de duplas com Pix, camisa em que o patrocinador posiciona a própria logo e painel do organizador.',
        image: '/projects/ftv-cubatao-mockup.jpeg',
        link: 'https://circuito-ftv-cubatao.vercel.app/',
    },
];
