import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { 
  CalendarIcon, 
  BellIcon, 
  ImageIcon, 
  UsersIcon, 
  MessageSquareIcon, 
  TrendingUpIcon, 
  BookOpenIcon, 
  LayoutGridIcon, 
  CheckCircleIcon, 
  Clock as ClockIcon,
  HomeIcon,
  X,
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  Pencil as PencilIcon,
  Users as UserGroupIcon,
  Map as MapIcon,
  Briefcase as BriefcaseIcon,
  Search,
  Sparkles as SparklesIcon,
  Star as StarIcon,
  MapPin,
  Calendar as CalendarIconSolid,
  User,
  Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { eventData } from "@/data/eventData";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

// Define the Event type based on the eventData structure
interface Presenter {
  name: string;
  role: string;
  avatar: string;
  fallback: string;
}

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  presenter: Presenter;
  attending: number;
  color: string;
}

// NavItem component for sidebar
interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  badge?: string;
  onClick?: () => void;
}

const NavItem = ({ icon, text, active, badge, onClick }: NavItemProps) => (
  <button
    className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-left transition-all duration-200 ease-in-out group relative overflow-hidden ${
      active 
        ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/30 scale-[1.01]' 
        : 'hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50/80 text-indigo-800 hover:shadow-md hover:-translate-y-0.5 hover:scale-[1.005]'
    }`}
    onClick={onClick}
  >
    {/* Background glow effect */}
    {!active && (
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/0 via-indigo-400/0 to-purple-400/0 opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300 ease-in-out"></div>
    )}
    {active && (
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 via-purple-400/20 to-indigo-400/20 opacity-30 blur-md"></div>
    )}
    
    <div className={`relative z-10 ${active ? 'text-white' : 'text-indigo-600'} transition-all duration-200 ease-in-out ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
      {icon}
    </div>
    <span className="relative z-10 text-base font-medium tracking-tight group-hover:translate-x-0.5 transition-all duration-200 ease-in-out">{text}</span>
    {badge && (
      <div className="relative z-10 ml-auto bg-white/90 backdrop-blur-sm text-indigo-600 min-w-6 h-6 px-1.5 rounded-full flex items-center justify-center text-xs font-bold shadow-sm border border-indigo-100/50 transition-all duration-200 ease-in-out group-hover:scale-105 group-hover:shadow-md group-hover:border-indigo-200/70 group-hover:bg-white">
        {badge}
      </div>
    )}
  </button>
);

