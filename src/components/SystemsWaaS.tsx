"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Calendar, Cpu, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';

const shelfAssets = [
    {
        id: 'waas',
        icon: Layers,
        title: "Sistemas Multi-Tenant (WaaS)",
        subtitle: "Escalabilidade Absoluta",
        description: "Estruturas de software robustas criadas para suportar milhares de clientes isolados de forma segura sob o modelo Software como Serviço (SaaS). Perfeito para franquias, clínicas e redes de varejo.",
        roi: "Retorno sobre investimento imediato através da redução do custo de infraestrutura e gestão centralizada.",
        specs: ["Isolamento lógico de banco de dados", "Subdomínios dinâmicos automatizados", "Painel de controle administrativo centralizado"],
        innerFlow: {
            title: "Fluxo de Roteamento Multi-Tenant",
            steps: [
                { name: "Acesso do Cliente", desc: "cliente.suaplataforma.com.br" },
                { name: "Roteador Inteligente", desc: "Identificação automática de Tenant via cabeçalhos" },
                { name: "Isolamento de Dados", desc: "Banco de dados isolado com criptografia SSL nativa" }
            ]
        }
    },
    {
        id: 'booking',
        icon: Calendar,
        title: "Plataformas de Agendamento & Cardápio",
        subtitle: "Operação Sem Gargalos",
        description: "Aplicações de agendamento em tempo real e cardápios inteligentes integrados para comércios refinados, consultórios e casas de carnes. Painel administrativo completo para controle operacional total.",
        roi: "Zera o tempo de espera do cliente e aumenta em até 35% o ticket médio através de sugestões por IA.",
        specs: ["Sincronização bidirecional de calendário", "Notificações push e WhatsApp automáticas", "Painel financeiro integrado com conciliação"],
        innerFlow: {
            title: "Motor de Reserva e Sugestão",
            steps: [
                { name: "Escolha do Serviço/Item", desc: "Painel interativo de alta conversão" },
                { name: "Validação de Conflito", desc: "Verificação instantânea em milissegundos" },
                { name: "Engenharia de Notificação", desc: "Disparo automático de WhatsApp de confirmação" }
            ]
        }
    },
    {
        id: 'automation',
        icon: Cpu,
        title: "Automações de Workflows B2B (AI/n8n)",
        subtitle: "Eficiência Silenciosa",
        description: "Integração cirúrgica de esteiras de prospecção, sincronização de CRMs e orquestração de Inteligência Artificial para eliminar tarefas operacionais manuais de vendas.",
        roi: "Substitui até 80 horas de trabalho repetitivo semanal por automações de workflows blindados.",
        specs: ["Integração de APIs e Webhooks via n8n", "Agente de IA para qualificação de leads", "Notificações e alertas operacionais imediatos"],
        innerFlow: {
            title: "Workflow de Prospecção com IA",
            steps: [
                { name: "Captura de Lead", desc: "Formulários de alta conversão ou Webhook B2B" },
                { name: "Qualificação por IA", desc: "Processamento de dados de autoridade e cargo" },
                { name: "Distribuição e CRM", desc: "Registro no CRM e alerta no Slack/WhatsApp" }
            ]
        }
    }
];

