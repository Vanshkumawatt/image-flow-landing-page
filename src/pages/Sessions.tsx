import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  X,
  HomeIcon,
  LayoutGridIcon,
  BookOpenIcon,
  UsersIcon,
  CalendarIcon,
  Clock as ClockIcon,
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  Star as StarIcon,
  Play as PlayIcon,
  Users as UserGroupIcon,
  Sparkles as SparklesIcon,
  BookOpen as BookIcon,
  Lightbulb as LightbulbIcon,
  Filter as FilterIcon,
  Search as SearchIcon,
  MessageSquareIcon,
  TrendingUpIcon,
  CheckCircleIcon,
  Pencil as PencilIcon,
  Map as MapIcon,
  Briefcase as BriefcaseIcon
} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { sessionData } from "@/data/sessionData";

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

export default function Sessions() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
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
              <NavItem icon={<CalendarIcon className="h-5 w-5" />} text="Events" onClick={() => navigate('/events')} />
              <NavItem icon={<BookOpenIcon className="h-5 w-5" />} text="Sessions" active />
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
                  <button onClick={() => navigate('/events')} className="px-5 py-2 rounded-full text-indigo-700 font-medium text-sm transition-all duration-300 hover:bg-white/80 hover:shadow-sm transform hover:-translate-y-0.5">
                    Events
                  </button>
                  <button onClick={() => navigate('/sessions')} className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-purple-600 transform hover:-translate-y-0.5">
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
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
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
                <h1 className="mb-5 text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Learn from the Best
                </h1>
                
                {/* Enhanced description with better typography */}
                <p className="mb-7 text-lg leading-relaxed text-gray-600">
                  Connect with creators, learn trending skills, and expand your real network through our curated present-industry packed sessions on multiple domains.
                </p>
                
                {/* Modern button with subtle animation */}
                <div className="flex flex-wrap gap-3">
                  <Button 
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300 px-6 py-5 rounded-xl text-base font-medium"
                    onClick={() => {
                      document.getElementById('perfectSession')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Browse All Sessions
                  </Button>
                </div>
              </div>
              
              {/* Modern 3D-like illustration with enhanced animations */}
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
                        src="/lovable-uploads/sessions-icon.png" 
                        alt="Sessions Icon" 
                        className="w-[140%] h-[140%] object-contain transform scale-[1.4]"
                        onError={(e) => {
                          e.currentTarget.src = 'https://i.imgur.com/WFdGkTU.png';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Ultra-Modern Session Filter with Enhanced User Appeal */}
          <div id="perfectSession" className="mb-20 relative">
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
                      Sessions
                    </span>
                  </Badge>
                </div>
                
                {/* Heading with enhanced gradient and animation */}
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent mb-3 relative z-10">
                  <span className="inline-block">Find</span>{" "}
                  <span className="inline-block">Your</span>{" "}
                  <span className="inline-block">Perfect</span>{" "}
                  <span className="inline-block">Session</span>
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
                                <LayoutGridIcon className="w-4 h-4 text-white" />
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

                        {/* Session Type Dropdown */}
                        <div className="flex-1 relative">
                          <Select>
                            <SelectTrigger className="h-12 bg-white/90 border-purple-300 hover:border-purple-400 focus:border-purple-500 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-gray-700 pl-12">
                              <div className="absolute left-3 top-3 w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center shadow-md">
                                <SparklesIcon className="w-4 h-4 text-white" />
                              </div>
                              <SelectValue placeholder="Session Type" />
                            </SelectTrigger>
                            <SelectContent className="bg-white/95 backdrop-blur-sm border-indigo-100 rounded-xl shadow-xl p-1.5 border-t border-indigo-50">
                              <div className="bg-gradient-to-r from-indigo-50/50 to-purple-50/50 rounded-lg p-2 mb-2">
                                <SelectItem value="all-types" className="rounded-lg hover:bg-white flex items-center gap-2 pl-2 h-9 transition-all duration-200">
                                  <span className="text-indigo-600 font-medium">All Types</span>
                                </SelectItem>
                              </div>
                              <div className="space-y-1 px-1">
                                <SelectItem value="workshops" className="rounded-lg hover:bg-indigo-50/70 flex items-center h-9 transition-all duration-200 text-gray-700">
                                  <span className="ml-2">Workshops</span>
                                </SelectItem>
                                <SelectItem value="bootcamps" className="rounded-lg hover:bg-indigo-50/70 flex items-center h-9 transition-all duration-200 text-gray-700">
                                  <span className="ml-2">Bootcamps</span>
                                </SelectItem>
                                <SelectItem value="meetups" className="rounded-lg hover:bg-indigo-50/70 flex items-center h-9 transition-all duration-200 text-gray-700">
                                  <span className="ml-2">Meetups</span>
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
                          Find Sessions
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sessions Section */}
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Featured Sessions</h2>
            </div>
            
            <div className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {sessionData.map((session) => (
                    <Card 
                      key={session.id}
                      className={`overflow-hidden border-0 bg-gradient-to-b from-white to-${session.color}-50/30 shadow-xl hover:shadow-${session.color}-200/50 transition-all duration-500 ease-in-out group rounded-xl hover:-translate-y-1 hover:scale-[1.02]`}
                    >
                      {/* Enhanced image container */}
                      <div className="relative h-52 overflow-hidden">
                        <img 
                          src={session.image}
                          alt={session.title} 
                          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                        />
                        
                        {/* Duration badge */}
                        <div className={`absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-${session.color}-700 z-20 shadow-md border border-${session.color}-100/50 flex items-center`}>
                          <ClockIcon className={`h-3.5 w-3.5 mr-1.5 text-${session.color}-500`} />
                          {session.duration}
                        </div>


                      </div>
                      
                      {/* Enhanced content area */}
                      <CardContent className="p-6">
                        {/* Level badges removed as requested */}
                        
                        <h3 className={`text-xl font-bold mb-2 group-hover:text-${session.color}-600 transition-colors duration-500`}>{session.title}</h3>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{session.description}</p>
                        
                        {/* Presenter info with enhanced styling */}
                        <div className={`flex items-center mb-4 p-2 bg-${session.color}-50/50 rounded-lg border border-${session.color}-100/50`}>
                          <Avatar className="h-8 w-8 border-2 border-white shadow-sm mr-2">
                            <AvatarImage src={session.presenter.avatar} />
                            <AvatarFallback>{session.presenter.fallback}</AvatarFallback>
                          </Avatar>
                          <div>
                            <span className="text-xs font-medium text-gray-800 block">{session.presenter.name}</span>
                            <span className="text-xs text-gray-500">{session.presenter.role}</span>
                          </div>
                          <div className={`ml-auto bg-white px-2 py-1 rounded-md text-xs font-medium text-${session.color}-600 shadow-sm border border-${session.color}-100/50`}>
                            {session.enrolled} Enrolled
                          </div>
                        </div>
                        
                        {/* Date and time info */}
                        <div className="flex items-center justify-between text-sm mb-4">
                          <div className="flex items-center gap-1 text-gray-500">
                            <CalendarIcon className="h-4 w-4" />
                            <span>{session.date}, {session.time}</span>
                          </div>
                        </div>
                        
                        {/* Action buttons */}
                        <div className="flex gap-2 mt-4">
                          <Button 
                            className={`flex-1 bg-gradient-to-r from-${session.color}-600 to-${session.color === 'purple' ? 'indigo' : 'purple'}-600 hover:from-${session.color}-700 hover:to-${session.color === 'purple' ? 'indigo' : 'purple'}-700 text-white shadow-md hover:shadow-lg transition-all duration-500 ease-in-out hover:scale-[1.03]`}
                          >
                            {session.status === 'live' ? 'Join Now' : 'Register'}
                          </Button>
                          <Button 
                            variant="outline" 
                            className={`flex-1 border-${session.color}-200 text-${session.color}-700 hover:bg-${session.color}-50 hover:border-${session.color}-300 transition-all duration-500 ease-in-out hover:scale-[1.03]`}
                          >
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
