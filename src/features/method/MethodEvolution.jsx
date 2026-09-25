"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useInView } from 'framer-motion';
import { TrendingDown, Zap, ShieldCheck, MousePointerClick, Smartphone, DollarSign } from 'lucide-react';

const results = [
    {
        id: 'R1',
        title: "Engenharia de Conversão",
        subtitle: "Posicionamento Imediato",
        description: "Transformamos o tráfego em resultado real. Desenvolvemos estruturas focadas em eliminar as objeções de compra de clientes premium, reduzindo o custo de aquisição (CAC).",
        icon: TrendingDown,
        visual: "ROIGraph",
        color: "from-concept-blue/5 to-concept-blue/10",
        glow: "group-hover:border-concept-blue"
    },
    {
        id: 'R2',
        title: "Velocidade de Elite",
        subtitle: "Atrito Zero",
        description: "Estruturas de software com carregamento instantâneo em milissegundos. Resposta ágil que assegura que nenhum cliente em potencial abandone a página por lentidão operacional.",
        icon: Zap,
        visual: "SpeedCounter",
        color: "from-concept-blue/5 to-concept-blue/10",
        glow: "group-hover:border-concept-blue"
    },
    {
        id: 'R3',
        title: "Percepção de Valor Ativada",
        subtitle: "Fator Premium",
        description: "Visual requintado que gera autoridade imediata. Um design com alto nível de respiro e precisão de engenharia faz o cliente associar a sua página à excelência do seu serviço.",
        icon: ShieldCheck,
        visual: "AuthorityVisual",
        color: "from-concept-blue/5 to-concept-blue/10",
        glow: "group-hover:border-concept-blue"
    }
];

const TiltCard = ({ children, className }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left - width / 2);
        mouseY.set(clientY - top - height / 2);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1000 }}
        >
            <motion.div
                className="h-full w-full relative transition-all duration-200 ease-out"
                style={{
                    rotateX: useTransform(mouseY, [-200, 200], [4, -4]),
                    rotateY: useTransform(mouseX, [-200, 200], [-4, 4]),
                }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
};

const Bar = ({ height, color, highlight, label }) => (
    <div className="flex flex-col items-center gap-2 flex-1">
        <motion.div
            className={`w-full rounded-none ${color} relative group`}
            initial={{ height: 0 }}
            whileInView={{ height: height === 'h-32' ? '8rem' : height === 'h-24' ? '6rem' : height === 'h-16' ? '4rem' : '2rem' }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
        >
            {highlight && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-concept-blue text-white text-[9px] font-bold px-2 py-0.5 rounded-none font-mono">
                    Concept
                </div>
            )}
        </motion.div>
        {label && <span className="text-[10px] font-bold uppercase tracking-wider text-concept-blue/60">{label}</span>}
    </div>
);

const ROIGraph = () => {
    return (
        <div className="w-full h-44 flex flex-col justify-end relative mt-4 bg-concept-white border border-concept-blue/10 p-4 rounded-none">
            <div className="absolute left-4 bottom-4 top-4 w-[1px] bg-concept-blue/10" />
            <div className="absolute left-4 bottom-4 right-4 h-[1px] bg-concept-blue/10" />

            <div className="relative h-full w-full flex items-end justify-between pl-4 pb-2">
                <Bar height="h-32" label="Outros" color="bg-concept-blue/20" />
                <Bar height="h-16" label="" color="bg-concept-blue/40" />
                <Bar height="h-8" label="Concept" color="bg-concept-blue" highlight />
            </div>
            <div className="mt-2 flex justify-between text-[10px] text-concept-blue/50 font-bold uppercase tracking-wider pl-4">
                <span>Custo de Aquisição</span>
                <span className="text-concept-blue">-60% CAC</span>
            </div>
        </div>
    );
};

const SpeedCounter = () => {
    const [count, setCount] = useState(3.0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            const duration = 1500;
            const steps = 30;
            const intervalTime = duration / steps;
            let current = 3.0;
            const timer = setInterval(() => {
                current -= 0.083;
                if (current <= 0.5) {
                    current = 0.5;
                    clearInterval(timer);
                }
                setCount(current);
            }, intervalTime);
            return () => clearInterval(timer);
        }
    }, [isInView]);

    return (
        <div ref={ref} className="text-center relative mt-4 py-8 bg-concept-white border border-concept-blue/10 rounded-none">
            <div className="text-5xl font-black font-mono text-concept-blue tabular-nums tracking-tighter">
                {count.toFixed(1)}<span className="text-lg text-concept-blue/50 ml-1">s</span>
            </div>
            <div className="text-[10px] text-concept-blue/50 mt-2 uppercase tracking-widest font-bold">
                Tempo de Carregamento
            </div>
            <motion.div
                className="h-[2px] bg-concept-blue mt-6 rounded-none mx-auto"
                initial={{ width: "10%" }}
                animate={isInView ? { width: "70%" } : {}}
                transition={{ duration: 1.5 }}
            />
        </div>
    );
};

