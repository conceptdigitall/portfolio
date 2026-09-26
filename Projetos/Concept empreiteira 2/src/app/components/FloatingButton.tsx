"use client";

import { ArrowLeft } from "lucide-react";

export function FloatingButton() {
    return (
        <a
            href="https://conceptdigitalportfolio.vercel.app/"
            target="_blank" // Opens in new tab, optional based on user preference
            rel="noopener noreferrer"
            className="fixed bottom-6 left-6 z-[100] group"
        >
            <div className="bg-highlight hover:bg-highlight/90 text-primary font-bold px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3 transition-all transform hover:-translate-y-1">
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span className="uppercase tracking-wide text-sm">Voltar ao Portfolio</span>
            </div>
        </a>
    );
}
