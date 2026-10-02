import HeroBento from '@/components/home/HeroBento';
import ProjectsGrid from '@/components/home/ProjectsGrid';
import CrmSystems from '@/components/home/CrmSystems';
import { Solutions, Process, ContactCTA } from '@/components/home/Sections';
import { Faq, Testimonials, Team } from '@/components/home/Trust';

export default function Home() {
    return (
        <>
            <HeroBento />
            <ProjectsGrid />
            <CrmSystems />
            <Testimonials />
            <Solutions />
            <Process />
            <Team />
            <Faq />
            <ContactCTA />
        </>
    );
}
