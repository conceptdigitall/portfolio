import HeroSaas from '@/components/home/HeroSaas';
import SaasPillars from '@/components/home/SaasPillars';
import ProjectsGrid from '@/components/home/ProjectsGrid';
import Film from '@/components/home/Film';
import Systems from '@/components/home/Systems';
import { Solutions, Process, ContactCTA } from '@/components/home/Sections';
import { Faq, Testimonials, Team } from '@/components/home/Trust';

export default function Home() {
    return (
        <>
            <HeroSaas />
            <SaasPillars />
            <Film />
            <Systems />
            <ProjectsGrid />
            <Testimonials />
            <Solutions />
            <Process />
            <Team />
            <Faq />
            <ContactCTA />
        </>
    );
}
