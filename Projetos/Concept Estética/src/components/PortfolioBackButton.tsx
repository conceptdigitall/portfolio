"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PortfolioBackButton() {
    return (
        <Link
            href="https://conceptdigitalportfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
        >
            <motion.button
                className="fixed bottom-8 left-8 z-50 flex items-center gap-3 px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/80 hover:bg-white/20 hover:text-white transition-all shadow-lg group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.05 }}
            >
                <div className="p-1 bg-white/10 rounded-full group-hover:bg-[var(--color-gold-champagne)] transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium uppercase tracking-wider pr-1">Voltar ao Portfolio</span>
            </motion.button>
        </Link>
    );
}
