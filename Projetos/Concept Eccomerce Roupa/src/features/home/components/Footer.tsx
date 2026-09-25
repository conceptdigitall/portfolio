"use client";

import { Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-neutral-900 border-t border-neutral-800 text-white py-20 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Left Side: Contact Form */}
        <div>
          <h3 className="font-serif text-3xl mb-6">Contate-nos</h3>
          <p className="text-white/60 mb-8 max-w-sm">
            Tem dúvidas sobre nossa nova coleção? Preencha o formulário e nossa equipe entrará em contato em breve.
          </p>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-white/60">Nome</label>
                <input 
                  type="text" 
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors"
                  placeholder="João"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/60">Sobrenome</label>
                <input 
                  type="text" 
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors"
                  placeholder="Silva"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-white/60">E-mail</label>
              <input 
                type="email" 
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors"
                placeholder="joao@exemplo.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-white/60">Mensagem</label>
              <textarea 
                rows={4}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors resize-none"
                placeholder="Como podemos ajudar?"
              ></textarea>
            </div>

            <button className="w-full sm:w-auto bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" />
              Enviar Mensagem
            </button>
          </form>
        </div>

        {/* Right Side: Shipping Calculator & Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="font-serif text-3xl mb-6">Calcular Frete</h3>
            <p className="text-white/60 mb-8 max-w-sm">
              Insira seu CEP abaixo para estimar o tempo e o custo de entrega.
            </p>

            <form className="flex gap-4 max-w-md" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="text" 
                className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors"
                placeholder="Ex: 01001-000"
              />
              <button className="bg-neutral-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-neutral-600 transition-colors flex items-center gap-2 shrink-0">
                <MapPin className="w-4 h-4" />
                Calcular
              </button>
            </form>
          </div>

          <div className="mt-16 pt-8 border-t border-neutral-800 text-white/40 text-sm flex flex-col sm:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} Concept Streetwear. Todos os direitos reservados.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-white transition-colors">Termos de Serviço</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
