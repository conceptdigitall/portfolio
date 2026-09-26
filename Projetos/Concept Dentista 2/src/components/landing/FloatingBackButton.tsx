
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function FloatingBackButton() {
    return (
        <div className="fixed bottom-6 right-6 z-50 group">
            <Link
                href="https://conceptdigitalportfolio.vercel.app/"
                className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700"
            >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-semibold">Voltar ao Portfolio</span>
            </Link>
            <div className="absolute -top-12 right-0 bg-black/80 text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Projeto Demonstrativo
            </div>
        </div>
    );
}
