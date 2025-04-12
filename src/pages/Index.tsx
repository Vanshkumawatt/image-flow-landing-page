
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SecondImageSection from "@/components/SecondImageSection";
import WhatWeOfferSection from "@/components/WhatWeOfferSection";
import ThirdImageSection from "@/components/ThirdImageSection";
import FourthImageSection from "@/components/FourthImageSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-blue-100">
      <Navbar />
      <HeroSection />
      <SecondImageSection />
      <WhatWeOfferSection />
      <ThirdImageSection />
      <FourthImageSection />
    </div>
  );
};

export default Index;
