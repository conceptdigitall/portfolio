/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pkvlnhfzhjjsblotzoxn.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrdmxuaGZ6aGpqc2Jsb3R6b3huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkxNzA5MzIsImV4cCI6MjEwNDc0NjkzMn0.4AIRBHEd_mL9mWl96fGI3bRBPV7176rjVzKSClALfhE';

// Criando o cliente apenas se tiver as chaves
export const supabase = supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

// Helper para registro seguro
export const trackEvent = async (table: string, data: any) => {
    if (!supabase) {
        console.warn(`[Analytics] Tentativa de gravar em '${table}' ignorada (chaves do Supabase não configuradas)`);
        return null;
    }

    try {
        const { error, data: result } = await supabase.from(table).insert([data]).select().single();
        if (error) throw error;
        return result;
    } catch (err) {
        console.error(`[Analytics] Falha ao registrar evento na tabela '${table}':`, err);
        return null;
    }
};

export const updateEvent = async (table: string, id: string, data: any) => {
    if (!supabase) return null;

    try {
        const { error, data: result } = await supabase.from(table).update(data).eq('id', id).select().single();
        if (error) throw error;
        return result;
    } catch (err) {
        console.error(`[Analytics] Falha ao atualizar evento na tabela '${table}':`, err);
        return null;
    }
}
