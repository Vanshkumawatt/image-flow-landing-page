
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CtaSection() {
  return (
    <section className="py-20 px-6 md:px-12 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="/lovable-uploads/dc09722b-7100-4976-9dbb-a6614c112545.png" 
              alt="Gamified Experience" 
              className="rounded-lg shadow-2xl w-full transform transition-all duration-500 hover:scale-105"
            />
          </motion.div>
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Experience the most Advanced Gamified Learning
            </h2>
            <p className="text-lg text-indigo-100 mb-8">
              Are you ready to shift your learning experience to a whole new level? 
              With Orielix's advanced gamification features, learning becomes an exciting journey that keeps you motivated and engaged.
            </p>
            <div className="flex justify-center md:justify-start">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="bg-white text-purple-700 hover:bg-purple-100 rounded-full px-8 py-6 text-lg flex items-center gap-2 shadow-lg group">
                  Start Your Journey
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
