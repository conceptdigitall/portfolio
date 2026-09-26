'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export function FloatingPortfolioButton() {
    return (
        <Link
            href="https://conceptdigitalportfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 left-6 z-40 group flex items-center gap-3 bg-white text-black px-6 py-4 border-2 border-white hover:bg-primary hover:border-primary transition-all shadow-lg hover:shadow-[4px_4px_0px_0px_#CCFF00]"
        >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" strokeWidth={2} />
            <span className="font-display font-bold uppercase text-sm">Voltar ao Portfólio</span>
        </Link>
    );
}
