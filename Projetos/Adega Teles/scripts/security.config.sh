# Configuração do security-check.sh — Adega Teles Delivery
SITE_URL="https://COLOQUE-A-URL-DA-ADEGA.vercel.app"

# Sem login, estas rotas devem responder 401 (APIs) ou redirecionar para o login (páginas).
# Só GET. (O webhook de estoque NÃO entra aqui: numa versão antiga, um GET nele dispara alertas.)
PROTECTED_ENDPOINTS="/api/admin/produtos /api/admin/promocoes /api/admin/entregas/motoboys /api/admin/entregas/zonas /admin/dashboard /admin/produtos /admin/clientes /admin/relatorios"

# Dados pessoais e operacionais: nenhum visitante pode listar.
SUPABASE_SENSITIVE_TABLES="clientes pedidos itens_pedido motoboys historico_rota_pedidos logs_integracao alertas_estoque_enviados"
# Lidas pela vitrine de propósito.
SUPABASE_PUBLIC_TABLES="produtos categorias promocoes zonas_frete"
