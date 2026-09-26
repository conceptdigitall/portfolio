/**
 * Prova social do portfólio. As seções só aparecem quando houver conteúdo REAL aqui.
 * Nunca invente depoimentos: use só avaliações que o cliente escreveu e autorizou
 * (ex.: copiadas do Google Meu Negócio ou enviadas por WhatsApp).
 */

export type Testimonial = {
    name: string;       // nome como o cliente autorizou (ex.: "Kawe, Barbearia do Alemão")
    role?: string;      // cargo ou negócio
    text: string;       // texto exato da avaliação
    rating?: 1 | 2 | 3 | 4 | 5;
    source?: string;    // ex.: "Google", "WhatsApp"
};

export const testimonials: Testimonial[] = [
    // { name: 'Nome do cliente', role: 'Negócio', text: 'Texto real da avaliação.', rating: 5, source: 'Google' },
];

export type TeamMember = {
    name: string;
    role: string;
    bio: string;
    /** Foto real em /public/team/ (ex.: '/team/joao.jpg'), 800×1000 px ou maior. */
    photo: string;
};

export const team: TeamMember[] = [
    // { name: 'João Petraglia', role: 'Fundador · design e desenvolvimento', bio: '...', photo: '/team/joao.jpg' },
];
