"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowRight, ArrowLeft, MessageCircle, RefreshCw, 
    TrendingDown, Zap, MousePointerClick, Smartphone, 
    DollarSign, AlertCircle, Award, User, Briefcase, Building 
} from 'lucide-react';

// Question data structure
const questions = [
    {
        id: 1,
        title: "Qual é o seu modelo de negócio principal hoje?",
        subtitle: "Selecione a categoria que melhor descreve a sua atuação no mercado.",
        options: [
            { id: 'A', label: "Profissional Liberal", desc: "Médico, Advogado, Consultor, Psicólogo, Designer", icon: User },
            { id: 'B', label: "Empresa de Serviços / B2B", desc: "Agências, Empresas de TI, Consultorias Corporativas", icon: Briefcase },
            { id: 'C', label: "Comércio Local / Clínica Física", desc: "Lojas, Academias, Consultórios, Escolas", icon: Building },
            { id: 'D', label: "Infoprodutor / Coprodutor", desc: "Cursos Online, Mentorias, E-books, Comunidades", icon: Zap },
        ]
    },
    {
        id: 2,
        title: "Onde você sente que está rasgando mais dinheiro hoje?",
        subtitle: "Qual é o principal gargalo invisível que trava o seu faturamento digital?",
        options: [
            { id: 'A', label: "Falta de Presença / Boca a boca", desc: "Dependo 100% de indicações. Se elas param, meu faturamento despenca.", icon: AlertCircle },
            { id: 'B', label: "Design Lento ou Amador", desc: "Meu site atual não passa o valor e o profissionalismo que eu entrego.", icon: Smartphone },
            { id: 'C', label: "Leads Curiosos / Sem Grana", desc: "Chegam muitos leads no WhatsApp, mas só perguntam preço e somem.", icon: MousePointerClick },
            { id: 'D', label: "ROI de Anúncios Baixo", desc: "Invisto em anúncios (Meta/Google), mas a página não converte em vendas.", icon: TrendingDown },
        ]
    },
    {
        id: 3,
        title: "Qual é a sua meta de faturamento mensal desejada com o digital?",
        subtitle: "Aonde você deseja chegar com a escala da sua máquina de vendas?",
        options: [
            { id: 'A', label: "Até R$ 20.000 / mês", desc: "Estabelecer as primeiras vendas e faturamento recorrente.", icon: DollarSign },
            { id: 'B', label: "De R$ 20.000 a R$ 50.000 / mês", desc: "Escalar a operação digital de forma consistente.", icon: DollarSign },
            { id: 'C', label: "De R$ 50.000 a R$ 100.000 / mês", desc: "Consolidar a marca como referência de alta conversão.", icon: DollarSign },
            { id: 'D', label: "Acima de R$ 100.000 / mês", desc: "Dominar o mercado com faturamento de sete dígitos.", icon: Award },
        ]
    }
];

