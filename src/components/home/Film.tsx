"use client";

import { useRef, useState } from 'react';

const Eyebrow = ({ children }: { children: string }) => (
    <span className="text-sm font-semibold tracking-[0.14em] uppercase text-concept-yellow">{children}</span>
);

export default function Film() {
    const ref = useRef<HTMLVideoElement>(null);
    const [started, setStarted] = useState(false);

    const play = () => {
        const v = ref.current;
        if (!v) return;
        setStarted(true);
        v.controls = true;
        v.play().catch(() => { /* o navegador pode bloquear; os controles continuam disponíveis */ });
    };

    return (
        <section id="filme" className="scroll-mt-6 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-20 pt-24 lg:pt-28 flex flex-col gap-10 lg:gap-12">
            <div className="flex flex-col gap-3.5">
                <Eyebrow>Filme da Concept</Eyebrow>
                <h2 className="font-poppins text-[34px] sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-[-0.02em] max-w-[820px]">
                    Um minuto para entender o que a gente entrega.
                </h2>
            </div>

            <div className="relative w-full max-w-[1100px] mx-auto aspect-video rounded-[28px] overflow-hidden border border-night-line bg-night-card">
                <video
                    ref={ref}
                    className="absolute inset-0 w-full h-full object-cover"
                    src="/film/concept-film.mp4"
                    poster="/film/concept-film-poster.jpg"
                    preload="none"
                    playsInline
                    onEnded={() => setStarted(false)}
                    aria-label="Filme institucional da Concept Digital, 62 segundos"
                />
                {!started && (
                    <button
                        type="button"
                        onClick={play}
                        aria-label="Assistir ao filme da Concept Digital"
                        className="absolute inset-0 flex items-center justify-center bg-black/25 hover:bg-black/10 transition-colors group"
                    >
                        <span className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-concept-yellow text-black shadow-[0_0_40px_rgba(252,224,38,0.35)] group-hover:scale-105 transition-transform">
                            <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10 ml-1" fill="currentColor" aria-hidden="true">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </span>
                    </button>
                )}
            </div>
        </section>
    );
}
