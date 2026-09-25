"use client";

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useProjectFilter } from '@/hooks/useProjectFilter';
import ProjectModal from './projects/ProjectModal';
import FilterBar from './projects/FilterBar';
import ProjectCard from './projects/ProjectCard';
import { Project } from '@/types/project';
import { ChevronLeft, PenTool, Building2, TrendingUp, Stethoscope } from 'lucide-react';

const ProjectsSection = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [profile, setProfile] = useState<'autonomo' | 'empresa' | null>(null);

    const {
        selectedCategory,
        setSelectedCategory,
        categories,
        filteredProjects
    } = useProjectFilter();

    const finalProjects = profile 
        ? filteredProjects.filter(p => !p.profile || p.profile === profile)
        : [];

    return (
        <section 
            id="portfolio" 
            className="py-32 relative min-h-screen bg-concept-white text-concept-blue overflow-hidden flex flex-col items-center justify-center select-none"
        >
            {/* Fine Grid lines for visual guidance */}
            <div className="absolute top-0 left-[15%] w-[1px] h-full bg-concept-blue/[0.04] pointer-events-none" />
            <div className="absolute top-0 right-[15%] w-[1px] h-full bg-concept-blue/[0.04] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <AnimatePresence mode="wait">
                    {!profile ? (
                        <motion.div 
                            key="profile-selection"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="max-w-4xl mx-auto text-center"
                        >
                            <span className="text-concept-blue text-xs font-bold uppercase tracking-[0.25em] block mb-4">
                                Personalize sua Visualização
                            </span>
                            <h2 className="text-3xl md:text-5xl font-bold font-montserrat text-concept-blue leading-[1.15] mb-16 tracking-tight">
                                Qual a natureza da sua operação comercial?
                            </h2>

                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Autônomo Selector */}
                                <button 
                                    onClick={() => setProfile('autonomo')}
                                    className="group relative p-1 rounded-none border border-concept-blue/10 bg-concept-gray hover:border-concept-blue transition-all duration-300 text-left"
                                >
                                    <div className="p-8 flex flex-col justify-between min-h-[300px]">
                                        <div className="flex justify-between items-start">
                                            <div className="flex gap-2">
                                                <div className="p-3 border border-concept-blue/20 text-concept-blue bg-white">
                                                    <PenTool size={20} />
                                                </div>
                                                <div className="p-3 border border-concept-blue/20 text-concept-blue bg-white">
                                                    <Stethoscope size={20} />
                                                </div>
                                            </div>
                                            <span className="text-[10px] font-mono text-concept-blue/40 uppercase tracking-widest font-bold">
                                                Perfil Individual
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-concept-blue font-montserrat uppercase tracking-wider mb-3">
                                                Profissional Autônomo
                                            </h3>
                                            <p className="text-concept-blue/70 text-xs font-poppins leading-relaxed font-light">
                                                Seu nome é seu maior ativo. Estruturas premium focadas em elevar seu posicionamento digital e atrair clientes de alto padrão.
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap gap-2 pt-4 border-t border-concept-blue/10">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-concept-blue/60">Médicos</span>
                                            <span className="text-concept-blue/20">•</span>
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-concept-blue/60">Advogados</span>
                                            <span className="text-concept-blue/20">•</span>
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-concept-blue/60">Consultores</span>
                                        </div>
                                    </div>
                                </button>

                                {/* Empresa Selector */}
                                <button 
                                    onClick={() => setProfile('empresa')}
                                    className="group relative p-1 rounded-none border border-concept-blue/10 bg-concept-gray hover:border-concept-blue transition-all duration-300 text-left"
                                >
                                    <div className="p-8 flex flex-col justify-between min-h-[300px]">
                                        <div className="flex justify-between items-start">
                                            <div className="flex gap-2">
                                                <div className="p-3 border border-concept-blue/20 text-concept-blue bg-white">
                                                    <Building2 size={20} />
                                                </div>
                                                <div className="p-3 border border-concept-blue/20 text-concept-blue bg-white">
                                                    <TrendingUp size={20} />
                                                </div>
                                            </div>
                                            <span className="text-[10px] font-mono text-concept-blue/40 uppercase tracking-widest font-bold">
                                                Perfil Corporativo
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-concept-blue font-montserrat uppercase tracking-wider mb-3">
                                                Dono de Negócio
                                            </h3>
                                            <p className="text-concept-blue/70 text-xs font-poppins leading-relaxed font-light">
                                                Escalabilidade e automação operacional. Desenvolvimento de ecossistemas corporativos que apresentam sua operação com autoridade e tração de vendas.
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap gap-2 pt-4 border-t border-concept-blue/10">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-concept-blue/60">E-commerce</span>
                                            <span className="text-concept-blue/20">•</span>
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-concept-blue/60">Construtoras</span>
                                            <span className="text-concept-blue/20">•</span>
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-concept-blue/60">Sistemas WaaS</span>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="projects-view"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="w-full"
                        >
                            {/* Navigation & Back Action */}
                            <div className="mb-16 flex items-center justify-between border-b border-concept-blue/10 pb-6">
                                <button 
                                    onClick={() => setProfile(null)}
                                    className="flex items-center gap-2 text-concept-blue/60 hover:text-concept-blue transition-colors group cursor-pointer"
                                >
                                    <div className="p-2 border border-concept-blue/10 rounded-none group-hover:bg-concept-blue/5 transition-all">
                                        <ChevronLeft size={14} />
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-widest">Mudar de Perfil</span>
                                </button>
                                <span className="text-concept-blue text-xs font-bold uppercase tracking-widest px-4 py-1.5 border border-concept-blue bg-concept-blue/5">
                                    {profile === 'autonomo' ? 'Profissional Autônomo' : 'Corporações & Sistemas'}
                                </span>
                            </div>

                            {/* Section Header */}
                            <div className="mb-16">
                                <h2 className="text-2xl md:text-4xl font-bold font-montserrat text-concept-blue uppercase tracking-wide">
                                    {profile === 'autonomo' 
                                        ? 'Ativos de Alta Conversão' 
                                        : 'Engenharia e Ecossistemas de Vendas'}
                                </h2>
                                <p className="text-concept-blue/70 text-sm mt-3 font-poppins font-light max-w-2xl">
                                    {profile === 'autonomo' 
                                        ? 'Projetos desenhados especificamente para valorizar serviços de alto padrão e consolidar a autoridade digital de seu nome no mercado.' 
                                        : 'Sistemas robustos de e-commerce e WaaS projetados para suportar múltiplos fluxos, automatizar processos e ampliar a margem operacional.'}
                                </p>
                            </div>

                            {/* Filter Bar */}
                            <FilterBar
                                categories={categories}
                                selectedCategory={selectedCategory}
                                onSelectCategory={setSelectedCategory}
                            />

                            {/* Projects Grid with Sharp Edge Design */}
                            <motion.div
                                layout
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
                            >
                                <AnimatePresence mode="popLayout">
                                    {finalProjects.map((project: Project) => (
                                        <ProjectCard
                                            key={project.id}
                                            project={project}
                                            onClick={() => setSelectedProject(project)}
                                        />
                                    ))}
                                </AnimatePresence>
                                {finalProjects.length === 0 && (
                                    <motion.div 
                                        initial={{ opacity: 0 }} 
                                        animate={{ opacity: 1 }} 
                                        className="col-span-full py-24 text-center text-concept-blue/40 font-poppins text-sm"
                                    >
                                        Nenhum ativo digital disponível nesta categoria para este perfil.
                                    </motion.div>
                                )}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Modal Overlays */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default ProjectsSection;
