import { Navbar } from "@/features/ui/Navbar";
import { Footer } from "@/features/ui/Footer";
import { HeroSection } from "@/features/hero/HeroSection";
import { AboutSection } from "@/features/about/AboutSection";
import { DifferentialsSection } from "@/features/about/DifferentialsSection";
import { PropertyGrid } from "@/features/properties/PropertyGrid";
import { ContactSection } from "@/features/contact/ContactSection";
import { MessageCircle, ArrowLeft } from "lucide-react";

function App() {
    return (
        <div className="min-h-screen">
            <Navbar />

            <main>
                <HeroSection />
                <AboutSection />
                <PropertyGrid />
                <DifferentialsSection />
                <ContactSection />
            </main>

            <Footer />

            {/* Floating Buttons - Keeping them here or moving to a Layout component if it grows */}
            {/* WhatsApp Float */}
            <a
                href="https://wa.me/5511999999999"
                target="_blank"
                className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform animate-bounce duration-[2000ms]"
                aria-label="Contact on WhatsApp"
            >
                <MessageCircle className="w-8 h-8 fill-current" />
            </a>

            {/* Back to Portfolio Float */}
            <a
                href="https://conceptdigitalportfolio.vercel.app/"
                target="_blank"
                className="fixed bottom-8 left-8 z-50 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full shadow-2xl hover:bg-white hover:text-primary transition-all duration-300 flex items-center gap-2 group"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium text-sm">Voltar ao Portfolio</span>
            </a>
        </div>
    );
}

export default App;