// Custom diagnostics mapping based on chosen answers
const getDiagnostics = (answers: Record<number, string>) => {
    const businessModel = answers[1];
    const mainPain = answers[2];
    const targetIncome = answers[3];

    let title = "";
    let scoreText = "";
    let solutionTitle = "";
    let solutionDesc = "";

    // 1. Map Pain Points (Passo 2)
    switch (mainPain) {
        case 'A':
            title = "A Cilada da Indicação Invisível";
            scoreText = "Seu negócio está operando no 'modo sobrevivência comercial'. Viver de indicação significa que você não é dono da sua escala. Se a fonte do boca a boca secar amanhã, sua operação para.";
            solutionTitle = "Máquina Automática de Atração Premium";
            solutionDesc = "Precisamos desenhar o seu Posicionamento de Elite Digital. Criar um Ecossistema que atrai leads ativamente todos os dias, permitindo que você controle a previsibilidade do seu faturamento.";
            break;
        case 'B':
            title = "O Custo Oculto da Imagem Amadora";
            scoreText = "Você está sofrendo o 'Imposto do Design Lento'. Sites que demoram mais de 3 segundos para carregar ou possuem visual ultrapassado reduzem sua percepção de valor a zero. O cliente julga o seu preço pela aparência.";
            solutionTitle = "Ecossistema Next.js com Design de Grife";
            solutionDesc = "Desenvolveremos um site ultra rápido em Next.js com estética high-end (visual Apple/Premium). Isso fará seu cliente premium desejar fechar com você antes mesmo de falar do preço.";
            break;
        case 'C':
            title = "A Invasão de Curiosos sem Orçamento";
            scoreText = "Você está perdendo horas produtivas fazendo papel de atendente de curiosos. Atrair mensagens no WhatsApp não significa vender. Se os leads não têm dinheiro, sua página falhou em filtrar.";
            solutionTitle = "Funil com Qualificação Comercial Ativa";
            solutionDesc = "Integrar barreiras de quebra de objeções e filtros inteligentes na sua página de conversão, fazendo com que apenas leads extremamente qualificados e prontos para comprar cheguem ao seu WhatsApp.";
            break;
        case 'D':
            title = "A Sangria nos Anúncios de Meta/Google";
            scoreText = "Você está rasgando dinheiro enriquecendo o Facebook e o Google. Fazer tráfego para um destino que não converte é como tentar encher um balde furado. O gargalo não são os anúncios, é a conversão.";
            solutionTitle = "Funil LPO (Landing Page Optimization) de Alta Conversão";
            solutionDesc = "Reformulação total da copy (foco em copywriting de elite) e da engenharia da página para reduzir drasticamente o seu custo por lead (CPL) e multiplicar a taxa de fechamento.";
            break;
        default:
            title = "Gargalo Operacional Digital";
            scoreText = "Seu ecossistema digital atual não está preparado para suportar o crescimento da sua marca, causando perdas ocultas de faturamento todos os dias.";
            solutionTitle = "Máquina de Vendas Digital";
            solutionDesc = "Criação de uma estrutura digital de alta performance adaptada para o seu modelo de negócios.";
    }

    // 2. Map Business Models (Passo 1)
    let modelName = "";
    switch (businessModel) {
        case 'A': modelName = "Profissional Liberal"; break;
        case 'B': modelName = "Empresa de Serviços / B2B"; break;
        case 'C': modelName = "Comércio Local / Clínica"; break;
        case 'D': modelName = "Infoprodutor"; break;
        default: modelName = "Empreendedor";
    }

    // 3. Map Income Targets (Passo 3)
    let incomeText = "";
    switch (targetIncome) {
        case 'A': incomeText = "Até 20k/mês"; break;
        case 'B': incomeText = "20k a 50k/mês"; break;
        case 'C': incomeText = "50k a 100k/mês"; break;
        case 'D': incomeText = "Mais de 100k/mês"; break;
    }

    return {
        title,
        scoreText,
        solutionTitle,
        solutionDesc,
        modelName,
        incomeText,
        painName: mainPain === 'A' ? "Falta de Presença" : mainPain === 'B' ? "Design Amador/Lento" : mainPain === 'C' ? "Leads Curiosos" : "ROI Baixo"
    };
};

