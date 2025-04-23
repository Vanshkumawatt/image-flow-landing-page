import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
  Briefcase as BriefcaseIcon
} from "lucide-react";
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

export default function Events() {
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
                  Discover Amazing Events
                </h1>
                <p className="mb-6 text-lg text-gray-700">
                  Connect with creators, learn new skills, and expand your creative network through our curated events, workshops, and meetups.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300">
                    Browse All Events
                  </Button>
                  <Button variant="outline" className="border-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-300">
                    Create Event
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full flex items-center justify-center p-3 border border-indigo-200/50 backdrop-blur-sm">
                  <div className="w-full h-full rounded-full bg-white/80 flex items-center justify-center shadow-inner">
                    <CalendarIcon className="h-24 w-24 text-indigo-500/80" />
                  </div>
                </div>
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">23</div>
              </div>
            </div>
          </div>
          
          {/* Featured Events */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Featured Events</h2>
              <Button variant="ghost" className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50">
                View All <ChevronRightIcon className="ml-1 h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Event Card 1 */}
              <Card className="overflow-hidden border-0 bg-white shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/40 to-purple-400/40 group-hover:opacity-70 transition-opacity duration-300 z-10"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                    alt="Photography Workshop" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-indigo-700 z-20">
                    May 15, 2025
                  </div>
                </div>
                <CardContent className="p-5">
                  <Badge className="mb-2 bg-indigo-100 text-indigo-700 hover:bg-indigo-200">Workshop</Badge>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-indigo-600 transition-colors duration-300">Advanced Photography Techniques</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">Learn professional photography techniques from industry experts. Perfect for intermediate photographers looking to enhance their skills.</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Avatar className="h-6 w-6 border-2 border-white">
                        <AvatarImage src="https://randomuser.me/api/portraits/women/32.jpg" />
                        <AvatarFallback>SJ</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-gray-600">Sarah Johnson</span>
                    </div>
                    <div className="text-xs text-indigo-600 font-medium">24 Attending</div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Event Card 2 */}
              <Card className="overflow-hidden border-0 bg-white shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/40 to-purple-400/40 group-hover:opacity-70 transition-opacity duration-300 z-10"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80" 
                    alt="Design Meetup" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-indigo-700 z-20">
                    May 22, 2025
                  </div>
                </div>
                <CardContent className="p-5">
                  <Badge className="mb-2 bg-purple-100 text-purple-700 hover:bg-purple-200">Meetup</Badge>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-indigo-600 transition-colors duration-300">Creative Design Showcase</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">Join fellow designers for an evening of inspiration, networking, and showcasing your latest creative projects.</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Avatar className="h-6 w-6 border-2 border-white">
                        <AvatarImage src="https://randomuser.me/api/portraits/men/45.jpg" />
                        <AvatarFallback>DL</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-gray-600">David Lee</span>
                    </div>
                    <div className="text-xs text-indigo-600 font-medium">56 Attending</div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Event Card 3 */}
              <Card className="overflow-hidden border-0 bg-white shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/40 to-purple-400/40 group-hover:opacity-70 transition-opacity duration-300 z-10"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                    alt="AI Art Workshop" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-indigo-700 z-20">
                    June 5, 2025
                  </div>
                </div>
                <CardContent className="p-5">
                  <Badge className="mb-2 bg-indigo-100 text-indigo-700 hover:bg-indigo-200">Workshop</Badge>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-indigo-600 transition-colors duration-300">AI-Powered Art Creation</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">Explore the intersection of AI and creativity. Learn how to use cutting-edge AI tools to enhance your artistic process.</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Avatar className="h-6 w-6 border-2 border-white">
                        <AvatarImage src="https://randomuser.me/api/portraits/women/68.jpg" />
                        <AvatarFallback>MP</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-gray-600">Maya Patel</span>
                    </div>
                    <div className="text-xs text-indigo-600 font-medium">132 Attending</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Upcoming Events Calendar */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Event Calendar</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8 border-indigo-200 text-indigo-700">
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">May 2025</span>
                <Button variant="outline" size="sm" className="h-8 border-indigo-200 text-indigo-700">
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <Card className="border-0 shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-7 text-center border-b border-gray-100">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="py-3 font-medium text-sm text-gray-500 bg-gray-50">{day}</div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 text-center">
                  {/* Previous month days - grayed out */}
                  {[28, 29, 30].map((day) => (
                    <div key={`prev-${day}`} className="py-4 text-gray-400 border-b border-r border-gray-100">{day}</div>
                  ))}
                  
                  {/* Current month days */}
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <div 
                      key={day} 
                      className={`py-4 border-b border-r border-gray-100 relative ${[1, 5, 15, 22].includes(day) ? 'bg-indigo-50' : ''}`}
                    >
                      <span className={`text-sm ${[1, 5, 15, 22].includes(day) ? 'font-medium text-indigo-700' : 'text-gray-700'}`}>{day}</span>
                      {day === 15 && <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-indigo-500"></div>}
                      {day === 22 && <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-purple-500"></div>}
                      {day === 5 && <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-indigo-500"></div>}
                      {day === 1 && <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-purple-500"></div>}
                    </div>
                  ))}
                  
                  {/* Next month days - grayed out */}
                  {[1, 2, 3, 4].map((day) => (
                    <div key={`next-${day}`} className="py-4 text-gray-400 border-b border-r border-gray-100">{day}</div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Event Categories */}
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">Browse by Category</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Photography', icon: <ImageIcon className="h-6 w-6" />, color: 'from-blue-500 to-indigo-500', count: 24 },
                { name: 'Design', icon: <PencilIcon className="h-6 w-6" />, color: 'from-purple-500 to-pink-500', count: 18 },
                { name: 'AI & Technology', icon: <LayoutGridIcon className="h-6 w-6" />, color: 'from-indigo-500 to-purple-500', count: 32 },
                { name: 'Workshops', icon: <UsersIcon className="h-6 w-6" />, color: 'from-green-500 to-teal-500', count: 15 },
                { name: 'Meetups', icon: <UserGroupIcon className="h-6 w-6" />, color: 'from-orange-500 to-amber-500', count: 9 },
                { name: 'Online Events', icon: <MapIcon className="h-6 w-6" />, color: 'from-cyan-500 to-blue-500', count: 27 },
                { name: 'Exhibitions', icon: <ImageIcon className="h-6 w-6" />, color: 'from-rose-500 to-red-500', count: 12 },
                { name: 'Conferences', icon: <BriefcaseIcon className="h-6 w-6" />, color: 'from-violet-500 to-purple-500', count: 7 },
              ].map((category) => (
                <Card key={category.name} className="border-0 shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer overflow-hidden">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center text-white`}>
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">{category.name}</h3>
                        <p className="text-xs text-gray-500">{category.count} events</p>
                      </div>
                    </div>
                    <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-indigo-600 transition-colors duration-300" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}