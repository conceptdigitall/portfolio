"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export function BackButton() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-8 left-8 z-[60]"
    >
      <Link
        href="https://concept-digital-portfolio.vercel.app/"
        className="group flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-5 py-3 rounded-full transition-all duration-300 shadow-xl"
      >
        <div className="bg-white text-black p-1 rounded-full transition-transform group-hover:-translate-x-1">
          <ArrowLeft className="w-4 h-4" />
        </div>
        <span className="text-sm font-medium tracking-wide">
          Voltar ao Portfólio
        </span>
      </Link>
    </motion.div>
  );
}
