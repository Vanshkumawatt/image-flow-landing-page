import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  PencilIcon,
  ListIcon,
  MapIcon,
  Settings,
  BriefcaseIcon,
  Users as UserGroupIcon,
  X
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data
const recentProjects = [
  { id: 1, title: "Product Photography", date: "Today", progress: 75, image: "/images/projects/project1.jpg" },
  { id: 2, title: "Summer Collection", date: "Yesterday", progress: 90, image: "/images/projects/project2.jpg" },
  { id: 3, title: "AI-Enhanced Portraits", date: "3 days ago", progress: 40, image: "/images/projects/project3.jpg" },
];

const upcomingEvents = [
  { 
    id: 1, 
    title: "Photography Basics Workshop",
    date: "Tomorrow, 2:00 PM",
    participants: 24, 
    joined: true 
  },
  { 
    id: 2, 
    title: "Photoshop Advanced Techniques",
    date: "May 15, 5:30 PM",
    participants: 56, 
    joined: false 
  },
  { 
    id: 3, 
    title: "Community Photo Challenge",
    date: "May 18, All day",
    participants: 132, 
    joined: true 
  },
];

const notifications = [
  { id: 1, message: "Your 'Beach Sunset' project received 12 new likes", time: "10 minutes ago", read: false },
  { id: 2, message: "Maria commented on your recent upload", time: "1 hour ago", read: false },
  { id: 3, message: "New workshop available: 'Creative Lighting Techniques'", time: "3 hours ago", read: true },
  { id: 4, message: "Your subscription will renew in 5 days", time: "1 day ago", read: true },
];

const communities = [
  { id: 1, name: "Portrait Photographers", members: 1243, newPosts: 5, avatar: "/images/communities/portrait.jpg" },
  { id: 2, name: "Digital Designers", members: 856, newPosts: 12, avatar: "/images/communities/designers.jpg" },
  { id: 3, name: "AI Art Enthusiasts", members: 2135, newPosts: 28, avatar: "/images/communities/ai-art.jpg" },
];

