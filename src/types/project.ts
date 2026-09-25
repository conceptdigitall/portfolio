export type ProjectCategory = 'lp' | 'ecom' | 'sys' | 'clientes';

export interface Project {
    id: number;
    title: string;
    /** Nome curto exibido no card */
    name: string;
    /** Nicho de mercado exibido no card (ex: "Odontologia") */
    niche: string;
    category: ProjectCategory;
    /** Descrição curta do card (1 linha) */
    summary: string;
    /** Descrição longa (SEO / uso futuro) */
    description: string;
    /** Imagem em /public; null mostra a capa gráfica padrão */
    image_url: string | null;
    /** Link da demo; null abre o WhatsApp pedindo uma apresentação */
    demo_link: string | null;
    /** Cliente real (destacado em azul) */
    client?: boolean;
    profile: 'autonomo' | 'empresa';
}
