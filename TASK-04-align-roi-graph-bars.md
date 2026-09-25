# TASK-04: Correção de Alinhamento e Estilo do Gráfico de ROI

**Responsável**: `frontend-specialist`
**Dependências**: Nenhuma
**Nível**: P1 (Correção de Bug Visual)

## Objetivo
Corrigir a ordem, cores e o comportamento das barras de ROI na seção "Engenharia de Conversão" para que reflitam a lógica correta (Menor custo = Concept = melhor). A Concept deve ficar posicionada à direita como a barra mais baixa (custo mínimo), na cor sólida azul e com destaque visual.

## Ações
1. No arquivo `src/features/method/MethodEvolution.jsx`, localize o componente `ROIGraph`.
2. Alinhe a ordem de declaração dos elementos `<Bar />` para que fiquem da esquerda para a direita de forma decrescente:
   - Barra 1 (Competidores): `height="h-32" label="Outros" color="bg-concept-blue/20"`
   - Barra 2 (Outros): `height="h-16" label="" color="bg-concept-blue/40"`
   - Barra 3 (Concept): `height="h-8" label="Concept" color="bg-concept-blue" highlight`
3. Ajuste a lógica do componente `Bar` para garantir que o badge de destaque (badge com o texto `Concept`) e o rótulo inferior (`CONCEPT`) estejam alinhados de forma consistente com a barra correspondente, prevenindo que eles se desloquem ou se sobreponham horizontalmente.

## Verificação
1. Verificar visualmente na página localhost:
   - A barra da esquerda é alta e cinza/azul claro (`OUTROS`).
   - A barra do meio é média e azul intermediário (sem label).
   - A barra da direita é baixa, azul escuro sólido, tem a label `CONCEPT` abaixo e um badge retangular azul escuro com o texto `Concept` centralizado logo acima da barra.
