import { BentoGrid } from "@/components/landing/bento-grid";
import { Features } from "@/components/landing/features";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Pricing } from "@/components/landing/pricing";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <BentoGrid />
      <Pricing />
      <Footer />
    </main>
  );
}