// Add new data for sessions and workshops after the upcomingEvents array
const upcomingSessions = [
  { 
    id: 1, 
    title: "Mastering Portrait Lighting",
    date: "May 20, 3:00 PM",
    instructor: "Sarah Johnson",
    duration: "90 min",
    level: "Intermediate" 
  },
  { 
    id: 2, 
    title: "Composition Techniques",
    date: "May 22, 4:30 PM",
    instructor: "David Lee",
    duration: "60 min",
    level: "Beginner" 
  },
  { 
    id: 3, 
    title: "Advanced Photo Editing",
    date: "May 25, 6:00 PM",
    instructor: "Maya Patel",
    duration: "120 min",
    level: "Advanced" 
  },
];

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
    onClick={onClick}
    className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-left transition-all duration-200 ease-in-out group relative overflow-hidden ${
      active 
        ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/30 scale-[1.01]' 
        : 'hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50/80 text-indigo-800 hover:shadow-md hover:-translate-y-0.5 hover:scale-[1.005]'
    }`}
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

export default function Dashboard() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [progress, setProgress] = useState(78);
  const [activeTab, setActiveTab] = useState("institution");
  
  // Add animation keyframes to global styles
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
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes pulse-slow {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.5; }
      }
      .animate-pulse-slow {
        animation: pulse-slow 3s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your 'Beach Sunset' project received 12 new likes", time: "10 minutes ago", read: false },
    { id: 2, message: "Maria commented on your recent upload", time: "1 hour ago", read: false },
    { id: 3, message: "New workshop available: 'Creative Lighting Techniques'", time: "3 hours ago", read: true },
    { id: 4, message: "Your subscription will renew in 5 days", time: "1 day ago", read: true },
  ]);
  
  // Ranking data for different views with more realistic values
  const rankingData = {
    institution: {
      you: { name: "You", rank: 28, height: "h-36 sm:h-40", color: "from-purple-500 to-indigo-400", hoverColor: "from-purple-600/90 to-indigo-500/90", barColor: "from-purple-500 to-indigo-600", borderColor: "border-purple-300", textColor: "text-purple-600" },
      top: { name: "Rohit", rank: 1, height: "h-52 sm:h-56", color: "from-rose-500 via-red-400 to-pink-300", hoverColor: "from-rose-600/90 via-red-500/90 to-pink-400/90", barColor: "from-rose-500 to-red-500", borderColor: "border-rose-200", textColor: "text-rose-600" },
      other: { name: "Akshay", rank: 53, height: "h-16 sm:h-20", color: "from-emerald-400 to-green-300", hoverColor: "from-emerald-500/90 to-green-400/90", barColor: "from-emerald-500 to-emerald-600", borderColor: "border-emerald-200", textColor: "text-emerald-600" }
    },
    state: {
      you: { name: "You", rank: 145, height: "h-32 sm:h-36", color: "from-purple-500 to-indigo-400", hoverColor: "from-purple-600/90 to-indigo-500/90", barColor: "from-purple-500 to-indigo-600", borderColor: "border-purple-300", textColor: "text-purple-600" },
      top: { name: "Vikram", rank: 1, height: "h-52 sm:h-56", color: "from-rose-500 via-red-400 to-pink-300", hoverColor: "from-rose-600/90 via-red-500/90 to-pink-400/90", barColor: "from-rose-500 to-red-500", borderColor: "border-rose-200", textColor: "text-rose-600" },
      other: { name: "Priya", rank: 72, height: "h-40 sm:h-44", color: "from-emerald-400 to-green-300", hoverColor: "from-emerald-500/90 to-green-400/90", barColor: "from-emerald-500 to-emerald-600", borderColor: "border-emerald-200", textColor: "text-emerald-600" }
    },
    country: {
      you: { name: "You", rank: 1243, height: "h-20 sm:h-24", color: "from-purple-500 to-indigo-400", hoverColor: "from-purple-600/90 to-indigo-500/90", barColor: "from-purple-500 to-indigo-600", borderColor: "border-purple-300", textColor: "text-purple-600" },
      top: { name: "Arjun", rank: 1, height: "h-52 sm:h-56", color: "from-rose-500 via-red-400 to-pink-300", hoverColor: "from-rose-600/90 via-red-500/90 to-pink-400/90", barColor: "from-rose-500 to-red-500", borderColor: "border-rose-200", textColor: "text-rose-600" },
      other: { name: "Neha", rank: 357, height: "h-36 sm:h-40", color: "from-emerald-400 to-green-300", hoverColor: "from-emerald-500/90 to-green-400/90", barColor: "from-emerald-500 to-emerald-600", borderColor: "border-emerald-200", textColor: "text-emerald-600" }
    }
  };
  
  // Calculate bar heights dynamically based on rankings
  const calculateHeights = () => {
    Object.keys(rankingData).forEach(category => {
      // Get ranks for this category
      const ranks = [
        rankingData[category].you.rank,
        rankingData[category].top.rank,
        rankingData[category].other.rank
      ];
      
      // Set height for top person (always tallest)
      rankingData[category].top.height = "h-52 sm:h-56";
      
      // Determine your and other person's heights based on ranking proportion
      // The lower the rank number, the taller the bar
      const maxRank = Math.max(...ranks);
      const calculateHeight = (rank) => {
        // Formula: 56 - (Math.log(rank) / Math.log(maxRank)) * 40
        // This gives a more logarithmic scale for better visual representation
        const heightValue = Math.max(16, 56 - (Math.log(rank) / Math.log(maxRank)) * 40);
        return `h-${Math.floor(heightValue)} sm:h-${Math.ceil(heightValue)}`;
      };
      
      // Your height (if not #1)
      if (rankingData[category].you.rank !== 1) {
        rankingData[category].you.height = calculateHeight(rankingData[category].you.rank);
      } else {
        rankingData[category].you.height = "h-52 sm:h-56";
      }
      
      // Other person's height (if not #1)
      if (rankingData[category].other.rank !== 1) {
        rankingData[category].other.height = calculateHeight(rankingData[category].other.rank);
      } else {
        rankingData[category].other.height = "h-52 sm:h-56";
      }
    });
    
    return rankingData;
  };
  
  const currentData = calculateHeights()[activeTab];
  
  useEffect(() => {
    const timer = setTimeout(() => setProgress(78), 500);
    return () => clearTimeout(timer);
  }, []);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };
  
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
              <NavItem icon={<HomeIcon className="h-5 w-5" />} text="Dashboard" active onClick={() => navigate('/dashboard')} />
              <NavItem icon={<CalendarIcon className="h-5 w-5" />} text="Events" onClick={() => navigate('/events')} />
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
                  <button onClick={() => navigate('/dashboard')} className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-purple-600 transform hover:-translate-y-0.5">
                    Dashboard
                  </button>
                  <button onClick={() => navigate('/events')} className="px-5 py-2 rounded-full text-indigo-700 font-medium text-sm transition-all duration-300 hover:bg-white/80 hover:shadow-sm transform hover:-translate-y-0.5">
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
              <button className="p-2.5 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 text-indigo-600 transition-all duration-300 ease-out shadow-sm hover:shadow-md hover:scale-105 border border-indigo-100 hover:border-indigo-200 relative">
                <span className="sr-only">View notifications</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                </svg>
                <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 ring-1 ring-white"></span>
              </button>
              <div className="relative">
                <button className="flex items-center space-x-2 p-1.5 pl-1.5 pr-4 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 text-indigo-700 transition-all duration-300 ease-out shadow-sm hover:shadow-md hover:scale-105 border border-indigo-100 hover:border-indigo-200">
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="col-span-2 space-y-8">
              {/* Aura Points Card - Top Section */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-100 via-indigo-100 to-purple-200 text-gray-800 backdrop-blur-sm rounded-2xl overflow-hidden relative">
                {/* Animated background pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] bg-[length:20px_20px] opacity-10"></div>
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -inset-[10px] bg-[conic-gradient(from_0deg,transparent_0_340deg,#8b5cf6_360deg)] opacity-20 blur-3xl"></div>
                </div>
                <div className="absolute top-0 left-0 right-0 h-full w-full overflow-hidden">
                  <div className="absolute w-[500px] h-[500px] -top-[250px] -right-[150px] bg-purple-300 opacity-30 rounded-full blur-3xl"></div>
                  <div className="absolute w-[400px] h-[400px] -bottom-[200px] -left-[100px] bg-indigo-300 opacity-30 rounded-full blur-3xl"></div>
                </div>
                
                <CardContent className="p-0 relative z-10">
                  {/* Welcome Section */}
                  <div className="pt-8 px-8 text-center">
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 bg-clip-text text-transparent mb-4">
                      Welcome Naman
                    </h2>
                    
                    {/* Points Box */}
                    <div className="mt-3 mb-6 inline-flex items-center gap-3 bg-white/80 rounded-2xl px-7 py-3 backdrop-blur-md border border-purple-200 shadow-sm">
                      <div className="w-12 h-12 flex items-center justify-center">
                        <img 
                          src="/lovable-uploads/aura-icon.png" 
                          alt="Aura Points" 
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">1051</span>
                      <span className="text-sm font-semibold px-2 py-1 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 text-indigo-700">Aura Points</span>
                    </div>
                    
                    {/* Toggle Tabs */}
                    <div className="flex justify-center space-x-3 mt-4 mb-24">
                      <button 
                        className={`px-6 py-2 transition-all duration-300 ease-out rounded-full text-sm font-medium shadow-md relative overflow-hidden group ${
                          activeTab === 'institution' 
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white transform hover:scale-105 hover:shadow-lg hover:shadow-purple-300/30' 
                            : 'bg-white/80 hover:bg-white border border-purple-200 hover:border-purple-300 hover:text-purple-700 hover:shadow-md hover:scale-105 shadow-sm text-gray-700'
                        }`}
                        onClick={() => setActiveTab('institution')}
                      >
                        {activeTab === 'institution' && (
                          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
                        )}
                        <span className="relative z-10 transition-transform duration-300 ease-out group-hover:translate-x-0.5">Institution</span>
                      </button>
                      <button 
                        className={`px-6 py-2 transition-all duration-300 ease-out rounded-full text-sm font-medium shadow-md relative overflow-hidden group ${
                          activeTab === 'state' 
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white transform hover:scale-105 hover:shadow-lg hover:shadow-purple-300/30' 
                            : 'bg-white/80 hover:bg-white border border-purple-200 hover:border-purple-300 hover:text-purple-700 hover:shadow-md hover:scale-105 shadow-sm text-gray-700'
                        }`}
                        onClick={() => setActiveTab('state')}
                      >
                        {activeTab === 'state' && (
                          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
                        )}
                        <span className="relative z-10 transition-transform duration-300 ease-out group-hover:translate-x-0.5">State</span>
                      </button>
                      <button 
                        className={`px-6 py-2 transition-all duration-300 ease-out rounded-full text-sm font-medium shadow-md relative overflow-hidden group ${
                          activeTab === 'country' 
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white transform hover:scale-105 hover:shadow-lg hover:shadow-purple-300/30' 
                            : 'bg-white/80 hover:bg-white border border-purple-200 hover:border-purple-300 hover:text-purple-700 hover:shadow-md hover:scale-105 shadow-sm text-gray-700'
                        }`}
                        onClick={() => setActiveTab('country')}
                      >
                        {activeTab === 'country' && (
                          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
                        )}
                        <span className="relative z-10 transition-transform duration-300 ease-out group-hover:translate-x-0.5">Country</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Bar Graph Section */}
                  <div className="mt-0 px-8 relative pb-6">
                    <div className="flex justify-center items-end h-60 relative gap-8 pt-14">
                      {/* Your Bar */}
                      <div className="flex flex-col items-center group">
                        <div className="relative flex flex-col items-center">
                          <div className={`w-20 bg-gradient-to-t ${currentData.you.color} hover:${currentData.you.hoverColor} hover:shadow-[0_0_15px_rgba(124,58,237,0.5)] rounded-t-xl ${currentData.you.height} shadow-lg transition-all duration-300 group-hover:scale-105 border-t border-indigo-200`}>
                            <div className="absolute -top-6 left-0 right-0 flex justify-center">
                              <div className={`bg-gradient-to-r ${currentData.you.barColor} shadow-md px-3 py-1 rounded-full border ${currentData.you.borderColor} flex items-center gap-1`}>
                                <span className="text-xs font-semibold text-white">#</span>
                                <span className="text-sm font-bold text-white">{currentData.you.rank}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-center mt-3">
                          <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 border border-purple-200 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
                            <span className={`text-sm font-semibold ${currentData.you.textColor}`}>{currentData.you.name}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Top Person's Bar */}
                      <div className="flex flex-col items-center group">
                        <div className="relative flex flex-col items-center">
                          <div className={`w-20 bg-gradient-to-t ${currentData.top.color} hover:${currentData.top.hoverColor} hover:shadow-[0_0_15px_rgba(225,29,72,0.5)] rounded-t-xl ${currentData.top.height} shadow-lg transition-all duration-300 group-hover:scale-105 border-t border-red-200`}>
                            <div className="absolute -top-6 left-0 right-0 flex justify-center">
                              <div className="bg-white shadow-md px-3 py-1 rounded-full border border-rose-200 flex items-center gap-1">
                                <span className="text-xs font-semibold text-gray-500">#</span>
                                <span className="text-sm font-bold text-rose-600">{currentData.top.rank}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-center mt-3">
                          <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-100 to-red-50 border border-rose-200 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
                            <span className={`text-sm font-semibold ${currentData.top.textColor}`}>{currentData.top.name}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Other Person's Bar */}
                      <div className="flex flex-col items-center group">
                        <div className="relative flex flex-col items-center">
                          <div className={`w-20 bg-gradient-to-t ${currentData.other.color} hover:${currentData.other.hoverColor} hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] rounded-t-xl ${currentData.other.height} shadow-lg transition-all duration-300 group-hover:scale-105 border-t border-green-200`}>
                            <div className="absolute -top-6 left-0 right-0 flex justify-center">
                              <div className="bg-white shadow-md px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                                <span className="text-xs font-semibold text-gray-500">#</span>
                                <span className="text-sm font-bold text-emerald-600">{currentData.other.rank}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-center mt-3">
                          <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-100 to-green-50 border border-emerald-200 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
                            <span className={`text-sm font-semibold ${currentData.other.textColor}`}>{currentData.other.name}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pb-8"></div>
                </CardContent>
              </Card>

              {/* Tabs Section */}
              <div className="space-y-5">
                {/* Content removed */}
                
                {/* Progress Metrics Section - New Style */}
                <Card className="border-0 rounded-3xl overflow-hidden bg-gradient-to-br from-purple-50 to-indigo-100 text-gray-800 shadow-xl relative">
                  {/* Decorative elements */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute h-40 w-40 -top-10 -right-10 bg-purple-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute h-40 w-40 -bottom-10 -left-10 bg-indigo-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute inset-0 bg-[url('/lovable-uploads/grid-pattern.svg')] opacity-10 mix-blend-soft-light"></div>
                  </div>
                  
                  <CardHeader className="relative z-10 border-b border-purple-200/50 pb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="font-bold text-xl bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                          Your Progress Journey
                        </CardTitle>
                        <CardDescription className="text-gray-600 mt-1">
                          Track your creative milestones
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="px-6 py-5 relative z-10">
                    <div className="grid grid-cols-2 gap-6">
                      {/* Projects Completed */}
                      <div className="relative p-5 bg-gradient-to-br from-white/90 to-purple-50 rounded-2xl backdrop-blur-sm border border-purple-100 hover:border-[#A288E3]/50 hover:shadow-[0_0_20px_rgba(162,136,227,0.2)] transition-all duration-300 overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#A288E3]/10 rounded-full blur-2xl transform translate-x-8 -translate-y-8 group-hover:bg-[#A288E3]/20 transition-all duration-500"></div>
                        
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#A288E3]/20 to-[#A288E3]/5 border border-[#A288E3]/20 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                            <CheckCircleIcon className="h-5 w-5 text-[#A288E3]" />
                          </div>
                          <span className="text-base font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">Projects</span>
                        </div>
                        <div className="flex flex-col items-center mt-2">
                          <span className="text-5xl font-bold text-gray-800 group-hover:text-[#A288E3] transition-colors duration-300">12</span>
                          <span className="text-sm font-medium text-gray-500 mt-1 group-hover:text-gray-600 transition-colors duration-300 bg-white/50 px-2.5 py-1 rounded-full">Completed</span>
                        </div>
                      </div>
                      
                      {/* Events Participated */}
                      <div className="relative p-5 bg-gradient-to-br from-white/90 to-purple-50 rounded-2xl backdrop-blur-sm border border-purple-100 hover:border-[#58C7F3]/50 hover:shadow-[0_0_20px_rgba(88,199,243,0.2)] transition-all duration-300 overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#58C7F3]/10 rounded-full blur-2xl transform translate-x-8 -translate-y-8 group-hover:bg-[#58C7F3]/20 transition-all duration-500"></div>
                        
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#58C7F3]/20 to-[#58C7F3]/5 border border-[#58C7F3]/20 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                            <CalendarIcon className="h-5 w-5 text-[#58C7F3]" />
                          </div>
                          <span className="text-base font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">Events</span>
                        </div>
                        <div className="flex flex-col items-center mt-2">
                          <span className="text-5xl font-bold text-gray-800 group-hover:text-[#58C7F3] transition-colors duration-300">8</span>
                          <span className="text-sm font-medium text-gray-500 mt-1 group-hover:text-gray-600 transition-colors duration-300 bg-white/50 px-2.5 py-1 rounded-full">Participated</span>
                        </div>
                      </div>
                      
                      {/* Sessions Attended */}
                      <div className="relative p-5 bg-gradient-to-br from-white/90 to-purple-50 rounded-2xl backdrop-blur-sm border border-purple-100 hover:border-[#62DDBD]/50 hover:shadow-[0_0_20px_rgba(98,221,189,0.2)] transition-all duration-300 overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#62DDBD]/10 rounded-full blur-2xl transform translate-x-8 -translate-y-8 group-hover:bg-[#62DDBD]/20 transition-all duration-500"></div>
                        
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#62DDBD]/20 to-[#62DDBD]/5 border border-[#62DDBD]/20 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                            <UsersIcon className="h-5 w-5 text-[#62DDBD]" />
                          </div>
                          <span className="text-base font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">Sessions</span>
                        </div>
                        <div className="flex flex-col items-center mt-2">
                          <span className="text-5xl font-bold text-gray-800 group-hover:text-[#62DDBD] transition-colors duration-300">24</span>
                          <span className="text-sm font-medium text-gray-500 mt-1 group-hover:text-gray-600 transition-colors duration-300 bg-white/50 px-2.5 py-1 rounded-full">Attended</span>
                        </div>
                      </div>
                      
                      {/* Collaborations */}
                      <div className="relative p-5 bg-gradient-to-br from-white/90 to-purple-50 rounded-2xl backdrop-blur-sm border border-purple-100 hover:border-[#FF6B8A]/50 hover:shadow-[0_0_20px_rgba(255,107,138,0.2)] transition-all duration-300 overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF6B8A]/10 rounded-full blur-2xl transform translate-x-8 -translate-y-8 group-hover:bg-[#FF6B8A]/20 transition-all duration-500"></div>
                        
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B8A]/20 to-[#FF6B8A]/5 border border-[#FF6B8A]/20 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                            <MessageSquareIcon className="h-5 w-5 text-[#FF6B8A]" />
                          </div>
                          <span className="text-base font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">Collaborations</span>
                        </div>
                        <div className="flex flex-col items-center mt-2">
                          <span className="text-5xl font-bold text-gray-800 group-hover:text-[#FF6B8A] transition-colors duration-300">5</span>
                          <span className="text-sm font-medium text-gray-500 mt-1 group-hover:text-gray-600 transition-colors duration-300 bg-white/50 px-2.5 py-1 rounded-full">Collaborated</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Upcoming Events Section - Clean Design */}
              <Card className="border-0 rounded-3xl overflow-hidden shadow-md relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/90 to-indigo-50/90"></div>
                
                <CardHeader className="relative z-10 pb-4 border-b border-indigo-100/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-white p-2 rounded-lg shadow-sm">
                        <CalendarIcon className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold text-gray-800">
                          Upcoming Events
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-500">
                          Join workshops and community challenges
                        </CardDescription>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="h-9 rounded-lg border-indigo-200 text-indigo-600 hover:bg-indigo-50">
                      View Calendar
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="p-4 relative z-10">
                  <div className="space-y-3">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="bg-white rounded-xl p-4 shadow-sm hover:shadow transition-all duration-200 flex items-center gap-4">
                        {/* Date Circle */}
                        <div className="relative min-w-[60px] h-[60px] flex flex-col items-center justify-center bg-indigo-50 rounded-xl border border-indigo-100">
                          <span className="text-xs font-medium text-indigo-600 uppercase">
                            {event.date.split(',')[0]?.substring(0, 3)}
                          </span>
                          <span className="text-xl font-bold text-indigo-700">
                            {event.date.match(/\d+/)?.[0] || "15"}
                          </span>
                        </div>
                        
                        {/* Event Info */}
                        <div className="flex-grow min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-medium text-gray-800 truncate">
                              {event.title}
                            </h3>
                            {event.joined && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                Registered
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-5 mt-1 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <ClockIcon className="h-3.5 w-3.5 text-indigo-400" />
                              <span>{event.date.split(',')[1]?.trim()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <UsersIcon className="h-3.5 w-3.5 text-indigo-400" />
                              <span>{event.participants} participants</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Action Button */}
                        <Button 
                          size="sm" 
                          className={event.joined 
                            ? "rounded-lg bg-white border-gray-200 text-gray-700 hover:bg-gray-50" 
                            : "rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"}
                        >
                          {event.joined ? 'Details' : 'Join'}
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-center">
                    <Button variant="ghost" className="text-sm text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg">
                      View all events
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Sessions & Workshops Section */}
              <Card className="border-0 rounded-3xl overflow-hidden shadow-md relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-50/90 to-fuchsia-50/90"></div>
                
                <CardHeader className="relative z-10 pb-4 border-b border-purple-100/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-white p-2 rounded-lg shadow-sm">
                        <BookOpenIcon className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold text-gray-800">
                          Upcoming Sessions & Workshops
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-500">
                          Learn from experts and improve your skills
                        </CardDescription>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="h-9 rounded-lg border-purple-200 text-purple-600 hover:bg-purple-50">
                      All Sessions
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="p-4 relative z-10">
                  <div className="space-y-3">
                    {upcomingSessions.map((session) => (
                      <div key={session.id} className="bg-white rounded-xl p-4 shadow-sm hover:shadow transition-all duration-200 flex items-center gap-4">
                        {/* Date Circle */}
                        <div className="relative min-w-[60px] h-[60px] flex flex-col items-center justify-center bg-purple-50 rounded-xl border border-purple-100">
                          <span className="text-xs font-medium text-purple-600 uppercase">
                            {session.date.split(',')[0]?.substring(0, 3)}
                          </span>
                          <span className="text-xl font-bold text-purple-700">
                            {session.date.match(/\d+/)?.[0] || "15"}
                          </span>
                        </div>
                        
                        {/* Session Info */}
                        <div className="flex-grow min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-medium text-gray-800 truncate">
                              {session.title}
                            </h3>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                              session.level === "Beginner" 
                                ? "bg-green-100 text-green-800" 
                                : session.level === "Intermediate"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-purple-100 text-purple-800"
                            }`}>
                              {session.level}
                            </span>
                          </div>
                          <div className="flex items-center gap-5 mt-1 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <ClockIcon className="h-3.5 w-3.5 text-purple-400" />
                              <span>{session.date.split(',')[1]?.trim()} ({session.duration})</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <UsersIcon className="h-3.5 w-3.5 text-purple-400" />
                              <span>{session.instructor}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Action Button */}
                        <Button 
                          size="sm" 
                          className="rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                        >
                          Register
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-center">
                    <Button variant="ghost" className="text-sm text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded-lg">
                      View all sessions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-8">


              {/* Mini Calendar */}
              <Card className="border-0 shadow-md bg-white/95 backdrop-blur-sm rounded-xl overflow-hidden">
                <CardHeader className="pb-2 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <CardTitle className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">May 2023</CardTitle>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-lg text-gray-600 hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                      </Button>
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-lg text-gray-600 hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-3">
                  {/* Weekday headers */}
                  <div className="grid grid-cols-7 mb-2">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                      <div key={i} className="text-center">
                        <span className="text-xs font-medium text-gray-500">{day}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Calendar grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {/* Week 1 */}
                    <div className="text-center text-gray-300 p-1.5">
                      <span className="text-xs">30</span>
                    </div>
                    {[1, 2, 3, 4, 5, 6].map((day) => (
                      <div key={day} className="text-center p-1.5 rounded-full hover:bg-purple-50 cursor-pointer transition-colors">
                        <span className="text-xs">{day}</span>
                      </div>
                    ))}
                    
                    {/* Week 2 */}
                    {[7, 8, 9, 10, 11, 12, 13].map((day) => (
                      <div key={day} className={`text-center p-1.5 rounded-full hover:bg-purple-50 cursor-pointer transition-colors ${day === 10 ? 'bg-purple-100' : ''}`}>
                        <span className="text-xs">{day}</span>
                        {day === 10 && <div className="mt-0.5 w-1 h-1 mx-auto rounded-full bg-purple-500"></div>}
                      </div>
                    ))}
                    
                    {/* Week 3 */}
                    {[14, 15, 16, 17, 18, 19, 20].map((day) => (
                      <div key={day} className={`text-center p-1.5 rounded-full hover:bg-purple-50 cursor-pointer transition-colors ${day === 15 || day === 18 ? 'bg-purple-100' : ''}`}>
                        <span className="text-xs">{day}</span>
                        {(day === 15 || day === 18) && <div className="mt-0.5 w-1 h-1 mx-auto rounded-full bg-purple-500"></div>}
                      </div>
                    ))}
                    
                    {/* Week 4 */}
                    {[21, 22, 23, 24, 25, 26, 27].map((day) => (
                      <div key={day} className={`text-center p-1.5 rounded-full hover:bg-purple-50 cursor-pointer transition-colors ${day === 22 ? 'bg-purple-100' : day === 25 ? 'bg-rose-100' : ''}`}>
                        <span className="text-xs">{day}</span>
                        {day === 22 && <div className="mt-0.5 w-1 h-1 mx-auto rounded-full bg-purple-500"></div>}
                        {day === 25 && <div className="mt-0.5 w-1 h-1 mx-auto rounded-full bg-rose-500"></div>}
                      </div>
                    ))}
                    
                    {/* Week 5 */}
                    {[28, 29, 30, 31].map((day) => (
                      <div key={day} className="text-center p-1.5 rounded-full hover:bg-purple-50 cursor-pointer transition-colors">
                        <span className="text-xs">{day}</span>
                      </div>
                    ))}
                    {[1, 2, 3].map((day) => (
                      <div key={`next-${day}`} className="text-center text-gray-300 p-1.5">
                        <span className="text-xs">{day}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-gray-50/50 p-3">
                  <div className="space-y-2 w-full">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <div className="text-xs text-gray-600 flex-1">Photography Workshop (May 15)</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <div className="text-xs text-gray-600 flex-1">Team Meeting (May 18)</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <div className="text-xs text-gray-600 flex-1">Editing Session (May 22)</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                      <div className="text-xs text-gray-600 flex-1">Project Deadline (May 25)</div>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}