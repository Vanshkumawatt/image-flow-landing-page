
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="py-20 px-6 md:px-12 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <img 
              src="/lovable-uploads/dc09722b-7100-4976-9dbb-a6614c112545.png" 
              alt="Gamified Experience" 
              className="rounded-lg shadow-2xl w-full transform transition-all duration-500 hover:scale-105"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Experience the most Advanced Gamified Learning
            </h2>
            <p className="text-lg text-indigo-100 mb-8">
              Are you ready to shift your learning experience to a whole new level? 
              With Orielix's advanced gamification features, learning becomes an exciting journey that keeps you motivated and engaged.
            </p>
            <Button className="bg-white text-indigo-700 hover:bg-indigo-100 rounded-full px-8 py-6 text-lg flex items-center gap-2 shadow-lg group">
              Start Your Journey
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
