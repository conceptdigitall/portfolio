# TASK-03: Remoção de Tagline Superior no Hero

**Responsável**: `frontend-specialist`
**Dependências**: Nenhuma
**Nível**: P1 (Melhoria Visual)

## Objetivo
Remover a caixa com a tagline `Premium Digital Assets // Arquétipo Lobo-Guará` do topo do Hero. Esse box está sobrepondo os links de navegação e poluindo a estética do topo.

## Ações
No arquivo `src/components/Hero.tsx`, remova o bloco de código que renderiza a Tagline:
```tsx
{/* Brand Tagline */}
<div className="inline-block animate-fade-in-up">
    <div className="flex items-center gap-3 px-4 py-1.5 border border-white/10 bg-white/5 backdrop-blur-sm rounded-none">
        <div className="w-1.5 h-1.5 bg-concept-yellow animate-ping"></div>
        <span className="text-white/60 text-[9px] uppercase tracking-[0.3em] font-bold font-poppins">
            Premium Digital Assets // Arquétipo Lobo-Guará
        </span>
    </div>
</div>
```

Ajuste qualquer margem ou padding superior do container principal do Hero para garantir que a tipografia centralizada tenha respiração suficiente de 80%.

## Verificação
1. Executar build local:
```bash
npm run build
```
2. Manualmente: Abrir a página no navegador e validar que a caixa sumiu e que a transição de scroll e cabeçalho estão desimpedidas.
