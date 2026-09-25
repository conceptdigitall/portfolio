"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (pathname?.startsWith('/admin')) {
        return null;
    }

    const scrollToSection = (id: string) => {
        setIsMobileMenuOpen(false);
        if (pathname !== '/') {
            router.push(`/?scrollTo=${id}`);
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-concept-blue border-b border-white/15 py-4' : 'bg-transparent py-6'
                }`}
            role="navigation"
            aria-label="Main Navigation"
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo with dynamic minimalist design line */}
                <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => scrollToSection('hero')}
                    role="button"
                    aria-label="Go to Homepage"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && scrollToSection('hero')}
                >
                    <div className="relative w-10 h-10 flex items-center justify-center border border-white/20">
                        {/* Dynamic minimalist geometric Lobo footprint logo outline */}
                        <svg className="w-6 h-6 text-concept-yellow animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M12 2L9 9H15L12 2Z" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6 13C6 11.5 8 9.5 9 9" strokeLinecap="round"/>
                            <path d="M18 13C18 11.5 16 9.5 15 9" strokeLinecap="round"/>
                            <path d="M12 17C10.5 17 9.5 15.5 9.5 14C9.5 12.5 10.5 12 12 12C13.5 12 14.5 12.5 14.5 14C14.5 15.5 13.5 17 12 17Z" strokeLinecap="round"/>
                        </svg>
                    </div>
                    <span className="text-white font-montserrat font-bold text-sm tracking-[0.25em] uppercase hidden sm:inline-block">
                        Concept<span className="text-concept-yellow">.</span>
                    </span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {['home', 'method', 'portfolio', 'contact'].map((item) => (
                        <button
                            key={item}
                            onClick={() => scrollToSection(item === 'home' ? 'hero' : item)}
                            className="text-concept-white hover:text-concept-yellow text-xs font-bold uppercase tracking-widest transition-colors font-poppins"
                        >
                            {item === 'home' ? 'Início' : item === 'method' ? 'Método' : item === 'portfolio' ? 'Projetos' : 'Contato'}
                        </button>
                    ))}
                    <button
                        onClick={() => {
                            import('@/lib/supabase').then(({ trackEvent }) => {
                                trackEvent('cta_clicks', { button_id: 'header_contact', path: pathname || '/' });
                            });
                            scrollToSection('contact');
                        }}
                        className="px-6 py-2.5 border-[1.5px] border-concept-yellow text-concept-yellow hover:bg-concept-yellow hover:text-concept-blue transition-all rounded-none text-xs font-bold uppercase tracking-widest"
                        aria-label="Entre em Contato"
                    >
                        Fale Conosco
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white p-2 hover:text-concept-yellow transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label={isMobileMenuOpen ? "Fechar Menu" : "Abrir Menu"}
                    aria-expanded={isMobileMenuOpen}
                >
                    {isMobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-concept-blue border-b border-white/10 p-8 flex flex-col gap-6 md:hidden">
                    {['home', 'method', 'portfolio', 'contact'].map((item) => (
                        <button
                            key={item}
                            onClick={() => scrollToSection(item === 'home' ? 'hero' : item)}
                            className="text-concept-white hover:text-concept-yellow text-sm font-bold uppercase tracking-widest text-left font-poppins"
                        >
                            {item === 'home' ? 'Início' : item === 'method' ? 'Método' : item === 'portfolio' ? 'Projetos' : 'Contato'}
                        </button>
                    ))}
                    <button
                        onClick={() => scrollToSection('contact')}
                        className="w-full text-center py-3 border-[1.5px] border-concept-yellow text-concept-yellow hover:bg-concept-yellow hover:text-concept-blue transition-all rounded-none text-xs font-bold uppercase tracking-widest"
                    >
                        Fale Conosco
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Header;
