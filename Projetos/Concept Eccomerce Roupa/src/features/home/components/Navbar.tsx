"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { useCartStore } from "@/shared/store/cartStore";
import { cn } from "@/shared/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { items, toggleCart } = useCartStore();

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-12 flex items-center justify-between",
        isScrolled
          ? "bg-black/60 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      )}
    >
      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-8">
        <Link
          href="/shop"
          className="text-white/80 hover:text-white transition-colors text-sm font-medium tracking-wider uppercase"
        >
          Loja
        </Link>
        <Link
          href="/collections"
          className="text-white/80 hover:text-white transition-colors text-sm font-medium tracking-wider uppercase"
        >
          Coleções
        </Link>
      </nav>

      {/* Logo */}
      <div className="flex-1 md:flex-none text-center">
        <Link
          href="/"
          className="font-serif text-2xl tracking-widest text-white uppercase"
        >
          Concept
        </Link>
      </div>

      {/* Icons */}
      <div className="flex items-center gap-6">
        <button className="text-white hover:opacity-80 transition-opacity">
          <User className="w-5 h-5" />
          <span className="sr-only">Conta</span>
        </button>
        <button
          onClick={toggleCart}
          className="text-white hover:opacity-80 transition-opacity relative"
        >
          <ShoppingCart className="w-5 h-5" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
          <span className="sr-only">Carrinho</span>
        </button>
      </div>
    </header>
  );
}
