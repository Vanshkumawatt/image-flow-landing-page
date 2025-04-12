
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 flex flex-col items-center bg-gradient-to-b from-blue-50 to-white">
      <div className="text-center max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Orielix : Together We Innovate
        </h1>
        
        <p className="text-lg md:text-xl text-center max-w-3xl mx-auto mb-10 text-gray-700">
          Step into a world of limitless learning and growth with Orielix. 
          Gain essential skills, personalized guidance, and hands-on experience to shape your future.
        </p>
        
        <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-full px-8 py-6 text-lg flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 group">
          Get Started
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
      
      <div className="mt-16 w-full max-w-5xl mx-auto rounded-lg overflow-hidden shadow-2xl transform transition-all duration-500 hover:shadow-3xl">
        <div className="bg-gray-900 py-2 px-3 flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="bg-gray-700 text-center py-1 px-4 rounded text-xs text-white mx-auto max-w-xs">
            https://orielix.com/
          </div>
        </div>
        <div className="w-full bg-gray-100">
          <img 
            src="/lovable-uploads/20fc66c3-bab1-4f40-9029-c8596cc15948.png" 
            alt="Orielix Platform Screenshot" 
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}
