# TASK-06: Validação Final e Checklist de Auditoria

**Responsável**: `frontend-specialist`
**Dependências**: TASK-01 a TASK-05 completadas
**Nível**: P0 (Bloqueador de Ship)

## Objetivo
Garantir que todas as alterações de design, layout e conformidade de qualidade passem nas ferramentas de auditoria automatizada do Kit Antigravity sem quaisquer falhas ou avisos impeditivos.

## Ações
1. Rodar os testes estáticos e de tipos:
```bash
npm run lint && npx tsc --noEmit
```
2. Rodar o script mestre de checklist:
```bash
python3 .agent/scripts/checklist.py .
```

## Critérios de Sucesso
- `checklist.py` retorna STATUS: PASS.
- Zero erros de compilação ou de tipos no Next.js build.
- `TASK-06` concluído com sucesso.
