
import { 
  Users, 
  Lightbulb, 
  Settings, 
  Network
} from "lucide-react";
import { motion } from "framer-motion";

export default function WhatWeOfferSection() {
  const offerings = [
    {
      title: "Collaborative Community",
      description: "Connect and grow with like-minded peers dedicated to mutual success.",
      icon: <Users className="h-10 w-10 text-purple-600" />
    },
    {
      title: "Skill-Building Workshops",
      description: "Learn practical skills through expert-led interactive workshops.",
      icon: <Settings className="h-10 w-10 text-purple-600" />
    },
    {
      title: "Innovative Projects",
      description: "Solve real-world problems through exciting collaborative projects.",
      icon: <Lightbulb className="h-10 w-10 text-purple-600" />
    },
    {
      title: "Networking Opportunities",
      description: "Connect with professionals and expand your career network.",
      icon: <Network className="h-10 w-10 text-purple-600" />
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold mb-16 text-center"
        >
          What We <span className="text-purple-600">Offer</span>
        </motion.h2>
        
        <div className="relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-60 h-60 md:w-72 md:h-72 bg-white rounded-full mx-auto mb-12 flex items-center justify-center overflow-hidden shadow-lg border-4 border-purple-100 animate-pulse-soft"
          >
            <img 
              src="/lovable-uploads/e36d7fb0-9f91-4b74-857b-29bd5da502ea.png" 
              alt="Community of people" 
              className="w-full h-auto"
            />
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 md:gap-y-24 gap-x-8 mt-8">
            {offerings.map((item, index) => (
              <motion.div 
                key={index} 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className={`flex ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'} relative group`}
              >
                <div className={`max-w-xs flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-start gap-5 transition-all duration-300 transform hover:scale-105`}>
                  <div className="flex-shrink-0 p-3 rounded-full bg-purple-50 border-2 border-purple-100 shadow-md group-hover:shadow-lg group-hover:bg-purple-100 transition-all duration-300">
                    <motion.div 
                      animate={{ rotate: [0, 5, 0, -5, 0] }} 
                      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                    >
                      {item.icon}
                    </motion.div>
                  </div>
                  <div className={`text-${index % 2 === 0 ? 'right' : 'left'} md:text-left`}>
                    <h3 className="text-xl md:text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
                {/* Connect lines visible only on md screens and up */}
                <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-y-1/2 w-24 h-px bg-purple-200"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
