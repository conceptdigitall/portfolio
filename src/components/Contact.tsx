"use client";

import React, { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { trackEvent } from '@/lib/supabase';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', message: '' });
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const [contactMethod, setContactMethod] = useState<'email' | 'whatsapp'>('email');
    const hasStarted = React.useRef(false);

    const checkFormStart = () => {
        if (!hasStarted.current) {
            hasStarted.current = true;
            trackEvent('form_events', { event_type: 'start' });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        trackEvent('form_events', { event_type: 'submit' });
        trackEvent('cta_clicks', { button_id: contactMethod === 'whatsapp' ? 'whatsapp_contact' : 'email_contact', path: window.location.pathname });

        const { name, message } = formData;

        if (contactMethod === 'whatsapp') {
            const text = `*Nova solicitação do Portfólio (v2)*\n\n*Nome:* ${name}\n*Mensagem:* ${message}`;
            window.open(`https://wa.me/5513991353207?text=${encodeURIComponent(text)}`, '_blank');
        } else {
            window.location.href = `mailto:sacconceptdigital@gmail.com?subject=Nova solicitação do Portfólio (v2)&body=Nome: ${name}%0D%0AMensagem: ${message}`;
        }
    };

    return (
        <section id="contact" className="py-32 relative overflow-hidden bg-concept-blue">
            {/* Fine Grid Background */}
            <div className="absolute inset-0 fine-grid opacity-20 pointer-events-none" />

            {/* Fine Guide Lines */}
            <div className="absolute top-0 left-[15%] w-[1px] h-full bg-white/[0.03] pointer-events-none" />
            <div className="absolute top-0 right-[15%] w-[1px] h-full bg-white/[0.03] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center md:pl-[15%] md:pr-[15%]">

                    {/* Left Column: Copy */}
                    <div className="space-y-8">
                        <div className="inline-block">
                            <span className="text-concept-yellow text-xs font-bold uppercase tracking-[0.25em] border border-concept-yellow/30 px-3 py-1 rounded-none bg-white/5">
                                Fale Conosco
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black font-montserrat tracking-tight leading-tight text-white uppercase">
                            Pronto para <br />
                            <span className="text-concept-yellow">
                                Escalar?
                            </span>
                        </h2>

                        <p className="text-white/80 text-sm leading-relaxed max-w-md border-l-2 border-concept-yellow/30 pl-6 font-poppins font-light">
                            Construímos ecossistemas digitais e ativos de alto padrão. Entre em contato para uma análise estratégica de viabilidade do seu projeto.
                        </p>

                        <div className="flex items-center gap-6 pt-4">
                            <div className="flex -space-x-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full bg-concept-blue border-2 border-white/10 overflow-hidden flex items-center justify-center relative">
                                        <Image
                                            src={`/avatars/partner-${i}.png`}
                                            alt={`Parceiro ${i}`}
                                            fill
                                            sizes="40px"
                                            className="object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="text-xs">
                                <p className="text-white font-bold font-montserrat uppercase tracking-wider">Junte-se a +50 Parceiros</p>
                                <p className="text-concept-yellow text-[10px] uppercase font-bold flex items-center gap-1 mt-1 tracking-wider">
                                    <CheckCircle className="w-3.5 h-3.5" /> Resposta em &lt; 2h
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="relative">
                        <div className="relative bg-[#041885]/40 p-8 md:p-10 border border-white/10 rounded-none shadow-2xl">
                            <div className="mb-8">
                                <h3 className="text-lg font-bold font-montserrat uppercase tracking-wider text-white mb-1">Iniciar Conversa</h3>
                                <p className="text-white/60 text-xs font-poppins font-light">Preencha os detalhes abaixo para agendar uma reunião de viabilidade.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Contact Method Toggle */}
                                <div className="flex gap-2 mb-6 p-1 bg-white/5 rounded-none w-fit border border-white/5">
                                    <button
                                        type="button"
                                        onClick={() => setContactMethod('email')}
                                        className={`px-4 py-2 rounded-none text-xs font-bold uppercase tracking-wider transition-all duration-300 ${contactMethod === 'email'
                                            ? 'bg-concept-yellow text-concept-blue'
                                            : 'text-white/60 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        Email
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setContactMethod('whatsapp')}
                                        className={`px-4 py-2 rounded-none text-xs font-bold uppercase tracking-wider transition-all duration-300 ${contactMethod === 'whatsapp'
                                            ? 'bg-[#25D366] text-concept-blue'
                                            : 'text-white/60 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        WhatsApp
                                    </button>
                                </div>

                                {/* Name Input */}
                                <div className="group relative">
                                    <label
                                        htmlFor="name"
                                        className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'name' || formData.name ? 'top-[-8px] text-[10px] text-concept-yellow bg-[#03115A] px-2' : 'top-4 text-white/50 text-xs'
                                            }`}
                                    >
                                        Seu Nome
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        className="w-full bg-[#03115A]/40 border border-white/10 rounded-none p-4 text-white focus:border-concept-yellow focus:ring-1 focus:ring-concept-yellow transition-all outline-none text-sm font-poppins font-light"
                                        value={formData.name}
                                        onChange={(e) => {
                                            setFormData({ ...formData, name: e.target.value });
                                            checkFormStart();
                                        }}
                                        onFocus={() => {
                                            setFocusedField('name');
                                            checkFormStart();
                                        }}
                                        onBlur={() => setFocusedField(null)}
                                        aria-label="Seu Nome"
                                        required
                                    />
                                </div>

                                {/* Message Input */}
                                <div className="group relative">
                                    <label
                                        htmlFor="message"
                                        className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'message' || formData.message ? 'top-[-8px] text-[10px] text-concept-yellow bg-[#03115A] px-2' : 'top-4 text-white/50 text-xs'
                                            }`}
                                    >
                                        Sobre o Ativo
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        className="w-full bg-[#03115A]/40 border border-white/10 rounded-none p-4 text-white focus:border-concept-yellow focus:ring-1 focus:ring-concept-yellow transition-all outline-none resize-none h-32 text-sm font-poppins font-light"
                                        value={formData.message}
                                        onChange={(e) => {
                                            setFormData({ ...formData, message: e.target.value });
                                            checkFormStart();
                                        }}
                                        onFocus={() => {
                                            setFocusedField('message');
                                            checkFormStart();
                                        }}
                                        onBlur={() => setFocusedField(null)}
                                        aria-label="Sobre o Ativo"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className={`w-full group relative overflow-hidden rounded-none p-4 transition-all duration-300 flex items-center justify-center gap-2 border-[1.5px] ${
                                        contactMethod === 'whatsapp' 
                                            ? 'bg-[#25D366] border-[#25D366] text-concept-blue' 
                                            : 'bg-concept-yellow border-concept-yellow text-concept-blue hover:bg-concept-white'
                                    }`}
                                >
                                    <div className="relative z-10 flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs">
                                        {contactMethod === 'whatsapp' ? 'Iniciar no WhatsApp' : 'Enviar Solicitação'}
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Contact;
