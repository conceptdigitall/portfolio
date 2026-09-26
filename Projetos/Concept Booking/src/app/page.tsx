"use client";

import { useBookingStore } from "@/store/useBookingStore";
import { ServiceSelector } from "@/components/booking/ServiceSelector";
import { ProfessionalSelector } from "@/components/booking/ProfessionalSelector";
import { DayPicker } from "@/components/calendar/DayPicker";
import { TimeGrid } from "@/components/calendar/TimeGrid";
import { BookingSummary } from "@/components/booking/BookingSummary";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function BookingFlow() {
    const { step, setStep, reset, selectedService, selectedProfessional, selectedDate } = useBookingStore();

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    // Safe checks for step progression
    const canAdvance = () => {
        // Step 3 (Calendar) needs both date and time to be valid, 
        // but TimeGrid calls setTimeSlot which auto-advances to step 4.
        // So manual advance isn't primary there.
        return true;
    };

    return (
        <main className="min-h-screen selection:bg-primary/20 relative overflow-hidden">

            {/* Background Ambient Orbs (Cosmic Effect) */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s' }} />
            </div>

            {/* Header / Navbar */}
            <header className="sticky top-0 z-50 border-b border-white/5 bg-white/5 backdrop-blur-xl supports-[backdrop-filter]:bg-white/5">
                <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {step > 1 && (
                            <Button onClick={handleBack} variant="ghost" size="sm" className="rounded-full w-8 h-8 p-0 -ml-2 text-white hover:bg-white/10 hover:text-primary transition-colors">
                                <ArrowLeft className="w-4 h-4" />
                            </Button>
                        )}
                        <h1 className="text-xl font-bold tracking-tight text-white drop-shadow-sm">
                            Concept <span className="text-primary">Booking</span>
                        </h1>
                    </div>

                    {/* Step Indicator */}
                    <div className="flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                        <span className="font-bold text-primary">{step}</span>
                        <span className="text-slate-500 text-sm">/ 4</span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="h-[2px] bg-white/5 w-full overflow-hidden">
                    <div
                        className="h-full bg-primary shadow-[0_0_10px_2px_rgba(245,158,11,0.5)] transition-all duration-500 ease-in-out"
                        style={{ width: `${(step / 4) * 100}%` }}
                    />
                </div>
            </header>

            {/* Main Content Area */}
            <div className="max-w-3xl mx-auto px-4 py-8 pb-32 relative z-10">
                {/* Dynamic Titles */}
                <div className="mb-8 animate-in slide-in-from-left-2 duration-500 fade-in-0">
                    {step === 1 && (
                        <>
                            <h2 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Qual serviço você deseja?</h2>
                            <p className="text-slate-400 text-lg font-light">Escolha o procedimento para continuar.</p>
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <h2 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Quem vai te atender?</h2>
                            <p className="text-slate-400 text-lg font-light">Selecione um profissional disponível.</p>
                        </>
                    )}
                    {step === 3 && (
                        <>
                            <h2 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Quando fica melhor?</h2>
                            <p className="text-slate-400 text-lg font-light">Escolha data e horário para o agendamento.</p>
                        </>
                    )}
                    {step === 4 && (
                        <>
                            <h2 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Confirmação</h2>
                            <p className="text-slate-400 text-lg font-light">Revise os detalhes do seu pedido.</p>
                        </>
                    )}
                </div>

                {/* Steps */}
                <div className="min-h-[400px]">
                    {step === 1 && <ServiceSelector />}
                    {step === 2 && <ProfessionalSelector />}
                    {step === 3 && (
                        <div className="space-y-8">
                            <DayPicker />
                            <TimeGrid />
                        </div>
                    )}
                    {step === 4 && <BookingSummary />}
                </div>
            </div>

            {/* Mobile Footer (Optional - mostly for Back/Cancel actions if needed globally) */}
            {/* Currently actions are handled within components or header, keeping screen clean */}

            {/* Floating Back to Portfolio Button */}
            <div className="fixed bottom-6 left-6 z-50 animate-in slide-in-from-bottom-10 fade-in duration-700 delay-1000 hidden md:block group">
                <a
                    href="https://conceptdigitalportfolio.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block"
                >
                    {/* Label Badge */}
                    <div className="absolute -top-5 inset-x-0 bg-slate-900 text-[10px] text-white tracking-wider font-bold py-1 uppercase border-t border-x border-white/10 group-hover:bg-primary group-hover:text-primary-foreground transition-colors z-0 text-center whitespace-nowrap">
                        Projeto Demonstrativo
                    </div>

                    {/* Main Button */}
                    <div className="bg-primary hover:bg-white text-primary-foreground hover:text-primary transition-all duration-300 h-14 pl-5 pr-4 flex items-center gap-4 shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.6)] cursor-pointer z-10 relative">
                        <div className="text-left leading-tight">
                            <span className="block text-[10px] font-bold opacity-80 uppercase tracking-widest">Voltar ao</span>
                            <span className="block text-lg font-black tracking-tight">PORTFÓLIO</span>
                        </div>
                        <div className="h-8 w-[1px] bg-black/10 group-hover:bg-primary/20" />
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    </div>
                </a>
            </div>
        </main>
    );
}
