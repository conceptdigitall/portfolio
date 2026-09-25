"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/shared/data/mockProducts";
import { useCartStore } from "@/shared/store/cartStore";
import { ShoppingCart, Star } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
  isLarge?: boolean;
}

export function ProductCard({ product, className, isLarge = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div
      className={cn(
        "group flex flex-col gap-4 cursor-pointer bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className={cn("relative w-full overflow-hidden bg-[#e5e5e5] rounded-lg", isLarge ? "aspect-[3/4]" : "aspect-[4/5]")}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Quick Add Overlay */}
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 p-4 translate-y-full transition-transform duration-300 ease-out flex",
            isHovered && "translate-y-0"
          )}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              addItem(product);
            }}
            className="w-full bg-black text-white py-3 rounded-lg font-medium uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Adicionar ao Carrinho
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-3 px-1">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <h3 className="font-serif text-lg font-bold text-black">{product.name}</h3>
            <span className="text-xs text-neutral-500">Al Karam</span>
          </div>
          <div className="flex gap-1 pt-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>

        <div className="text-xs text-neutral-500 font-medium pb-2 border-b border-neutral-100">
          (4.1k) Avaliações de Clientes
        </div>

        <div className="flex justify-between items-center pt-1">
          <span className="text-xl font-bold text-black">${product.price.toFixed(2)}</span>
          <span className="text-xs font-semibold text-red-500">Quase Esgotado</span>
        </div>
      </div>
    </div>
  );
}
