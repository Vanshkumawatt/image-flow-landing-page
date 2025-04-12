
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import WhatWeOfferSection from "@/components/WhatWeOfferSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Navbar />
      <div className="pt-16"> {/* Add padding top to account for fixed navbar */}
        <HeroSection />
        <FeaturesSection />
        <WhatWeOfferSection />
        <TestimonialsSection />
        <CtaSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
