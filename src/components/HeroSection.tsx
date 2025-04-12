
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 flex flex-col items-center bg-gradient-to-b from-purple-50 to-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-6xl mx-auto"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 purple-gradient-text">
          Orielix : Together We Innovate
        </h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg md:text-xl text-center max-w-3xl mx-auto mb-10 text-gray-700"
        >
          Step into a world of limitless learning and growth with Orielix. 
          Gain essential skills, personalized guidance, and hands-on experience to shape your future.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="flex justify-center"
        >
          <Button className="bg-purple-600 hover:bg-purple-700 rounded-full px-8 py-6 text-lg flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 group">
            Get Started
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mt-16 w-full max-w-5xl mx-auto rounded-lg overflow-hidden shadow-2xl transform hover:scale-[1.01] hover:shadow-3xl transition-all duration-500"
      >
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
      </motion.div>
    </section>
  );
}
