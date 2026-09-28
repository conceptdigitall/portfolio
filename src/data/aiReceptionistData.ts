export type ToneType = 'sofisticado' | 'descontraido' | 'consultivo';

export interface ToneConfig {
  id: ToneType;
  label: string;
  badge: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  sender: 'client' | 'ai';
  text: string;
  time: string;
}

export interface QuickPrompt {
  id: string;
  question: string;
  answers: Record<ToneType, string>;
  intent: string;
  crmAction: string;
}

export interface NicheData {
  id: string;
  name: string;
  category: string;
  icon: string;
  businessName: string;
  avatar: string;
  defaultPrompt: string;
  leadProfile: string;
  initialConversation: Record<ToneType, ChatMessage[]>;
  prompts: QuickPrompt[];
}

export const TONES: ToneConfig[] = [
  {
    id: 'sofisticado',
    label: 'Sofisticado & Polido',
    badge: 'Alto Padrão',
    description: 'Comunicação elegante, vocabulário refinado e postura discreta. Ideal para clínicas médicas, estética, advocacia e negócios premium.',
  },
  {
    id: 'descontraido',
    label: 'Descontraído & Ágil',
    badge: 'Moderno & Direto',
    description: 'Tom leve, amigável, com uso pontual de emojis e respostas dinâmicas. Perfeito para barbearias, delivery, estúdios e público jovem.',
  },
  {
    id: 'consultivo',
    label: 'Consultivo & Vendedor',
    badge: 'Foco em Conversão',
    description: 'Condução estratégica: qualifica a dor, contorna dúvidas e conduz diretamente para agendamento ou visita.',
  },
];