const SystemsWaaS = () => {
    const [activeTab, setActiveTab] = useState(shelfAssets[0]);

    return (
        <section id="sistemas" className="py-32 relative bg-concept-blue overflow-hidden min-h-screen flex flex-col justify-center">
            {/* Fine border guide lines */}
            <div className="absolute top-0 left-[15%] w-[1px] h-full bg-white/[0.03] pointer-events-none" />
            <div className="absolute top-0 right-[15%] w-[1px] h-full bg-white/[0.03] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                
                {/* Section Header with 80% negative space layout style */}
                <div className="max-w-4xl mb-24 md:pl-[15%]">
                    <span className="text-concept-yellow text-xs font-bold uppercase tracking-[0.25em] mb-4 block">
                        Concept Systems (WaaS)
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold font-montserrat text-white leading-[1.1] tracking-tight mb-8">
                        Engenharia de Software Sob Medida para Operações que Não Podem Falhar.
                    </h2>
                    <div className="w-24 h-[1px] bg-concept-yellow" />
                </div>

                {/* Main Content Layout - betrays Bento grids by using flat typographic interactive split */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:pl-[15%] md:pr-[15%] items-start">
                    
                    {/* Left 5 cols: Interactive Selector Buttons */}
                    <div className="lg:col-span-5 space-y-4">
                        {shelfAssets.map((asset) => {
                            const Icon = asset.icon;
                            const isActive = activeTab.id === asset.id;

                            return (
                                <button
                                    key={asset.id}
                                    onClick={() => setActiveTab(asset)}
                                    className={`w-full text-left p-6 transition-all border-[1px] flex gap-5 items-start ${
                                        isActive
                                            ? 'bg-concept-white border-concept-yellow text-concept-blue'
                                            : 'bg-transparent border-white/10 text-white hover:border-white/20'
                                    }`}
                                >
                                    <div className={`p-3 border-[1px] ${isActive ? 'border-concept-blue text-concept-blue' : 'border-white/10 text-concept-yellow'}`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold font-montserrat uppercase tracking-wider mb-1">
                                            {asset.title}
                                        </h3>
                                        <p className={`text-xs ${isActive ? 'text-concept-blue/70' : 'text-white/50'} uppercase tracking-widest font-semibold`}>
                                            {asset.subtitle}
                                        </p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Right 7 cols: Interactive Flow Demonstration & Details */}
                    <div className="lg:col-span-7 bg-[#041885]/40 border border-white/10 p-8 md:p-12 text-white relative min-h-[500px] flex flex-col justify-between">
                        
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="space-y-8 flex-1 flex flex-col justify-between"
                            >
                                <div>
                                    <span className="text-concept-yellow text-xs font-bold uppercase tracking-widest block mb-2">
                                        Especificação de Ativo
                                    </span>
                                    <h4 className="text-2xl md:text-3xl font-bold font-montserrat mb-4 text-white">
                                        {activeTab.title}
                                    </h4>
                                    <p className="text-sm text-white/80 leading-relaxed font-poppins font-light mb-6">
                                        {activeTab.description}
                                    </p>

                                    {/* Specifications Checklist */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                                        {activeTab.specs.map((spec, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <CheckCircle2 className="w-4 h-4 text-concept-yellow flex-shrink-0" />
                                                <span className="text-xs text-white/90 font-poppins">{spec}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Dynamic Visual Flow Simulation */}
                                <div className="border border-white/5 bg-concept-blue/80 p-6 rounded-none relative">
                                    <div className="absolute top-0 right-0 px-3 py-1 bg-concept-yellow text-concept-blue text-[9px] font-bold uppercase tracking-widest font-mono">
                                        Simulador de Fluxo
                                    </div>
                                    <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-4 font-bold">
                                        {activeTab.innerFlow.title}
                                    </span>

                                    <div className="space-y-4">
                                        {activeTab.innerFlow.steps.map((step, idx) => (
                                            <div key={idx} className="flex items-center gap-4 relative">
                                                {idx < activeTab.innerFlow.steps.length - 1 && (
                                                    <div className="absolute left-3 top-6 bottom-[-20px] w-[1px] bg-concept-yellow/30 border-dashed" />
                                                )}
                                                <div className="w-6 h-6 flex items-center justify-center border border-concept-yellow text-concept-yellow font-mono text-xs font-bold rounded-none z-10 bg-concept-blue">
                                                    0{idx + 1}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold uppercase tracking-wider text-white">
                                                        {step.name}
                                                    </p>
                                                    <p className="text-[11px] text-white/60 font-mono">
                                                        {step.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-white/10 mt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div className="flex gap-3 items-center">
                                        <ShieldAlert className="w-4 h-4 text-concept-yellow" />
                                        <span className="text-[11px] text-white/70 font-poppins max-w-sm">
                                            <strong>Retorno sobre Investimento:</strong> {activeTab.roi}
                                        </span>
                                    </div>
                                    <button 
                                        onClick={() => {
                                            const contactSection = document.getElementById('contact');
                                            if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="group flex items-center gap-2 text-concept-yellow font-bold uppercase tracking-widest text-xs"
                                    >
                                        Solicitar Solução
                                        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                                    </button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Technical Differentiator Banner - high contrast White Block */}
                <div className="mt-24 bg-concept-white text-concept-blue border border-white/10 p-8 md:p-12 md:ml-[15%] md:mr-[15%]">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <span className="text-[10px] text-concept-blue/50 uppercase tracking-widest font-bold block mb-1">
                                Especificação Técnica
                            </span>
                            <h5 className="text-lg font-bold font-montserrat uppercase tracking-wider">
                                Clean Code
                            </h5>
                            <p className="text-xs text-concept-blue/70 mt-2 font-poppins">
                                Código limpo, extensível e documentado para facilitar futuras evoluções sem dependências.
                            </p>
                        </div>
                        <div>
                            <span className="text-[10px] text-concept-blue/50 uppercase tracking-widest font-bold block mb-1">
                                Segurança de Elite
                            </span>
                            <h5 className="text-lg font-bold font-montserrat uppercase tracking-wider">
                                SSL Nativa & LGPD
                            </h5>
                            <p className="text-xs text-concept-blue/70 mt-2 font-poppins">
                                Blindagem de dados corporativos seguindo as melhores práticas globais de privacidade.
                            </p>
                        </div>
                        <div>
                            <span className="text-[10px] text-concept-blue/50 uppercase tracking-widest font-bold block mb-1">
                                Engine de Vendas
                            </span>
                            <h5 className="text-lg font-bold font-montserrat uppercase tracking-wider">
                                React & Next.js
                            </h5>
                            <p className="text-xs text-concept-blue/70 mt-2 font-poppins">
                                Resposta instantânea em milissegundos para maximizar a conversão de leads premium.
                            </p>
                        </div>
                        <div>
                            <span className="text-[10px] text-concept-blue/50 uppercase tracking-widest font-bold block mb-1">
                                Tipografia Pura
                            </span>
                            <h5 className="text-lg font-bold font-montserrat uppercase tracking-wider">
                                Poppins & Inter
                            </h5>
                            <p className="text-xs text-concept-blue/70 mt-2 font-poppins">
                                Estética tipográfica corporativa limpa para gerar imediata percepção de autoridade.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default SystemsWaaS;
