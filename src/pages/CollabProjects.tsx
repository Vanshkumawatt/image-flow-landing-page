import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  HomeIcon,
  PencilIcon,
  ListIcon,
  MapIcon,
  Settings,
  BriefcaseIcon,
  Users as UserGroupIcon,
  X,
  MessageSquareIcon,
  LayoutGridIcon
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

export default function CollabProjects() {
  const navigate = useNavigate();
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
              <NavItem icon={<PencilIcon className="h-5 w-5" />} text="Discussion Forum" onClick={() => navigate('/discussion-forum')} />
              <NavItem icon={<ListIcon className="h-5 w-5" />} text="Events" onClick={() => navigate('/events')} />
              <NavItem icon={<MapIcon className="h-5 w-5" />} text="Path Finder" onClick={() => navigate('/path-finder')} />
              <NavItem icon={<MessageSquareIcon className="h-5 w-5" />} text="Community" onClick={() => navigate('/community')} />
              <NavItem icon={<LayoutGridIcon className="h-5 w-5" />} text="Sessions" onClick={() => navigate('/sessions')} />
              <NavItem icon={<BriefcaseIcon className="h-5 w-5" />} text="Find a Job" onClick={() => navigate('/find-job')} />
              <NavItem icon={<UserGroupIcon className="h-5 w-5" />} text="Collab on Projects" active />
            </div>
            
            <div className="mt-8 pt-6 border-t border-indigo-200/50 relative">
              <div className="absolute inset-x-4 -top-px h-px bg-gradient-to-r from-transparent via-indigo-300/50 to-transparent"></div>
              <NavItem icon={<Settings className="h-5 w-5" />} text="Settings" onClick={() => navigate('/settings')} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between py-4">
            <div className="flex items-center">
              <button 
                className="p-3.5 pl-2.5 mr-4 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all duration-300 ease-out text-gray-600 hover:text-gray-800 shadow-sm hover:shadow-md hover:scale-105 group"
                onClick={() => setSidebarOpen(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 transition-transform duration-300 ease-out group-hover:scale-110">
                  <line x1="3" x2="21" y1="12" y2="12"/>
                  <line x1="3" x2="21" y1="6" y2="6"/>
                  <line x1="3" x2="21" y1="18" y2="18"/>
                </svg>
                <span className="sr-only">Toggle sidebar</span>
              </button>
              <div className="flex-shrink-0 flex items-center overflow-visible">
                <img 
                  src="/lovable-uploads/orielixlogo.png" 
                  alt="Orielix Logo" 
                  className="h-[120px] -mt-4 -mb-4 transition-all duration-300 transform hover:scale-110"
                />
              </div>
            </div>
            
            {/* Page Label */}
            <div className="hidden md:flex items-center justify-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full opacity-70 group-hover:opacity-100 blur-lg group-hover:blur-xl transition-all duration-300 animate-gradient-x"></div>
                <div className="relative">
                  <h1 className="text-xl font-extrabold bg-white px-7 py-3 rounded-full shadow-2xl border border-white/20 flex items-center space-x-2">
                    <span className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Collab on Projects
                    </span>
                    <span className="h-2 w-2 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full animate-pulse"></span>
                  </h1>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <button className="p-2.5 rounded-full text-gray-400 hover:text-gray-500 relative bg-gray-50 hover:bg-gray-100 transition-all duration-300 ease-out hover:shadow-md hover:scale-105 group">
                <span className="sr-only">View notifications</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 transition-transform duration-300 ease-out group-hover:rotate-12 group-hover:scale-110">
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                </svg>
                <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white group-hover:animate-pulse"></span>
              </button>
              <div className="relative flex-shrink-0">
                <div>
                  <button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 border-2 border-purple-100 shadow-sm hover:shadow-md transition-all duration-300 ease-out hover:scale-110 hover:border-purple-300 group">
                    <span className="sr-only">Open user menu</span>
                    <Avatar className="h-10 w-10 transition-all duration-300 ease-out group-hover:shadow-lg">
                      <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-100 via-indigo-100 to-purple-200 text-gray-800 backdrop-blur-sm rounded-2xl overflow-hidden relative">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 bg-clip-text text-transparent">
                  Collab on Projects
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                  <UserGroupIcon className="h-12 w-12 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
                <p className="text-gray-600 max-w-md mb-6">
                  Our collaboration platform is under development. Soon you'll be able to find project partners, join teams, and work together on exciting creative projects.
                </p>
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  onClick={() => navigate('/dashboard')}
                >
                  Back to Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}