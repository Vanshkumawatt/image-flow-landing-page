
import { Card, CardContent } from "@/components/ui/card";
import { StarIcon } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah K.",
      role: "Web Developer",
      message: "Orielix transformed how I approach learning. The community is incredibly supportive and the projects helped me build a professional portfolio!",
      highlighted: false
    },
    {
      name: "Michael T.",
      role: "UX Designer",
      message: "The project-based learning approach helped me build a portfolio while learning new skills. I landed my dream job within 3 months of joining Orielix.",
      highlighted: true
    },
    {
      name: "Jamie L.",
      role: "Data Scientist",
      message: "I've made valuable connections through Orielix that led to amazing job opportunities. The mentorship program was particularly helpful.",
      highlighted: false
    }
  ];

  const faqs = [
    {
      question: "How do I get started with Orielix?",
      answer: "Sign up for an account on our website, complete your profile, and you'll be guided through our personalized onboarding process."
    },
    {
      question: "Are the courses self-paced?",
      answer: "Yes, all learning resources are designed to be completed at your own pace, with flexible deadlines to fit your schedule."
    },
    {
      question: "How can I connect with other learners?",
      answer: "Join our community forums, participate in group projects, and attend our regular virtual meetups and networking events."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Yes, Orielix is available on iOS and Android devices for learning on the go, with offline access to most resources."
    },
    {
      question: "What kind of support is available?",
      answer: "We offer 24/7 technical support, peer mentoring, expert coaching sessions, and a comprehensive knowledge base."
    }
  ];

  return (
    <section className="py-20 px-6 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center">
          Hear from our <span className="text-indigo-600">Community</span>
        </h2>
        
        <div className="flex flex-col md:flex-row gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="md:w-1/3">
              <Card className={`h-full ${testimonial.highlighted ? 'shadow-xl border-indigo-200 border-2' : 'shadow-lg hover:shadow-xl transition-all duration-300'}`}>
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-lg italic mb-6 text-gray-700">
                    "{testimonial.message}"
                  </p>
                  <div className="font-bold text-lg">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        
        <h3 className="text-2xl md:text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            {faqs.slice(0, 3).map((faq, index) => (
              <div key={index} className="border-b pb-6">
                <h4 className="text-lg md:text-xl font-bold mb-3">{index + 1}. {faq.question}</h4>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="space-y-8">
            {faqs.slice(3).map((faq, index) => (
              <div key={index} className="border-b pb-6">
                <h4 className="text-lg md:text-xl font-bold mb-3">{index + 4}. {faq.question}</h4>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
