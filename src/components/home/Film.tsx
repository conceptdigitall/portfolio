"use client";

import { useEffect, useRef, useState } from 'react';

const Eyebrow = ({ children }: { children: string }) => (
    <span className="text-sm font-semibold tracking-[0.14em] uppercase text-concept-yellow">{children}</span>
);

// Toca com 60% visível e só pausa abaixo de 25%: a folga evita play/pause a cada rolagem curta.
const PLAY_AT = 0.6;
const PAUSE_BELOW = 0.25;

type FullscreenVideo = HTMLVideoElement & { webkitDisplayingFullscreen?: boolean };

export default function Film() {
    const ref = useRef<FullscreenVideo>(null);
    const inView = useRef(false);
    const pausedByUser = useRef(false);
    const [started, setStarted] = useState(false);
    const [muted, setMuted] = useState(true);

    useEffect(() => {
        const v = ref.current;
        if (!v || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        // Navegadores só permitem autoplay sem som.
        v.muted = true;

        const io = new IntersectionObserver(([e]) => {
            if (document.fullscreenElement || v.webkitDisplayingFullscreen) return;
            if (e.isIntersecting) v.preload = 'auto';
            if (e.intersectionRatio >= PLAY_AT) {
                inView.current = true;
                if (v.paused && !v.ended && !pausedByUser.current) v.play().catch(() => {});
            } else if (e.intersectionRatio < PAUSE_BELOW) {
                inView.current = false;
                if (!v.paused) v.pause();
            }
        }, { threshold: [0, PAUSE_BELOW, PLAY_AT] });
        io.observe(v);
        return () => io.disconnect();
    }, []);

    const playWithSound = () => {
        const v = ref.current;
        if (!v) return;
        v.muted = false;
        setMuted(false);
        v.play().catch(() => { /* o navegador pode bloquear; os controles continuam disponíveis */ });
    };

    // A narração começa no segundo zero: ao ligar o som, o filme recomeça para não perder a abertura.
    const unmute = () => {
        const v = ref.current;
        if (!v) return;
        v.currentTime = 0;
        playWithSound();
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
                    controls={started}
                    onPlay={() => { pausedByUser.current = false; setStarted(true); }}
                    onPause={() => { if (inView.current && !ref.current?.ended) pausedByUser.current = true; }}
                    onVolumeChange={() => setMuted(ref.current?.muted ?? true)}
                    onEnded={() => setStarted(false)}
                    aria-label="Filme institucional da Concept Digital, 62 segundos"
                />
                {!started && (
                    <button
                        type="button"
                        onClick={playWithSound}
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
                {started && muted && (
                    <button
                        type="button"
                        onClick={unmute}
                        className="absolute top-3 right-3 sm:top-5 sm:right-5 flex items-center gap-2 rounded-full bg-concept-yellow text-black px-4 py-2 text-sm font-semibold shadow-[0_0_24px_rgba(252,224,38,0.35)] hover:scale-105 transition-transform"
                    >
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M11 5 6 9H2v6h4l5 4V5z" />
                            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                            <path d="M19 5a10 10 0 0 1 0 14" />
                        </svg>
                        Ativar som
                    </button>
                )}
            </div>
        </section>
    );
}
