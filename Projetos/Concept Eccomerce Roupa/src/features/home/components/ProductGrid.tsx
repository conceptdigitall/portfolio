"use client";

import { useState } from "react";
import { ProductCard } from "@/features/products/components/ProductCard";
import { mockProducts } from "@/shared/data/mockProducts";
import { motion } from "framer-motion";

const CATEGORIES = [
  "Moda Masculina",
  "Moda Feminina",
  "Acessórios Femininos",
  "Acessórios Masculinos",
  "Ofertas",
];

export function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState("Moda Masculina");

  const filteredProducts = mockProducts.filter(
    (product) => product.category === activeCategory
  );

  return (
    <section id="product-grid" className="py-24 px-6 md:px-12 bg-black min-h-screen">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl uppercase tracking-wider mb-6 text-white">
            DESCUBRA AS NOVIDADES
          </h2>
          <p className="text-white/70 max-w-2xl text-sm md:text-base mb-12">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis 
            ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-all border-2 ${
                    isActive
                      ? "bg-black text-white border-blue-500"
                      : "bg-white text-black border-transparent hover:bg-neutral-200"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filteredProducts.slice(0, 6).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-48">
            <p className="text-white/50 text-lg">Nenhum produto encontrado nesta categoria.</p>
          </div>
        )}
      </div>
    </section>
  );
}
