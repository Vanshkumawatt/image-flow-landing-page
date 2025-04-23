import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  HomeIcon,
  CalendarIcon,
  BookOpenIcon,
  UsersIcon,
  BellIcon,
  Settings as SettingsIcon,
  User as UserIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  X,
  Award,
  BookOpen,
  Calendar,
  GraduationCap,
  Briefcase,
  MapPin,
  Mail,
  Phone,
  Globe,
  Twitter,
  Linkedin,
  Github,
  Camera,
  Plus,
  ChevronRight
} from "lucide-react";

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

export default function UserProfile() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  
  // User profile data
  const [userData, setUserData] = useState({
    name: "John Doe",
    username: "johndoe",
    role: "AI Researcher",
    bio: "AI researcher with a focus on computer vision and natural language processing. Passionate about developing ethical AI solutions that solve real-world problems.",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "johndoe.dev",
    twitter: "johndoe",
    linkedin: "johndoe",
    github: "johndoe",
    education: [
      { degree: "Ph.D. in Computer Science", institution: "Stanford University", year: "2018-2022" },
      { degree: "M.S. in Artificial Intelligence", institution: "MIT", year: "2016-2018" },
      { degree: "B.S. in Computer Science", institution: "UC Berkeley", year: "2012-2016" }
    ],
    experience: [
      { position: "AI Research Scientist", company: "DeepMind", year: "2022-Present" },
      { position: "Research Intern", company: "Google AI", year: "2021" },
      { position: "Machine Learning Engineer", company: "OpenAI", year: "2019-2021" }
    ],
    skills: ["Machine Learning", "Deep Learning", "Computer Vision", "NLP", "PyTorch", "TensorFlow", "Python", "JavaScript"],
    achievements: [
      "Published 5 papers in top-tier AI conferences",
      "Developed an open-source library with 5k+ stars on GitHub",
      "Won the Best Paper Award at CVPR 2022"
    ],
    projects: [
      { name: "Neural Style Transfer", description: "A PyTorch implementation of neural style transfer algorithm", url: "#" },
      { name: "Sentiment Analysis API", description: "REST API for real-time sentiment analysis of text", url: "#" },
      { name: "Image Captioning Model", description: "Deep learning model that generates captions for images", url: "#" }
    ]
  });

  // Handle scroll for navbar visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    setUserData({
      ...userData,
      [field]: e.target.value
    });
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // Save profile changes
  const saveProfile = () => {
    // In a real app, you would send the updated data to an API
    setEditMode(false);
    // Show success message or notification
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
              <NavItem icon={<HomeIcon className="h-5 w-5" />} text="Dashboard" onClick={() => navigate('/dashboard')} />
              <NavItem icon={<CalendarIcon className="h-5 w-5" />} text="Events" onClick={() => navigate('/events')} />
              <NavItem icon={<BookOpenIcon className="h-5 w-5" />} text="Sessions" onClick={() => navigate('/sessions')} />
              <NavItem icon={<UsersIcon className="h-5 w-5" />} text="Community" onClick={() => navigate('/community')} />
            </div>
            
            <div className="mt-8 pt-6 border-t border-indigo-200/50 relative">
              <div className="absolute inset-x-4 -top-px h-px bg-gradient-to-r from-transparent via-indigo-300/50 to-transparent"></div>
              <NavItem icon={<UserIcon className="h-5 w-5" />} text="Profile" active onClick={() => {}} />
              <NavItem icon={<SettingsIcon className="h-5 w-5" />} text="Settings" onClick={() => navigate('/settings')} />
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
                  <span className="text-sm font-medium">{userData.name}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <div className="mb-8 relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-100 via-purple-50 to-indigo-100 shadow-xl border border-indigo-100/50">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute h-40 w-40 -top-10 -right-10 bg-purple-300/30 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute h-60 w-60 bottom-20 -left-20 bg-indigo-300/30 rounded-full blur-3xl animate-pulse opacity-70"></div>
              <div className="absolute h-20 w-20 top-1/2 right-10 bg-purple-400/20 rounded-full blur-xl animate-pulse opacity-80"></div>
              <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] bg-[length:20px_20px] opacity-10"></div>
            </div>

            <div className="relative p-8 flex flex-col md:flex-row items-center gap-8 z-10">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-75 group-hover:opacity-100 blur-sm group-hover:blur transition duration-300"></div>
                <Avatar className="h-32 w-32 ring-4 ring-white shadow-xl relative">
                  <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="object-cover" />
                  <AvatarFallback className="text-3xl">JD</AvatarFallback>
                  {editMode && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Camera className="h-8 w-8 text-white" />
                    </div>
                  )}
                </Avatar>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-indigo-900">{userData.name}</h1>
                    <p className="text-indigo-700 font-medium">@{userData.username}</p>
                    <p className="text-indigo-600 mt-1">{userData.role}</p>
                  </div>
                  
                  <div className="flex gap-3 justify-center md:justify-end">
                    {editMode ? (
                      <>
                        <Button 
                          variant="outline" 
                          className="bg-white/80 hover:bg-white border-indigo-200 hover:border-indigo-300 text-indigo-700"
                          onClick={toggleEditMode}
                        >
                          <X className="mr-2 h-4 w-4" />
                          Cancel
                        </Button>
                        <Button 
                          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                          onClick={saveProfile}
                        >
                          <SaveIcon className="mr-2 h-4 w-4" />
                          Save Changes
                        </Button>
                      </>
                    ) : (
                      <Button 
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                        onClick={toggleEditMode}
                      >
                        <EditIcon className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                  <Badge variant="outline" className="bg-white/80 text-indigo-700 border-indigo-200 px-3 py-1 flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5" />
                    {userData.email}
                  </Badge>
                  <Badge variant="outline" className="bg-white/80 text-indigo-700 border-indigo-200 px-3 py-1 flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {userData.location}
                  </Badge>
                  <Badge variant="outline" className="bg-white/80 text-indigo-700 border-indigo-200 px-3 py-1 flex items-center gap-1.5">
                    <Globe className="h-3.5 w-3.5" />
                    {userData.website}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <Tabs defaultValue="overview" className="mb-8" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-gradient-to-r from-indigo-50 to-purple-50 p-1 border border-indigo-100 rounded-full w-full justify-start overflow-x-auto">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-full px-5 py-2"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="edit" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-full px-5 py-2"
              >
                Edit Profile
              </TabsTrigger>
              <TabsTrigger 
                value="achievements" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-full px-5 py-2"
              >
                Achievements
              </TabsTrigger>
              <TabsTrigger 
                value="projects" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-full px-5 py-2"
              >
                Projects
              </TabsTrigger>
              <TabsTrigger 
                value="education" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-full px-5 py-2"
              >
                Education & Experience
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Bio Card */}
                <Card className="col-span-1 lg:col-span-2 shadow-md border-indigo-100 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 pb-4">
                    <CardTitle className="flex items-center gap-2 text-indigo-800">
                      <UserIcon className="h-5 w-5" />
                      Bio
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-700 leading-relaxed">{userData.bio}</p>
                  </CardContent>
                </Card>

                {/* Skills Card */}
                <Card className="shadow-md border-indigo-100 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 pb-4">
                    <CardTitle className="flex items-center gap-2 text-indigo-800">
                      <Award className="h-5 w-5" />
                      Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="flex flex-wrap gap-2">
                      {userData.skills.map((skill, index) => (
                        <Badge key={index} className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 hover:from-indigo-200 hover:to-purple-200 transition-colors duration-300">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Social Links */}
                <Card className="col-span-1 lg:col-span-3 shadow-md border-indigo-100 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 pb-4">
                    <CardTitle className="flex items-center gap-2 text-indigo-800">
                      <Globe className="h-5 w-5" />
                      Social Profiles
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100">
                        <div className="bg-white p-2 rounded-full">
                          <Twitter className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-indigo-800">Twitter</p>
                          <p className="text-sm text-indigo-600">@{userData.twitter}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100">
                        <div className="bg-white p-2 rounded-full">
                          <Linkedin className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-indigo-800">LinkedIn</p>
                          <p className="text-sm text-indigo-600">{userData.linkedin}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100">
                        <div className="bg-white p-2 rounded-full">
                          <Github className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-indigo-800">GitHub</p>
                          <p className="text-sm text-indigo-600">{userData.github}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Edit Profile Tab */}
            <TabsContent value="edit" className="mt-6">
              <Card className="shadow-md border-indigo-100">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
                  <CardTitle className="text-indigo-800">Edit Your Profile</CardTitle>
                  <CardDescription>Update your personal information and profile details</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={userData.name} 
                        onChange={(e) => handleInputChange(e, 'name')} 
                        className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input 
                        id="username" 
                        value={userData.username} 
                        onChange={(e) => handleInputChange(e, 'username')} 
                        className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={userData.email} 
                        onChange={(e) => handleInputChange(e, 'email')} 
                        className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input 
                        id="phone" 
                        value={userData.phone} 
                        onChange={(e) => handleInputChange(e, 'phone')} 
                        className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input 
                        id="location" 
                        value={userData.location} 
                        onChange={(e) => handleInputChange(e, 'location')} 
                        className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role/Profession</Label>
                      <Input 
                        id="role" 
                        value={userData.role} 
                        onChange={(e) => handleInputChange(e, 'role')} 
                        className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea 
                        id="bio" 
                        value={userData.bio} 
                        onChange={(e) => handleInputChange(e, 'bio')} 
                        className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300 min-h-[120px]"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-indigo-100">
                    <h3 className="text-lg font-medium text-indigo-800 mb-4">Social Profiles</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input 
                          id="website" 
                          value={userData.website} 
                          onChange={(e) => handleInputChange(e, 'website')} 
                          className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="twitter">Twitter</Label>
                        <Input 
                          id="twitter" 
                          value={userData.twitter} 
                          onChange={(e) => handleInputChange(e, 'twitter')} 
                          className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input 
                          id="linkedin" 
                          value={userData.linkedin} 
                          onChange={(e) => handleInputChange(e, 'linkedin')} 
                          className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gradient-to-r from-indigo-50/50 to-purple-50/50 border-t border-indigo-100 flex justify-end gap-3">
                  <Button variant="outline" className="border-indigo-200 text-indigo-700" onClick={() => setActiveTab('overview')}>Cancel</Button>
                  <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700" onClick={saveProfile}>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="mt-6">
              <Card className="shadow-md border-indigo-100">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
                  <CardTitle className="flex items-center gap-2 text-indigo-800">
                    <Award className="h-5 w-5" />
                    Achievements & Recognition
                  </CardTitle>
                  <CardDescription>Your notable accomplishments and recognition</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {userData.achievements.map((achievement, index) => (
                      <div key={index} className="flex gap-4 items-start p-4 rounded-lg bg-gradient-to-r from-indigo-50/50 to-purple-50/50 border border-indigo-100">
                        <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-2 rounded-full">
                          <Award className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-indigo-800 font-medium">{achievement}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects" className="mt-6">
              <Card className="shadow-md border-indigo-100">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
                  <CardTitle className="flex items-center gap-2 text-indigo-800">
                    <Briefcase className="h-5 w-5" />
                    Projects & Contributions
                  </CardTitle>
                  <CardDescription>Your projects and contributions to the community</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userData.projects.map((project, index) => (
                      <Card key={index} className="shadow-sm border-indigo-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
                        <CardHeader className="bg-gradient-to-r from-indigo-50/80 to-purple-50/80 pb-3">
                          <CardTitle className="text-lg text-indigo-800">{project.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <p className="text-gray-700 text-sm">{project.description}</p>
                        </CardContent>
                        <CardFooter className="border-t border-indigo-50 pt-3 pb-3 flex justify-end">
                          <Button variant="outline" size="sm" className="text-indigo-600 border-indigo-200 hover:bg-indigo-50">
                            <ChevronRight className="h-4 w-4 mr-1" />
                            View Project
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                    <Card className="shadow-sm border-indigo-100 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col items-center justify-center p-6 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 border border-dashed border-indigo-200">
                      <div className="bg-white p-3 rounded-full shadow-sm mb-4">
                        <Plus className="h-6 w-6 text-indigo-500" />
                      </div>
                      <p className="text-indigo-700 font-medium mb-2">Add New Project</p>
                      <p className="text-indigo-500 text-sm text-center">Showcase your latest work</p>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Education & Experience Tab */}
            <TabsContent value="education" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Education Card */}
                <Card className="shadow-md border-indigo-100">
                  <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
                    <CardTitle className="flex items-center gap-2 text-indigo-800">
                      <GraduationCap className="h-5 w-5" />
                      Education
                    </CardTitle>
                    <CardDescription>Your academic background and qualifications</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      {userData.education.map((edu, index) => (
                        <div key={index} className="relative pl-6 pb-6 border-l-2 border-indigo-200 last:border-l-0 last:pb-0">
                          <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 shadow-md"></div>
                          <div className="bg-gradient-to-r from-indigo-50/70 to-purple-50/70 rounded-lg p-4 border border-indigo-100">
                            <h4 className="text-indigo-800 font-medium">{edu.degree}</h4>
                            <p className="text-indigo-600">{edu.institution}</p>
                            <p className="text-indigo-500 text-sm mt-1">{edu.year}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Experience Card */}
                <Card className="shadow-md border-indigo-100">
                  <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
                    <CardTitle className="flex items-center gap-2 text-indigo-800">
                      <Briefcase className="h-5 w-5" />
                      Experience
                    </CardTitle>
                    <CardDescription>Your professional work experience</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      {userData.experience.map((exp, index) => (
                        <div key={index} className="relative pl-6 pb-6 border-l-2 border-indigo-200 last:border-l-0 last:pb-0">
                          <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 shadow-md"></div>
                          <div className="bg-gradient-to-r from-indigo-50/70 to-purple-50/70 rounded-lg p-4 border border-indigo-100">
                            <h4 className="text-indigo-800 font-medium">{exp.position}</h4>
                            <p className="text-indigo-600">{exp.company}</p>
                            <p className="text-indigo-500 text-sm mt-1">{exp.year}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
