"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { Project } from '@/types/project';

interface ProjectCardProps {
    project: Project;
    onClick: () => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
    return (
        <motion.div
            layoutId={`project-card-${project.id}`}
            onClick={onClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="group relative bg-concept-gray border border-concept-blue/10 rounded-none overflow-hidden cursor-pointer min-h-[420px] flex flex-col hover:border-concept-blue transition-colors duration-300"
        >
            {/* Image container */}
            <div className="h-60 w-full relative overflow-hidden flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t from-concept-gray/20 via-transparent to-transparent z-10" />
                <motion.div
                    className="relative w-full h-full"
                    layoutId={`project-image-${project.id}`}
                >
                    <Image
                        src={project.image_url}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </motion.div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-concept-blue text-concept-white rounded-none text-[10px] font-bold uppercase tracking-widest">
                        {project.category}
                    </span>
                </div>
            </div>

            {/* Content Container */}
            <div className="p-6 flex-1 flex flex-col justify-between relative z-20 bg-concept-gray border-t border-concept-blue/10">
                <div className="space-y-3">
                    <motion.h3
                        layoutId={`project-title-${project.id}`}
                        className="text-lg font-bold text-concept-blue font-montserrat uppercase tracking-wider group-hover:text-concept-blue"
                    >
                        {project.title}
                    </motion.h3>
                    <motion.p
                        layoutId={`project-desc-${project.id}`}
                        className="text-concept-blue/70 text-xs font-poppins font-light leading-relaxed line-clamp-3"
                    >
                        {project.description}
                    </motion.p>
                </div>

                <div className="mt-6 pt-4 border-t border-concept-blue/5 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-concept-blue">
                    <span>Ver Ativo</span>
                    <ArrowUpRight className="w-4 h-4 text-concept-yellow transform transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
