
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain, Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialIcons = [
    { icon: <Facebook className="h-5 w-5" />, href: "#" },
    { icon: <Twitter className="h-5 w-5" />, href: "#" },
    { icon: <Instagram className="h-5 w-5" />, href: "#" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#" },
    { icon: <Github className="h-5 w-5" />, href: "#" }
  ];

  const fadeInUpItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpItem}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Brain className="h-6 w-6" />
              <span className="text-2xl font-bold">Orielix</span>
            </div>
            <p className="text-gray-300 mb-6">
              Transforming education through community, innovation, and personalized learning experiences.
            </p>
            <div className="flex items-center gap-4">
              {socialIcons.map((social, index) => (
                <motion.a 
                  key={index}
                  href={social.href} 
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpItem}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block">About Us</Link>
              </li>
              <li>
                <Link to="/team" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block">Our Team</Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block">Courses</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block">Blog</a>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpItem}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-purple-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300">123 Innovation Street, Tech City, TC 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-purple-400 flex-shrink-0" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-purple-400 flex-shrink-0" />
                <span className="text-gray-300">support@orielix.com</span>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpItem}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <div className="flex gap-2">
              <Input 
                placeholder="Your email" 
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
              <Button className="bg-purple-600 hover:bg-purple-700">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400"
        >
          <p>&copy; {currentYear} Orielix. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}
