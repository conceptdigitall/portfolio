# TASK-01: Exclusão de Módulos e Features Legados (.jsx)

**Responsável**: `frontend-specialist`
**Dependências**: Nenhuma
**Nível**: P0 (Bloqueador)

## Objetivo
Remover as pastas de features legadas escritas em JavaScript (.jsx) que foram substituídas pelas novas implementações em TypeScript (.tsx). Isso limpará o ambiente de varredura do UX Audit e SEO Checker.

## Ações
Excluir recursivamente os seguintes diretórios na raiz do projeto:
- `src/features/hero/`
- `src/features/portfolio/`
- `src/features/contact/`

## Verificação
```bash
# Executar comando para listar arquivos .jsx restantes em src/features
find src/features -name "*.jsx"
# O output NÃO deve listar arquivos dentro de hero, portfolio ou contact.
```
