import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  return (
    <header className="py-0 px-0 md:px-2 bg-white bg-opacity-80 backdrop-blur-md fixed w-full z-50 shadow-sm h-24 flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0 pl-2 flex items-center h-24 overflow-visible">
            <img 
              src="/lovable-uploads/orielixlogo.png" 
              alt="Orielix Logo" 
              className="h-[110px] w-auto my-0 -mt-1"
            />
          </div>
          
          <div className="hidden md:flex flex-1 justify-center pl-20">
            <nav className="flex items-center gap-10 px-4">
              <Link 
                to="/" 
                className={`text-xl font-medium transition-all duration-300 relative px-3 py-2 rounded-lg group ${location.pathname === '/' ? 'text-purple-600' : 'text-gray-900 hover:text-purple-600'}`}
              >
                <span className="relative z-10">Home</span>
                <span className={`absolute inset-0 bg-purple-100 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 origin-center ${location.pathname === '/' ? 'scale-100 opacity-60' : 'opacity-0 group-hover:opacity-40'}`}></span>
              </Link>
              <Link 
                to="/about" 
                className={`text-xl font-medium transition-all duration-300 relative px-3 py-2 rounded-lg group ${location.pathname === '/about' ? 'text-purple-600' : 'text-gray-900 hover:text-purple-600'}`}
              >
                <span className="relative z-10">Community</span>
                <span className={`absolute inset-0 bg-purple-100 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 origin-center ${location.pathname === '/about' ? 'scale-100 opacity-60' : 'opacity-0 group-hover:opacity-40'}`}></span>
              </Link>
              <Link 
                to="/team" 
                className={`text-xl font-medium transition-all duration-300 relative px-3 py-2 rounded-lg group ${location.pathname === '/team' ? 'text-purple-600' : 'text-gray-900 hover:text-purple-600'}`}
              >
                <span className="relative z-10">Session</span>
                <span className={`absolute inset-0 bg-purple-100 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 origin-center ${location.pathname === '/team' ? 'scale-100 opacity-60' : 'opacity-0 group-hover:opacity-40'}`}></span>
              </Link>
            </nav>
          </div>
          
          <div className="hidden md:flex items-center flex-shrink-0 gap-4 mr-5">
            <Link to="/login">
              <Button variant="outline" className="border-2 rounded-full px-5 py-2 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-300 transition-all text-base font-medium">
                Log in
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-full px-6 py-2 shadow-md hover:shadow-lg transition-all text-base font-medium relative overflow-hidden group border-0">
                <span className="relative z-10">Register</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </Link>
          </div>
          
          <button 
            className="md:hidden text-gray-700 mr-4"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div 
          className={`md:hidden overflow-hidden py-4 ${isMenuOpen ? 'block' : 'hidden'}`}
        >
          <nav className="flex flex-col space-y-4 px-4">
            <Link 
              to="/" 
              className={`text-lg font-medium rounded-lg p-2 transition-all duration-300 ${location.pathname === '/' ? 'bg-purple-100 text-purple-600' : 'hover:bg-purple-50 hover:text-purple-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`text-lg font-medium rounded-lg p-2 transition-all duration-300 ${location.pathname === '/about' ? 'bg-purple-100 text-purple-600' : 'hover:bg-purple-50 hover:text-purple-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Community
            </Link>
            <Link 
              to="/team" 
              className={`text-lg font-medium rounded-lg p-2 transition-all duration-300 ${location.pathname === '/team' ? 'bg-purple-100 text-purple-600' : 'hover:bg-purple-50 hover:text-purple-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Session
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              <Link to="/login" className="w-full" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="border-2 w-full justify-center">
                  Log in
                </Button>
              </Link>
              <Link to="/register" className="w-full" onClick={() => setIsMenuOpen(false)}>
                <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 w-full justify-center relative overflow-hidden group border-0">
                  <span className="relative z-10">Register</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
