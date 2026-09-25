#!/usr/bin/env bash
# ============================================================
#  Checagem de segurança — Portfólio Concept Digital
#  Uso (na pasta do portfólio):
#     bash scripts/security-check.sh [URL_DO_SITE]
#  Ex: bash scripts/security-check.sh https://concept-digital-portfolio.vercel.app
#
#  Só LÊ: não altera código, banco nem configurações.
#  Nenhum segredo é impresso por inteiro.
# ============================================================

SITE_URL="${1:-https://concept-digital-portfolio.vercel.app}"
SITE_URL="${SITE_URL%/}"
FAILS=0; WARNS=0

ok()   { printf "  \033[32m[OK]\033[0m %s\n" "$1"; }
warn() { printf "  \033[33m[ATENÇÃO]\033[0m %s\n" "$1"; WARNS=$((WARNS+1)); }
fail() { printf "  \033[31m[FALHA]\033[0m %s\n" "$1"; FAILS=$((FAILS+1)); }
title(){ printf "\n\033[1m%s\033[0m\n" "$1"; }

cd "$(git rev-parse --show-toplevel 2>/dev/null || pwd)" || exit 1
echo "Pasta: $(pwd)"
echo "Site:  $SITE_URL"

# ------------------------------------------------------------
title "1. Arquivos .env versionados no Git"
TRACKED_ENV=$(git ls-files | grep -E '(^|/)\.env' | grep -vE '\.example$|\.sample$' || true)
if [ -n "$TRACKED_ENV" ]; then
  fail "Arquivos .env estão no Git (remova com git rm --cached e troque as chaves):"
  echo "$TRACKED_ENV" | sed 's/^/      /'
else
  ok "Nenhum .env real versionado (só .env.example)."
fi

# ------------------------------------------------------------
title "2. Segredos no código e no histórico do Git"
if command -v gitleaks >/dev/null 2>&1; then
  echo "  Usando gitleaks..."
  if gitleaks git . --redact --no-banner >/tmp/gitleaks.out 2>&1 || gitleaks detect --source . --redact --no-banner >/tmp/gitleaks.out 2>&1; then
    ok "gitleaks não encontrou segredos."
  else
    fail "gitleaks encontrou possíveis segredos (valores ocultados):"
    tail -40 /tmp/gitleaks.out | sed 's/^/      /'
  fi
