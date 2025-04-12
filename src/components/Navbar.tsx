
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="py-4 px-6 md:px-12 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Brain className="h-6 w-6" />
        <span className="text-2xl font-bold">Orielix</span>
      </div>
      
      <nav className="hidden md:flex items-center gap-8">
        <Link to="/" className="text-lg font-medium border-b-2 border-black">Home</Link>
        <Link to="/about" className="text-lg font-medium hover:border-b-2 hover:border-black transition-all">About</Link>
        <Link to="/team" className="text-lg font-medium hover:border-b-2 hover:border-black transition-all">Team</Link>
      </nav>
      
      <div className="flex items-center gap-3">
        <Button variant="outline" className="border-2 rounded-full px-6">
          Log in
        </Button>
        <Button className="bg-indigo-500 hover:bg-indigo-600 rounded-full px-6">
          Register
        </Button>
      </div>
    </header>
  );
}
