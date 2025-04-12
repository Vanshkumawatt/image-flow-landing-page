
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, AlertTriangle, AlertCircle, ArrowRight } from "lucide-react";

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

  return (
    <section className="py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">
          Do you feel <span className="text-indigo-600">stuck</span> in your learning journey?
        </h2>
        <p className="text-lg text-center text-gray-600 mb-16 max-w-3xl mx-auto">
          Many learners struggle with these common challenges. Orielix is designed to help you overcome them and reach your full potential.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {challengeCards.map((card, index) => (
            <Card key={index} className={`overflow-hidden border-2 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${card.color}`}>
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="mb-6">
                  {card.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                <p className="text-gray-700">{card.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-xl font-semibold mb-8 text-gray-800">
            With Orielix, you'll never have to feel this way again
          </p>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group">
            Transform Your Learning Experience
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}
