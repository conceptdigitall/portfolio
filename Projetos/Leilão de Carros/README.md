# VoltBid Pro • Plataforma de Leilão de Bikes Elétricas (Protótipo Comercial)

Protótipo navegável de alta fidelidade desenvolvido especificamente para apresentação comercial, validação com o cliente e fechamento de contrato no mercado de **Leilões de Bicicletas Elétricas (e-Bikes & Mobilidade Urbana)**.

Inspirado na estética moderna e luxuosa da **DriveBay** (Dark Mode automotivo `#080808` com acentos em Amarelo Ouro `#FFB800`), contadores de tempo regressivos modulares e mecanismo de disputa de lances em tempo real.

---

## 🚀 Como Executar Localmente

```bash
# 1. Instalar as dependências
npm install

# 2. Iniciar o servidor de desenvolvimento
npm run dev

# 3. Acessar no navegador
http://localhost:3000
```

---

## ☁️ Deploy Imediato na Vercel

O projeto foi construído seguindo 100% as convenções nativas do **Next.js App Router**:

1. Suba o repositório para o seu GitHub/GitLab (`https://github.com/conceptdigitall/leilaocarros`).
2. Acesse [vercel.com](https://vercel.com) e clique em **Add New Project**.
3. Selecione o repositório — a Vercel detectará automaticamente o framework Next.js.
4. Clique em **Deploy** (sem necessidade de variáveis de ambiente obrigatórias).
5. O link estará ativo em ~60 segundos para você enviar diretamente para o cliente!

---

## 🎯 Roteiro de Demonstração para Fechar o Contrato (Pitch Comercial)

Durante a reunião com o cliente ou diretoria, siga esta sequência de demonstração para gerar o máximo de impacto:

1. **Impacto Visual Inicial (Hero E-Bike & Inspiração DriveBay):**
   - Apresente o Lote em Destaque (`Specialized Turbo Levo Pro Carbon 2024`).
   - Mostre o **Cronômetro Regressivo Dinâmico em Blocos** com contagem em segundos ao vivo.
   - Destaque o comparativo com o **Preço de Nova no Mercado** (-48% vs Nova) e as métricas cruciais de e-bike: **Saúde da Bateria (98% SoH • 14 ciclos)** e **Motor Brose 90Nm**.

2. **Simulação de Lances & Prova Social (Gatilho de Urgência):**
   - Na própria vitrine ou no Hero, clique em `+ R$ 1.000` ou no botão `Dar Lance`.
   - Mostre o **som de sino/martelo sintetizado** (sem depender de arquivos externos), o disparo de **confetes**, a atualização instantânea do valor e o toast de liderança da disputa.
   - Aponte para o switch **`Modo Disputa: ON`** no topo da tela: a cada 18 segundos, bots simulados com nomes reais de ciclistas e bike shops (*"Pedal E-Riders SP"*, *"Veloce Bike Shop - SC"*) dão lances concorrentes, provando ao cliente como a plataforma cria senso de urgência e disputa real entre compradores.

3. **Regra de Prorrogação Anti-Sniping (+60s):**
   - Mostre que lances no final da contagem ativam automaticamente a prorrogação do cronômetro para evitar que usuários percam lotes no último segundo.

4. **Página Individual do Lote & Laudo Técnico de E-Bike:**
   - Acesse o Lote #001 ou Lote #002.
   - Navegue pela galeria de fotos em alta resolução e acione o botão **`Zoom`**.
   - Mostre a **Ficha Técnica Especializada de E-Bike**: capacidade da bateria (Wh), ciclos, torque nominal (Nm), tamanho do quadro, peso e carregador incluso.
   - Desça até o **Checklist de Avarias** e abra o botão **`Edital & Laudo da Bateria`**:
     - Um documento com padrão pericial oficial se abre com QR Code, pontuação (99/100), perito CREA credenciado, telemetria oficial do motor/bateria e varredura por ultrassom do quadro de carbono sem trincas.
     - Clique em **`Imprimir / Salvar PDF`**: o laudo é formatado perfeitamente para impressão ou geração de PDF oficial pelo navegador!

5. **Controle Total da Demo (`↺ Reset Demo`):**
   - Todos os lances persistem no `localStorage` (se você der F5 na frente do cliente, nada se perde!).
   - Ao final da reunião, clique no botão **`Reset Demo`** no topo para restaurar os lotes originais para a próxima apresentação.

---

## 🛠️ Stack Tecnológica

- **Framework:** Next.js 14 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS v3 (Dark Mode, Amarelo Ouro `#FFB800`)
- **Ícones:** Lucide React
- **Áudio:** Web Audio API Sintetizado (Zero dependência de arquivos externos)
- **Efeitos:** Canvas Confetti
- **Estado & Persistência:** React Context API + LocalStorage Sync
