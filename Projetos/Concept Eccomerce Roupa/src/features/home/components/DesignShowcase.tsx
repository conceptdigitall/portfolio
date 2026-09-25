"use client";

import Image from "next/image";
import { Star, ShieldCheck, Package, Headphones } from "lucide-react";

export function DesignShowcase() {
  return (
    <section className="py-24 px-6 md:px-12 bg-black min-h-screen flex flex-col justify-center">
      <div className="max-w-[1200px] mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 mb-24">
          
          {/* Left Side: Annotated Image */}
          <div className="relative w-full lg:w-1/2 aspect-square max-w-[500px] mx-auto">
            {/* The base product image */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800">
              <Image 
                src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800"
                alt="2024 Design Hoodie"
                fill
                className="object-cover"
              />
            </div>

            {/* Annotations */}
            {/* 1. Suspender */}
            <div className="absolute top-[30%] left-[10%] group">
              <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse blur-[2px] absolute inset-0"></div>
              <div className="w-3 h-3 bg-red-600 rounded-full relative z-10"></div>
              {/* Connecting Line and Box */}
              <div className="absolute top-1/2 right-full mr-2 w-16 h-[1px] bg-white/50 -translate-y-1/2 origin-right scale-x-0 group-hover:scale-x-100 transition-transform hidden sm:block"></div>
              <div className="absolute top-1/2 right-[120%] -translate-y-1/2 bg-white/20 backdrop-blur-md px-3 py-1 text-xs text-white rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                Suspender
              </div>
            </div>

            {/* 2. Hugo Boss (Top Right) */}
            <div className="absolute top-[25%] right-[30%] group">
              <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse blur-[2px] absolute inset-0"></div>
              <div className="w-3 h-3 bg-red-600 rounded-full relative z-10"></div>
              <div className="absolute top-1/2 left-full ml-2 w-16 h-[1px] bg-white/50 -translate-y-1/2 origin-left scale-x-0 group-hover:scale-x-100 transition-transform hidden sm:block"></div>
              <div className="absolute top-1/2 left-[120%] -translate-y-1/2 bg-white/20 backdrop-blur-md px-3 py-1 text-xs text-white rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                Flat Cap
              </div>
            </div>

            {/* 3. Hugo Boss (Middle Left) */}
            <div className="absolute top-[45%] left-[25%] group">
              <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse blur-[2px] absolute inset-0"></div>
              <div className="w-3 h-3 bg-red-600 rounded-full relative z-10"></div>
              <div className="absolute top-1/2 right-full mr-2 w-16 h-[1px] bg-white/50 -translate-y-1/2 origin-right scale-x-0 group-hover:scale-x-100 transition-transform hidden sm:block"></div>
              <div className="absolute top-1/2 right-[120%] -translate-y-1/2 bg-white/20 backdrop-blur-md px-3 py-1 text-xs text-white rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                Hugo Boss
              </div>
            </div>

            {/* 4. Santoni (Bottom Right) */}
            <div className="absolute bottom-[25%] right-[20%] group">
              <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse blur-[2px] absolute inset-0"></div>
              <div className="w-3 h-3 bg-red-600 rounded-full relative z-10"></div>
              <div className="absolute top-1/2 left-full ml-2 w-16 h-[1px] bg-white/50 -translate-y-1/2 origin-left scale-x-0 group-hover:scale-x-100 transition-transform hidden sm:block"></div>
              <div className="absolute top-1/2 left-[120%] -translate-y-1/2 bg-white/20 backdrop-blur-md px-3 py-1 text-xs text-white rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                Santoni
              </div>
            </div>

          </div>

          {/* Right Side: Product Details */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <span className="text-white/50 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Designs Originais
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-6">
              Explore o novo design 2024
            </h2>
            <p className="text-white/60 mb-8 max-w-md leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis.
            </p>
            
            <div className="flex items-center gap-4 mb-8">
              <span className="text-white/60 text-sm">Tamanho:</span>
              <span className="text-white text-sm font-medium">M</span>
            </div>

            <div className="mb-8">
              <span className="text-2xl font-bold text-white">R$ 100,00</span>
            </div>

            <button className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-colors px-12 py-4 rounded-lg font-medium w-full sm:w-fit text-center">
              Comprar Agora
            </button>
          </div>
        </div>

        {/* Bottom Row: Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-12 border-t border-white/10">
          <div className="flex items-start gap-4">
            <div className="shrink-0 p-3 bg-white/5 rounded-lg border border-white/10 text-white">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-medium mb-1">Alta Qualidade</h4>
              <p className="text-white/50 text-sm">Feito com os melhores materiais</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="shrink-0 p-3 bg-white/5 rounded-lg border border-white/10 text-white">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-medium mb-1">Garantia de Proteção</h4>
              <p className="text-white/50 text-sm">Mais de 2 anos</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="shrink-0 p-3 bg-white/5 rounded-lg border border-white/10 text-white">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-medium mb-1">Frete Grátis</h4>
              <p className="text-white/50 text-sm">Pedidos acima de R$ 150</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="shrink-0 p-3 bg-white/5 rounded-lg border border-white/10 text-white">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-medium mb-1">Suporte 24 / 7</h4>
              <p className="text-white/50 text-sm">Suporte dedicado</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