export default function Events() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) { // Scrolling down & past 100px
          setVisible(false);
        } else { // Scrolling up
          setVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      
      // Cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Sidebar */}
      <div className={`fixed inset-0 z-50 ${sidebarOpen ? 'block' : 'hidden'}`}>
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-black/20 backdrop-blur-sm" 
          onClick={() => setSidebarOpen(false)}
        ></div>
        
        {/* Sidebar */}
        <div className={`absolute left-0 top-0 h-full w-[300px] bg-gradient-to-b from-indigo-100/95 via-purple-50/90 to-indigo-100/95 shadow-2xl backdrop-blur-sm transform transition-all duration-500 ease-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} border-r border-indigo-200/30 rounded-r-3xl`}>
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden rounded-r-3xl">
            <div className="absolute h-40 w-40 -top-10 -right-10 bg-purple-300/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute h-60 w-60 bottom-20 -left-20 bg-indigo-300/30 rounded-full blur-3xl animate-pulse opacity-70"></div>
            <div className="absolute h-20 w-20 top-1/2 right-10 bg-purple-400/20 rounded-full blur-xl animate-pulse opacity-80"></div>
          </div>
          
          <div className="p-5 flex justify-end items-center border-b border-indigo-200/50 relative z-10">
            <button 
              className="p-2 rounded-full bg-white/80 hover:bg-white text-indigo-500 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 ease-out hover:scale-110 hover:rotate-90 group"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5 transition-all duration-300 ease-out group-hover:text-indigo-600" />
            </button>
          </div>
          
          <div className="py-6 px-4 space-y-4 relative z-10">
            <div className="space-y-2.5">
              <NavItem icon={<HomeIcon className="h-5 w-5" />} text="Dashboard" onClick={() => navigate('/dashboard')} />
              <NavItem icon={<CalendarIcon className="h-5 w-5" />} text="Events" active />
              <NavItem icon={<BookOpenIcon className="h-5 w-5" />} text="Sessions" onClick={() => navigate('/sessions')} />
              <NavItem icon={<UsersIcon className="h-5 w-5" />} text="Community" onClick={() => navigate('/community')} />
            </div>
            
            <div className="mt-8 pt-6 border-t border-indigo-200/50 relative">
              <div className="absolute inset-x-4 -top-px h-px bg-gradient-to-r from-transparent via-indigo-300/50 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Header - Modern User-Friendly Design */}
      <header className={`bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-md border-b border-indigo-100 h-20 transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="grid grid-cols-3 items-center h-full w-full">
            <div className="flex-shrink-0 pl-2 flex items-center h-full overflow-visible">
              <div className="cursor-pointer transition-all duration-300 flex items-center justify-center overflow-visible">
                <img 
                  src="/lovable-uploads/orielixlogo.png" 
                  alt="Orielix Logo" 
                  className="h-[85px] -mt-2 transition-all duration-300 transform hover:scale-105"
                />
              </div>
            </div>
            
            {/* Center Navigation */}
            <div className="hidden md:flex justify-center items-center">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full p-1 shadow-sm border border-indigo-100">
                <div className="flex space-x-1">
                  <button onClick={() => navigate('/dashboard')} className="px-5 py-2 rounded-full text-indigo-700 font-medium text-sm transition-all duration-300 hover:bg-white/80 hover:shadow-sm transform hover:-translate-y-0.5">
                    Dashboard
                  </button>
                  <button onClick={() => navigate('/events')} className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-purple-600 transform hover:-translate-y-0.5">
                    Events
                  </button>
                  <button onClick={() => navigate('/sessions')} className="px-5 py-2 rounded-full text-indigo-700 font-medium text-sm transition-all duration-300 hover:bg-white/80 hover:shadow-sm transform hover:-translate-y-0.5">
                    Sessions
                  </button>
                  <button onClick={() => navigate('/community')} className="px-5 py-2 rounded-full text-indigo-700 font-medium text-sm transition-all duration-300 hover:bg-white/80 hover:shadow-sm transform hover:-translate-y-0.5">
                    Community
                  </button>
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center justify-end flex-shrink-0 gap-2 lg:gap-4 mr-3 lg:mr-5">
              <button 
                className="p-2.5 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 text-indigo-600 transition-all duration-300 ease-out shadow-sm hover:shadow-md hover:scale-105 border border-indigo-100 hover:border-indigo-200 relative"
                onClick={() => navigate('/notifications')}
              >
                <span className="sr-only">View notifications</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                </svg>
                <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 ring-1 ring-white"></span>
              </button>
              <div className="relative">
                <button 
                  className="flex items-center space-x-2 p-1.5 pl-1.5 pr-4 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 text-indigo-700 transition-all duration-300 ease-out shadow-sm hover:shadow-md hover:scale-105 border border-indigo-100 hover:border-indigo-200"
                  onClick={() => navigate('/user-profile')}
                >
                  <Avatar className="h-8 w-8 ring-2 ring-white shadow-sm">
                    <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">John Doe</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="relative mb-12 overflow-hidden rounded-3xl bg-white border border-indigo-100/50 shadow-2xl">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(#6366f1_0.5px,transparent_0.5px)] bg-[length:24px_24px] opacity-[0.03]"></div>
            <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-200/20 via-purple-200/20 to-indigo-200/20 blur-3xl opacity-70"></div>
            <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-br from-purple-200/20 via-indigo-200/20 to-purple-200/20 blur-3xl opacity-70"></div>
            
            {/* Content wrapper */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 p-10">
              <div className="max-w-2xl">
                {/* Subtle badge */}
                <div className="inline-flex mb-4 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                  <span className="text-xs font-medium text-indigo-700 flex items-center">
                    <SparklesIcon className="h-3.5 w-3.5 mr-1.5" /> Curated for you
                  </span>
                </div>
                
                {/* Modern heading with enhanced typography */}
                <h1 className="mb-5 text-4xl md:text-5xl font-extrabold tracking-tight relative z-20 pl-1">
                  <span className="inline-block pb-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">Discover Amazing Events</span>
                </h1>
                
                {/* Enhanced description with better typography */}
                <p className="mb-7 text-lg leading-relaxed text-gray-600">
                  Compete with skilled people, implement learnings practically, and expand your real network through multiple industry events.
                </p>
                
                {/* Modern button with subtle animation */}
                <div className="flex flex-wrap gap-3">
                  <Button 
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300 px-6 py-5 rounded-xl text-base font-medium"
                    onClick={() => {
                      document.getElementById('perfectEvent')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Browse All Events
                  </Button>
                </div>
              </div>
              
              {/* Creative skills illustration with enhanced animations */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-full blur-xl animate-pulse-slow"></div>
                <div className="w-72 h-72 bg-gradient-to-br from-white to-indigo-50 rounded-full flex items-center justify-center p-4 border border-indigo-100 shadow-xl relative z-10 transition-all duration-500 group-hover:shadow-purple-200/50">
                  {/* Animated rotating boundary */}
                  <div className="absolute -inset-4 border-2 border-dashed border-purple-300/50 rounded-full animate-[spin_40s_linear_infinite]"></div>
                  
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center shadow-inner relative overflow-hidden">
                    {/* Gradient overlays with animations */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-indigo-500/10 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 bg-gradient-to-bl from-pink-500/10 to-purple-500/10 rounded-full animate-pulse delay-1000"></div>
                    <div className="absolute inset-0 border-[3px] border-purple-200/50 rounded-full animate-[spin_20s_linear_infinite]"></div>
                    
                    <div className="relative z-10 w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                      <img 
                        src="/lovable-uploads/creative-skills-icon.png" 
                        alt="Creative Skills Icon" 
                        className="w-[170%] h-[170%] object-contain transform scale-[1.7]"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/200?text=Creative+Skills';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Ultra-Modern Event Filter with Enhanced User Appeal */}
          <div id="perfectEvent" className="mb-20 relative">
            {/* Subtle animated background elements */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-200/20 rounded-full blur-3xl animate-pulse-slow opacity-70"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl animate-pulse-slow opacity-70"></div>
            
            <div className="relative z-10">
              {/* Enhanced heading with animation */}
              <div className="text-center mb-8 relative">
                {/* Decorative background elements */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-60 h-60 bg-gradient-to-r from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl opacity-70 animate-pulse-slow"></div>
                <div className="absolute -top-8 left-1/3 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-purple-200/30 to-indigo-200/30 rounded-full blur-2xl opacity-60 animate-pulse-slow animation-delay-1000"></div>
                <div className="absolute top-0 right-1/3 transform translate-x-1/2 w-40 h-40 bg-gradient-to-r from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl opacity-70 animate-pulse-slow animation-delay-2000"></div>
                
                {/* Badge with animation */}
                <div className="inline-flex items-center justify-center mb-3 relative z-10">
                  <Badge variant="outline" className="px-4 py-1.5 border-indigo-200 bg-white/90 backdrop-blur-sm text-indigo-700 text-xs font-medium rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 group">
                    <span className="mr-1.5 group-hover:animate-spin transition-all duration-300">✨</span> 
                    <span>
                      Events
                    </span>
                  </Badge>
                </div>
                
                {/* Heading with enhanced gradient and animation */}
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent mb-3 relative z-10">
                  <span className="inline-block">Find</span>{" "}
                  <span className="inline-block">Your</span>{" "}
                  <span className="inline-block">Perfect</span>{" "}
                  <span className="inline-block">Event</span>
                </h2>
              </div>
              
              {/* Redesigned compact filter section */}
              <div className="max-w-[700px] mx-auto">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl shadow-lg overflow-hidden border border-indigo-100/50 transition-all duration-300 hover:shadow-indigo-200/50 hover:border-indigo-200/50">
                  <div className="p-0.5 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-indigo-500/20">
                    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl relative overflow-hidden">
                      {/* Subtle decorative elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100/10 to-purple-100/10 rounded-full -mr-16 -mt-16 blur-xl"></div>
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-100/10 to-indigo-100/10 rounded-full -ml-16 -mb-16 blur-xl"></div>
                      
                      {/* Horizontal filter layout */}
                      <div className="flex items-center gap-4 relative z-10">
                        {/* Category Dropdown */}
                        <div className="flex-1">
                          <Select>
                            <SelectTrigger className="h-12 bg-white/90 border-indigo-100 hover:border-indigo-300 focus:border-indigo-500 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-gray-700 pl-12">
                              <div className="absolute left-3 top-3 w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center shadow-md">
                                <SparklesIcon className="w-4 h-4 text-white" />
                              </div>
                              <SelectValue placeholder="All Categories" />
                            </SelectTrigger>
                            <SelectContent className="bg-white/95 backdrop-blur-sm border-indigo-100 rounded-xl shadow-xl p-1.5 border-t border-indigo-50">
                              <div className="bg-gradient-to-r from-indigo-50/50 to-purple-50/50 rounded-lg p-2 mb-2">
                                <SelectItem value="all" className="rounded-lg hover:bg-white flex items-center gap-2 pl-2 h-9 transition-all duration-200">
                                  <span className="text-indigo-600 font-medium">All Categories</span>
                                </SelectItem>
                              </div>
                              <div className="space-y-1 px-1">
                                <SelectItem value="orielix-officials" className="rounded-lg hover:bg-indigo-50/70 flex items-center h-9 transition-all duration-200 text-gray-700">
                                  <span className="ml-2">Orielix Officials</span>
                                </SelectItem>
                                <SelectItem value="technology" className="rounded-lg hover:bg-indigo-50/70 flex items-center h-9 transition-all duration-200 text-gray-700">
                                  <span className="ml-2">Technology</span>
                                </SelectItem>
                                <SelectItem value="startup" className="rounded-lg hover:bg-indigo-50/70 flex items-center h-9 transition-all duration-200 text-gray-700">
                                  <span className="ml-2">Startup</span>
                                </SelectItem>
                                <SelectItem value="game-development" className="rounded-lg hover:bg-indigo-50/70 flex items-center h-9 transition-all duration-200 text-gray-700">
                                  <span className="ml-2">Game Development</span>
                                </SelectItem>
                                <SelectItem value="graphic-design" className="rounded-lg hover:bg-indigo-50/70 flex items-center h-9 transition-all duration-200 text-gray-700">
                                  <span className="ml-2">Graphic Design</span>
                                </SelectItem>
                                <SelectItem value="ui-ux" className="rounded-lg hover:bg-indigo-50/70 flex items-center h-9 transition-all duration-200 text-gray-700">
                                  <span className="ml-2">UI/UX</span>
                                </SelectItem>
                                <SelectItem value="animation" className="rounded-lg hover:bg-indigo-50/70 flex items-center h-9 transition-all duration-200 text-gray-700">
                                  <span className="ml-2">Animation</span>
                                </SelectItem>
                                <SelectItem value="editing" className="rounded-lg hover:bg-indigo-50/70 flex items-center h-9 transition-all duration-200 text-gray-700">
                                  <span className="ml-2">Editing</span>
                                </SelectItem>
                                <SelectItem value="content-writing" className="rounded-lg hover:bg-indigo-50/70 flex items-center h-9 transition-all duration-200 text-gray-700">
                                  <span className="ml-2">Content Writing</span>
                                </SelectItem>
                                <SelectItem value="marketing" className="rounded-lg hover:bg-indigo-50/70 flex items-center h-9 transition-all duration-200 text-gray-700">
                                  <span className="ml-2">Marketing</span>
                                </SelectItem>
                                <SelectItem value="other" className="rounded-lg hover:bg-indigo-50/70 flex items-center h-9 transition-all duration-200 text-gray-700">
                                  <span className="ml-2">Other</span>
                                </SelectItem>
                              </div>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {/* Search Button */}
                        <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-6 h-12 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 hover:-translate-y-1 hover:scale-[1.03] font-medium whitespace-nowrap">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                          </svg>
                          Find Events
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* All Events */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Featured Events</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {eventData.map((event) => (
                <Card 
                  key={event.id}
                  className={`overflow-hidden border-0 bg-gradient-to-b from-white to-${event.color}-50/30 shadow-xl hover:shadow-${event.color}-200/50 transition-all duration-500 ease-in-out group rounded-xl hover:-translate-y-1 hover:scale-[1.02]`}
                >
                  {/* Enhanced image container */}
                  <div className="relative h-52 overflow-hidden">
                    <img 
                      src={event.image}
                      alt={event.title} 
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    />
                    
                    {/* Date badge with enhanced design */}
                    <div className={`absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-${event.color}-700 z-20 shadow-md border border-${event.color}-100/50 flex items-center`}>
                      <CalendarIcon className={`h-3.5 w-3.5 mr-1.5 text-${event.color}-500`} />
                      {event.date}
                    </div>
                  </div>
                  
                  {/* Enhanced content area */}
                  <CardContent className="p-6">
                    <h3 className={`text-xl font-bold mb-2 group-hover:text-${event.color}-600 transition-colors duration-500`}>{event.title}</h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                    
                    {/* Presenter info with enhanced styling */}
                    <div className={`flex items-center mb-4 p-2 bg-${event.color}-50/50 rounded-lg border border-${event.color}-100/50`}>
                      <Avatar className="h-8 w-8 border-2 border-white shadow-sm mr-2">
                        <AvatarImage src={event.presenter.avatar} />
                        <AvatarFallback>{event.presenter.fallback}</AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="text-xs font-medium text-gray-800 block">{event.presenter.name}</span>
                        <span className="text-xs text-gray-500">{event.presenter.role}</span>
                      </div>
                      <div className={`ml-auto bg-white px-2 py-1 rounded-md text-xs font-medium text-${event.color}-600 shadow-sm border border-${event.color}-100/50`}>
                        {event.attending} Attending
                      </div>
                    </div>
                    
                    {/* Action buttons with enhanced UI */}
                    <div className="flex gap-3 mt-5 relative z-10">
                      <Button 
                        className={`flex-1 bg-gradient-to-r from-${event.color}-600 to-${event.color === 'purple' ? 'indigo' : 'purple'}-600 hover:from-${event.color}-700 hover:to-${event.color === 'purple' ? 'indigo' : 'purple'}-700 text-white shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out hover:scale-[1.05] rounded-xl py-6 relative overflow-hidden group`}
                        onClick={() => {
                          setSelectedEvent(event);
                          setIsRegisterDialogOpen(true);
                        }}
                      >
                        {/* Animated background effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-1000 animate-pulse-slow"></div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300"></div>
                        
                        {/* Icon and text with micro-interactions */}
                        <div className="flex items-center justify-center gap-2">
                          <span className="relative z-10 text-base font-medium group-hover:tracking-wide transition-all duration-300">Register</span>
                          <span className="relative z-10 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300 opacity-0 group-hover:opacity-100">→</span>
                        </div>
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className={`flex-1 border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-500 ease-in-out hover:scale-[1.05] rounded-xl py-6 relative overflow-hidden group`}
                        onClick={() => {
                          console.log('View details clicked for:', event.title);
                          setSelectedEvent(event);
                          setIsDetailsOpen(true);
                        }}
                      >
                        {/* Subtle background animation */}
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/0 via-indigo-50/30 to-indigo-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow"></div>
                        
                        {/* Icon and text with micro-interactions */}
                        <div className="flex items-center justify-center gap-2">
                          <span className="relative z-10 text-base font-medium group-hover:tracking-wide transition-all duration-300">View Details</span>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 relative z-10 transform translate-y-0 group-hover:translate-y-[-2px] group-hover:translate-x-[2px] transition-transform duration-300 opacity-0 group-hover:opacity-100">
                            <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Custom Event Details Modal */}
      {isDetailsOpen && selectedEvent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in-0"
            onClick={() => setIsDetailsOpen(false)}
          ></div>
          
          {/* Modal Content */}
          <div 
            className="relative z-[101] w-full max-w-[800px] max-h-[90vh] overflow-y-auto bg-white rounded-2xl border-0 shadow-2xl p-0 animate-in fade-in-0 zoom-in-95"
            style={{ transform: 'translate(-50%, -50%)', left: '50%', top: '50%', position: 'fixed' }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-2xl pointer-events-none">
              <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-200/20 via-purple-200/20 to-indigo-200/20 blur-3xl opacity-70"></div>
              <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-br from-purple-200/20 via-indigo-200/20 to-purple-200/20 blur-3xl opacity-70"></div>
              <div className="absolute top-1/2 right-1/3 transform -translate-y-1/2 h-64 w-64 rounded-full bg-gradient-to-r from-indigo-300/10 to-purple-300/10 blur-2xl opacity-70 animate-pulse-slow"></div>
            </div>
            
            {/* Hero section with image and overlay */}
            <div className="relative h-72 w-full overflow-hidden rounded-t-2xl">
              <img 
                src={selectedEvent.image} 
                alt={selectedEvent.title}
                className="w-full h-full object-cover transition-all duration-1000 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10"></div>
              
              {/* Close button */}
              <button 
                onClick={() => setIsDetailsOpen(false)}
                className="absolute top-4 right-4 bg-black/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-black/40 transition-all duration-300 hover:scale-110 z-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 pt-8">
              {/* Event description */}
              <div className="mb-8">
                <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
                  About This Event
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {selectedEvent.description} This event is designed to provide hands-on experience and networking opportunities with industry professionals. Participants will gain valuable insights and practical skills they can immediately apply to their work.
                </p>
              </div>

              {/* Event Details with enhanced cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                    <span className="bg-gradient-to-r from-indigo-100 to-purple-100 p-1 rounded-md">
                      <CalendarIconSolid className="h-4 w-4 text-indigo-600" />
                    </span>
                    Event Details
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 rounded-lg border border-indigo-100/50 hover:border-indigo-200/70 transition-all duration-300 hover:-translate-y-0.5 group">
                      <div className="bg-white p-2.5 rounded-full shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-110">
                        <CalendarIconSolid className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-800 block">Date & Time</span>
                        <span className="text-sm text-gray-600">{selectedEvent.date}, 10:00 AM - 4:00 PM</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-indigo-50/80 to-indigo-50/30 rounded-lg border border-indigo-100/80 hover:border-indigo-200/80 transition-all duration-300 hover:-translate-y-0.5 group">
                      <div className="bg-white p-2.5 rounded-full shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-110">
                        <Clock className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-800 block">Duration</span>
                        <span className="text-sm text-gray-600">6 hours (with breaks)</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                    <span className="bg-gradient-to-r from-indigo-100 to-purple-100 p-1 rounded-md">
                      <User className="h-4 w-4 text-purple-600" />
                    </span>
                    Presenter
                  </h3>
                  
                  <div className="p-5 bg-gradient-to-r from-indigo-50/70 to-purple-50/70 rounded-xl border border-indigo-100/70 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group relative overflow-hidden">
                    {/* Animated background elements */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-purple-200/30 to-indigo-200/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    
                    <div className="flex items-center gap-4 mb-4 relative z-10">
                      <Avatar className="h-16 w-16 border-2 border-white shadow-lg group-hover:scale-105 transition-all duration-300">
                        <AvatarImage src={selectedEvent.presenter.avatar} />
                        <AvatarFallback>{selectedEvent.presenter.fallback}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors duration-300">{selectedEvent.presenter.name}</h4>
                        <p className="text-sm text-gray-600">{selectedEvent.presenter.role}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 relative z-10">
                      An industry expert with over 10 years of experience in the field. Known for innovative approaches and practical teaching methods that make complex concepts accessible to all skill levels.
                    </p>
                  </div>
                </div>
              </div>

              {/* What you'll learn section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 flex items-center gap-2">
                  <span className="bg-gradient-to-r from-indigo-100 to-purple-100 p-1 rounded-md">
                    <BookOpenIcon className="h-4 w-4 text-indigo-600" />
                  </span>
                  What You'll Learn
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {["Professional techniques and best practices", "Hands-on experience with industry tools", "Networking with like-minded professionals", "Certificate of completion"].map((item, index) => (
                    <div key={index} className="flex items-start gap-2 p-3 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 rounded-lg border border-indigo-100/50 hover:border-indigo-200/70 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm">
                      <div className="mt-0.5 text-indigo-600">
                        <CheckCircleIcon className="h-5 w-5" />
                      </div>
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                <Button 
                  variant="outline" 
                  onClick={() => setIsDetailsOpen(false)}
                  className="flex-1 border-gray-200 rounded-xl py-6 hover:bg-gray-50 transition-all duration-300 hover:border-gray-300 hover:shadow-sm group"
                >
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">Close</span>
                </Button>
                <Button 
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl py-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] relative overflow-hidden group"
                  onClick={() => {
                    setIsDetailsOpen(false);
                    setIsRegisterDialogOpen(true);
                  }}
                >
                  {/* Animated background effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-1000 animate-pulse-slow"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300"></div>
                  
                  <div className="flex items-center justify-center gap-2 relative z-10">
                    <span className="font-medium group-hover:tracking-wide transition-all duration-300">Register Now</span>
                    <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300 opacity-0 group-hover:opacity-100">→</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Registration Confirmation Dialog */}
      <AlertDialog open={isRegisterDialogOpen} onOpenChange={(open) => setIsRegisterDialogOpen(open)}>
        <AlertDialogContent className="bg-white rounded-2xl border-0 shadow-2xl max-w-md p-0 overflow-hidden">
          {selectedEvent && (
            <>
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-2xl pointer-events-none">
                <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br from-indigo-200/20 via-purple-200/20 to-indigo-200/20 blur-2xl opacity-70"></div>
                <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-gradient-to-br from-purple-200/20 via-indigo-200/20 to-purple-200/20 blur-2xl opacity-70"></div>
              </div>
              
              {/* Event image banner */}
              <div className="relative h-32 w-full overflow-hidden">
                <img 
                  src={selectedEvent.image} 
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover blur-sm scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/70 to-purple-600/70 mix-blend-multiply"></div>
                
                {/* Centered event icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg">
                    <CalendarIconSolid className="h-10 w-10 text-indigo-600" />
                  </div>
                </div>
              </div>
              
              <div className="p-6 pt-5 relative z-10">
                <AlertDialogHeader className="mb-4">
                  <AlertDialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Register for Event
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-center mt-2">
                    You're registering for <span className="font-semibold text-gray-800">{selectedEvent.title}</span> on {selectedEvent.date}.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                {/* Event details summary */}
                <div className="mb-6 space-y-4">
                  <div className="p-4 bg-gradient-to-r from-indigo-50/80 to-purple-50/80 rounded-xl border border-indigo-100/80 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                    {/* Animated background elements */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="flex items-center gap-3 relative z-10">
                      <div className="bg-white p-2 rounded-full shadow-sm">
                        <UsersIcon className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-600">Join <span className="font-medium text-indigo-700">{selectedEvent.attending}</span> others who have already registered!</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-indigo-50/80 to-indigo-50/30 rounded-xl border border-indigo-100/80 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                    {/* Animated background elements */}
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-indigo-200/20 to-purple-200/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="flex items-center gap-3 relative z-10">
                      <div className="bg-white p-2 rounded-full shadow-sm">
                        <CalendarIconSolid className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-600">{selectedEvent.date}, 10:00 AM - 4:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Confirmation message */}
                <div className="text-center mb-6">
                  <p className="text-sm text-gray-600">A confirmation email will be sent with all event details and your registration code.</p>
                </div>

                <AlertDialogFooter className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-gray-100">
                  <AlertDialogCancel className="mt-0 border-gray-200 text-gray-700 rounded-xl py-5 hover:bg-gray-50 transition-all duration-300 hover:border-gray-300 hover:shadow-sm group">
                    <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">Cancel</span>
                  </AlertDialogCancel>
                  <AlertDialogAction 
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl py-5 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] relative overflow-hidden group"
                    onClick={() => {
                      // Here you would typically handle the registration process
                      // For now, we'll just close the dialog
                      setIsRegisterDialogOpen(false);
                      
                      // Show a success message
                      alert(`Successfully registered for ${selectedEvent.title}!`);
                    }}
                  >
                    {/* Animated background effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-1000 animate-pulse-slow"></div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300"></div>
                    
                    <div className="flex items-center justify-center gap-2 relative z-10">
                      <span className="font-medium group-hover:tracking-wide transition-all duration-300">Confirm Registration</span>
                      <CheckCircleIcon className="h-5 w-5 transform scale-0 group-hover:scale-100 transition-transform duration-300" />
                    </div>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </div>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}