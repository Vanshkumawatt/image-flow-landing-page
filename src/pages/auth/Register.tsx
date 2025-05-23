import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { addUser, findUserByEmail } from "@/data/userData";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // Handle password mismatch
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    if (!acceptTerms) {
      // Handle terms not accepted
      toast({
        title: "Terms not accepted",
        description: "Please accept the terms and conditions to continue.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Check if user already exists
    const existingUser = findUserByEmail(email);
    
    setTimeout(() => {
      setIsLoading(false);
      
      if (existingUser) {
        // User already exists
        toast({
          title: "Registration failed",
          description: "An account with this email already exists.",
          variant: "destructive",
        });
        return;
      }
      
      // Add new user
      const newUser = addUser(name, email, password);
      
      // Redirect to email verification page with email as state
      navigate("/email-verification", { state: { email } });
      
      toast({
        title: "Registration successful!",
        description: "Please verify your email to continue.",
        variant: "default",
      });
    }, 1000);
  };

  const handleGoogleRegister = () => {
    // Handle Google registration logic here
    console.log("Registering with Google");
    // After successful registration with Google, redirect to email verification
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/email-verification", { state: { email: "google-user@gmail.com" } });
      
      toast({
        title: "Google registration successful!",
        description: "Please verify your email to continue.",
        variant: "default",
      });
    }, 1500);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white overflow-hidden">
      <div className="max-w-md w-full px-6 overflow-y-auto max-h-screen py-6">
        <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm rounded-2xl">
          <CardHeader className="space-y-1 text-center pb-4">
            <div className="flex justify-center mb-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                </svg>
              </div>
            </div>
            <CardTitle className="text-xl font-bold tracking-tight">Create an account</CardTitle>
            <CardDescription className="text-gray-500">
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 px-4">
            <form onSubmit={handleRegister}>
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="name">Create username</Label>
                  <Input
                    id="name"
                    placeholder="username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="h-10 px-3 rounded-lg"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-10 px-3 rounded-lg"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-10 px-3 rounded-lg"
                  />
                  <p className="text-xs text-gray-500">Password must be at least 8 characters</p>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="h-10 px-3 rounded-lg"
                  />
                </div>
                
                <div className="flex items-center space-x-2 my-3">
                  <Checkbox 
                    id="terms" 
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    className="data-[state=checked]:bg-purple-600"
                  />
                  <label
                    htmlFor="terms"
                    className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{" "}
                    <Link to="/terms" className="text-purple-600 hover:text-purple-800 font-medium">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-purple-600 hover:text-purple-800 font-medium">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isLoading || !acceptTerms}
                  className="w-full py-5 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-lg text-sm font-medium"
                >
                  {isLoading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : "Sign Up"}
                </Button>
              </div>
            </form>
            
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <Button
              variant="outline"
              onClick={handleGoogleRegister}
              className="w-full h-10 py-5 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all font-medium flex items-center justify-center gap-2 text-sm"
            >
              <svg className="h-4 w-4" aria-hidden="true" focusable="false" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
              </svg>
              <span>Google</span>
            </Button>
          </CardContent>
          <CardFooter className="flex items-center justify-center p-4 pt-0">
            <p className="text-center text-xs text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-600 hover:text-purple-800 font-medium">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Register;