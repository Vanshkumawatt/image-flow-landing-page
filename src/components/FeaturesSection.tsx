
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, AlertTriangle, AlertCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function FeaturesSection() {
  const challengeCards = [
    {
      title: "Lost",
      description: "Struggling to find direction in your learning journey",
      icon: <HelpCircle className="h-10 w-10 text-red-500" />,
      color: "bg-red-50 border-red-200"
    },
    {
      title: "Distracted",
      description: "Having trouble focusing on what truly matters",
      icon: <AlertTriangle className="h-10 w-10 text-amber-500" />,
      color: "bg-amber-50 border-amber-200"
    },
    {
      title: "Inconsistent",
      description: "Finding it hard to maintain regular learning habits",
      icon: <AlertCircle className="h-10 w-10 text-blue-500" />,
      color: "bg-blue-50 border-blue-200"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">
            Do you feel <span className="text-purple-600">stuck</span> in your learning journey?
          </h2>
          <p className="text-lg text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            Many learners struggle with these common challenges. Orielix is designed to help you overcome them and reach your full potential.
          </p>
        </motion.div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {challengeCards.map((card, index) => (
            <motion.div key={index} variants={item} className="h-full">
              <Card className={`overflow-hidden border-2 h-full transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2 ${card.color}`}>
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <motion.div 
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="mb-6"
                  >
                    {card.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                  <p className="text-gray-700">{card.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-xl font-semibold mb-8 text-gray-800">
            With Orielix, you'll never have to feel this way again
          </p>
          <div className="flex justify-center">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group">
              Transform Your Learning Experience
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