const BusinessQuiz = () => {
    const [step, setStep] = useState(0); // 0: Start, 1-3: Questions, 4: Result
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [score, setScore] = useState(0);
    const [animatedScore, setAnimatedScore] = useState(0);

    // Dynamic Score calculation algorithm
    const calculateScore = (ans: Record<number, string>) => {
        let base = 30;
        // Passo 2 (Dor):
        if (ans[2] === 'A') base += 5;   // Falta de Presença (Média Gravidade)
        if (ans[2] === 'B') base += 10;  // Design Lento (Alta Gravidade)
        if (ans[2] === 'C') base += 15;  // Leads Curiosos (Mapeamento Comercial)
        if (ans[2] === 'D') base += 20;  // ROI Baixo (Altíssimo Risco)

        // Passo 3 (Meta Faturamento):
        if (ans[3] === 'A') base += 5;
        if (ans[3] === 'B') base += 12;
        if (ans[3] === 'C') base += 22;
        if (ans[3] === 'D') base += 32;

        return Math.min(Math.max(base, 25), 85); // Mantém em um intervalo crível (25% a 85%)
    };

    const handleSelectOption = (optionId: string) => {
        const updatedAnswers = { ...answers, [step]: optionId };
        setAnswers(updatedAnswers);

        // Auto-advance with slight delay for premium feedback feel
        setTimeout(() => {
            if (step < questions.length) {
                setStep(step + 1);
            } else {
                const finalScore = calculateScore(updatedAnswers);
                setScore(finalScore);
                setStep(4);
            }
        }, 300);
    };

    const handlePrev = () => {
        if (step > 0) setStep(step - 1);
    };

    const handleReset = () => {
        setAnswers({});
        setScore(0);
        setAnimatedScore(0);
        setStep(1);
    };

    // Animate score dial on result screen load
    useEffect(() => {
        if (step === 4 && score > 0) {
            let start = 0;
            const duration = 1500; // ms
            const stepTime = Math.abs(Math.floor(duration / score));
            const timer = setInterval(() => {
                start += 1;
                setAnimatedScore(start);
                if (start >= score) {
                    clearInterval(timer);
                }
            }, stepTime);
            return () => clearInterval(timer);
        }
    }, [step, score]);

    const handleWhatsAppSubmit = () => {
        const diagnostics = getDiagnostics(answers);
        const text = `Olá Concept Digital! Realizei o Diagnóstico de Conversão no portfólio.\n\n` +
            `*Resultado do Diagnóstico:*\n` +
            `• *Perfil:* ${diagnostics.modelName}\n` +
            `• *Gargalo Comercial:* ${diagnostics.painName}\n` +
            `• *Meta de Escala:* ${diagnostics.incomeText}\n` +
            `• *Score de Conversão:* ${score}%\n\n` +
            `Gostaria de agendar a minha sessão de Diagnóstico VIP gratuito para eliminar esse gargalo!`;

        const encodedText = encodeURIComponent(text);
        const url = `https://wa.me/5513991353207?text=${encodedText}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const currentQuestion = questions[step - 1];
    const progressPercent = step > 0 && step <= 3 ? ((step - 1) / questions.length) * 100 : 0;

    return (
        <section id="diagnostico-quiz" className="py-24 relative bg-gradient-to-b from-[#050505] to-[#000B18] overflow-clip">
            {/* Ambient Background Glows (Amber/Gold ACCENTS, NO PURPLE) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-digital-primary/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-yellow-600/5 rounded-full blur-[120px] pointer-events-none translate-x-1/3 translate-y-1/3" />

            {/* Subtle Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none opacity-40" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header (Provocative & Direct) */}
                <div className="text-center mb-16">
                    <span className="text-digital-primary text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                        Validação de Performance
                    </span>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-montserrat text-white tracking-tighter max-w-4xl mx-auto leading-tight mb-6">
                        O seu ecossistema digital está <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-[#C5A059] to-red-500 bg-[length:200%_auto] animate-matrix-scroll inline-block">
                            RASGANDO DINHEIRO?
                        </span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-gray-400 text-base md:text-lg font-light leading-relaxed">
                        Descubra em menos de 1 minuto onde está o gargalo invisível que está sabotando as suas vendas e roubando o seu ROI de anúncios.
                    </p>
                </div>

                {/* Quiz Container Card (Soft Apple / Glassmorphism) */}
                <div className="max-w-3xl mx-auto">
                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0A0A0A]/70 backdrop-blur-2xl shadow-2xl p-8 md:p-12">
                        {/* Interactive Border Lights */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-digital-primary/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />

                        <AnimatePresence mode="wait">
                            {/* STEP 0: WELCOME SCREEN */}
                            {step === 0 && (
                                <motion.div
                                    key="start"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="text-center py-6 flex flex-col items-center"
                                >
                                    <div className="w-16 h-16 rounded-full bg-digital-primary/10 border border-digital-primary/30 flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(197,160,89,0.1)]">
                                        <Zap className="w-8 h-8 text-digital-primary animate-pulse" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-montserrat">
                                        Iniciar Diagnóstico Comercial
                                    </h3>
                                    <p className="text-gray-400 max-w-lg mb-10 leading-relaxed font-light">
                                        Responda 3 perguntas estratégicas e receba uma análise real do seu aproveitamento digital atual, sem enrolação.
                                    </p>
                                    <button
                                        onClick={() => setStep(1)}
                                        className="group relative px-8 py-4 bg-gradient-to-r from-digital-primary to-[#D4AF37] text-black font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(197,160,89,0.4)] rounded-xl flex items-center gap-2"
                                    >
                                        Começar Análise Gratuita
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </button>
                                </motion.div>
                            )}

                            {/* STEPS 1-3: QUESTIONS */}
                            {step > 0 && step <= 3 && currentQuestion && (
                                <motion.div
                                    key={`question-${step}`}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col"
                                >
                                    {/* Progress Header */}
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-xs font-bold text-digital-primary uppercase tracking-widest font-mono">
                                            Pergunta 0{step} de 03
                                        </span>
                                        <span className="text-xs text-gray-500 font-mono">
                                            {Math.round((step / 3) * 100)}% Completo
                                        </span>
                                    </div>

                                    {/* Progress Bar (Dynamic Gold filling) */}
                                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-8">
                                        <motion.div 
                                            initial={{ width: `${progressPercent}%` }}
                                            animate={{ width: `${(step / 3) * 100}%` }}
                                            className="h-full bg-gradient-to-r from-digital-primary to-yellow-500 shadow-[0_0_10px_rgba(197,160,89,0.5)]"
                                        />
                                    </div>

                                    {/* Question titles */}
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-montserrat leading-tight">
                                        {currentQuestion.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm md:text-base font-light mb-8">
                                        {currentQuestion.subtitle}
                                    </p>

                                    {/* Options Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                        {currentQuestion.options.map((opt) => {
                                            const IconComponent = opt.icon;
                                            const isSelected = answers[step] === opt.id;
                                            return (
                                                <button
                                                    key={opt.id}
                                                    onClick={() => handleSelectOption(opt.id)}
                                                    className={`group relative text-left p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 hover:-translate-y-1 ${
                                                        isSelected
                                                            ? 'border-digital-primary bg-digital-primary/10 shadow-[0_0_25px_rgba(197,160,89,0.15)] text-white'
                                                            : 'border-white/5 bg-[#0F172A]/20 hover:border-white/20 hover:bg-white/5 text-gray-300'
                                                    }`}
                                                >
                                                    {/* Glow light effect */}
                                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-digital-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                    
                                                    <div className={`p-3 rounded-xl border transition-colors ${
                                                        isSelected 
                                                            ? 'bg-digital-primary text-black border-digital-primary'
                                                            : 'bg-white/5 border-white/10 group-hover:text-digital-primary group-hover:border-digital-primary/50 text-gray-400'
                                                    }`}>
                                                        <IconComponent className="w-5 h-5" />
                                                    </div>
                                                    
                                                    <div className="flex flex-col relative z-10">
                                                        <span className="font-bold text-sm md:text-base mb-1 block group-hover:text-white transition-colors">
                                                            {opt.label}
                                                        </span>
                                                        <span className="text-xs text-gray-500 leading-normal">
                                                            {opt.desc}
                                                        </span>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Back Navigation */}
                                    <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-2">
                                        <button
                                            onClick={handlePrev}
                                            className="px-4 py-2 border border-white/10 text-white hover:bg-white/5 hover:border-white/20 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all flex items-center gap-2"
                                        >
                                            <ArrowLeft className="w-3.5 h-3.5" />
                                            Voltar
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 4: DYNAMIC DIAGNOSTIC RESULTS */}
                            {step === 4 && (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ type: "spring", stiffness: 100 }}
                                    className="flex flex-col"
                                >
                                    {/* Circular Animated Dial for conversion score */}
                                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 border-b border-white/10 pb-10 mb-10">
                                        {/* Dynamic Dial */}
                                        <div className="relative w-36 h-36 flex items-center justify-center">
                                            {/* Static Background Ring */}
                                            <svg className="w-full h-full transform -rotate-90">
                                                <circle
                                                    cx="72"
                                                    cy="72"
                                                    r="64"
                                                    className="stroke-white/5 fill-none"
                                                    strokeWidth="10"
                                                />
                                                {/* Animated Foreground Arc */}
                                                <motion.circle
                                                    cx="72"
                                                    cy="72"
                                                    r="64"
                                                    className="stroke-digital-primary fill-none"
                                                    strokeWidth="10"
                                                    strokeDasharray={402}
                                                    strokeDashoffset={402 - (402 * score) / 100}
                                                    strokeLinecap="round"
                                                    initial={{ strokeDashoffset: 402 }}
                                                    animate={{ strokeDashoffset: 402 - (402 * score) / 100 }}
                                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                                />
                                            </svg>
                                            {/* Score text inside */}
                                            <div className="absolute text-center">
                                                <span className="text-4xl font-extrabold font-mono text-white tabular-nums tracking-tighter">
                                                    {animatedScore}%
                                                </span>
                                                <span className="text-[10px] text-gray-500 block uppercase tracking-wider font-semibold font-mono mt-0.5">
                                                    Maturidade
                                                </span>
                                            </div>
                                        </div>

                                        {/* Score Status */}
                                        <div className="text-center md:text-left flex-1">
                                            <div className="inline-block px-3 py-1 rounded-full border border-red-500/20 bg-red-500/5 mb-3">
                                                <span className="text-red-400 text-[10px] uppercase tracking-widest font-bold font-mono">
                                                    Perda Crítica Detectada
                                                </span>
                                            </div>
                                            <h4 className="text-2xl font-bold text-white mb-2 font-montserrat">
                                                Pontuação de Conversão
                                            </h4>
                                            <p className="text-gray-400 text-sm font-light leading-relaxed max-w-md">
                                                Seu ecossistema comercial está perdendo cerca de <strong className="text-red-400 font-bold">{100 - score}%</strong> dos leads que poderiam estar contratando o seu serviço hoje.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Custom Diagnostic Detail */}
                                    <div className="mb-10">
                                        <span className="text-digital-primary text-xs font-bold uppercase tracking-widest block mb-2 font-mono">
                                            Diagnóstico Personalizado
                                        </span>
                                        <h3 className="text-2xl font-bold text-white mb-4 font-montserrat">
                                            {getDiagnostics(answers).title}
                                        </h3>
                                        <p className="text-gray-300 font-light leading-relaxed text-sm md:text-base border-l-2 border-digital-primary/50 pl-5">
                                            {getDiagnostics(answers).scoreText}
                                        </p>
                                    </div>

                                    {/* Actionable Recommended Blueprint */}
                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-10 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-digital-primary/5 rounded-full blur-xl pointer-events-none" />
                                        <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block mb-2 font-mono">
                                            Plano Recomendado Concept Digital
                                        </span>
                                        <h4 className="text-lg font-bold text-digital-primary mb-2 flex items-center gap-2">
                                            <Zap className="w-4 h-4" />
                                            {getDiagnostics(answers).solutionTitle}
                                        </h4>
                                        <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                                            {getDiagnostics(answers).solutionDesc}
                                        </p>
                                    </div>

                                    {/* CTAs */}
                                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-white/5 pt-8">
                                        <button
                                            onClick={handleReset}
                                            className="w-full sm:w-auto px-6 py-4 border border-white/10 text-white hover:bg-white/5 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
                                        >
                                            <RefreshCw className="w-3.5 h-3.5" />
                                            Refazer Diagnóstico
                                        </button>

                                        <button
                                            onClick={handleWhatsAppSubmit}
                                            className="w-full sm:w-auto group relative px-8 py-4 bg-gradient-to-r from-green-500 to-[#128C7E] text-white font-bold text-xs tracking-wider uppercase transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(34,197,94,0.4)] rounded-xl flex items-center justify-center gap-2"
                                        >
                                            <MessageCircle className="w-4 h-4 fill-white" />
                                            Agendar Sessão VIP de Diagnóstico
                                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BusinessQuiz;
