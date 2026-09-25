# Protótipo Comercial - Site de Leilão de Carros (DriveBid Pro)

## Goal
Construir um protótipo navegável de leilão de veículos de alta fidelidade visual (Dark Mode estilo DriveBay com acentos amarelo-ouro), com vitrine de lotes, cronômetro dinâmico regressivo, simulação de lances em tempo real com prova social, página individual com galeria/zoom, checklist de avarias e visualizador de Laudo Cautelar Pericial com exportação para apresentação e fechamento comercial na Vercel.

## Tasks
- [x] Task 1: Inicializar projeto Next.js 14/15 App Router com Tailwind CSS, TypeScript, Lucide Icons e Canvas-Confetti → Verify: `npm run build` executa sem erros.
- [x] Task 2: Configurar Design System automotivo (Dark Luxury `#0A0A0A` + Ouro `#FFB800` / `#FACC15`), Web Audio sintetizado (martelo de leilão e sino de lance) e dados mockados ultra-realistas de lotes de leilão → Verify: tipos e mock com 8 veículos detalhados prontos.
- [x] Task 3: Criar Gerenciador de Estado de Leilão (`useAuctionStore` / Context) com suporte a LocalStorage, motor de lances manuais, motor de disputa automática com bots rivais, prorrogação anti-sniping (+60s) e botão de reset → Verify: lances atualizam estado e persistem no localStorage.
- [x] Task 4: Desenvolver Navbar Comercial, Banner de Disputa Ativa, Seletor de Pátios e Destaque Hero inspirado no DriveBay com cronômetro modular em blocos → Verify: banner hero e filtros renderizam responsivos.
- [x] Task 5: Desenvolver Grid Vitrine de Lotes com cards de alta conversão, tags de categorias ("Recuperados de Financiamento", "Sinistro Médio", "Frotas"), cronômetros regressivos dinâmicos e botões de lance rápido → Verify: cards contam segundos regressivamente e exibem preços atualizados.
- [x] Task 6: Desenvolver Página Individual do Lote (`/lote/[id]`) com Galeria de Fotos com Zoom, Arena de Lances interativa (+ R$ 500, + R$ 1.000, custom) e Histórico Lateral de Lances ao vivo → Verify: dar lance gera som, atualiza preço na hora e registra no histórico lateral com toast.
- [x] Task 7: Implementar Seção de Especificações Técnicas, Checklist Visual de Avarias e FAQ Completo sobre Retirada, Documentação e Pagamento → Verify: checklist e sanfonas de FAQ funcionam com animação.
- [x] Task 8: Implementar Modal do Laudo Cautelar Pericial Oficial (estilo DEKRA/Super Visão) com QR Code, apontamentos estruturais e botão de Imprimir/Salvar em PDF formatado para impressão → Verify: modal abre, renderiza laudo estilizado e aciona print do navegador.
- [x] Task 9: Validação final, responsividade mobile, auditoria de lint/build e preparação para deploy na Vercel → Verify: `npm run build` gera páginas estáticas e dinâmicas com sucesso.

## Done When
- [x] Interface visual idêntica ao padrão de referência DriveBay (Dark + Amarelo Ouro).
- [x] Vitrine com contadores regressivos ativos e filtros por categoria.
- [x] Lances interativos funcionais com histórico ao vivo, som e modo de disputa automática.
- [x] Página de detalhes com zoom de fotos, checklist de avarias e laudo cautelar pericial completo com exportação em PDF.
- [x] Build 100% verde pronto para deploy na Vercel.
