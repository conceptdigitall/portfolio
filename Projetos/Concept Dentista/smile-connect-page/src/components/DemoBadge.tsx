import { motion } from "framer-motion";
import { ArrowLeft, Layout } from "lucide-react";

const DemoBadge = () => {
    return (
        <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="fixed left-6 bottom-6 z-[60] flex flex-col gap-3 pointer-events-none"
        >
            <div className="bg-black/80 backdrop-blur-xl border border-white/5 py-1.5 px-3 rounded-none inline-flex items-center gap-2 shadow-2xl">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Projeto Demonstrativo</span>
            </div>

            <a
                href="https://conceptdigitalportfolio.vercel.app/"
                className="pointer-events-auto group flex items-center gap-4 bg-primary px-6 py-4 rounded-none shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:brightness-110 active:scale-95"
                style={{ boxShadow: '0 20px 40px -10px hsl(var(--primary) / 0.4)' }}
            >
                <div className="flex flex-col items-start leading-none">
                    <span className="text-[10px] font-bold text-black/60 uppercase tracking-widest mb-1">Voltar ao</span>
                    <span className="text-sm font-bold text-black uppercase tracking-tighter">PORTFÓLIO</span>
                </div>
                <div className="w-8 h-8 flex items-center justify-center border-l border-black/10 pl-4 group-hover:translate-x-1 transition-transform">
                    <ArrowLeft className="w-5 h-5 text-black" />
                </div>
            </a>
        </motion.div>
    );
};

export default DemoBadge;