else
  echo "  (gitleaks não instalado — usando busca simples. Para uma varredura completa: brew install gitleaks)"
  PATTERNS='sk-ant-api[0-9A-Za-z_-]{20,}|sk_live_[A-Za-z0-9]{10,}|\$aact_[A-Za-z0-9_]{20,}|AKIA[0-9A-Z]{16}|ghp_[A-Za-z0-9]{30,}|AIza[0-9A-Za-z_-]{30,}|-----BEGIN [A-Z ]*PRIVATE KEY'
  HITS=$(git log --all -p 2>/dev/null | grep -oE "$PATTERNS" | sort -u | sed -E 's/(.{10}).+/\1…(oculto)/')
  if [ -n "$HITS" ]; then fail "Possíveis chaves no histórico:"; echo "$HITS" | sed 's/^/      /'; else ok "Nenhuma chave de API conhecida no histórico."; fi

  # Tokens JWT do Supabase: a 'anon' pode ser pública; a 'service_role' NUNCA.
  SR=0
  for t in $(git log --all -p 2>/dev/null | grep -oE 'eyJhbGciOi[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+' | sort -u); do
    payload=$(echo "$t" | cut -d. -f2 | tr '_-' '/+')
    while [ $(( ${#payload} % 4 )) -ne 0 ]; do payload="$payload="; done
    if echo "$payload" | base64 -D 2>/dev/null | grep -q '"service_role"'; then SR=1; fi
    if echo "$payload" | base64 -d 2>/dev/null | grep -q '"service_role"'; then SR=1; fi
  done
  if [ "$SR" = 1 ]; then fail "Chave SERVICE_ROLE do Supabase encontrada no histórico! Troque-a já no painel do Supabase."; else ok "Nenhuma chave service_role do Supabase no histórico (só anon, que é pública)."; fi
fi
if git log --all -p 2>/dev/null | grep -q "pwd === '"; then
  warn "A senha antiga do /admin continua no histórico público do Git. Se ela for usada em outro lugar, troque lá."
fi

# ------------------------------------------------------------
title "3. Dependências com vulnerabilidades conhecidas (npm audit)"
if [ -f package-lock.json ]; then
  AUDIT=$(npm audit --omit=dev 2>&1)
  if echo "$AUDIT" | grep -qiE 'npm error|ERR!'; then
    warn "npm audit não conseguiu rodar (sem internet?): $(echo "$AUDIT" | grep -iE 'error' | head -1)"
  elif echo "$AUDIT" | grep -q 'found 0 vulnerabilities'; then
    ok "Nenhuma vulnerabilidade conhecida nas dependências de produção."
  elif echo "$AUDIT" | grep -qE '[0-9]+ (critical|high)'; then
    fail "Vulnerabilidades altas/críticas em dependências de produção:"
    echo "$AUDIT" | grep -E 'Severity|severity|vulnerabilit|^[a-z@].* [<>=]' | head -25 | sed 's/^/      /'
    echo "      → Tente: npm audit fix   (e rode npm run build depois)"
  elif echo "$AUDIT" | grep -qE '[0-9]+ (moderate|low)'; then
    warn "Só vulnerabilidades moderadas/baixas: $(echo "$AUDIT" | grep -E 'vulnerabilit' | tail -1)"
  else
    warn "Resultado inesperado do npm audit: $(echo "$AUDIT" | tail -1)"
  fi
else
  warn "Sem package-lock.json — npm audit não pôde rodar."
fi

# ------------------------------------------------------------
title "4. Site no ar: cabeçalhos de segurança"
SITE_CODE=$(curl -s -o /dev/null -L --max-time 15 -w "%{http_code}" "$SITE_URL")
HEADERS=$(curl -sIL --max-time 15 "$SITE_URL" | tr 'A-Z' 'a-z')
if [ "$SITE_CODE" != "200" ]; then
  warn "Não consegui acessar $SITE_URL (HTTP $SITE_CODE) — confira a URL. Pulei os testes 4 e 5."
  SKIP_SITE=1
elif [ -z "$HEADERS" ]; then
  warn "Não consegui acessar $SITE_URL (confira a URL)."
else
  check_header(){ if echo "$HEADERS" | grep -q "^$1:"; then ok "$1 presente"; else warn "$1 ausente — $2"; fi; }
  check_header "strict-transport-security" "força HTTPS (a Vercel costuma enviar)"
  check_header "x-content-type-options" "evita o navegador 'adivinhar' tipos de arquivo"
  if echo "$HEADERS" | grep -qE "^x-frame-options:|frame-ancestors"; then ok "proteção contra clickjacking presente"; else warn "x-frame-options ausente — o site pode ser embutido em iframes de terceiros"; fi
  check_header "referrer-policy" "controla o que vaza de URL para outros sites"
fi

title "5. /admin redireciona para o CRM"
ADMIN=$(curl -s -o /dev/null --max-time 15 -w "%{http_code} %{redirect_url}" "$SITE_URL/admin")
[ "${SKIP_SITE:-0}" = 1 ] && ADMIN="skip"
case "$ADMIN" in
  skip) warn "Teste pulado (site inacessível).";;
  30[1278]*concept-crm-gamma*) ok "/admin → CRM ($ADMIN)";;
  *) fail "/admin não redireciona para o CRM (resposta: $ADMIN)";;
esac

# ------------------------------------------------------------
title "6. Banco Supabase: o que um visitante anônimo consegue ler"
SB_URL=$(grep -hE '^NEXT_PUBLIC_SUPABASE_URL=' .env.local .env 2>/dev/null | head -1 | cut -d= -f2- | tr -d '"'"'"' ')
SB_KEY=$(grep -hE '^NEXT_PUBLIC_SUPABASE_ANON_KEY=' .env.local .env 2>/dev/null | head -1 | cut -d= -f2- | tr -d '"'"'"' ')
[ -z "$SB_URL" ] && SB_URL=$(grep -oE "https://[a-z0-9]+\.supabase\.co" src/lib/supabase.ts | head -1)
[ -z "$SB_KEY" ] && SB_KEY=$(grep -oE "eyJhbGciOi[A-Za-z0-9_.-]+" src/lib/supabase.ts | head -1)
if [ -z "$SB_URL" ] || [ -z "$SB_KEY" ]; then
  warn "Não achei URL/chave anon do Supabase — pulei este teste."
else
  echo "  Testando com a chave pública (anon), como qualquer visitante faria. Só conta linhas; nada é alterado."
  for T in contacts conversations messages deals pipelines api_keys whatsapp_config profiles appointments broadcasts message_templates \
           page_views project_clicks cta_clicks form_events; do
    RESP=$(curl -s -o /dev/null -D - --max-time 15 -w "HTTPCODE:%{http_code}" \
      -H "apikey: $SB_KEY" -H "Authorization: Bearer $SB_KEY" \
      -H "Prefer: count=exact" -H "Range: 0-0" \
      "$SB_URL/rest/v1/$T?select=*" | tr -d '\r')
    CODE=$(echo "$RESP" | grep -oE 'HTTPCODE:[0-9]+' | cut -d: -f2)
    RANGE=$(echo "$RESP" | grep -i '^content-range:' | sed 's#.*/##')
    if [ "$CODE" = "000" ]; then warn "$T: não consegui conectar ao Supabase (sem internet?)"; continue; fi
    if [ "$CODE" = "404" ]; then ok "$T: tabela não existe neste projeto"; continue; fi
    case "$CODE" in 401|403) ok "$T: acesso negado"; continue;; 2??) ;; *) warn "$T: resposta inesperada (HTTP $CODE)"; continue;; esac
    case "$T" in
      page_views|project_clicks|cta_clicks|form_events) KIND="métricas do portfólio";;
      *) KIND="dados do CRM";;
    esac
    if [ -z "$RANGE" ]; then ok "$T: acesso negado ($KIND)"
    elif [ "$RANGE" = "0" ] || [ "$RANGE" = "*" ]; then ok "$T: 0 linhas visíveis para anônimos ($KIND)"
    elif [ "$KIND" = "dados do CRM" ]; then fail "$T: $RANGE linhas LEGÍVEIS por qualquer visitante! ($KIND)"
    else warn "$T: $RANGE linhas legíveis por qualquer visitante ($KIND — restrinja o SELECT a 'authenticated')"
    fi
  done
fi

# ------------------------------------------------------------
title "Resumo"
echo "  Falhas: $FAILS   Atenções: $WARNS"
[ "$FAILS" -gt 0 ] && echo "  Corrija as FALHAS primeiro. Cole este resultado no Claude para ajuda."
exit 0
