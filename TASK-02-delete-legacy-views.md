# TASK-02: Exclusão de Views e Componentes Não Utilizados

**Responsável**: `frontend-specialist`
**Dependências**: Nenhuma
**Nível**: P0 (Bloqueador)

## Objetivo
Remover as views obsoletas e o componente de Quiz que não está mais ativo na página principal, limpando o linter e o analisador de acessibilidade.

## Ações
Excluir recursivamente os seguintes arquivos/pastas:
- `src/views/` (pasta inteira)
- `src/components/BusinessQuiz.tsx` (arquivo do quiz removido)

## Verificação
```bash
# Verificar se as pastas e arquivos foram removidos
ls src/views
# Deve retornar erro indicando que o diretório não existe
ls src/components/BusinessQuiz.tsx
# Deve retornar erro indicando que o arquivo não existe
```
