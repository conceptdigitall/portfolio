export interface Project {
    id: number;
    title: string;
    category: string;
    description: string;
    image_url: string;
    demo_link: string;
    profile: 'autonomo' | 'empresa';
}
