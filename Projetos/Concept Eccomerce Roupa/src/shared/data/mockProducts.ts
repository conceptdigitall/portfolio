export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  description?: string;
  category: string;
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Camiseta Branca Clássica",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    reviews: 124,
    description: "Camiseta de algodão egípcio premium clássica.",
    category: "Moda Masculina",
  },
  {
    id: "2",
    name: "Jaqueta Jeans Vintage",
    price: 189.99,
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    reviews: 89,
    description: "Jeans estonado com corte clássico.",
    category: "Moda Feminina",
  },
  {
    id: "3",
    name: "Calça Cargo Urbana",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1511105612320-2e62a04dd044?auto=format&fit=crop&q=80&w=800",
    rating: 4.6,
    reviews: 56,
    description: "Utilidade encontra o estilo com estas calças cargo relaxadas.",
    category: "Moda Masculina",
  },
  {
    id: "4",
    name: "Moletom Assinatura",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
    rating: 4.7,
    reviews: 210,
    description: "Mistura de algodão de alta gramatura para máximo conforto.",
    category: "Moda Masculina",
  },
  {
    id: "5",
    name: "Tênis Street Runner",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800",
    rating: 4.5,
    reviews: 42,
    description: "Projetado para o explorador urbano.",
    category: "Acessórios Masculinos",
  },
  {
    id: "6",
    name: "Gorro Minimalista",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    reviews: 315,
    description: "Mantenha-se aquecido com nosso gorro de malha exclusivo.",
    category: "Acessórios Femininos",
  }
];
