
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Brain, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  return (
    <header className="py-4 px-6 md:px-12 bg-white bg-opacity-80 backdrop-blur-md fixed w-full z-50 shadow-sm">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-7 w-7 text-indigo-600" />
            <span className="text-2xl font-bold">Orielix</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-lg font-medium border-b-2 border-indigo-600 text-indigo-900">Home</Link>
            <Link to="/about" className="text-lg font-medium hover:text-indigo-600 transition-colors">About</Link>
            <Link to="/team" className="text-lg font-medium hover:text-indigo-600 transition-colors">Team</Link>
          </nav>
          
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" className="border-2 rounded-full px-6 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-300 transition-all">
              Log in
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-full px-6 shadow-md hover:shadow-lg transition-all">
              Register
            </Button>
          </div>
          
          <button 
            className="md:hidden text-gray-700"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} py-4`}>
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-lg font-medium px-2 py-1 rounded hover:bg-indigo-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-lg font-medium px-2 py-1 rounded hover:bg-indigo-50"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/team" 
              className="text-lg font-medium px-2 py-1 rounded hover:bg-indigo-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Team
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              <Button variant="outline" className="border-2 w-full justify-center">
                Log in
              </Button>
              <Button className="bg-indigo-600 hover:bg-indigo-700 w-full justify-center">
                Register
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
