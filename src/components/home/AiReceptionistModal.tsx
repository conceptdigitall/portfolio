"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { X } from 'lucide-react';

/** Qualquer link para `#simulador-ia` (card, menu, rodapé) abre este modal na própria home. */
export const AI_DEMO_HASH = '#simulador-ia';

// O simulador só é baixado quando alguém abre o modal: não pesa no carregamento da home.
const AiReceptionistDemo = dynamic(() => import('./AiReceptionistDemo'), {
    ssr: false,
    loading: () => <div className="h-[520px] rounded-3xl bg-night-raise animate-pulse" aria-hidden="true" />,
});

const trackOpen = () => {
    import('@/lib/supabase').then(({ trackEvent }) => {
        trackEvent('cta_clicks', { button_id: 'open_ai_receptionist_modal', path: window.location.pathname });
    });
};

export default function AiReceptionistModal() {
    const [open, setOpen] = useState(false);
    const closeRef = useRef<HTMLButtonElement>(null);
    const lastFocus = useRef<HTMLElement | null>(null);

    // Abre pelo hash: funciona com <a href="#simulador-ia">, com o botão "voltar" e com link direto (/#simulador-ia).
    useEffect(() => {
        const sync = () => {
            const shouldOpen = window.location.hash === AI_DEMO_HASH;
            if (shouldOpen) {
                lastFocus.current = document.activeElement as HTMLElement | null;
                trackOpen();
            }
            setOpen(shouldOpen);
        };
        // O <Link> do Next troca a URL sem disparar "hashchange": intercepta o clique antes (fase de captura).
        const onClick = (e: MouseEvent) => {
            if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            const a = (e.target as HTMLElement | null)?.closest('a');
            if (!a || !a.href.endsWith(AI_DEMO_HASH)) return;
            const url = new URL(a.href);
            if (url.pathname !== window.location.pathname) return;
            e.preventDefault();
            history.pushState(null, '', AI_DEMO_HASH);
            sync();
        };
        sync();
        window.addEventListener('hashchange', sync);
        window.addEventListener('popstate', sync);
        document.addEventListener('click', onClick, true);
        return () => {
            window.removeEventListener('hashchange', sync);
            window.removeEventListener('popstate', sync);
            document.removeEventListener('click', onClick, true);
        };
    }, []);

    const close = useCallback(() => {
        // Tira o hash sem pular a página para o topo.
        history.replaceState(null, '', window.location.pathname + window.location.search);
        setOpen(false);
        lastFocus.current?.focus();
    }, []);

    useEffect(() => {
        if (!open) return;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        closeRef.current?.focus();
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener('keydown', onKey);
        };
    }, [open, close]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-[60] flex items-stretch sm:items-center justify-center bg-[#020617]/80 backdrop-blur-sm sm:p-6"
            onClick={(e) => e.target === e.currentTarget && close()}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="ai-demo-title"
                className="relative w-full max-w-6xl max-h-full overflow-y-auto overscroll-contain bg-night border border-night-line sm:rounded-[32px] shadow-2xl"
            >
                <div className="sticky top-0 z-10 flex items-start justify-between gap-4 px-5 sm:px-10 pt-5 sm:pt-8 pb-4 bg-night/95 backdrop-blur border-b border-night-line/60">
                    <div className="flex flex-col gap-1.5">
                        <span className="text-xs font-bold uppercase tracking-[0.16em] text-concept-yellow">Demonstração ao vivo</span>
                        <h2 id="ai-demo-title" className="font-poppins text-xl sm:text-3xl font-bold text-white leading-tight">
                            Recepcionista de IA no WhatsApp
                        </h2>
                        <p className="text-sm text-night-muted font-light">
                            Escolha o nicho e o tom de voz, depois clique nas dúvidas para ver a IA responder.
                        </p>
                    </div>
                    <button
                        ref={closeRef}
                        type="button"
                        onClick={close}
                        aria-label="Fechar demonstração"
                        className="shrink-0 w-11 h-11 rounded-full border border-night-edge text-night-text hover:border-concept-yellow hover:text-concept-yellow flex items-center justify-center transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="px-4 sm:px-10 py-6 sm:py-8">
                    <AiReceptionistDemo />
                    <p className="pt-6 text-center text-sm text-night-muted">
                        Quer ver a comparação com chatbots comuns e as perguntas frequentes?{' '}
                        <Link href="/recepcionista-ia" className="text-concept-yellow hover:text-white underline-offset-4 hover:underline">
                            Página completa da Recepcionista de IA
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
