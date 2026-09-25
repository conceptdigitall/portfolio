"use client";

import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { openWhatsAppGeneral } from '@/features/portfolio/utils/whatsapp';

const Hero = () => {
    const handleWhatsAppClick = (e: React.MouseEvent) => {
        e.preventDefault();
        openWhatsAppGeneral();
    };

    return (
        <section 
            id="hero" 
            className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden p-6 bg-concept-blue select-none"
        >
            {/* Fine Grid Background Overlay */}
            <div className="absolute inset-0 fine-grid opacity-20 pointer-events-none" />

            {/* Fine Lines guiding the eye (80% respiro layout) */}
            <div className="absolute left-[15%] top-0 bottom-0 w-[1px] bg-white/[0.04] pointer-events-none" />
            <div className="absolute right-[15%] top-0 bottom-0 w-[1px] bg-white/[0.04] pointer-events-none" />
            <div className="absolute top-[25%] left-0 right-0 h-[1px] bg-white/[0.04] pointer-events-none" />
            <div className="absolute bottom-[25%] left-0 right-0 h-[1px] bg-white/[0.04] pointer-events-none" />

            {/* Dynamic Minimalist Geometric Lobo-Guará Silhouette SVG (Signature Brandmark) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <svg 
                    className="w-[85vw] max-w-[800px] h-auto text-white/[0.015] stroke-white/[0.04] stroke-[0.75] transition-all duration-1000"
                    viewBox="0 0 100 100" 
                    fill="none"
                >
                    {/* Minimalist geometric lines representing the posture of the Lobo-Guará */}
                    <path d="M 50 15 L 45 35 L 55 35 Z" /> {/* Ear outline */}
                    <path d="M 45 35 L 35 48 L 50 52 L 65 48 L 55 35" /> {/* Head structure */}
                    <path d="M 35 48 L 20 70 L 30 90 L 50 82 L 70 90 L 80 70 L 65 48" /> {/* Body lines */}
                    <path d="M 30 90 L 25 98" /> {/* Leg 1 */}
                    <path d="M 50 82 L 50 98" /> {/* Leg 2 */}
                    <path d="M 70 90 L 75 98" /> {/* Leg 3 */}
                    {/* Subtle geometric footprint trace in yellow accent */}
                    <circle cx="50" cy="50" r="1.5" className="fill-concept-yellow/30 stroke-none" />
                    <circle cx="55" cy="52" r="0.75" className="fill-concept-yellow/30 stroke-none" />
                    <circle cx="45" cy="52" r="0.75" className="fill-concept-yellow/30 stroke-none" />
                </svg>
            </div>

            {/* Content Container - Center-Staggered (Anti-Safe-Split) */}
            <div className="relative z-10 container mx-auto px-6 max-w-5xl text-center flex flex-col items-center justify-center h-full gap-8">
                
                {/* Brand Tagline */}
                <div className="inline-block animate-fade-in-up">
                    <div className="flex items-center gap-3 px-4 py-1.5 border border-white/10 bg-white/5 backdrop-blur-sm rounded-none">
                        <div className="w-1.5 h-1.5 bg-concept-yellow animate-ping"></div>
                        <span className="text-white/60 text-[9px] uppercase tracking-[0.3em] font-bold font-poppins">
                            Premium Digital Assets // Arquétipo Lobo-Guará
                        </span>
                    </div>
                </div>

                {/* Massive Typographic Hero in Montserrat Black */}
                <h1 className="text-4xl sm:text-6xl md:text-8xl font-black font-montserrat leading-[1.05] text-concept-white tracking-tighter max-w-4xl">
                    ELEVAR O <br className="hidden sm:inline" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-concept-white via-concept-yellow to-concept-white bg-[length:200%_auto] animate-matrix-scroll inline-block">
                        POSICIONAMENTO
                    </span> <br />
                    DIGITAL DO SEU NEGÓCIO
                </h1>

                {/* Refined Brandbook Copywriting */}
                <p className="text-white/80 text-base md:text-lg font-light leading-relaxed max-w-2xl font-poppins border-t border-b border-white/10 py-6 my-4">
                    Construímos estruturas focadas em <strong className="text-concept-yellow font-bold">transformar acessos em clientes</strong>. Unimos o requinte da sofisticação funcional à precisão cirúrgica de nossa engenharia de vendas.
                </p>

                {/* Call to Actions - Sharp edges, yellow accent, no generic shadows */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto">
                    <a
                        href="#portfolio"
                        className="group relative px-10 py-5 bg-concept-yellow text-concept-blue font-bold text-xs tracking-widest uppercase transition-all duration-300 hover:bg-concept-white hover:text-concept-blue rounded-none border-[1.5px] border-concept-yellow"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            Explorar Ativos
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </span>
                    </a>

                    <button
                        onClick={handleWhatsAppClick}
                        className="group px-10 py-5 border-[1.5px] border-white/15 text-white font-bold text-xs tracking-widest uppercase hover:bg-white/5 hover:border-concept-yellow transition-all rounded-none flex items-center justify-center gap-2"
                    >
                        <MessageCircle className="w-4 h-4 text-concept-yellow group-hover:scale-110 transition-transform" />
                        Consultoria Estratégica
                    </button>
                </div>
            </div>

            {/* Bottom transition lines */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </section>
    );
};

export default Hero;
