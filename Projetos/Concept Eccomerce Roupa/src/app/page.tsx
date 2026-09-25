import { Navbar } from "@/features/home/components/Navbar";
import { HeroSection } from "@/features/home/components/HeroSection";
import { DesignShowcase } from "@/features/home/components/DesignShowcase";
import { ProductGrid } from "@/features/home/components/ProductGrid";
import { Footer } from "@/features/home/components/Footer";
import { PageLoader } from "@/shared/components/PageLoader";
import { BackButton } from "@/shared/components/BackButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-black relative">
      <PageLoader />
      <BackButton />
      <Navbar />
      <HeroSection />
      <DesignShowcase />
      <ProductGrid />
      <Footer />
    </main>
  );
}
