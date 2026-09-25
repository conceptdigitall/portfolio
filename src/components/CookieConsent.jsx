"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import { grantConsent } from '../lib/pixel';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent');
        if (consent === null) {
            // Delay appearance slightly for better UX
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        grantConsent();
        // Avisa o SiteAnalytics (Google Analytics) que o cookie foi aceito
        window.dispatchEvent(new Event('cookie-consent-change'));
        setIsVisible(false);
    };

    const handleReject = () => {
        localStorage.setItem('cookie_consent', 'false');
        window.dispatchEvent(new Event('cookie-consent-change'));
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
                >
                    <div className="max-w-4xl mx-auto bg-[#0A0A0A]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 md:flex items-center gap-6">
                        {/* Icon */}
                        <div className="hidden md:flex p-4 rounded-xl bg-digital-primary/10 border border-digital-primary/20">
                            <Cookie className="w-8 h-8 text-digital-primary" />
                        </div>

                        <div className="flex-1 mb-6 md:mb-0">
                            <h3 className="text-lg font-bold font-montserrat text-white mb-2 flex items-center gap-2">
                                <Cookie className="w-5 h-5 text-digital-primary md:hidden" />
                                Valorizamos sua privacidade
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Utilizamos cookies para melhorar sua experiência e analisar o tráfego do site.
                                Ao clicar em &quot;Aceitar&quot;, você concorda com o uso de cookies para estes fins.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3 min-w-fit">
                            <button
                                onClick={handleReject}
                                className="px-6 py-2.5 rounded-lg border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-colors text-sm font-semibold"
                            >
                                Rejeitar
                            </button>
                            <button
                                onClick={handleAccept}
                                className="px-6 py-2.5 rounded-lg bg-digital-primary text-digital-black font-bold hover:bg-white hover:text-black transition-colors text-sm shadow-[0_0_20px_rgba(197,160,89,0.2)]"
                            >
                                Aceitar Todos
                            </button>
                        </div>

                        {/* Close button (optional, treats as reject or just dismiss) */}
                        <button
                            onClick={handleReject}
                            className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors md:hidden"
                            aria-label="Fechar"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;
