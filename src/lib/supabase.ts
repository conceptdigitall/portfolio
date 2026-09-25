import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pkvlnhfzhjjsblotzoxn.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrdmxuaGZ6aGpqc2Jsb3R6b3huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkxNzA5MzIsImV4cCI6MjEwNDc0NjkzMn0.4AIRBHEd_mL9mWl96fGI3bRBPV7176rjVzKSClALfhE';

// Criando o cliente apenas se tiver as chaves
export const supabase = supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

// Helper para registro seguro.
// Só INSERE (sem ler de volta): visitantes anônimos não têm permissão de leitura nas tabelas de métricas.
export const trackEvent = async (table: string, data: Record<string, unknown>) => {
    if (!supabase) {
        console.warn(`[Analytics] Tentativa de gravar em '${table}' ignorada (chaves do Supabase não configuradas)`);
        return false;
    }

    try {
        const { error } = await supabase.from(table).insert([data]);
        if (error) throw error;
        return true;
    } catch (err) {
        console.error(`[Analytics] Falha ao registrar evento na tabela '${table}':`, err);
        return false;
    }
};

// Atualiza tempo na página e rolagem de UMA visita, via função segura no banco
// (track_page_view_update), que só mexe nesses dois campos e só aumenta os valores.
export const updatePageView = async (id: string, timeSpent: number, maxScroll: number) => {
    if (!supabase) return;

    try {
        const { error } = await supabase.rpc('track_page_view_update', {
            p_id: id,
            p_time_spent: timeSpent,
            p_max_scroll: maxScroll,
        });
        if (error) throw error;
    } catch (err) {
        console.error('[Analytics] Falha ao atualizar page_view:', err);
    }
};
