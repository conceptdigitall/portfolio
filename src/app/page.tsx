import HeroBento from '@/components/home/HeroBento';
import ProjectsGrid from '@/components/home/ProjectsGrid';
import Systems from '@/components/home/Systems';
import { Solutions, Process, ContactCTA } from '@/components/home/Sections';
import { Faq, Testimonials, Team } from '@/components/home/Trust';

export default function Home() {
    return (
        <>
            <HeroBento />
            <ProjectsGrid />
            <Systems />
            <Testimonials />
            <Solutions />
            <Process />
            <Team />
            <Faq />
            <ContactCTA />
        </>
    );
}
