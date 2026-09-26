"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function FloatingBackButton() {
    return (
        <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-0 shadow-2xl w-fit">
            {/* Header Box: Projeto Demonstrativo */}
            <div className="bg-[#0a0a0a] border-x border-t border-white/5 py-1.5 px-4 flex items-center gap-3 w-full justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-gold-500 shadow-[0_0_8px_rgba(212,175,55,0.8)]"></div>
                <span className="text-[9px] text-gray-300 font-bold tracking-widest uppercase whitespace-nowrap">
                    Projeto Demonstrativo
                </span>
            </div>

            {/* Split Button: Voltar ao Portfólio */}
            <Link href="https://conceptdigitalportfolio.vercel.app/" className="block w-full">
                <button className="flex items-stretch bg-gold-500 hover:bg-gold-400 transition-all duration-300 group overflow-hidden w-full">
                    {/* Left: Text Area */}
                    <div className="py-2.5 px-4 flex flex-col items-start justify-center flex-grow">
                        <span className="text-[8px] text-black/60 font-bold tracking-widest uppercase leading-none mb-0.5">
                            Voltar ao
                        </span>
                        <span className="text-sm sm:text-base text-black font-extrabold tracking-tight uppercase leading-none">
                            Portfólio
                        </span>
                    </div>

                    {/* Vertical Separator */}
                    <div className="w-px bg-black/10 my-2"></div>

                    {/* Right: Arrow Area */}
                    <div className="px-4 flex items-center justify-center group-hover:bg-black/5 transition-colors">
                        <ArrowLeft className="w-4 h-4 text-black transition-transform group-hover:-translate-x-1" />
                    </div>
                </button>
            </Link>
        </div>
    );
}
