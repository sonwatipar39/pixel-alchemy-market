
import { Hero } from "@/components/Hero";
import { Portfolio3D } from "@/components/Portfolio3D";
import { ProductShowcase } from "@/components/ProductShowcase";
import { AnimatedSection } from "@/components/AnimatedSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Hero />
      <AnimatedSection>
        <Portfolio3D />
      </AnimatedSection>
      <AnimatedSection>
        <ProductShowcase />
      </AnimatedSection>
    </div>
  );
};

export default Index;
