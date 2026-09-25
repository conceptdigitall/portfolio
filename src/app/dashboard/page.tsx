'use client';

import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, ExternalLink, Terminal, ArrowLeft, Globe } from 'lucide-react';

export default function DashboardBridgePage() {
    return (
        <div className="min-h-screen bg-[#020408] text-white flex flex-col items-center justify-center p-6 selection:bg-[#00f2fe] selection:text-black">
            {/* Background Glow */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00f2fe]/10 rounded-full blur-[140px]" />
            </div>

            <div className="max-w-md w-full bg-[#0a0f18]/80 border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl space-y-6">
                {/* Header */}
                <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-14 h-14 rounded-2xl bg-[#00f2fe]/10 border border-[#00f2fe]/30 flex items-center justify-center text-[#00f2fe] mb-2 shadow-[0_0_25px_rgba(0,242,254,0.25)]">
                        <LayoutDashboard className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-mono tracking-widest text-[#00f2fe] uppercase font-semibold">
                        Concept Digital Assets
                    </span>
                    <h1 className="text-2xl font-bold tracking-tight text-white">
                        Acesso ao Concept CRM
                    </h1>
                    <p className="text-sm text-gray-400">
                        O CRM é uma aplicação independente com servidor e autenticação próprios. Escolha como deseja acessá-lo:
                    </p>
                </div>

                {/* Opções de Acesso */}
                <div className="space-y-3">
                    {/* Opção 1: CRM Local */}
                    <a
                        href="http://localhost:3001/dashboard"
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-[#00f2fe]/10 hover:border-[#00f2fe]/40 transition-all duration-300"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#00f2fe] group-hover:scale-110 transition-transform">
                                <Terminal className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-semibold text-white group-hover:text-[#00f2fe] transition-colors">
                                    CRM Local (localhost:3001)
                                </p>
                                <p className="text-xs text-gray-400">
                                    Requer <code className="text-[#00f2fe] bg-black/40 px-1 py-0.5 rounded">npm run dev:crm</code>
                                </p>
                            </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#00f2fe] transition-colors" />
                    </a>

                    {/* Opção 2: CRM Online na Vercel */}
                    <a
                        href="https://concept-crm-gamma.vercel.app/dashboard"
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all duration-300"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                                <Globe className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                                    CRM em Produção (Vercel)
                                </p>
                                <p className="text-xs text-gray-400">
                                    Acessar versão online hospedada
                                </p>
                            </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-emerald-400 transition-colors" />
                    </a>
                </div>

                {/* Footer Back */}
                <div className="pt-2 border-t border-white/5 flex justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Voltar para a página inicial do Portfólio
                    </Link>
                </div>
            </div>
        </div>
    );
}
