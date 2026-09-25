import HeroBento from '@/components/home/HeroBento';
import ProjectsGrid from '@/components/home/ProjectsGrid';
import { Solutions, Process, ContactCTA } from '@/components/home/Sections';

export default function Home() {
    return (
        <>
            <HeroBento />
            <ProjectsGrid />
            <Solutions />
            <Process />
            <ContactCTA />
        </>
    );
}
