import { NextRequest, NextResponse } from 'next/server';
import { CONCEPT_SYSTEM_PROMPT } from '@/lib/concept-knowledge';

export const dynamic = 'force-dynamic';

type ChatMessage = { role: 'user' | 'assistant'; content: string };

const MAX_MESSAGES = 12;       // histórico enviado à IA
const MAX_CHARS = 800;         // tamanho máximo de cada mensagem do visitante
const RATE_LIMIT = 20;         // mensagens por visitante...
const RATE_WINDOW_MS = 10 * 60 * 1000; // ...a cada 10 minutos

// Limite simples por IP (vale por instância do servidor; protege contra abuso básico).
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
    const now = Date.now();
    const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
    recent.push(now);
    hits.set(ip, recent);
    if (hits.size > 5000) hits.clear();
    return recent.length > RATE_LIMIT;
}

function sanitize(raw: unknown): ChatMessage[] | null {
    if (!Array.isArray(raw)) return null;
    const msgs = raw
        .filter((m): m is ChatMessage =>
            !!m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
        .map((m) => ({ role: m.role, content: m.content.trim().slice(0, MAX_CHARS) }))
        .filter((m) => m.content.length > 0)
        .slice(-MAX_MESSAGES);
    // A API exige começar pelo usuário e terminar com mensagem do usuário.
    while (msgs.length && msgs[0].role !== 'user') msgs.shift();
    if (!msgs.length || msgs[msgs.length - 1].role !== 'user') return null;
    return msgs;
}

export async function POST(req: NextRequest) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ error: 'Assistente indisponível no momento.' }, { status: 503 });
    }

    const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'anon';
    if (rateLimited(ip)) {
        return NextResponse.json(
            { error: 'Muitas mensagens em pouco tempo. Tente de novo em alguns minutos ou fale com a gente no WhatsApp.' },
            { status: 429 }
        );
    }

    const body = await req.json().catch(() => null);
    const messages = sanitize(body?.messages);
    if (!messages) {
        return NextResponse.json({ error: 'Mensagem inválida.' }, { status: 400 });
    }

    try {
        const res = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01',
            },
            body: JSON.stringify({
                model: process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5',
                max_tokens: 400,
                system: CONCEPT_SYSTEM_PROMPT,
                messages,
            }),
        });

        if (!res.ok) {
            console.error('[chat] Anthropic API', res.status, await res.text().catch(() => ''));
            return NextResponse.json({ error: 'Não consegui responder agora. Tente de novo ou fale no WhatsApp.' }, { status: 502 });
        }

        const data = await res.json();
        const text: string = (data?.content || [])
            .filter((b: { type: string }) => b.type === 'text')
            .map((b: { text: string }) => b.text)
            .join('\n')
            .replace(/\*\*?/g, '')
            .trim();

        return NextResponse.json({ reply: text || 'Pode reformular a pergunta?' });
    } catch (err) {
        console.error('[chat] erro', err);
        return NextResponse.json({ error: 'Não consegui responder agora. Tente de novo ou fale no WhatsApp.' }, { status: 502 });
    }
}
