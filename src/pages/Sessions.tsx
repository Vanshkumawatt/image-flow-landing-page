import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  Search as SearchIcon
} from 'lucide-react';
import { useNavigate } from "react-router-dom";

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
          <div className="relative mb-12 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-100 p-8 shadow-xl">
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-purple-300/20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-indigo-300/20 blur-3xl"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl">
                <h1 className="mb-4 text-4xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
                  Expand Your Creative Skills
                </h1>
                <p className="mb-6 text-lg text-gray-700">
                  Join interactive sessions led by industry experts. Learn new techniques, get personalized feedback, and level up your creative journey.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300">
                    Browse All Sessions
                  </Button>
                  <Button variant="outline" className="border-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-300">
                    <PlayIcon className="h-4 w-4 mr-2" /> Join Live Session
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full flex items-center justify-center p-3 border border-indigo-200/50 backdrop-blur-sm">
                  <div className="w-full h-full rounded-full bg-white/80 flex items-center justify-center shadow-inner">
                    <SparklesIcon className="h-24 w-24 text-indigo-500/80" />
                  </div>
                </div>
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">15</div>
              </div>
            </div>
          </div>
          
          {/* Session Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Upcoming Sessions</h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search sessions..." 
                    className="pl-9 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-sm w-full md:w-64"
                  />
                </div>
                <Button variant="outline" size="sm" className="rounded-full border-gray-200 gap-1">
                  <FilterIcon className="h-3.5 w-3.5" /> Filter
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="all" className="mb-8">
              <TabsList className="bg-gray-100/80 p-1 rounded-full">
                <TabsTrigger value="all" className="rounded-full text-xs px-4 py-1.5 data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm">All Sessions</TabsTrigger>
                <TabsTrigger value="live" className="rounded-full text-xs px-4 py-1.5 data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm">Live Now</TabsTrigger>
                <TabsTrigger value="upcoming" className="rounded-full text-xs px-4 py-1.5 data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm">Upcoming</TabsTrigger>
                <TabsTrigger value="recorded" className="rounded-full text-xs px-4 py-1.5 data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm">Recorded</TabsTrigger>
                <TabsTrigger value="my" className="rounded-full text-xs px-4 py-1.5 data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm">My Sessions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Session Card 1 */}
                  <Card className="overflow-hidden border-0 bg-white shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/40 to-purple-400/40 group-hover:opacity-70 transition-opacity duration-300 z-10"></div>
                      <img 
                        src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                        alt="Portrait Lighting Session" 
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-indigo-700 z-20 flex items-center gap-1">
                        <ClockIcon className="h-3 w-3" /> 90 min
                      </div>
                      <div className="absolute top-3 left-3 bg-indigo-600 px-3 py-1 rounded-full text-xs font-medium text-white z-20 flex items-center gap-1">
                        <Badge className="bg-transparent border-0 p-0 text-white hover:bg-transparent">Live</Badge>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200">Intermediate</Badge>
                        <div className="flex items-center gap-0.5 text-amber-400">
                          <StarIcon className="h-4 w-4 fill-amber-400" />
                          <span className="text-xs font-medium text-gray-700">4.8</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-indigo-600 transition-colors duration-300">Mastering Portrait Lighting</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">Learn professional lighting techniques to create stunning portrait photography in any environment.</p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8 border-2 border-white">
                            <AvatarImage src="https://randomuser.me/api/portraits/women/32.jpg" />
                            <AvatarFallback>SJ</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium leading-none">Sarah Johnson</p>
                            <p className="text-xs text-gray-500">Portrait Photographer</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-gray-500">
                          <CalendarIcon className="h-4 w-4" />
                          <span>May 20, 3:00 PM</span>
                        </div>
                        <div className="flex items-center gap-1 text-indigo-600">
                          <UserGroupIcon className="h-4 w-4" />
                          <span>24 Enrolled</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Session Card 2 */}
                  <Card className="overflow-hidden border-0 bg-white shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/40 to-purple-400/40 group-hover:opacity-70 transition-opacity duration-300 z-10"></div>
                      <img 
                        src="https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80" 
                        alt="Composition Techniques" 
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-indigo-700 z-20 flex items-center gap-1">
                        <ClockIcon className="h-3 w-3" /> 60 min
                      </div>
                      <div className="absolute top-3 left-3 bg-purple-600 px-3 py-1 rounded-full text-xs font-medium text-white z-20 flex items-center gap-1">
                        <Badge className="bg-transparent border-0 p-0 text-white hover:bg-transparent">Upcoming</Badge>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Beginner</Badge>
                        <div className="flex items-center gap-0.5 text-amber-400">
                          <StarIcon className="h-4 w-4 fill-amber-400" />
                          <span className="text-xs font-medium text-gray-700">4.6</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-indigo-600 transition-colors duration-300">Composition Techniques</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">Master the fundamentals of composition to create visually compelling and balanced photographs.</p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8 border-2 border-white">
                            <AvatarImage src="https://randomuser.me/api/portraits/men/45.jpg" />
                            <AvatarFallback>DL</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium leading-none">David Lee</p>
                            <p className="text-xs text-gray-500">Visual Artist</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-gray-500">
                          <CalendarIcon className="h-4 w-4" />
                          <span>May 22, 4:30 PM</span>
                        </div>
                        <div className="flex items-center gap-1 text-indigo-600">
                          <UserGroupIcon className="h-4 w-4" />
                          <span>18 Enrolled</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Session Card 3 */}
                  <Card className="overflow-hidden border-0 bg-white shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/40 to-purple-400/40 group-hover:opacity-70 transition-opacity duration-300 z-10"></div>
                      <img 
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                        alt="Advanced Photo Editing" 
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-indigo-700 z-20 flex items-center gap-1">
                        <ClockIcon className="h-3 w-3" /> 120 min
                      </div>
                      <div className="absolute top-3 left-3 bg-purple-600 px-3 py-1 rounded-full text-xs font-medium text-white z-20 flex items-center gap-1">
                        <Badge className="bg-transparent border-0 p-0 text-white hover:bg-transparent">Upcoming</Badge>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-200">Advanced</Badge>
                        <div className="flex items-center gap-0.5 text-amber-400">
                          <StarIcon className="h-4 w-4 fill-amber-400" />
                          <span className="text-xs font-medium text-gray-700">4.9</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-indigo-600 transition-colors duration-300">Advanced Photo Editing</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">Take your editing skills to the next level with advanced techniques for color grading, retouching, and creative effects.</p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8 border-2 border-white">
                            <AvatarImage src="https://randomuser.me/api/portraits/women/68.jpg" />
                            <AvatarFallback>MP</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium leading-none">Maya Patel</p>
                            <p className="text-xs text-gray-500">Professional Retoucher</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-gray-500">
                          <CalendarIcon className="h-4 w-4" />
                          <span>May 25, 6:00 PM</span>
                        </div>
                        <div className="flex items-center gap-1 text-indigo-600">
                          <UserGroupIcon className="h-4 w-4" />
                          <span>32 Enrolled</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="live" className="mt-6">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                    <PlayIcon className="h-10 w-10 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No Live Sessions</h3>
                  <p className="text-gray-600 max-w-md mb-6">
                    There are no live sessions at the moment. Check back later or browse our upcoming sessions.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="upcoming" className="mt-6">
                {/* Upcoming sessions content would go here */}
              </TabsContent>
              
              <TabsContent value="recorded" className="mt-6">
                {/* Recorded sessions content would go here */}
              </TabsContent>
              
              <TabsContent value="my" className="mt-6">
                {/* My sessions content would go here */}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
