import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown,
  ChevronRightIcon,
  Plus, 
  Search, 
  Settings, 
  User,
  TrendingUp,
  Crown,
  Medal,
  Award,
  Star as StarIcon,
  Clock,
  Home,
  BookOpen,
  Users,
  X as XIcon,
  LayoutGrid,
  MessageSquare,
  Image,
  Briefcase,
  PenSquare,
  List,
  Map
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data
const recentProjects = [
  { id: 1, title: "Product Photography", date: "Today", progress: 75, image: "/images/projects/project1.jpg" },
  { id: 2, title: "Summer Collection", date: "Yesterday", progress: 90, image: "/images/projects/project2.jpg" },
  { id: 3, title: "AI-Enhanced Portraits", date: "3 days ago", progress: 40, image: "/images/projects/project3.jpg" },
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
  const [activeTab, setActiveTab] = useState('institution');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [today] = useState(new Date());
  const [animateAura, setAnimateAura] = useState(false);
  const [showRankDetails, setShowRankDetails] = useState(false);
  const [highlightedRank, setHighlightedRank] = useState<string | null>(null);
  const auraPointsRef = useRef<HTMLDivElement>(null);
  
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
  
  // Ranking data for different categories
  const rankingData = {
    institution: {
      you: { 
        name: "You", 
        rank: 28, 
        points: 1051, 
        level: 4,
        nextLevel: 1200,
        growth: "+125",
        color: "from-purple-500 to-indigo-400", 
        hoverColor: "from-purple-600 to-indigo-500",
        barColor: "from-purple-500 to-indigo-500",
        borderColor: "border-indigo-200",
        textColor: "text-indigo-700",
        height: "h-36 sm:h-40",
        avatar: "/lovable-uploads/user-avatar.png",
        achievements: ["Top Contributor", "Streak Master", "Quality Content"]
      },
      top: { 
        name: "Rohit", 
        rank: 1, 
        points: 2845, 
        level: 8,
        nextLevel: 3000,
        growth: "+210",
        color: "from-rose-500 to-red-400", 
        hoverColor: "from-rose-600 to-red-500",
        barColor: "from-rose-500 to-red-500",
        borderColor: "border-rose-200",
        textColor: "text-rose-700",
        height: "h-52 sm:h-56",
        avatar: "/lovable-uploads/avatar-1.png",
        achievements: ["Institution Leader", "Content Champion", "Engagement Pro"]
      },
      other: { 
        name: "Akshay", 
        rank: 53, 
        points: 876, 
        level: 3,
        nextLevel: 1000,
        growth: "+92",
        color: "from-emerald-500 to-green-400", 
        hoverColor: "from-emerald-600 to-green-500",
        barColor: "from-emerald-500 to-green-500",
        borderColor: "border-emerald-200",
        textColor: "text-emerald-700",
        height: "h-24 sm:h-28",
        avatar: "/lovable-uploads/avatar-2.png",
        achievements: ["Rising Star", "Consistent Creator"]
      }
    },
    state: {
      you: { 
        name: "You", 
        rank: 156, 
        points: 1051, 
        level: 4,
        nextLevel: 1200,
        growth: "+125",
        color: "from-purple-500 to-indigo-400", 
        hoverColor: "from-purple-600 to-indigo-500",
        barColor: "from-purple-500 to-indigo-500",
        borderColor: "border-indigo-200",
        textColor: "text-indigo-700",
        height: "h-28 sm:h-32",
        avatar: "/lovable-uploads/user-avatar.png",
        achievements: ["Top Contributor", "Streak Master", "Quality Content"]
      },
      top: { 
        name: "Priya", 
        rank: 1, 
        points: 3245, 
        level: 9,
        nextLevel: 3500,
        growth: "+180",
        color: "from-rose-500 to-red-400", 
        hoverColor: "from-rose-600 to-red-500",
        barColor: "from-rose-500 to-red-500",
        borderColor: "border-rose-200",
        textColor: "text-rose-700",
        height: "h-52 sm:h-56",
        avatar: "/lovable-uploads/avatar-3.png",
        achievements: ["State Champion", "Trending Creator", "Engagement Master"]
      },
      other: { 
        name: "Rahul", 
        rank: 87, 
        points: 1320, 
        level: 5,
        nextLevel: 1500,
        growth: "+145",
        color: "from-emerald-500 to-green-400", 
        hoverColor: "from-emerald-600 to-green-500",
        barColor: "from-emerald-500 to-green-500",
        borderColor: "border-emerald-200",
        textColor: "text-emerald-700",
        height: "h-32 sm:h-36",
        avatar: "/lovable-uploads/avatar-4.png",
        achievements: ["Consistent Creator", "Engagement Pro"]
      }
    },
    country: {
      you: { 
        name: "You", 
        rank: 1842, 
        points: 1051, 
        level: 4,
        nextLevel: 1200,
        growth: "+125",
        color: "from-purple-500 to-indigo-400", 
        hoverColor: "from-purple-600 to-indigo-500",
        barColor: "from-purple-500 to-indigo-500",
        borderColor: "border-indigo-200",
        textColor: "text-indigo-700",
        height: "h-20 sm:h-24",
        avatar: "/lovable-uploads/user-avatar.png",
        achievements: ["Top Contributor", "Streak Master", "Quality Content"]
      },
      top: { 
        name: "Arjun", 
        rank: 1, 
        points: 4567, 
        level: 10,
        nextLevel: 5000,
        growth: "+320",
        color: "from-rose-500 to-red-400", 
        hoverColor: "from-rose-600 to-red-500",
        barColor: "from-rose-500 to-red-500",
        borderColor: "border-rose-200",
        textColor: "text-rose-700",
        height: "h-52 sm:h-56",
        avatar: "/lovable-uploads/avatar-5.png",
        achievements: ["National Champion", "Content Legend", "Trending Creator"]
      },
      other: { 
        name: "Neha", 
        rank: 534, 
        points: 2134, 
        level: 7,
        nextLevel: 2500,
        growth: "+178",
        color: "from-emerald-500 to-green-400", 
        hoverColor: "from-emerald-600 to-green-500",
        barColor: "from-emerald-500 to-green-500",
        borderColor: "border-emerald-200",
        textColor: "text-emerald-700",
        height: "h-36 sm:h-40",
        avatar: "/lovable-uploads/avatar-6.png",
        achievements: ["Rising Star", "Engagement Pro", "Quality Content"]
      }
    }
  };
  
  // Calculate bar heights dynamically based on rankings
  const calculateHeights = () => {
    const updatedRankingData = { ...rankingData };
    
    Object.keys(updatedRankingData).forEach(category => {
      // Get ranks and points for this category
      const ranks = [
        updatedRankingData[category].you.rank,
        updatedRankingData[category].top.rank,
        updatedRankingData[category].other.rank
      ];
      
      const points = [
        updatedRankingData[category].you.points,
        updatedRankingData[category].top.points,
        updatedRankingData[category].other.points
      ];
      
      // Set height for top person (always tallest)
      updatedRankingData[category].top.height = "h-52 sm:h-56";
      
      // Calculate heights based on logarithmic scale relative to rank
      // The lower the rank number (better rank), the taller the bar
      const maxRank = Math.max(...ranks);
      const minRank = Math.min(...ranks);
      const maxPoints = Math.max(...points);
      
      const calculateHeight = (rank, points) => {
        // Base height calculation using logarithmic scale for better visual representation
        // This ensures even large rank differences (like 1 vs 1000) still show meaningful bars
        let heightValue;
        
        if (rank === 1) {
          // #1 rank is always tallest
          heightValue = 56;
        } else {
          // For other ranks, use a logarithmic scale
          // This formula gives more height to better ranks (lower numbers)
          // log(rank) / log(maxRank) produces a value between 0 and 1
          // Multiply by 40 to get a range of 0-40
          // Subtract from 56 so better ranks get taller bars
          // Ensure minimum height of 16
          const rankFactor = Math.log(rank) / Math.log(maxRank);
          const pointsFactor = points / maxPoints;
          
          // Combine rank and points factors (70% rank, 30% points)
          const combinedFactor = (rankFactor * 0.7) + ((1 - pointsFactor) * 0.3);
          
          heightValue = Math.max(16, 56 - (combinedFactor * 40));
        }
        
        // Round to nearest 4 for Tailwind height classes
        const roundedHeight = Math.round(heightValue / 4) * 4;
        return `h-${roundedHeight} sm:h-${roundedHeight + 4}`;
      };
      
      // Your height
      if (updatedRankingData[category].you.rank !== 1) {
        updatedRankingData[category].you.height = calculateHeight(
          updatedRankingData[category].you.rank,
          updatedRankingData[category].you.points
        );
      } else {
        updatedRankingData[category].you.height = "h-52 sm:h-56";
      }
      
      // Other person's height
      if (updatedRankingData[category].other.rank !== 1) {
        updatedRankingData[category].other.height = calculateHeight(
          updatedRankingData[category].other.rank,
          updatedRankingData[category].other.points
        );
      } else {
        updatedRankingData[category].other.height = "h-52 sm:h-56";
      }
    });
    
    return updatedRankingData;
  };

  // Handle aura point animation
  const handleAuraPointsAnimation = () => {
    setAnimateAura(true);
    setTimeout(() => setAnimateAura(false), 1500);
  };

  // Toggle rank details visibility
  const toggleRankDetails = () => {
    setShowRankDetails(!showRankDetails);
  };

  // Handle rank hover
  const handleRankHover = (rankType: string | null) => {
    setHighlightedRank(rankType);
  };

  // Calculate progress to next level
  const calculateLevelProgress = (current: number, next: number) => {
    const prevLevelThreshold = next * 0.8; // Assuming previous level was at 80% of next
    const totalRange = next - prevLevelThreshold;
    const currentProgress = current - prevLevelThreshold;
    return Math.min(100, Math.max(0, (currentProgress / totalRange) * 100));
  };

  // Get level badge component
  const getLevelBadge = (level: number) => {
    if (level >= 10) {
      return <Crown className="h-3.5 w-3.5 text-amber-500" />;
    } else if (level >= 7) {
      return <Medal className="h-3.5 w-3.5 text-rose-500" />;
    } else if (level >= 4) {
      return <Award className="h-3.5 w-3.5 text-indigo-500" />;
    } else {
      return <StarIcon className="h-3.5 w-3.5 text-emerald-500" />;
    }
  };

  // Add animation effect on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      handleAuraPointsAnimation();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

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
              <XIcon className="h-5 w-5 transition-all duration-300 ease-out group-hover:text-indigo-600" />
            </button>
          </div>
          
          <div className="py-6 px-4 space-y-4 relative z-10">
            <div className="space-y-2.5">
              <NavItem icon={<Home className="h-5 w-5" />} text="Dashboard" active onClick={() => navigate('/dashboard')} />
              <NavItem icon={<CalendarIcon className="h-5 w-5" />} text="Events" onClick={() => navigate('/events')} />
              <NavItem icon={<BookOpen className="h-5 w-5" />} text="Sessions" onClick={() => navigate('/sessions')} />
              <NavItem icon={<Users className="h-5 w-5" />} text="Community" onClick={() => navigate('/community')} />
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="col-span-2 space-y-8">
              {/* Aura Points Card - Top Section */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50/90 via-purple-50/80 to-indigo-100/90 text-gray-800 backdrop-blur-sm rounded-2xl overflow-hidden relative">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] bg-[length:20px_20px] opacity-5"></div>
                
                {/* Simple decorative elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute w-[500px] h-[500px] -top-[250px] -right-[150px] bg-purple-300/20 rounded-full blur-3xl"></div>
                  <div className="absolute w-[400px] h-[400px] -bottom-[200px] -left-[100px] bg-indigo-300/20 rounded-full blur-3xl"></div>
                </div>
                
                <CardContent className="p-0 relative z-10">
                  {/* Welcome Section */}
                  <div className="pt-8 px-8 text-center">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                      Welcome Naman
                    </h2>
                    
                    {/* Points Box */}
                    <div className="mt-2 mb-6 inline-flex items-center gap-4 bg-white/80 rounded-2xl px-6 py-3 backdrop-blur-sm border border-purple-100 shadow-md hover:shadow-lg transition-all duration-300">
                      <div className="w-12 h-12 flex items-center justify-center">
                        <img 
                          src="/lovable-uploads/aura-icon.png" 
                          alt="Aura Points" 
                          className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                          {rankingData[activeTab].you.points}
                        </span>
                        <span className="text-sm font-semibold px-2 py-1 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 text-indigo-700 border border-indigo-100/50">
                          Aura Points
                        </span>
                      </div>
                    </div>
                    
                    {/* Toggle Tabs */}
                    <div className="flex justify-center space-x-3 mt-4 mb-20">
                      <button 
                        className={`px-6 py-2 transition-all duration-300 ease-out rounded-full text-sm font-medium shadow-md ${
                          activeTab === 'institution' 
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' 
                            : 'bg-white/80 border border-purple-200 text-gray-700'
                        }`}
                        onClick={() => setActiveTab('institution')}
                      >
                        Institution
                      </button>
                      <button 
                        className={`px-6 py-2 transition-all duration-300 ease-out rounded-full text-sm font-medium shadow-md ${
                          activeTab === 'state' 
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' 
                            : 'bg-white/80 border border-purple-200 text-gray-700'
                        }`}
                        onClick={() => setActiveTab('state')}
                      >
                        State
                      </button>
                      <button 
                        className={`px-6 py-2 transition-all duration-300 ease-out rounded-full text-sm font-medium shadow-md ${
                          activeTab === 'country' 
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' 
                            : 'bg-white/80 border border-purple-200 text-gray-700'
                        }`}
                        onClick={() => setActiveTab('country')}
                      >
                        Country
                      </button>
                    </div>
                  </div>
                  
                  {/* Bar Graph Section */}
                  <div className="mt-0 px-8 relative pb-6">
                    <div className="flex justify-center items-end h-60 relative gap-10 pt-14">
                      {/* Your Bar */}
                      <div className="flex flex-col items-center group">
                        <div className="relative flex flex-col items-center">
                          <div 
                            className={`
                              w-20 bg-gradient-to-t ${currentData.you.color} 
                              hover:shadow-lg 
                              rounded-t-xl ${currentData.you.height} shadow-md 
                              transition-all duration-300 ease-out
                              group-hover:scale-105 border-t border-indigo-200
                            `}
                          >
                            <div className="absolute -top-6 left-0 right-0 flex justify-center">
                              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 shadow-md px-3 py-1 rounded-full border border-indigo-200 flex items-center gap-1">
                                <span className="text-xs font-semibold text-white">#</span>
                                <span className="text-sm font-bold text-white">{currentData.you.rank}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-center mt-3">
                          <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 border border-purple-200 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
                            <span className="text-sm font-semibold text-indigo-700">You</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Top Person's Bar */}
                      <div className="flex flex-col items-center group">
                        <div className="relative flex flex-col items-center">
                          <div 
                            className={`
                              w-20 bg-gradient-to-t ${currentData.top.color} 
                              hover:shadow-lg 
                              rounded-t-xl ${currentData.top.height} shadow-md 
                              transition-all duration-300 ease-out
                              group-hover:scale-105 border-t border-red-200
                            `}
                          >
                            <div className="absolute -top-6 left-0 right-0 flex justify-center">
                              <div className="bg-gradient-to-r from-rose-500 to-red-500 shadow-md px-3 py-1 rounded-full border border-rose-200 flex items-center gap-1">
                                <Crown className="h-3 w-3 text-yellow-300" />
                                <span className="text-sm font-bold text-white">{currentData.top.rank}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-center mt-3">
                          <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-100 to-red-50 border border-rose-200 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
                            <span className="text-sm font-semibold text-rose-700">{currentData.top.name}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Other Person's Bar */}
                      <div className="flex flex-col items-center group">
                        <div className="relative flex flex-col items-center">
                          <div 
                            className={`
                              w-20 bg-gradient-to-t ${currentData.other.color} 
                              hover:shadow-lg 
                              rounded-t-xl ${currentData.other.height} shadow-md 
                              transition-all duration-300 ease-out
                              group-hover:scale-105 border-t border-green-200
                            `}
                          >
                            <div className="absolute -top-6 left-0 right-0 flex justify-center">
                              <div className="bg-gradient-to-r from-emerald-500 to-green-500 shadow-md px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                                <span className="text-xs font-semibold text-white">#</span>
                                <span className="text-sm font-bold text-white">{currentData.other.rank}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-center mt-3">
                          <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-100 to-green-50 border border-emerald-200 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
                            <span className="text-sm font-semibold text-emerald-700">{currentData.other.name}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Simple ranking explanation */}
                    <div className="mt-6 text-center">
                      <p className="text-xs text-gray-500 max-w-md mx-auto">
                        Rankings are based on Aura Points earned through event participation, sessions attended, and platform engagement.
                        <span className="text-indigo-600 font-medium cursor-pointer hover:underline ml-1">Learn more</span>
                      </p>
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
                            <Users className="h-5 w-5 text-[#62DDBD]" />
                          </div>
                          <span className="text-base font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">Sessions</span>
                        </div>
                        <div className="flex flex-col items-center mt-2">
                          <span className="text-5xl font-bold text-gray-800 group-hover:text-[#62DDBD] transition-colors duration-300">24</span>
                          <span className="text-sm font-medium text-gray-500 mt-1 group-hover:text-gray-600 transition-colors duration-300 bg-white/50 px-2.5 py-1 rounded-full">Attended</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Mini Calendar */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border-t border-white/50">
                <CardHeader className="pb-4 border-b border-indigo-50 bg-gradient-to-r from-purple-100/80 via-indigo-50/90 to-purple-50/80">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <CardTitle className="text-xl font-bold bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent">
                        {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
                      </CardTitle>
                      <CardDescription className="text-xs text-indigo-500/70 mt-0.5 font-medium">
                        Your upcoming schedule
                      </CardDescription>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0 rounded-full text-indigo-600 hover:bg-indigo-100 hover:text-indigo-700 transition-all duration-200"
                        onClick={() => {
                          const prevMonth = new Date(currentMonth);
                          prevMonth.setMonth(prevMonth.getMonth() - 1);
                          setCurrentMonth(prevMonth);
                        }}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-8 px-3 text-xs font-medium rounded-full text-indigo-700 border-indigo-200/80 bg-white/80 hover:bg-indigo-100/50 hover:border-indigo-300 transition-all duration-200"
                        onClick={() => setCurrentMonth(new Date())}
                      >
                        Today
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0 rounded-full text-indigo-600 hover:bg-indigo-100 hover:text-indigo-700 transition-all duration-200"
                        onClick={() => {
                          const nextMonth = new Date(currentMonth);
                          nextMonth.setMonth(nextMonth.getMonth() + 1);
                          setCurrentMonth(nextMonth);
                        }}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-5 relative overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-200/20 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-20 -left-10 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl"></div>
                  </div>
                  
                  {/* Weekday headers */}
                  <div className="grid grid-cols-7 mb-4 relative z-10">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                      <div key={i} className="text-center">
                        <span className={`text-xs font-semibold ${i === 0 || i === 6 ? 'text-indigo-400' : 'text-indigo-600'}`}>
                          {day.charAt(0)}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Calendar grid */}
                  <div className="grid grid-cols-7 gap-2 relative z-10">
                    {(() => {
                      // Calculate days to display
                      const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
                      const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
                      
                      // Previous month days
                      const prevMonthDays = [];
                      const prevMonthLastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0).getDate();
                      for (let i = firstDayOfMonth - 1; i >= 0; i--) {
                        prevMonthDays.push(
                          <div key={`prev-${prevMonthLastDay - i}`} className="text-center p-1">
                            <span className="text-xs text-gray-300/70">{prevMonthLastDay - i}</span>
                          </div>
                        );
                      }
                      
                      // Current month days
                      const currentMonthDays = [];
                      const events = {
                        10: { type: 'meeting', color: 'indigo', title: 'Client Meeting' },
                        15: { type: 'workshop', color: 'purple', title: 'Photography Workshop' },
                        18: { type: 'meeting', color: 'indigo', title: 'Team Meeting' },
                        22: { type: 'session', color: 'purple', title: 'Editing Session' },
                        25: { type: 'deadline', color: 'rose', title: 'Project Deadline' }
                      };
                      
                      const isToday = (day) => {
                        return currentMonth.getMonth() === today.getMonth() && 
                               currentMonth.getFullYear() === today.getFullYear() && 
                               day === today.getDate();
                      };
                      
                      for (let day = 1; day <= daysInMonth; day++) {
                        const hasEvent = events[day];
                        const dayIsToday = isToday(day);
                        
                        currentMonthDays.push(
                          <div 
                            key={day} 
                            className={`
                              relative flex flex-col items-center justify-center p-1 
                              ${hasEvent ? `group` : ''}
                              ${dayIsToday ? 'z-10' : 'z-0'}
                              cursor-pointer transition-all duration-300
                            `}
                          >
                            <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/80 transition-all duration-300 ease-out">
                              <span className={`
                                text-xs font-medium 
                                ${dayIsToday ? 'text-indigo-600' : hasEvent ? `text-${hasEvent.color}-700` : 'text-gray-700'}
                                transition-all duration-200
                              `}>
                                {day}
                              </span>
                            </div>
                            
                            {hasEvent && (
                              <div className={`
                                absolute -bottom-1 left-1/2 transform -translate-x-1/2
                                w-1.5 h-1.5 rounded-full bg-${hasEvent.color}-500
                                group-hover:scale-125 transition-all duration-300
                              `}></div>
                            )}
                            
                            {hasEvent && (
                              <div className={`
                                absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full
                                bg-${hasEvent.color}-100 text-${hasEvent.color}-700 text-[8px] font-medium
                                px-1.5 py-0.5 rounded-sm opacity-0 group-hover:opacity-100 group-hover:-translate-y-2
                                transition-all duration-300 whitespace-nowrap z-20 pointer-events-none
                                shadow-sm border border-${hasEvent.color}-200/50
                              `}>
                                {hasEvent.title}
                              </div>
                            )}
                          </div>
                        );
                      }
                      
                      // Next month days
                      const nextMonthDays = [];
                      const totalDaysShown = prevMonthDays.length + currentMonthDays.length;
                      const nextMonthDaysToShow = 42 - totalDaysShown; // 6 rows of 7 days
                      
                      for (let day = 1; day <= nextMonthDaysToShow; day++) {
                        nextMonthDays.push(
                          <div key={`next-${day}`} className="text-center p-1">
                            <span className="text-xs text-gray-300/70">{day}</span>
                          </div>
                        );
                      }
                      
                      return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
                    })()}
                  </div>
                </CardContent>
                <CardFooter className="border-t border-indigo-50 bg-gradient-to-br from-white/90 to-indigo-50/30 p-5">
                  <div className="space-y-3 w-full">
                    <h4 className="text-xs font-bold text-indigo-700 mb-2 flex items-center">
                      <CalendarIcon className="h-3.5 w-3.5 mr-1.5 text-indigo-500" />
                      Upcoming Events
                    </h4>
                    
                    <div className="space-y-2.5">
                      <div className="group flex items-center gap-3 cursor-pointer hover:bg-white/80 p-2 rounded-xl transition-all duration-200 border border-transparent hover:border-indigo-100/50 hover:shadow-sm">
                        <div className="w-2 h-10 rounded-full bg-gradient-to-b from-purple-400 to-indigo-600 group-hover:scale-y-110 transition-transform duration-300"></div>
                        <div className="flex-1">
                          <div className="text-xs font-medium text-indigo-700 group-hover:text-indigo-800">Photography Workshop</div>
                          <div className="text-[10px] text-gray-500 mt-0.5 flex items-center">
                            <CalendarIcon className="h-2.5 w-2.5 mr-1 text-indigo-400" />
                            May 15, 2023
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-white/80 text-[9px] px-2 py-0 h-5 border-indigo-200 text-indigo-700 font-medium">
                          3 days
                        </Badge>
                      </div>
                      
                      <div className="group flex items-center gap-3 cursor-pointer hover:bg-white/80 p-2 rounded-xl transition-all duration-200 border border-transparent hover:border-indigo-100/50 hover:shadow-sm">
                        <div className="w-2 h-10 rounded-full bg-gradient-to-b from-indigo-400 to-indigo-600 group-hover:scale-y-110 transition-transform duration-300"></div>
                        <div className="flex-1">
                          <div className="text-xs font-medium text-indigo-700 group-hover:text-indigo-800">Team Meeting</div>
                          <div className="text-[10px] text-gray-500 mt-0.5 flex items-center">
                            <CalendarIcon className="h-2.5 w-2.5 mr-1 text-indigo-400" />
                            May 18, 2023
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-white/80 text-[9px] px-2 py-0 h-5 border-indigo-200 text-indigo-700 font-medium">
                          6 days
                        </Badge>
                      </div>
                      
                      <div className="group flex items-center gap-3 cursor-pointer hover:bg-white/80 p-2 rounded-xl transition-all duration-200 border border-transparent hover:border-indigo-100/50 hover:shadow-sm">
                        <div className="w-2 h-10 rounded-full bg-gradient-to-b from-purple-400 to-indigo-600 group-hover:scale-y-110 transition-transform duration-300"></div>
                        <div className="flex-1">
                          <div className="text-xs font-medium text-indigo-700 group-hover:text-indigo-800">Editing Session</div>
                          <div className="text-[10px] text-gray-500 mt-0.5 flex items-center">
                            <CalendarIcon className="h-2.5 w-2.5 mr-1 text-indigo-400" />
                            May 22, 2023
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-white/80 text-[9px] px-2 py-0 h-5 border-indigo-200 text-indigo-700 font-medium">
                          10 days
                        </Badge>
                      </div>
                      
                      <div className="group flex items-center gap-3 cursor-pointer hover:bg-white/80 p-2 rounded-xl transition-all duration-200 border border-transparent hover:border-rose-100/50 hover:shadow-sm">
                        <div className="w-2 h-10 rounded-full bg-gradient-to-b from-rose-400 to-rose-600 group-hover:scale-y-110 transition-transform duration-300"></div>
                        <div className="flex-1">
                          <div className="text-xs font-medium text-rose-700 group-hover:text-rose-800">Project Deadline</div>
                          <div className="text-[10px] text-gray-500 mt-0.5 flex items-center">
                            <Clock className="h-2.5 w-2.5 mr-1 text-rose-400" />
                            May 25, 2023
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-white/80 text-[9px] px-2 py-0 h-5 border-rose-200 text-rose-700 font-medium">
                          13 days
                        </Badge>
                      </div>
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