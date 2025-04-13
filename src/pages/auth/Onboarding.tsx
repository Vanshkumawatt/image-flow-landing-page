import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { CalendarIcon, ChevronDown, CheckCircle, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Create a range of years for the year dropdown
const currentYear = new Date().getFullYear();
const startYear = 1920;
const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => currentYear - i);

// Country codes data with flags
const countryCodes = [
  { code: "+91", name: "India", flag: "🇮🇳" },
  { code: "+1", name: "United States", flag: "🇺🇸" },
  { code: "+44", name: "United Kingdom", flag: "🇬🇧" },
  { code: "+61", name: "Australia", flag: "🇦🇺" },
  { code: "+86", name: "China", flag: "🇨🇳" },
  { code: "+49", name: "Germany", flag: "🇩🇪" },
  { code: "+33", name: "France", flag: "🇫🇷" },
  { code: "+81", name: "Japan", flag: "🇯🇵" },
  { code: "+7", name: "Russia", flag: "🇷🇺" },
  { code: "+55", name: "Brazil", flag: "🇧🇷" },
  { code: "+27", name: "South Africa", flag: "🇿🇦" },
  { code: "+971", name: "UAE", flag: "🇦🇪" },
  { code: "+966", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+65", name: "Singapore", flag: "🇸🇬" },
  { code: "+60", name: "Malaysia", flag: "🇲🇾" },
  { code: "+64", name: "New Zealand", flag: "🇳🇿" },
  { code: "+92", name: "Pakistan", flag: "🇵🇰" },
  { code: "+880", name: "Bangladesh", flag: "🇧🇩" },
  { code: "+94", name: "Sri Lanka", flag: "🇱🇰" },
  { code: "+977", name: "Nepal", flag: "🇳🇵" },
];

// CountryCodeDropdown component
interface CountryCodeDropdownProps {
  selectedCode: string;
  setSelectedCode: (code: string) => void;
  disabled?: boolean;
}

const CountryCodeDropdown = ({ selectedCode, setSelectedCode, disabled = false }: CountryCodeDropdownProps) => {
  const selectedCountry = countryCodes.find(country => country.code === selectedCode) || countryCodes[0];
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          className="absolute left-0 top-0 h-full pl-4 pr-3 flex items-center justify-center border-r"
          disabled={disabled}
        >
          <div className="flex items-center gap-2">
            <span>{selectedCountry.flag}</span>
            <span className="text-xs">{selectedCode}</span>
            <ChevronDown className="h-3 w-3" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 max-h-[300px] overflow-y-auto">
        <div className="p-1">
          {countryCodes.map((country) => (
            <div
              key={country.code}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-gray-100 ${
                country.code === selectedCode ? "bg-purple-100" : ""
              }`}
              onClick={() => setSelectedCode(country.code)}
            >
              <span className="text-lg">{country.flag}</span>
              <div className="flex flex-col">
                <span className="text-sm">{country.name}</span>
                <span className="text-xs text-gray-500">{country.code}</span>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const totalSteps = 4;

  // Step 1: Basic Information
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState<Date | undefined>(undefined);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91"); // Default to India
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [showCountrySelector, setShowCountrySelector] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationInputs, setVerificationInputs] = useState<string[]>(["", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [phoneVerificationCountdown, setPhoneVerificationCountdown] = useState(0);

  // Step 2: Profile Information
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [bio, setBio] = useState("");
  
  // Step 3: Education and Work
  const [institution, setInstitution] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [role, setRole] = useState("");

  // Step 4: Preferences and Notifications
  const [interests, setInterests] = useState<string[]>([]);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: true
  });

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Here you would typically send the onboarding data to your backend
    // Data would include: firstName, lastName, dob, phoneNumber, countryCode, 
    // profilePicture, bio, institution, fieldOfStudy, role, interests, notifications
    
    // For demo, just simulate a loading state
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to dashboard and scroll to top
      window.scrollTo(0, 0);
      navigate("/dashboard");
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleInterestToggle = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    const newDate = new Date(calendarMonth);
    newDate.setFullYear(year);
    setCalendarMonth(newDate);
  };

  const selectCountryCode = (code: string) => {
    setCountryCode(code);
    setShowCountrySelector(false);
  };

  const getCountryByCode = (code: string) => {
    return countryCodes.find(country => country.code === code) || countryCodes[0];
  };

  // Handle verification code input with proper types
  const handleVerificationInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.charAt(0);
    }
    
    const newInputs = [...verificationInputs];
    newInputs[index] = value;
    setVerificationInputs(newInputs);
    setVerificationCode(newInputs.join(""));
    
    // Auto focus to next input
    if (value !== "" && index < 3) {
      const nextInput = document.getElementById(`phone-verification-${index + 1}`) as HTMLInputElement | null;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };
  
  // Handle backspace to go to previous verification input with proper types
  const handleVerificationKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && index > 0 && verificationInputs[index] === "") {
      const prevInput = document.getElementById(`phone-verification-${index - 1}`) as HTMLInputElement | null;
      if (prevInput) {
        prevInput.focus();
      }
    }
  };
  
  // Send verification code to phone
  const handleSendVerificationCode = () => {
    if (!phoneNumber || phoneNumber.length < 5) {
      return;
    }
    
    setIsVerifying(true);
    setShowVerificationInput(true);
    
    // Here you would call an API to send verification code
    // For demo, just simulate sending
    
    setTimeout(() => {
      setIsVerifying(false);
      setPhoneVerificationCountdown(60);
      
      // Start countdown
      const interval = setInterval(() => {
        setPhoneVerificationCountdown(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1500);
  };
  
  // Verify phone number with entered code
  const handleVerifyPhone = () => {
    if (verificationCode.length !== 4) {
      return;
    }
    
    setIsVerifying(true);
    
    // Here you would call an API to verify the code
    // For demo, just simulate verification
    
    setTimeout(() => {
      setIsVerifying(false);
      setPhoneVerified(true);
      setShowVerificationInput(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Navbar />
      <div className="pt-36 pb-32 px-6">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden">
            <CardHeader className="space-y-1 text-center pb-6">
              <div className="flex justify-center mb-2">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                </div>
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight mb-20">Complete your profile</CardTitle>
              <CardDescription className="text-gray-500">
              </CardDescription>
              <div className="w-full mt-24 pt-8">
                <div className="relative">
                  <Progress value={(step / totalSteps) * 100} className="h-3 bg-gray-100 rounded-full overflow-hidden" />
                  <div className="absolute top-0 left-0 h-3 w-full bg-transparent">
                    <div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full transition-all duration-500"
                      style={{ width: `${(step / totalSteps) * 100}%` }}
                    ></div>
                  </div>
                  <div className="absolute top-0 left-0 w-full h-full flex justify-between px-0">
                    {Array.from({ length: totalSteps }).map((_, index) => (
                      <div 
                        key={index} 
                        className={`w-6 h-6 rounded-full -mt-1.5 flex items-center justify-center transition-all duration-300 ${
                          step > index 
                            ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md" 
                            : step === index + 1 
                              ? "border-2 border-purple-600 bg-white" 
                              : "border-2 border-gray-200 bg-white"
                        }`}
                      >
                        {step > index ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <span className="text-[10px] text-gray-500 font-medium">{index + 1}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between mt-3 text-sm text-gray-500">
                  <span className={`${step >= 1 ? "text-purple-600 font-medium" : ""}`}>Basic Info</span>
                  <span className={`${step >= 2 ? "text-purple-600 font-medium" : ""}`}>Profile</span>
                  <span className={`${step >= 3 ? "text-purple-600 font-medium" : ""}`}>Education</span>
                  <span className={`${step >= 4 ? "text-purple-600 font-medium" : ""}`}>Preferences</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="h-12 px-4 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="h-12 px-4 rounded-xl"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full h-12 px-4 rounded-xl text-left font-normal justify-start",
                            !dob && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dob ? format(dob, "PPP") : <span>Select your date of birth</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <div className="p-3 border-b">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="year-select" className="text-sm font-medium">Year:</Label>
                            <Select 
                              value={selectedYear.toString()} 
                              onValueChange={(value) => handleYearChange(parseInt(value))}
                            >
                              <SelectTrigger id="year-select" className="w-[120px] h-8">
                                <SelectValue placeholder="Select year" />
                              </SelectTrigger>
                              <SelectContent className="max-h-60">
                                {years.map((year) => (
                                  <SelectItem key={year} value={year.toString()}>
                                    {year}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <Calendar
                          mode="single"
                          selected={dob}
                          onSelect={setDob}
                          month={calendarMonth}
                          onMonthChange={setCalendarMonth}
                          initialFocus
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <div className="flex-shrink-0 flex gap-2 relative z-20">
                      <div className="relative">
                        <Input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className={`pl-[80px] ${phoneVerified ? 'border-purple-500 bg-purple-50' : ''}`}
                          disabled={phoneVerified}
                        />
                        <CountryCodeDropdown
                          selectedCode={countryCode}
                          setSelectedCode={setCountryCode}
                          disabled={phoneVerified}
                        />
                        
                        {phoneVerified && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-600">
                            <CheckCircle className="h-5 w-5" />
                          </div>
                        )}
                      </div>
                      
                      {!phoneVerified && !showVerificationInput && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleSendVerificationCode}
                          disabled={isVerifying || phoneNumber.length < 5}
                          className="whitespace-nowrap"
                        >
                          {isVerifying ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            "Verify Phone"
                          )}
                        </Button>
                      )}
                    </div>
                    
                    {showVerificationInput && !phoneVerified && (
                      <div className="mt-2 space-y-2">
                        <div className="text-sm text-slate-600">
                          {phoneVerificationCountdown > 0 ? (
                            <p>Enter the 4-digit code sent to your phone ({phoneVerificationCountdown}s)</p>
                          ) : (
                            <div className="flex items-center gap-2">
                              <p>Didn't receive the code?</p>
                              <Button
                                type="button"
                                variant="link"
                                onClick={handleSendVerificationCode}
                                disabled={isVerifying}
                                className="p-0 h-auto text-purple-600"
                              >
                                Resend
                              </Button>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="flex gap-2">
                            {verificationInputs.map((input, index) => (
                              <Input
                                key={index}
                                type="text"
                                id={`phone-verification-${index}`}
                                value={input}
                                onChange={(e) => handleVerificationInputChange(index, e.target.value)}
                                onKeyDown={(e) => handleVerificationKeyDown(index, e)}
                                className="w-12 h-12 text-center text-xl"
                                maxLength={1}
                              />
                            ))}
                          </div>
                          
                          <Button
                            type="button"
                            onClick={handleVerifyPhone}
                            disabled={isVerifying || verificationCode.length !== 4}
                            className="ml-2"
                          >
                            {isVerifying ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              "Verify"
                            )}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                      {profilePicture ? (
                        <img 
                          src={URL.createObjectURL(profilePicture)} 
                          alt="Profile preview" 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="photo" className="cursor-pointer inline-block px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors">
                        Upload profile picture
                      </Label>
                      <Input 
                        id="photo" 
                        type="file" 
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Textarea
                      id="bio"
                      placeholder="Tell us a bit about yourself..."
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="min-h-[100px] rounded-xl"
                    />
                    <p className="text-xs text-gray-500">Maximum 200 characters</p>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="institution">Institution</Label>
                    <Input
                      id="institution"
                      placeholder="Enter your school, college or university name"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      className="h-12 px-4 rounded-xl"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fieldOfStudy">Field of Study</Label>
                    <Input
                      id="fieldOfStudy"
                      placeholder="E.g. Computer Science, Design, Mathematics"
                      value={fieldOfStudy}
                      onChange={(e) => setFieldOfStudy(e.target.value)}
                      className="h-12 px-4 rounded-xl"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="role">What best describes your role?</Label>
                    <Select value={role} onValueChange={setRole}>
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="designer">Designer</SelectItem>
                        <SelectItem value="developer">Developer</SelectItem>
                        <SelectItem value="product-manager">Product Manager</SelectItem>
                        <SelectItem value="marketer">Marketer</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">What are you interested in?</Label>
                    <p className="text-sm text-gray-500 mb-4">Select all that apply to personalize your experience</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {["Photography", "Design", "Development", "AI", "Graphics", "Animation"].map((interest) => (
                        <Button
                          key={interest}
                          type="button"
                          variant={interests.includes(interest) ? "default" : "outline"}
                          onClick={() => handleInterestToggle(interest)}
                          className={`rounded-xl h-auto py-4 relative overflow-hidden group transition-all duration-300 ${
                            interests.includes(interest)
                              ? "bg-gradient-to-r from-purple-600 to-indigo-600 border-0 hover:from-purple-700 hover:to-indigo-700 shadow-md"
                              : "border-2 hover:border-purple-200 hover:bg-purple-50/50"
                          }`}
                        >
                          {interests.includes(interest) && (
                            <div className="absolute -top-5 -right-5 bg-white/20 w-10 h-10 rotate-12 transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                          )}
                          <span className={`relative z-10 font-medium ${interests.includes(interest) ? "text-white" : ""}`}>{interest}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Notification Preferences</h3>
                    <p className="text-sm text-gray-500">Choose how you'd like to be notified</p>
                    
                    <div className="space-y-4 pt-2 mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="flex items-center justify-between p-2 hover:bg-white rounded-lg transition-colors duration-200">
                        <div>
                          <Label className="text-base">Email notifications</Label>
                          <p className="text-sm text-gray-500">Get updates via email</p>
                        </div>
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            checked={notifications.email}
                            onChange={() => setNotifications({...notifications, email: !notifications.email})}
                            className="sr-only"
                            id="email-toggle"
                          />
                          <label
                            htmlFor="email-toggle"
                            className={`flex items-center h-7 w-14 rounded-full transition-all duration-300 cursor-pointer shadow-sm ${
                              notifications.email 
                                ? 'bg-gradient-to-r from-purple-600 to-indigo-600' 
                                : 'bg-gray-200'
                            }`}
                          >
                            <span 
                              className={`flex h-5 w-5 mx-1 rounded-full bg-white shadow-md transform transition-all duration-300 items-center justify-center ${
                                notifications.email ? 'translate-x-7' : ''
                              }`}
                            >
                              {notifications.email && <span className="text-[8px] text-purple-600 font-semibold">ON</span>}
                            </span>
                          </label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-2 hover:bg-white rounded-lg transition-colors duration-200">
                        <div>
                          <Label className="text-base">Push notifications</Label>
                          <p className="text-sm text-gray-500">Get updates on your device</p>
                        </div>
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            checked={notifications.push}
                            onChange={() => setNotifications({...notifications, push: !notifications.push})}
                            className="sr-only"
                            id="push-toggle"
                          />
                          <label
                            htmlFor="push-toggle"
                            className={`flex items-center h-7 w-14 rounded-full transition-all duration-300 cursor-pointer shadow-sm ${
                              notifications.push 
                                ? 'bg-gradient-to-r from-purple-600 to-indigo-600' 
                                : 'bg-gray-200'
                            }`}
                          >
                            <span 
                              className={`flex h-5 w-5 mx-1 rounded-full bg-white shadow-md transform transition-all duration-300 items-center justify-center ${
                                notifications.push ? 'translate-x-7' : ''
                              }`}
                            >
                              {notifications.push && <span className="text-[8px] text-purple-600 font-semibold">ON</span>}
                            </span>
                          </label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-2 hover:bg-white rounded-lg transition-colors duration-200">
                        <div>
                          <Label className="text-base">Marketing emails</Label>
                          <p className="text-sm text-gray-500">Get product updates and offers</p>
                        </div>
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            checked={notifications.marketing}
                            onChange={() => setNotifications({...notifications, marketing: !notifications.marketing})}
                            className="sr-only"
                            id="marketing-toggle"
                          />
                          <label
                            htmlFor="marketing-toggle"
                            className={`flex items-center h-7 w-14 rounded-full transition-all duration-300 cursor-pointer shadow-sm ${
                              notifications.marketing 
                                ? 'bg-gradient-to-r from-purple-600 to-indigo-600' 
                                : 'bg-gray-200'
                            }`}
                          >
                            <span 
                              className={`flex h-5 w-5 mx-1 rounded-full bg-white shadow-md transform transition-all duration-300 items-center justify-center ${
                                notifications.marketing ? 'translate-x-7' : ''
                              }`}
                            >
                              {notifications.marketing && <span className="text-[8px] text-purple-600 font-semibold">ON</span>}
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between p-6">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
                className={`rounded-xl h-12 px-6 border-2 ${step === 1 ? 'opacity-50' : ''}`}
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={isLoading}
                className="rounded-xl h-12 px-8 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 relative overflow-hidden group shadow-lg hover:shadow-purple-200/50 transition-all duration-300"
              >
                <span className="absolute inset-0 w-full h-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10 flex items-center gap-2">
                  {isLoading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <>
                      <span>{step === totalSteps ? "Finish" : "Next"}</span>
                      {!isLoading && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      )}
                    </>
                  )}
                </span>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;