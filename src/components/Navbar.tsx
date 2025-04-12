
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Brain, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  return (
    <header className="py-4 px-6 md:px-12 bg-white bg-opacity-80 backdrop-blur-md fixed w-full z-50 shadow-sm">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <Brain className="h-7 w-7 text-purple-600" />
            <span className="text-2xl font-bold">Orielix</span>
          </motion.div>
          
          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="hidden md:flex items-center gap-8"
          >
            <Link to="/" className="text-lg font-medium border-b-2 border-purple-600 text-purple-900">Home</Link>
            <Link to="/about" className="text-lg font-medium hover:text-purple-600 transition-colors">About</Link>
            <Link to="/team" className="text-lg font-medium hover:text-purple-600 transition-colors">Team</Link>
          </motion.nav>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="hidden md:flex items-center gap-3"
          >
            <Button variant="outline" className="border-2 rounded-full px-6 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-300 transition-all">
              Log in
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 rounded-full px-6 shadow-md hover:shadow-lg transition-all">
              Register
            </Button>
          </motion.div>
          
          <button 
            className="md:hidden text-gray-700"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        <motion.div 
          initial={false}
          animate={{ height: isMenuOpen ? "auto" : 0, opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className={`md:hidden overflow-hidden py-4`}
        >
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-lg font-medium px-2 py-1 rounded hover:bg-purple-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-lg font-medium px-2 py-1 rounded hover:bg-purple-50"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/team" 
              className="text-lg font-medium px-2 py-1 rounded hover:bg-purple-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Team
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              <Button variant="outline" className="border-2 w-full justify-center">
                Log in
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 w-full justify-center">
                Register
              </Button>
            </div>
          </nav>
        </motion.div>
      </div>
    </header>
  );
}
