"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

export function BackToPortfolio() {
    return (
        <motion.div
            className="fixed bottom-6 left-6 z-50 flex flex-col items-stretch shadow-2xl group w-fit"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
        >
            <div className="bg-slate-900 text-white text-[10px] font-bold tracking-widest px-4 py-1.5 rounded-t-md uppercase flex items-center gap-2 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                Projeto Demonstrativo
            </div>
            <Link
                href="https://conceptdigitalportfolio.vercel.app/"
                className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-black text-xs md:text-sm px-4 py-3 rounded-b-md flex items-center justify-between gap-3 transition-all"
            >
                <div className="flex flex-col items-start leading-none">
                    <span className="text-[9px] font-medium opacity-80 mb-0.5 uppercase tracking-wider">Voltar ao</span>
                    <span>PORTFÓLIO</span>
                </div>
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            </Link>
        </motion.div>
    )
}