const FloatingBadge = ({ icon: Icon, label, delay, x, y }) => (
    <motion.div
        initial={{ opacity: 0, x: 0, y: 0 }}
        whileInView={{ opacity: 1, x, y }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.8 }}
        className="absolute bg-concept-white border border-concept-blue/10 px-3 py-1.5 rounded-none flex items-center gap-2 shadow-sm z-20"
    >
        <Icon size={12} className="text-concept-blue" />
        <span className="text-[10px] font-bold text-concept-blue uppercase tracking-widest">{label}</span>
    </motion.div>
);

const AuthorityVisual = () => {
    return (
        <div className="relative w-full h-44 flex items-center justify-center mt-4 bg-concept-white border border-concept-blue/10 rounded-none overflow-hidden">
            {/* Spinning Rings */}
            <motion.div
                className="absolute w-24 h-24 border border-concept-blue/5 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute w-32 h-32 border border-concept-blue/5 rounded-full border-dashed"
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            {/* Central Badge */}
            <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="relative z-10 bg-concept-blue p-3.5 rounded-none"
            >
                <ShieldCheck size={24} className="text-white" />
            </motion.div>

            {/* Floating Badges */}
            <FloatingBadge icon={MousePointerClick} label="UX" delay={0.4} x={45} y={-35} />
            <FloatingBadge icon={Smartphone} label="Mobile" delay={0.6} x={-45} y={25} />
            <FloatingBadge icon={DollarSign} label="Sales" delay={0.8} x={40} y={40} />
        </div>
    );
};

const ResultCard = ({ result }) => {
    const VisualComponent = {
        "ROIGraph": ROIGraph,
        "SpeedCounter": SpeedCounter,
        "AuthorityVisual": AuthorityVisual
    }[result.visual];

    return (
        <TiltCard className="h-full w-full">
            <div className={`
                h-full relative overflow-hidden rounded-none border border-concept-blue/10 bg-concept-gray p-8
                transition-all duration-300 hover:border-concept-blue
                ${result.glow} flex flex-col justify-between
            `}>
                <div className="relative z-10 space-y-4">
                    <div className="p-3.5 inline-block rounded-none bg-concept-white border border-concept-blue/5 text-concept-blue">
                        <result.icon className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-concept-blue font-montserrat uppercase tracking-wider">
                            {result.title}
                        </h3>
                        <p className="text-concept-blue/50 text-[10px] font-bold uppercase tracking-widest mt-1">
                            {result.subtitle}
                        </p>
                    </div>
                    <p className="text-concept-blue/70 leading-relaxed text-xs font-poppins font-light">
                        {result.description}
                    </p>
                    {VisualComponent && <VisualComponent />}
                </div>
            </div>
        </TiltCard>
    );
};

const ResultNode = ({ result, index }) => {
    const isEven = index % 2 === 0;

    return (
        <div className={`flex items-center justify-between w-full mb-16 md:mb-24 last:mb-0 relative ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
            {/* Content Side */}
            <div className="w-full md:w-[48%] relative z-10 group">
                <ResultCard result={result} />
            </div>

            {/* Center Node */}
            <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center justify-center z-20 hidden md:flex">
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-10 h-10 rounded-none bg-concept-white border border-concept-blue/20 flex items-center justify-center shadow-sm relative"
                >
                    <div className="w-2.5 h-2.5 bg-concept-blue z-10" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: isEven ? -15 : 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.25em] text-concept-blue/40 ${isEven ? 'right-14' : 'left-14'}`}
                >
                    Pilar 0{index + 1}
                </motion.div>
            </div>

            {/* Empty Side for alignment */}
            <div className="w-full md:w-[48%] hidden md:block" />
        </div>
    );
};

const MethodEvolution = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end end"]
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section id="method" ref={containerRef} className="py-32 relative bg-concept-white text-concept-blue overflow-hidden select-none">
            {/* Fine Guide Lines */}
            <div className="absolute top-0 left-[15%] w-[1px] h-full bg-concept-blue/[0.04] pointer-events-none" />
            <div className="absolute top-0 right-[15%] w-[1px] h-full bg-concept-blue/[0.04] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-24 md:pl-[15%] md:pr-[15%]">
                    <span className="text-concept-blue text-xs font-bold uppercase tracking-[0.25em] mb-4 block">
                        Nossa Diferenciação
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold font-montserrat text-concept-blue uppercase tracking-wide leading-[1.15]">
                        A Engenharia de <span className="text-concept-blue">Performance</span>
                    </h2>
                    <p className="max-w-xl mx-auto text-concept-blue/70 text-sm mt-4 font-poppins font-light">
                        Não criamos apenas sites corporativos. Desenvolvemos ativos de alta conversão focados em resolver dores reais de posicionamento e margem de vendas.
                    </p>
                </div>

                {/* Results Section (Timeline) */}
                <div className="relative max-w-6xl mx-auto mt-24 md:pl-[15%] md:pr-[15%]">
                    {/* Central Animated Line */}
                    <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-4 h-[calc(100%-6rem)] w-[1px] bg-concept-blue/10">
                        <motion.div
                            style={{ height: lineHeight }}
                            className="w-full bg-concept-blue shadow-sm"
                        />
                    </div>

                    <div className="flex flex-col relative z-10 w-full space-y-8 md:space-y-0">
                        {results.map((result, index) => (
                            <ResultNode key={result.id} result={result} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MethodEvolution;
