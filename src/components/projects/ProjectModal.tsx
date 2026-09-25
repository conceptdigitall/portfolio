"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Project } from '@/types/project';
import { openWhatsAppProject } from '../../features/portfolio/utils/whatsapp';

interface ProjectModalProps {
    project: Project;
    onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
    // Lock scroll when modal is open
    useEffect(() => {
        if (project) {
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = 'unset';
            };
        }
    }, [project]);

    if (!project) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`modal-title-${project.id}`}
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-concept-blue/90"
                aria-hidden="true"
            />

            <motion.div
                layoutId={`project-card-${project.id}`}
                className="relative w-full max-w-5xl bg-concept-blue border border-white/10 rounded-none overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:h-[600px]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 bg-concept-blue/80 hover:bg-concept-yellow hover:text-concept-blue text-white rounded-none transition-colors border border-white/10"
                    aria-label="Fechar modal"
                    title="Fechar modal"
                >
                    <X className="w-5 h-5" aria-hidden="true" />
                </button>

                {/* Left Side - Image */}
                <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden bg-concept-blue">
                    <div className="absolute inset-0 bg-gradient-to-r from-concept-blue via-transparent to-transparent z-10 md:bg-gradient-to-t pointer-events-none" />
                    <motion.div
                        className="relative w-full h-full"
                        layoutId={`project-image-${project.id}`}
                    >
                        <Image
                            src={project.image_url}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                            priority
                        />
                    </motion.div>
                </div>

                {/* Right Side - Content */}
                <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto custom-scrollbar flex flex-col bg-concept-blue text-white">
                    <div className="mb-6">
                        <span className="px-3 py-1 bg-white/5 border border-white/15 rounded-none text-[10px] font-bold text-concept-yellow uppercase tracking-widest">
                            {project.category}
                        </span>
                    </div>

                    <motion.h2
                        layoutId={`project-title-${project.id}`}
                        id={`modal-title-${project.id}`}
                        className="text-2xl md:text-3xl font-bold text-white mb-4 font-montserrat uppercase tracking-wider"
                    >
                        {project.title}
                    </motion.h2>

                    <motion.p
                        layoutId={`project-desc-${project.id}`}
                        className="text-white/80 mb-8 leading-relaxed font-poppins font-light text-xs md:text-sm"
                    >
                        {project.description}
                    </motion.p>

                    <div className="mt-auto space-y-4 pt-6 border-t border-white/10">
                        <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Especificação de Ações</h3>
                        <div className="flex flex-col gap-3">
                            <a
                                href={project.demo_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-4 bg-concept-yellow text-concept-blue rounded-none font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:bg-concept-white"
                            >
                                <ExternalLink className="w-4 h-4" />
                                Acessar Ativo Online
                            </a>

                            <button
                                onClick={() => openWhatsAppProject(project.title)}
                                className="w-full py-4 bg-transparent text-white border border-white/20 rounded-none font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:bg-white/5 hover:border-concept-yellow"
                            >
                                <span>Tenho Interesse</span>
                                <ArrowRight className="w-4 h-4 text-concept-yellow" />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ProjectModal;
