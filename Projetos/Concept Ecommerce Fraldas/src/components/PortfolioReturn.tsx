'use client';

import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export function PortfolioReturn() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="fixed bottom-6 left-6 z-50 flex flex-col items-start shadow-2xl rounded-lg overflow-hidden group"
        >
            {/* Top Badge: "PROJETO DEMONSTRATIVO" */}
            <div className="bg-gray-900 text-white text-[10px] font-bold tracking-widest uppercase py-1.5 px-4 w-full flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-soft-orange opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-soft-orange"></span>
                </span>
                Projeto Demonstrativo
            </div>

            {/* Main Button: "VOLTAR AO PORTFÓLIO" */}
            <a
                href="https://conceptdigitalportfolio.vercel.app/"
                className="bg-brand-purple hover:bg-purple-700 text-white transition-all duration-300 flex items-center justify-between w-full p-0"
            >
                <div className="flex flex-col px-4 py-3">
                    <span className="text-[10px] font-bold opacity-70 tracking-wider">VOLTAR AO</span>
                    <span className="text-lg font-quicksand font-bold leading-none">PORTFÓLIO</span>
                </div>

                <div className="h-full border-l border-white/20 px-3 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                </div>
            </a>
        </motion.div>
    );
}
