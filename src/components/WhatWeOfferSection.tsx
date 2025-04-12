
import { 
  Users, 
  Lightbulb, 
  Settings, 
  Network
} from "lucide-react";

export default function WhatWeOfferSection() {
  const offerings = [
    {
      title: "Collaborative Community",
      description: "Connect and grow with like minded peers.",
      icon: <Users className="h-10 w-10 text-indigo-500" />
    },
    {
      title: "Skill-Building Workshops",
      description: "Learn & develop new skills together.",
      icon: <Settings className="h-10 w-10 text-indigo-500" />
    },
    {
      title: "Innovative Projects & Challenges",
      description: "Solve problems & create exciting projects.",
      icon: <Lightbulb className="h-10 w-10 text-indigo-500" />
    },
    {
      title: "Networking Opportunities",
      description: "Meet professionals and expand your network.",
      icon: <Network className="h-10 w-10 text-indigo-500" />
    }
  ];

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 bg-blue-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">What We Offer</h2>
        
        <div className="relative">
          {/* Center image */}
          <div className="w-52 h-52 md:w-64 md:h-64 bg-white rounded-full mx-auto mb-8 flex items-center justify-center overflow-hidden">
            <img 
              src="/lovable-uploads/e36d7fb0-9f91-4b74-857b-29bd5da502ea.png" 
              alt="Community of people" 
              className="w-full h-auto"
            />
          </div>
          
          {/* Offerings with connecting lines */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-y-20 gap-x-8">
            {offerings.map((item, index) => (
              <div key={index} className={`flex ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'} relative`}>
                <div className={`max-w-xs flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-start gap-4`}>
                  <div className="flex-shrink-0 p-2 rounded-full bg-white border-2 border-indigo-100 shadow-md">
                    {item.icon}
                  </div>
                  <div className={`text-${index % 2 === 0 ? 'right' : 'left'} md:text-left`}>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-gray-600 mt-1">{item.description}</p>
                  </div>
                </div>
                {/* Connect lines visible only on md screens and up */}
                <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-y-1/2 w-20 h-px bg-black"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
