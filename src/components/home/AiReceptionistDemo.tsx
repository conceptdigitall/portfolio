'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  NICHES, 
  TONES, 
  NicheData, 
  ToneType, 
  ChatMessage, 
  QuickPrompt 
} from '@/data/aiReceptionistData';
import WhatsAppLink, { WhatsAppIcon } from './WhatsAppLink';
import { 
  Sparkles, 
  CheckCheck, 
  Send, 
  Clock, 
  ShieldCheck, 
  RotateCcw, 
  Bot, 
  Calendar, 
  UserCheck, 
  ArrowRight 
} from 'lucide-react';

export default function AiReceptionistDemo({ initialNicheId }: { initialNicheId?: string }) {
  const [selectedNicheId, setSelectedNicheId] = useState<string>(
    () => NICHES.find((n) => n.id === initialNicheId)?.id ?? 'clinica'
  );
  const [selectedTone, setSelectedTone] = useState<ToneType>('sofisticado');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [activePromptInfo, setActivePromptInfo] = useState<{ intent: string; crmAction: string } | null>(null);

  const activeNiche = NICHES.find((n) => n.id === selectedNicheId) || NICHES[0];
  const activeToneConfig = TONES.find((t) => t.id === selectedTone) || TONES[0];

  // Reset conversation when niche or tone changes
  useEffect(() => {
    setIsTyping(true);
    setActivePromptInfo(null);
    const initial = activeNiche.initialConversation[selectedTone] || [];
    
    const timer = setTimeout(() => {
      setChatHistory(initial);
      setIsTyping(false);
    }, 350);

    return () => clearTimeout(timer);
  }, [selectedNicheId, selectedTone, activeNiche]);

  const handleSendPrompt = (prompt: QuickPrompt) => {
    if (isTyping) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'client',
      text: prompt.question,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    setChatHistory((prev) => [...prev, userMsg]);
    setIsTyping(true);
    setActivePromptInfo({
      intent: prompt.intent,
      crmAction: prompt.crmAction,
    });

    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'ai',
        text: prompt.answers[selectedTone],
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      };
      setChatHistory((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 600);
  };

  const handleReset = () => {
    setIsTyping(true);
    setActivePromptInfo(null);
    setTimeout(() => {
      setChatHistory(activeNiche.initialConversation[selectedTone] || []);
      setIsTyping(false);
    }, 200);
  };

  return (
    <div className="w-full flex flex-col gap-10">
      {/* 1. SELETOR DE NICHOS */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-concept-yellow flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            1. Escolha o nicho de mercado
          </span>
          <span className="text-xs text-night-muted hidden sm:inline">
            Clique para ver a IA adaptada para cada setor
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {NICHES.map((niche) => {
            const isActive = niche.id === selectedNicheId;
            return (
              <button
                key={niche.id}
                onClick={() => setSelectedNicheId(niche.id)}
                className={`flex flex-col items-start gap-1.5 p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-concept-blue/20 border-concept-yellow shadow-[0_0_20px_rgba(252,224,38,0.15)] ring-1 ring-concept-yellow'
                    : 'bg-night-card border-night-line hover:border-night-edge hover:bg-night-card/80 text-night-muted'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-2xl">{niche.icon}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-concept-yellow animate-pulse" />
                  )}
                </div>
                <span className={`font-poppins text-sm font-bold leading-tight ${isActive ? 'text-white' : 'text-night-text'}`}>
                  {niche.name}
                </span>
                <span className="text-[11px] text-night-muted leading-tight">
                  {niche.category}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. SELETOR DE TOM DE VOZ */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-concept-sky flex items-center gap-1.5">
            <Bot className="w-4 h-4" />
            2. Escolha o tom de voz da IA
          </span>
          <span className="text-xs text-night-muted hidden sm:inline">
            A mesma empresa, adaptada ao perfil do cliente
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {TONES.map((tone) => {
            const isActive = tone.id === selectedTone;
            return (
              <button
                key={tone.id}
                onClick={() => setSelectedTone(tone.id)}
                className={`p-4 rounded-2xl border text-left flex flex-col gap-2 transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-night-card border-concept-sky ring-1 ring-concept-sky shadow-[0_0_20px_rgba(61,91,255,0.2)]'
                    : 'bg-night-card/60 border-night-line hover:border-night-edge'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-poppins text-sm font-bold ${isActive ? 'text-white' : 'text-night-text'}`}>
                    {tone.label}
                  </span>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-concept-sky text-white' : 'bg-night-edge text-night-muted'
                  }`}>
                    {tone.badge}
                  </span>
                </div>
                <p className="text-xs text-night-muted leading-relaxed font-light">
                  {tone.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. SIMULADOR DO WHATSAPP + PAINEL DE INTELIGÊNCIA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Mockup do WhatsApp (7 colunas em telas grandes) */}
        <div className="lg:col-span-7 bg-[#0b141a] border border-[#202c33] rounded-[32px] overflow-hidden shadow-2xl flex flex-col min-h-[580px]">
          
          {/* Header do WhatsApp */}
          <div className="bg-[#202c33] px-4 py-3.5 flex items-center justify-between border-b border-[#2a3942]">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-white/10 shrink-0">
                <Image
                  src={activeNiche.avatar}
                  alt={activeNiche.businessName}
                  fill
                  className="object-cover"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#00a884] border-2 border-[#202c33] rounded-full" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-white leading-snug">
                    {activeNiche.businessName}
                  </span>
                  <span className="text-[10px] bg-[#00a884]/20 border border-[#00a884]/40 text-[#00a884] font-bold px-1.5 py-0.2 rounded">
                    IA Oficial
                  </span>
                </div>
                <span className="text-[11px] text-[#00a884] font-medium">
                  {isTyping ? 'digitando...' : 'online · responde em segundos'}
                </span>
              </div>
            </div>

            <button
              onClick={handleReset}
              title="Reiniciar simulação"
              className="text-white/40 hover:text-concept-yellow transition p-2 rounded-full hover:bg-white/5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Banner de Criptografia e Segurança */}
          <div className="bg-[#182229] py-2 px-4 text-center border-b border-[#222e35]">
            <span className="text-[11px] text-[#8696a0] flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00a884]" />
              Atendimento automatizado com regras exclusivas de {activeNiche.name}
            </span>
          </div>

          {/* Corpo das Mensagens */}
          <div className="flex-1 p-4 md:p-6 flex flex-col gap-3.5 overflow-y-auto bg-[radial-gradient(#1f2c34_1px,transparent_1px)] [background-size:16px_16px]">
            {chatHistory.map((msg) => {
              const isAi = msg.sender === 'ai';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isAi ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm relative ${
                      isAi
                        ? 'bg-[#202c33] text-white rounded-tl-sm'
                        : 'bg-[#005c4b] text-white rounded-tr-sm'
                    }`}
                  >
                    <p className="whitespace-pre-line font-light">{msg.text}</p>
                    <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-white/50">
                      <span>{msg.time}</span>
                      {isAi && <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />}
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-start">
                <div className="bg-[#202c33] text-white/70 rounded-2xl rounded-tl-sm px-4 py-3 text-xs flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00a884] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00a884] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00a884] animate-bounce [animation-delay:0.4s]" />
                  <span className="ml-1 text-[11px] text-[#8696a0]">IA consultando regras do negócio...</span>
                </div>
              </div>
            )}
          </div>

          {/* Barra de Testes Rápidos (Perguntas sugeridas) */}
          <div className="bg-[#1f2c34] p-3.5 border-t border-[#2a3942] flex flex-col gap-2.5">
            <span className="text-[11px] text-[#8696a0] font-medium">
              Clique em uma dúvida para ver a IA responder neste tom:
            </span>
            <div className="flex flex-wrap gap-2">
              {activeNiche.prompts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSendPrompt(p)}
                  disabled={isTyping}
                  className="text-xs bg-[#2a3942] hover:bg-[#32424b] text-white/90 hover:text-white px-3 py-1.5 rounded-xl border border-white/5 hover:border-concept-yellow/40 transition-all text-left flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3 h-3 text-concept-yellow shrink-0" />
                  <span>{p.question}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Painel de Inteligência / Raio-X do Sistema (5 colunas) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          
          {/* Card Raio-X da IA */}
          <div className="bg-night-card border border-night-line rounded-3xl p-6 sm:p-7 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-night-line pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-concept-blue/20 border border-concept-sky/30 flex items-center justify-center text-concept-sky">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-poppins text-base font-bold text-white">Raio-X do Atendimento</h3>
                  <span className="text-xs text-night-muted">Processamento em tempo real</span>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold text-concept-yellow px-2.5 py-1 rounded-full bg-concept-yellow/10 border border-concept-yellow/30">
                24h / 7 dias
              </span>
            </div>

            <div className="flex flex-col gap-4 text-xs">
              <div className="flex flex-col gap-1 bg-night/60 border border-night-line/80 rounded-2xl p-3.5">
                <span className="text-night-muted uppercase tracking-wider text-[10px] font-semibold">
                  Intenção Identificada
                </span>
                <span className="font-poppins font-bold text-sm text-white">
                  {activePromptInfo ? activePromptInfo.intent : 'Triagem & Boas-vindas'}
                </span>
              </div>

              <div className="flex flex-col gap-1 bg-night/60 border border-night-line/80 rounded-2xl p-3.5">
                <span className="text-night-muted uppercase tracking-wider text-[10px] font-semibold">
                  Ação Executada no CRM / Agenda
                </span>
                <span className="font-poppins font-semibold text-xs text-concept-sky">
                  {activePromptInfo ? activePromptInfo.crmAction : 'Qualificou interesse e ofertou datas disponíveis'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-night/60 border border-night-line/80 rounded-2xl p-3">
                  <span className="text-night-muted text-[10px] block mb-1">Tempo de Resposta</span>
                  <span className="font-mono text-base font-bold text-emerald-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> 1.4s
                  </span>
                </div>
                <div className="bg-night/60 border border-night-line/80 rounded-2xl p-3">
                  <span className="text-night-muted text-[10px] block mb-1">Transbordo Humano</span>
                  <span className="font-mono text-base font-bold text-white flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5 text-concept-yellow" /> Suave
                  </span>
                </div>
              </div>
            </div>

            {/* Destaque das 4 Regras de Ouro */}
            <div className="border-t border-night-line pt-5 flex flex-col gap-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-night-dim">
                Por que a IA da Concept não erra?
              </span>
              <ul className="space-y-2 text-xs text-night-muted">
                <li className="flex items-start gap-2">
                  <span className="text-concept-yellow font-bold">✓</span>
                  <span><strong>Zero alucinações:</strong> só responde com base no manual de conhecimento aprovado pelo dono.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-concept-yellow font-bold">✓</span>
                  <span><strong>Não é bot genérico:</strong> qualifica, consulta agenda e agenda direto no Google Calendar ou CRM.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-concept-yellow font-bold">✓</span>
                  <span><strong>Recupera leads noturnos:</strong> responde às 23h ou domingos quando a recepção está fechada.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Comercial */}
          <div className="bg-gradient-to-br from-concept-blue to-[#041575] rounded-3xl p-6 text-white flex flex-col gap-4 shadow-xl">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-concept-yellow">
                Personalizado para o seu negócio
              </span>
              <h4 className="font-poppins text-lg font-bold leading-tight">
                Quer ver essa IA atendendo com a voz da sua empresa?
              </h4>
              <p className="text-xs text-white/80 leading-relaxed font-light">
                Criamos um teste guiado com as perguntas reais dos seus clientes antes de colocar no ar.
              </p>
            </div>

            <WhatsAppLink
              buttonId="cta_receptionist_demo"
              thankYou
              message={`Olá! Vi o simulador do Recepcionista de IA para o nicho de ${activeNiche.name} e quero agendar uma demonstração para a minha empresa.`}
              className="bg-concept-yellow hover:bg-[#ebd01e] text-concept-ink font-semibold text-sm px-5 py-3 rounded-full flex items-center justify-center gap-2 transition shadow-lg cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Solicitar demonstração no WhatsApp
            </WhatsAppLink>
          </div>

        </div>

      </div>
    </div>
  );
}
