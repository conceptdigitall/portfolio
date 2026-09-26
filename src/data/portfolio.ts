import { Project, ProjectCategory } from "@/types/project";

export const projects: Project[] = [
    {
        id: 13,
        title: "Adega Teles Delivery",
        name: "Adega Teles Delivery",
        niche: "Delivery",
        category: "clientes",
        client: true,
        summary: "Vitrine, pedidos em tempo real, caixa e fiado.",
        description: "Sistema de delivery e e-commerce em tempo real para adegas, com painel administrativo completo: Kanban de pedidos, estoque, fechamento de caixa por motoboy e controle de fiado.",
        image_url: "/projects/adega-teles-mockup.jpeg",
        demo_link: "https://adega-teles.vercel.app/",
        profile: "empresa"
    },
    {
        id: 14,
        title: "Barbearia do Alemão",
        name: "Barbearia do Alemão",
        niche: "Barbearia",
        category: "clientes",
        client: true,
        summary: "Landing page, agendamento e painel do barbeiro.",
        description: "Landing page com agendamento sem atrito, serviços e preços dinâmicos, localização e painel do barbeiro com métricas e agenda.",
        image_url: "/projects/barbearia-do-alemao-mockup.jpeg",
        demo_link: "https://barbeariadoalemao.vercel.app/",
        profile: "empresa"
    },
    {
        id: 3,
        title: "Engenharia de Autoridade para Escritórios de Advocacia",
        name: "Concept Advogado",
        niche: "Jurídico",
        category: "lp",
        summary: "Autoridade digital para escritórios de advocacia.",
        description: "Ativo digital de alto padrão para escritórios de advocacia. Estrutura focada em transformar acessos em clientes sob um design elegante e sóbrio.",
        image_url: "/projects/lawyer-mockup.jpg",
        demo_link: "https://concept-law.vercel.app/",
        profile: "autonomo"
    },
    {
        id: 2,
        title: "Posicionamento Digital para Clínicas Odontológicas",
        name: "Concept Dentista",
        niche: "Odontologia",
        category: "lp",
        summary: "Clínica com captação direta pelo WhatsApp.",
        description: "Ativo de alta conversão para profissionais de odontologia. Arquitetura focada em elevar o posicionamento digital do negócio e captar pacientes de alto ticket.",
        image_url: "/projects/dentist-mockup.jpg",
        demo_link: "https://concept-dentista.vercel.app/",
        profile: "autonomo"
    },
    {
        id: 8,
        title: "Página de Alta Conversão para Clínicas de Estética",
        name: "Concept Estética",
        niche: "Estética",
        category: "lp",
        summary: "Procedimentos premium para público A/B.",
        description: "Ativo de alta conversão voltado ao mercado de estética de luxo. Design planejado para elevar a autoridade do profissional e captar contatos de alto padrão.",
        image_url: "/projects/concept-estetica.jpg",
        demo_link: "https://concept-estetica.vercel.app/",
        profile: "autonomo"
    },
    {
        id: 9,
        title: "Página de Vendas para Mercado Imobiliário de Luxo",
        name: "Concept Imobiliária",
        niche: "Imobiliário",
        category: "lp",
        summary: "Curadoria de imóveis de luxo e visitas agendadas.",
        description: "Design sofisticado com alto índice de respiro para apresentar imóveis de alto padrão, conectando corretores e incorporadoras a clientes qualificados.",
        image_url: "/projects/concept-imobiliaria.jpg",
        demo_link: "https://concept-imobiliaria-luxo.vercel.app/",
        profile: "autonomo"
    },
    {
        id: 10,
        title: "Apresentação e Captação B2B para Construtoras",
        name: "Concept Empreiteira",
        niche: "Construção civil",
        category: "lp",
        summary: "Obras concluídas e captação direta de orçamentos.",
        description: "Ativo digital focado no posicionamento de autoridade de construtoras e empreiteiras, com canal direto para captação de orçamentos.",
        image_url: "/projects/concept-empreiteira.jpg",
        demo_link: "https://concept-empreiteira.vercel.app/",
        profile: "empresa"
    },
    {
        id: 11,
        title: "Funil de Prospecção para Construção Civil",
        name: "Empreiteira Premium",
        niche: "Construção civil",
        category: "lp",
        summary: "Obras de alto padrão com estética dark.",
        description: "Variante estratégica focada em transformar acessos em clientes qualificados para obras de alto padrão.",
        image_url: "/projects/concept-empreiteira2.jpg",
        demo_link: "https://concept-empreiteira2.vercel.app/",
        profile: "empresa"
    },
    {
        id: 12,
        title: "E-commerce de Alto Padrão para Streetwear",
        name: "Concept Streetwear",
        niche: "Moda",
        category: "ecom",
        summary: "Loja imersiva com vídeo no hero e grid assimétrico.",
        description: "Loja virtual imersiva e de alta performance para marcas de streetwear premium.",
        image_url: "/projects/streetwear.png",
        demo_link: "https://concept-streetwear-ecommerce.vercel.app/",
        profile: "empresa"
    },
    {
        id: 5,
        title: "Ecossistema de Vendas E-commerce de Moda",
        name: "E-commerce de Moda",
        niche: "Vestuário",
        category: "ecom",
        summary: "Loja para marcas premium de vestuário.",
        description: "Solução de e-commerce projetada para marcas premium de vestuário, voltada a reduzir atritos e aumentar o valor do pedido médio.",
        image_url: "/projects/concept-ecommerce-cloth.jpg",
        demo_link: "https://concept-ecommerce-cloth.vercel.app/",
        profile: "empresa"
    },
    {
        id: 1,
        title: "E-commerce Premium para Produtos Infantis",
        name: "E-commerce Infantil",
        niche: "Infantil",
        category: "ecom",
        summary: "Jornada de compra impecável para marcas infantis.",
        description: "E-commerce de alto padrão para marcas infantis, com engenharia de conversão voltada a maximizar o LTV.",
        image_url: "/projects/concept-ecommerce-baby.jpg",
        demo_link: "https://concept-ecommerce.vercel.app/",
        profile: "empresa"
    },
    {
        id: 6,
        title: "Plataforma Multi-Tenant de Agendamento Automático",
        name: "Concept Booking",
        niche: "Serviços",
        category: "sys",
        summary: "Agendamento online sem conflito de horários.",
        description: "Sistema de agendamento e fluxo de trabalho integrado para clínicas e redes de atendimento.",
        image_url: "/projects/concept-booking.jpg",
        demo_link: "https://concept-booking.vercel.app/",
        profile: "empresa"
    },
    {
        id: 4,
        title: "Sistema Multi-Tenant de Gestão de Estoque",
        name: "Concept Stock",
        niche: "Gestão",
        category: "sys",
        summary: "Controle de estoque com experiência de fintech.",
        description: "Sistema sob medida com automação de fluxo operacional e otimização de estoque em tempo real.",
        image_url: "/projects/concept-stock-inventory.jpg",
        demo_link: "https://concept-stock.vercel.app/",
        profile: "empresa"
    },
    {
        id: 7,
        title: "Dashboard Financeiro e Operacional Estratégico",
        name: "Dashboard Financeiro",
        niche: "Finanças",
        category: "sys",
        summary: "KPIs, gráficos e metas em um só painel.",
        description: "Dashboard com visualização inteligente de dados operacionais para decisões rápidas.",
        image_url: "/projects/concept-finance.jpg",
        demo_link: "https://concept-finance.vercel.app/",
        profile: "empresa"
    },
    {
        id: 15,
        title: "Plataforma de Leilão de Veículos",
        name: "DriveBid Pro",
        niche: "Automotivo",
        category: "sys",
        summary: "Leilão com lances ao vivo e laudo do veículo.",
        description: "Protótipo comercial de leilão de veículos com lances em tempo real, anti-sniping e laudo cautelar.",
        image_url: null,
        demo_link: null,
        profile: "empresa"
    }
];

export const projectFilters: { id: 'all' | ProjectCategory; label: string }[] = [
    { id: 'all', label: 'Todos' },
    { id: 'lp', label: 'Landing pages' },
    { id: 'ecom', label: 'E-commerce' },
    { id: 'sys', label: 'Sistemas' },
    { id: 'clientes', label: 'Clientes' },
];

export const nicheCount = new Set(projects.map((p) => p.niche)).size;
