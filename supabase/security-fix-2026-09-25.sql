-- =============================================================
-- Correção de segurança das métricas do portfólio — 2026-09-25
-- Rodar no Supabase: SQL Editor → New query → colar → Run.
-- Pode rodar mais de uma vez sem problema (idempotente).
--
-- Rode SÓ DEPOIS de publicar o código novo do portfólio
-- (o que grava as visitas sem ler de volta e usa a função abaixo).
-- =============================================================

-- 1) LEITURA: só usuários logados (o CRM) leem as métricas.
--    Visitantes anônimos deixam de conseguir ler page_views, cta_clicks etc.
DO $$
DECLARE t TEXT;
BEGIN
    FOREACH t IN ARRAY ARRAY['page_views','project_clicks','form_events','cta_clicks'] LOOP
        EXECUTE format('DROP POLICY IF EXISTS "Permitir leitura autenticada %s" ON public.%I', t, t);
        EXECUTE format('CREATE POLICY "Permitir leitura autenticada %s" ON public.%I FOR SELECT TO authenticated USING (true)', t, t);
    END LOOP;
END $$;

-- 2) ATUALIZAÇÃO: remove o UPDATE livre em page_views
--    (antes, qualquer visitante podia alterar QUALQUER linha).
DROP POLICY IF EXISTS "Permitir atualizacao anonima page_views" ON public.page_views;

-- 3) Função segura para atualizar tempo/rolagem de uma visita:
--    - só mexe em time_spent e max_scroll
--    - só aumenta os valores (não dá para zerar ou reduzir)
--    - só visitas das últimas 24h, com limites razoáveis
CREATE OR REPLACE FUNCTION public.track_page_view_update(
    p_id UUID,
    p_time_spent INTEGER,
    p_max_scroll INTEGER
) RETURNS VOID
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
    UPDATE public.page_views
       SET time_spent = GREATEST(time_spent, LEAST(GREATEST(p_time_spent, 0), 86400)),
           max_scroll = GREATEST(max_scroll, LEAST(GREATEST(p_max_scroll, 0), 100))
     WHERE id = p_id
       AND created_at > NOW() - INTERVAL '1 day';
$$;

REVOKE ALL ON FUNCTION public.track_page_view_update(UUID, INTEGER, INTEGER) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.track_page_view_update(UUID, INTEGER, INTEGER) TO anon, authenticated;

-- 4) INSERÇÃO continua liberada para visitantes (é assim que as métricas chegam),
--    mas com tamanho de texto limitado, para evitar lixo gigante.
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'page_views_path_len') THEN
        ALTER TABLE public.page_views ADD CONSTRAINT page_views_path_len CHECK (char_length(path) <= 300) NOT VALID;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'cta_clicks_len') THEN
        ALTER TABLE public.cta_clicks ADD CONSTRAINT cta_clicks_len CHECK (char_length(button_id) <= 80 AND char_length(path) <= 300) NOT VALID;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'project_clicks_len') THEN
        ALTER TABLE public.project_clicks ADD CONSTRAINT project_clicks_len CHECK (char_length(project_title) <= 150) NOT VALID;
    END IF;
END $$;
