"use client";

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { projects, projectFilters } from '@/data/projects';
import { Project, ProjectCategory } from '@/types/project';
import { whatsappLink } from '@/lib/whatsapp';
import Wolf from './Wolf';

const trackProjectClick = (project: Project) => {
    import('@/lib/supabase').then(({ trackEvent }) => {
        trackEvent('project_clicks', { project_id: project.id, project_title: project.name });
    });
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
    const c = !!project.client;
    const href = project.demo_link ?? whatsappLink(`Olá! Vi o projeto "${project.name}" no portfólio da Concept Digital e gostaria de uma apresentação.`);
    const action = project.demo_link ? 'Ver demonstração' : 'Pedir apresentação';

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackProjectClick(project)}
            aria-label={`${project.name}: ${action} (abre em nova aba)`}
            className={`group flex flex-col rounded-3xl overflow-hidden border transition-colors ${c
                ? 'bg-concept-blue text-white border-concept-blue hover:bg-concept-darkblue'
                : 'bg-white text-concept-ink border-concept-line hover:border-concept-blue'
                }`}
        >
            <div className={`relative h-44 mx-2.5 mt-2.5 rounded-2xl overflow-hidden ${c ? 'bg-white/10' : 'bg-concept-soft'}`}>
                {project.image_url ? (
                    <Image
                        src={project.image_url}
                        alt={`Tela do projeto ${project.name}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Wolf tone={c ? 'light' : 'ink'} animated={false} className="w-32 h-24 opacity-80" />
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-1.5 px-[18px] pt-4 pb-[18px] flex-1">
                <div className="flex justify-between items-center">
                    <span className={`text-xs font-semibold tracking-[0.08em] uppercase ${c ? 'text-concept-yellow' : 'text-concept-blue'}`}>
                        {project.niche}
                    </span>
                    <span className="text-[13px] font-semibold opacity-60">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <span className="font-poppins text-[19px] font-semibold leading-tight">{project.name}</span>
                <span className={`text-sm leading-normal ${c ? 'text-white/85' : 'text-concept-muted'}`}>{project.summary}</span>
                <span className={`mt-auto pt-3 text-sm font-semibold underline-offset-4 group-hover:underline ${c ? 'text-white' : 'text-concept-blue'}`}>
                    {action}
                </span>
            </div>
        </a>
    );
};

const ProjectsGrid = () => {
    const [active, setActive] = useState<'all' | ProjectCategory>('all');

    const list = useMemo(
        () => (active === 'all' ? projects : projects.filter((p) => p.category === active)),
        [active]
    );

    return (
        <section id="projetos" className="scroll-mt-6 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-20 pt-24 lg:pt-36 flex flex-col gap-10 lg:gap-12">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-8">
                <div className="flex flex-col gap-3.5">
                    <span className="text-sm font-semibold tracking-[0.14em] uppercase text-concept-blue">Projetos</span>
                    <h2 className="font-poppins text-[34px] sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-[-0.02em] max-w-[720px]">
                        Ativos digitais que já construímos.
                    </h2>
                </div>
                <div role="group" aria-label="Filtrar projetos" className="flex gap-2.5 overflow-x-auto -mr-4 pr-4 pb-1 lg:mr-0 lg:pr-0">
                    {projectFilters.map((f) => {
                        const on = f.id === active;
                        const count = f.id === 'all' ? projects.length : projects.filter((p) => p.category === f.id).length;
                        return (
                            <button
                                key={f.id}
                                type="button"
                                onClick={() => setActive(f.id)}
                                aria-pressed={on}
                                className={`flex-shrink-0 min-h-[46px] px-[18px] rounded-full flex items-center gap-2 text-[15px] font-medium border-[1.5px] transition-colors ${on
                                    ? 'bg-concept-blue text-white border-concept-blue'
                                    : 'bg-white text-concept-ink border-[#D5D9E6] hover:border-concept-blue'
                                    }`}
                            >
                                {f.label}
                                <span className={`text-xs font-semibold px-[7px] py-0.5 rounded-full ${on ? 'bg-concept-yellow text-concept-ink' : 'bg-concept-soft text-concept-muted'}`}>
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {list.map((p, i) => (
                    <ProjectCard key={p.id} project={p} index={i} />
                ))}
            </div>
        </section>
    );
};

export default ProjectsGrid;