export const NICHES: NicheData[] = [
  {
    id: 'clinica',
    name: 'Clínicas & Odontologia',
    category: 'Saúde & Estética',
    icon: '🩺',
    businessName: 'Dra. Camila Santos | Estética Avançada',
    avatar: '/recepcionista/clinica.jpg',
    defaultPrompt: 'Gostaria de saber como funciona a harmonização e se tem horário.',
    leadProfile: 'Paciente interessada em harmonização facial, busca segurança clínica.',
    initialConversation: {
      sofisticado: [
        {
          id: '1',
          sender: 'client',
          text: 'Boa noite! Gostaria de entender como funciona a avaliação para harmonização facial.',
          time: '21:14',
        },
        {
          id: '2',
          sender: 'ai',
          text: 'Olá! Seja muito bem-vinda à clínica da Dra. Camila Santos. É um privilégio atendê-la.\n\nNossa consulta inicial é personalizada: realizamos um mapeamento facial completo para harmonizar seus traços com naturalidade e elegância.\n\nTemos horários exclusivos nesta quinta-feira às 14h30 ou na sexta às 10h00. Qual período seria mais conveniente para sua agenda?',
          time: '21:14',
        },
      ],
      descontraido: [
        {
          id: '1',
          sender: 'client',
          text: 'Opa, boa noite! Queria saber sobre harmonização facial, tem vaga essa semana?',
          time: '21:14',
        },
        {
          id: '2',
          sender: 'ai',
          text: 'Oii! Tudo bem por aqui? ✨ Que ótimo que você chamou!\n\nA Dra. Camila faz uma avaliação super detalhada pra deixar tudo super natural do jeito que você quer!\n\nConsegui duas vagas perfeitas pra você: quinta às 14h30 ou sexta às 10h. Qual fica melhor pra ti?',
          time: '21:14',
        },
      ],
      consultivo: [
        {
          id: '1',
          sender: 'client',
          text: 'Boa noite! Queria saber o valor da harmonização facial.',
          time: '21:14',
        },
        {
          id: '2',
          sender: 'ai',
          text: 'Olá! Que excelente iniciativa cuidar da sua autoestima.\n\nComo cada rosto possui uma estrutura óssea única, o protocolo exato é definido na consulta de mapeamento 3D para garantir o resultado que você procura sem desperdício de produto.\n\nPara que eu possa direcionar seu atendimento: você já realizou algum procedimento estético anteriormente ou seria sua primeira vez?',
          time: '21:14',
        },
      ],
    },
    prompts: [
      {
        id: 'p1',
        question: 'Qual o valor da consulta de avaliação?',
        intent: 'Consulta de Preço & Objeção',
        crmAction: 'Enviou proposta de valor + link de pré-agendamento',
        answers: {
          sofisticado:
            'A consulta diagnóstica com a Dra. Camila tem o valor de R$ 250, valor este que é integralmente revertido como crédito no procedimento escolhido. Gostaria de reservar para quinta às 14h30?',
          descontraido:
            'A consulta de avaliação é R$ 250, mas tem um super benefício: se você fechar o procedimento, esse valor é 100% abatido! Vamos garantir seu horário?',
          consultivo:
            'A avaliação completa custa R$ 250 e inclui o planejamento facial com simulação. Ao iniciar seu tratamento, esse valor é totalmente abatido do procedimento. Prefere o período da manhã ou da tarde?',
        },
      },
      {
        id: 'p2',
        question: 'Vocês atendem por convênio médico?',
        intent: 'Qualificação de Pagamento',
        crmAction: 'Explicou modelo particular + emissão de recibo para reembolso',
        answers: {
          sofisticado:
            'Nosso atendimento é estritamente particular para assegurar o tempo e a exclusividade que você merece. Fornecemos recibo detalhado com CRM para que você solicite o reembolso integral ou parcial junto à sua operadora.',
          descontraido:
            'Nós atendemos no modelo particular pra poder dedicar todo o tempo que seu caso precisa! Mas emitimos recibo completo pra você pedir reembolso no seu plano com facilidade. Quer ver como funciona?',
          consultivo:
            'Para garantir produtos de primeira linha e atenção individualizada sem a correria de convênios, nossos atendimentos são particulares. Emitimos nota e laudo para seu pedido de reembolso. Qual é o seu convênio?',
        },
      },
      {
        id: 'p3',
        question: 'Pode confirmar a quinta-feira às 14h30 para mim?',
        intent: 'Fechamento de Agendamento',
        crmAction: 'Bloqueou horário no Google Agenda + Criou Lead no CRM',
        answers: {
          sofisticado:
            'Perfeito! O horário de quinta-feira, às 14h30, está pré-reservado com exclusividade para você. Por gentileza, informe seu nome completo e CPF para formalizarmos a ficha de atendimento.',
          descontraido:
            'Maravilha! Quinta às 14h30 já tá travado na agenda pra você! 🎉 Só me manda seu nome completo pra eu finalizar o cadastro rapidinho.',
          consultivo:
            'Excelente escolha! Quinta-feira às 14h30 reservado com a Dra. Camila. Vou enviar a confirmação por aqui com as orientações prévias. Qual é o seu nome completo?',
        },
      },
    ],
  },
  {
    id: 'imobiliaria',
    name: 'Imobiliárias & Corretores',
    category: 'Mercado Imobiliário',
    icon: '🏢',
    businessName: 'Concept Imóveis | Vendas & Locação',
    avatar: '/recepcionista/imobiliaria.jpg',
    defaultPrompt: 'Vi o apartamento no anúncio e queria saber o valor do condomínio.',
    leadProfile: 'Comprador qualificado buscando apartamento de 3 dormitórios.',
    initialConversation: {
      sofisticado: [
        {
          id: '1',
          sender: 'client',
          text: 'Boa noite. Gostaria de mais detalhes sobre o apartamento anunciado no Jardim Casqueiro.',
          time: '22:05',
        },
        {
          id: '2',
          sender: 'ai',
          text: 'Boa noite! Agradecemos o seu contato com a Concept Imóveis.\n\nO imóvel citado possui 118m², 3 suítes, varanda gourmet integrada e 2 vagas de garagem demarcadas. O condomínio dispõe de lazer completo.\n\nO senhor teria interesse em receber o dossiê em PDF ou prefere agendar uma visita guiada neste fim de semana?',
          time: '22:05',
        },
      ],
      descontraido: [
        {
          id: '1',
          sender: 'client',
          text: 'Opa, boa noite! Quanto tá saindo aquele apê no Casqueiro com varanda?',
          time: '22:05',
        },
        {
          id: '2',
          sender: 'ai',
          text: 'Fala! Tudo bem? Esse apê é sensacional! 🚀\n\nSão 118m², 3 suítes lindas e aquela varanda gourmet perfeita pro churrasco do fim de semana. Está saindo por R$ 780 mil (condomínio R$ 650).\n\nQuer que eu te mande o vídeo completo do tour virtual por aqui?',
          time: '22:05',
        },
      ],
      consultivo: [
        {
          id: '1',
          sender: 'client',
          text: 'Olá, ainda está disponível o imóvel do anúncio?',
          time: '22:05',
        },
        {
          id: '2',
          sender: 'ai',
          text: 'Olá! Sim, o imóvel está disponível para negociação nesta semana.\n\nPara que eu possa filtrar as melhores condições e verificar se ele atende perfeitamente sua família: você busca para moradia imediata ou investimento? E possui imóvel para dar como parte de pagamento?',
          time: '22:05',
        },
      ],
    },
    prompts: [
      {
        id: 'p1',
        question: 'Aceita financiamento ou permuta por outro imóvel?',
        intent: 'Qualificação Financeira',
        crmAction: 'Marcou lead como Comprador com Permuta no CRM',
        answers: {
          sofisticado:
            'O imóvel está com toda a documentação rigorosamente regularizada, apto para qualquer modalidade de financiamento bancário. Quanto à permuta, os proprietários analisam veículos ou imóveis de menor valor na região. O senhor possui algum bem específico em mente?',
          descontraido:
            'Aceita financiamento sim, documentação 100% redondinha! E sobre permuta, eles avaliam carro ou imóvel menor. Me conta o que você tem em mente pra eu checar com o proprietário!',
          consultivo:
            'Sim, aprovamos financiamento em qualquer banco com taxas a partir de 9,8% a.a. Para a permuta, os proprietários aceitam avaliar imóvel de até 40% do valor. Qual seria a localização e valor estimado do seu imóvel atual?',
        },
      },
      {
        id: 'p2',
        question: 'Podemos agendar uma visita no sábado às 10h?',
        intent: 'Agendamento de Visita',
        crmAction: 'Notificou corretor responsável via WhatsApp + Alerta no CRM',
        answers: {
          sofisticado:
            'Certamente. O horário de sábado às 10h está disponível em nossa agenda. Já acionei o corretor especialista deste condomínio para recepcioná-lo. Qual o seu nome completo para a autorização na portaria?',
          descontraido:
            'Fechado! Sábado às 10h marcado. O corretor vai estar lá te esperando com as chaves na mão. Me passa seu nome e RG rapidinho só pra liberar na portaria?',
          consultivo:
            'Excelente! Sábado às 10h é perfeito para avaliar a iluminação natural do apartamento. Já reservei este horário com o nosso especialista. Quem mais irá acompanhá-lo na visita?',
        },
      },
    ],
  },
  {
    id: 'barbearia',
    name: 'Barbearias & Salões',
    category: 'Beleza & Bem-Estar',
    icon: '✂️',
    businessName: 'Barbearia do Alemão 777',
    avatar: '/recepcionista/barbearia.jpg',
    defaultPrompt: 'Tem horário pra cortar o cabelo e fazer a barba hoje ainda?',
    leadProfile: 'Cliente buscando corte degradê e barba com agilidade.',
    initialConversation: {
      sofisticado: [
        {
          id: '1',
          sender: 'client',
          text: 'Boa noite. Vocês teriam disponibilidade para atendimento ainda hoje?',
          time: '18:40',
        },
        {
          id: '2',
          sender: 'ai',
          text: 'Boa noite! Seja bem-vindo à Barbearia do Alemão 777.\n\nPara esta noite, dispomos de uma última vaga às 19h30 para os serviços de corte e barboterapia relaxante com toalha quente.\n\nDeseja que reservemos este horário em seu nome?',
          time: '18:40',
        },
      ],
      descontraido: [
        {
          id: '1',
          sender: 'client',
          text: 'E aí irmão! Tem horário pra dar um talento na navalha ainda hoje?',
          time: '18:40',
        },
        {
          id: '2',
          sender: 'ai',
          text: 'Opa, fala meu amigo! Tranquilidade? 💈\n\nTenho exatamente uma vaga aberta hoje às 19h30 com o Alemão! Dá pra fazer aquele degradê alinhado e navalhado.\n\nBora travar esse horário pro seu nome?',
          time: '18:40',
        },
      ],
      consultivo: [
        {
          id: '1',
          sender: 'client',
          text: 'Boa noite, qual o valor dos serviços?',
          time: '18:40',
        },
        {
          id: '2',
          sender: 'ai',
          text: 'Olá! Trabalhamos com padrão de atendimento pontual e produtos premium.\n\nCorte degradê: R$ 40 | Barboterapia com toalha quente: R$ 35 | Combo completo (Corte + Barba + Sobrancelha): R$ 90.\n\nQual desses serviços você prefere realizar hoje para eu checar o melhor horário disponível?',
          time: '18:40',
        },
      ],
    },
    prompts: [
      {
        id: 'p1',
        question: 'Onde fica a barbearia e tem estacionamento?',
        intent: 'Localização & Acesso',
        crmAction: 'Enviou rota do Google Maps + Informações de comodidade',
        answers: {
          sofisticado:
            'Estamos localizados na Rua Espanha, 360 - Jardim Casqueiro, Cubatão. Dispomos de fácil estacionamento na frente e ambiente climatizado com café cortesia.',
          descontraido:
            'Fica na Rua Espanha, 360 no Casqueiro! Bem tranquilo de parar o carro na porta e o café expresso já tá quentinho te esperando ☕',
          consultivo:
            'Fica na Rua Espanha, 360 - Jardim Casqueiro. Fácil acesso, vagas na porta e sem espera. Prefere que eu envie o link do GPS para você?',
        },
      },
      {
        id: 'p2',
        question: 'Pode confirmar para as 19h30?',
        intent: 'Confirmação de Agendamento',
        crmAction: 'Inserido na grade do sistema + Lembrete de WhatsApp programado',
        answers: {
          sofisticado:
            'Horário das 19h30 confirmado com sucesso. Enviaremos um lembrete automático 2h antes. Aguardamos sua visita!',
          descontraido:
            'Fechado e confirmado pras 19h30! 🔥 Te esperamos aqui no Casqueiro!',
          consultivo:
            'Confirmadíssimo às 19h30! Seu horário está 100% garantido. Até breve!',
        },
      },
    ],
  },
  {
    id: 'delivery',
    name: 'Restaurantes & Delivery',
    category: 'Gastronomia & Varejo',
    icon: '🍕',
    businessName: 'Teles Adega & Delivery Express',
    avatar: '/recepcionista/delivery.jpg',
    defaultPrompt: 'Boa noite! Tem cerveja gelada e combo de gin? Quanto tempo demora pra entregar?',
    leadProfile: 'Consumidor buscando bebidas geladas para entrega imediata.',
    initialConversation: {
      sofisticado: [
        {
          id: '1',
          sender: 'client',
          text: 'Boa noite. Gostaria de verificar as opções de destilados e o tempo de entrega para o Casqueiro.',
          time: '23:18',
        },
        {
          id: '2',
          sender: 'ai',
          text: 'Boa noite! Seja bem-vindo à Teles Adega Delivery.\n\nDispomos de combos selecionados de Gin Tanqueray, Whisky Red Label e Vodka Absolut, além de cervejas trincando de geladas.\n\nO tempo de entrega estimado para o Jardim Casqueiro neste momento é de 30 a 45 minutos. Deseja receber nosso cardápio completo?',
          time: '23:18',
        },
      ],
      descontraido: [
        {
          id: '1',
          sender: 'client',
          text: 'Fala parceiro! Ainda tão entregando? Queria um combo de gin e um fardo de Heineken trincando!',
          time: '23:18',
        },
        {
          id: '2',
          sender: 'ai',
          text: 'Opa! Tamo a milhão entregando gelada até as 03h! ❄️🍻\n\nO Tanqueray com 6 energéticos tá saindo por R$ 139 e a Heineken tá daquele jeito, no ponto!\n\nMe manda sua localização pra eu já mandar pro motoboy!',
          time: '23:18',
        },
      ],
      consultivo: [
        {
          id: '1',
          sender: 'client',
          text: 'Vocês têm combo para festa com 10 pessoas?',
          time: '23:18',
        },
        {
          id: '2',
          sender: 'ai',
          text: 'Olá! Temos pacotes sob medida para grupos que garantem economia de até 20%.\n\nPara 10 pessoas, nosso combo mais pedido inclui 2 destilados premium, 10 energéticos, 2 sacos de gelo e 2 caixas de cerveja gelada.\n\nQual é a preferência do grupo: Gin, Whisky ou Vodka?',
          time: '23:18',
        },
      ],
    },
    prompts: [
      {
        id: 'p1',
        question: 'Quais formas de pagamento vocês aceitam?',
        intent: 'Forma de Pagamento',
        crmAction: 'Gerou QR Code Pix Dinâmico no Checkout',
        answers: {
          sofisticado:
            'Aceitamos Pix com aprovação imediata pelo site, cartões de débito/crédito na entrega ou dinheiro com opção de troco.',
          descontraido:
            'Aceitamos Pix no ato, maquininha de cartão no motoboy ou dinheiro com troco se precisar! Bem fácil!',
          consultivo:
            'Você pode pagar no Pix com confirmação em 3 segundos ou direto na maquininha com o entregador. Qual prefere?',
        },
      },
      {
        id: 'p2',
        question: 'Qual o valor da taxa de entrega para o meu bairro?',
        intent: 'Cálculo de Frete',
        crmAction: 'Calculou taxa por geolocalização no mapa de entrega',
        answers: {
          sofisticado:
            'A taxa padrão para Cubatão é de apenas R$ 5, com entrega garantida entre 30 e 50 minutos com código de segurança.',
          descontraido:
            'Taxinha fixa de R$ 5 em Cubatão e o motoca chega rapidinho com a bebida no gelo! 🛵💨',
          consultivo:
            'Apenas R$ 5 de taxa de entrega para seu bairro. Em compras acima de R$ 150 a entrega é cortesia! Deseja incluir mais algum item?',
        },
      },
    ],
  },
  {
    id: 'oficina',
    name: 'Oficinas & Auto Centers',
    category: 'Automotivo & Manutenção',
    icon: '🔧',
    businessName: 'Concept Auto Center & Diagnóstico',
    avatar: '/recepcionista/oficina.jpg',
    defaultPrompt: 'Meu carro tá fazendo um barulho na suspensão, quanto fica pra ver?',
    leadProfile: 'Proprietário de veículo buscando orçamento de suspensão e freios.',
    initialConversation: {
      sofisticado: [
        {
          id: '1',
          sender: 'client',
          text: 'Boa noite. Notei um ruído metálico na suspensão dianteira ao passar em desníveis. Vocês realizam o diagnóstico?',
          time: '19:10',
        },
        {
          id: '2',
          sender: 'ai',
          text: 'Boa noite! Sim, realizamos o diagnóstico computadorizado completo de suspensão e sistema de freios com equipamento de precisão.\n\nPara sua comodidade e segurança, colocamos o veículo no elevador e emitimos o laudo técnico detalhado antes de qualquer intervenção.\n\nDispomos de vaga em nosso box amanhã às 08h30 ou às 14h00. Qual seria o modelo e ano do seu automóvel?',
          time: '19:10',
        },
      ],
      descontraido: [
        {
          id: '1',
          sender: 'client',
          text: 'Opa, beleza? Meu carro tá batendo seco na frente quando pego buraco, dá pra olhar amanhã?',
          time: '19:10',
        },
        {
          id: '2',
          sender: 'ai',
          text: 'Fala chefe! Tranquilo? Pode ser bucha, bieleta ou amortecedor cansado 🚗🔧\n\nA gente coloca no elevador e faz o pente fino pra você sem enrolação!\n\nTenho vaga no box amanhã às 08h30 cedinho. Consegue passar aqui?',
          time: '19:10',
        },
      ],
      consultivo: [
        {
          id: '1',
          sender: 'client',
          text: 'Quanto custa pra trocar os amortecedores do Honda Civic?',
          time: '19:10',
        },
        {
          id: '2',
          sender: 'ai',
          text: 'Olá! Trabalhamos com amortecedores originais (Monroe / Cofap) com 2 anos de garantia de fábrica.\n\nPara passarmos a cotação exata das peças e mão de obra sem surpresas: qual é o ano/modelo do seu Civic? E você sentiu o carro instável em curvas ou vazamento de óleo?',
          time: '19:10',
        },
      ],
    },
    prompts: [
      {
        id: 'p1',
        question: 'Vocês cobram pelo orçamento?',
        intent: 'Preço de Orçamento & Confiança',
        crmAction: 'Agendou checklist de entrada gratuito',
        answers: {
          sofisticado:
            'A inspeção visual inicial e o checklist de 25 itens de segurança são uma cortesia do Concept Auto Center. Só realizamos qualquer serviço após a sua aprovação formal do orçamento.',
          descontraido:
            'Orçamento é 100% na faixa! A gente desmonta, olha direitinho e só faz o serviço se você aprovar os valores antes.',
          consultivo:
            'Nosso checklist de segurança com 25 itens é gratuito. Você recebe o relatório com fotos das peças desgastadas direto no seu WhatsApp antes de decidir.',
        },
      },
      {
        id: 'p2',
        question: 'Pode reservar a vaga das 08h30 de amanhã?',
        intent: 'Reserva de Box Automotivo',
        crmAction: 'Cadastrou veículo na fila de entrada do dia seguinte',
        answers: {
          sofisticado:
            'Vaga reservada com sucesso para amanhã às 08h30. Por favor, envie a placa do veículo para agilizarmos a abertura da ordem de serviço.',
          descontraido:
            'Show de bola! 08h30 teu box tá liberado aqui. Só me passa a placa do possante pra deixar tudo no esquema!',
          consultivo:
            'Reservado para amanhã às 08h30! Já separei um técnico especialista para receber seu carro. Qual a placa e o modelo?',
        },
      },
    ],
  },
];
