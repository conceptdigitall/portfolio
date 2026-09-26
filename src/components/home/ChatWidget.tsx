"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { whatsappLink, trackWhatsAppClick } from '@/lib/whatsapp';
import { WhatsAppIcon } from './WhatsAppLink';

type Msg = { role: 'user' | 'assistant'; content: string };

const GREETING: Msg = {
    role: 'assistant',
    content: 'Olá! Sou o assistente da Concept Digital. Posso tirar dúvidas sobre sites, CRMs, sistemas, prazos e investimento. Como posso ajudar?',
};

const SUGGESTIONS = [
    'Quanto custa um site?',
    'O que é o ecossistema integrado?',
    'Vocês fazem CRM para WhatsApp?',
    'Como funciona o processo?',
];

const STORAGE_KEY = 'concept_chat_v1';

const ChatIcon = ({ className = 'w-7 h-7' }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4h0A1.5 1.5 0 0 1 4 14.5z" />
        <path d="M8.5 8.5h7M8.5 11.5h4.5" />
    </svg>
);

const CloseIcon = () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
        <path d="M6 6l12 12M18 6L6 18" />
    </svg>
);

const SendIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
);

export default function ChatWidget() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Msg[]>([GREETING]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Recupera a conversa da aba atual (se existir)
    useEffect(() => {
        try {
            const saved = sessionStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved) as Msg[];
                if (Array.isArray(parsed) && parsed.length) setMessages(parsed);
            }
        } catch { /* sem storage: segue com a saudação */ }
    }, []);

    useEffect(() => {
        try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-20))); } catch { /* ignora */ }
        listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
    }, [messages, loading]);

    // Ao abrir: foca o campo, trava a rolagem da página no celular, Esc fecha
    useEffect(() => {
        if (!open) return;
        const isMobile = window.matchMedia('(max-width: 639px)').matches;
        const prevOverflow = document.body.style.overflow;
        if (isMobile) document.body.style.overflow = 'hidden';
        const t = setTimeout(() => inputRef.current?.focus(), 150);
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
        window.addEventListener('keydown', onKey);
        return () => {
            clearTimeout(t);
            document.body.style.overflow = prevOverflow;
            window.removeEventListener('keydown', onKey);
        };
    }, [open]);

    const send = useCallback(async (text: string) => {
        const content = text.trim().slice(0, 800);
        if (!content || loading) return;
        const next: Msg[] = [...messages, { role: 'user', content }];
        setMessages(next);
        setInput('');
        setError(null);
        setLoading(true);
        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // A saudação é da interface; a IA recebe só a conversa real.
                body: JSON.stringify({ messages: next.filter((m) => m !== GREETING) }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok || !data.reply) throw new Error(data.error || 'Não consegui responder agora.');
            setMessages((m) => [...m, { role: 'assistant', content: data.reply }]);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Não consegui responder agora.');
        } finally {
            setLoading(false);
        }
    }, [messages, loading]);

    if (pathname?.startsWith('/admin') || pathname?.startsWith('/dashboard')) return null;

    const userQuestions = messages.filter((m) => m.role === 'user').map((m) => m.content);
    const waMessage = userQuestions.length
        ? `Olá! Vim pelo chat do site da Concept Digital. Minhas dúvidas: ${userQuestions.join(' | ').slice(0, 500)}`
        : undefined;
    const showSuggestions = userQuestions.length === 0;

    return (
        <>
            {/* Janela do chat: tela cheia no celular, painel no canto no computador */}
            {open && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="concept-chat-title"
                    className="fixed inset-0 z-[60] flex flex-col bg-white sm:inset-auto sm:right-8 sm:bottom-28 sm:w-[390px] sm:h-[min(620px,calc(100dvh-9rem))] sm:rounded-3xl sm:border sm:border-concept-line sm:shadow-[0_24px_60px_-20px_rgba(11,16,48,0.35)] overflow-hidden"
                >
                    <header className="flex items-center gap-3 bg-concept-blue text-white px-4 sm:px-5 pb-3.5 pt-[max(0.875rem,env(safe-area-inset-top))]">
                        <span className="relative w-10 h-10 rounded-full bg-concept-ink flex items-center justify-center flex-shrink-0">
                            <Image
                                src="/assets/logo/lobo-guara-avatar.png"
                                alt="Assistente Concept Digital"
                                width={40}
                                height={40}
                                className="w-full h-full object-cover rounded-full"
                            />
                            <span className="absolute -right-0.5 -bottom-0.5 w-3 h-3 rounded-full bg-whatsapp border-2 border-concept-blue" aria-hidden="true" />
                        </span>
                        <div className="flex flex-col min-w-0 flex-1">
                            <span id="concept-chat-title" className="font-poppins font-semibold text-[15px] leading-tight">Concept Digital</span>
                            <span className="text-xs text-white/80">Assistente virtual · responde na hora</span>
                        </div>
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            aria-label="Fechar chat"
                            className="w-11 h-11 -mr-1.5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                        >
                            <CloseIcon />
                        </button>
                    </header>

                    <div ref={listRef} className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-5 py-5 flex flex-col gap-3 bg-concept-ground" aria-live="polite">
                        {messages.map((m, i) => (
                            <div
                                key={i}
                                className={`max-w-[85%] px-4 py-2.5 text-[15px] leading-relaxed whitespace-pre-line ${m.role === 'user'
                                    ? 'self-end bg-concept-blue text-white rounded-2xl rounded-br-md'
                                    : 'self-start bg-white text-concept-ink border border-concept-line rounded-2xl rounded-bl-md'
                                    }`}
                            >
                                {m.content}
                            </div>
                        ))}

                        {loading && (
                            <div className="self-start bg-white border border-concept-line rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5" aria-label="Digitando">
                                <span className="w-2 h-2 rounded-full bg-concept-muted animate-bounce [animation-delay:-0.3s]" />
                                <span className="w-2 h-2 rounded-full bg-concept-muted animate-bounce [animation-delay:-0.15s]" />
                                <span className="w-2 h-2 rounded-full bg-concept-muted animate-bounce" />
                            </div>
                        )}

                        {error && (
                            <div role="alert" className="self-stretch text-sm text-concept-ink bg-concept-yellow/40 border border-concept-yellow rounded-xl px-3.5 py-2.5">
                                {error}
                            </div>
                        )}

                        {showSuggestions && !loading && (
                            <div className="flex flex-wrap gap-2 pt-1">
                                {SUGGESTIONS.map((s) => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => send(s)}
                                        className="min-h-[40px] px-3.5 rounded-full border-[1.5px] border-concept-blue/30 bg-white text-concept-blue text-sm font-medium hover:border-concept-blue transition-colors"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="border-t border-concept-line bg-white px-3 sm:px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex flex-col gap-2.5">
                        <a
                            href={whatsappLink(waMessage)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackWhatsAppClick('chat_whatsapp')}
                            className="flex items-center justify-center gap-2 min-h-[44px] rounded-full border-[1.5px] border-whatsapp text-[#128C4B] text-sm font-semibold hover:bg-whatsapp/10 transition-colors"
                        >
                            <WhatsAppIcon className="w-[18px] h-[18px]" />
                            Falar no WhatsApp com um especialista
                        </a>
                        <form
                            className="flex items-end gap-2"
                            onSubmit={(e) => { e.preventDefault(); send(input); }}
                        >
                            <label htmlFor="concept-chat-input" className="sr-only">Sua mensagem</label>
                            <textarea
                                id="concept-chat-input"
                                ref={inputRef}
                                rows={1}
                                value={input}
                                maxLength={800}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); }
                                }}
                                placeholder="Escreva sua dúvida..."
                                className="flex-1 resize-none max-h-32 min-h-[46px] rounded-2xl border border-concept-line bg-concept-ground px-4 py-3 text-base sm:text-[15px] text-concept-ink placeholder:text-concept-muted focus:outline-none focus:border-concept-blue"
                            />
                            <button
                                type="submit"
                                disabled={loading || !input.trim()}
                                aria-label="Enviar mensagem"
                                className="w-[46px] h-[46px] rounded-full bg-concept-blue text-white flex items-center justify-center flex-shrink-0 disabled:opacity-40 hover:bg-concept-darkblue transition-colors"
                            >
                                <SendIcon />
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Botão flutuante (fica escondido no celular enquanto o chat está aberto) */}
            <button
                type="button"
                onClick={() => {
                    if (!open) trackWhatsAppClick('chat_open');
                    setOpen(!open);
                }}
                aria-label={open ? 'Fechar chat' : 'Abrir chat de dúvidas'}
                aria-expanded={open}
                className={`group fixed right-4 bottom-5 sm:right-8 sm:bottom-8 z-50 items-center gap-3 ${open ? 'hidden sm:flex' : 'flex'}`}
            >
                {!open && (
                    <span className="hidden sm:inline-block bg-concept-ink text-white text-sm font-semibold px-4 py-2.5 rounded-full opacity-90 group-hover:opacity-100 transition-opacity">
                        Tire suas dúvidas
                    </span>
                )}
                <span className="relative w-[60px] h-[60px] sm:w-16 sm:h-16 rounded-full bg-concept-blue text-white border-[3px] border-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-[0_10px_30px_-10px_rgba(6,36,199,0.6)]">
                    {open ? (
                        <CloseIcon />
                    ) : (
                        <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                            <Image
                                src="/assets/logo/lobo-guara-avatar.png"
                                alt="Assistente Lobo Guará Concept Digital"
                                width={64}
                                height={64}
                                priority
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                    {!open && <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-concept-yellow border-2 border-white z-10" aria-hidden="true" />}
                </span>
            </button>
        </>
    );
}
