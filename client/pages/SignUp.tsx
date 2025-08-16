import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { useFirebase } from "@/contexts/FirebaseContext";
import { 
  Eye, 
  EyeOff, 
  GraduationCap, 
  Mail, 
  Lock, 
  User,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Github,
  Chrome,
  Check,
  X,
  Building
} from "lucide-react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  college: string;
  year: string;
  branch: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  college?: string;
  year?: string;
  branch?: string;
  password?: string;
  confirmPassword?: string;
  agreeToTerms?: string;
  general?: string;
}

interface PasswordStrength {
  score: number;
  requirements: {
    length: boolean;
    lowercase: boolean;
    uppercase: boolean;
    number: boolean;
    special: boolean;
  };
}

const validateName = (name: string, field: string): string | undefined => {
  if (!name.trim()) return `${field} is required`;
  if (name.trim().length < 2) return `${field} must be at least 2 characters`;
  if (!/^[a-zA-Z\s]+$/.test(name)) return `${field} can only contain letters`;
  return undefined;
};

const validateEmail = (email: string): string | undefined => {
  if (!email) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address";
  return undefined;
};

const validateCollege = (college: string): string | undefined => {
  if (!college.trim()) return "College name is required";
  if (college.trim().length < 3) return "College name must be at least 3 characters";
  return undefined;
};

const getPasswordStrength = (password: string): PasswordStrength => {
  const requirements = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };

  const score = Object.values(requirements).filter(Boolean).length;
  
  return { score, requirements };
};

const validatePassword = (password: string): string | undefined => {
  if (!password) return "Password is required";
  const strength = getPasswordStrength(password);
  if (strength.score < 3) return "Password is too weak";
  return undefined;
};

const validateConfirmPassword = (password: string, confirmPassword: string): string | undefined => {
  if (!confirmPassword) return "Please confirm your password";
  if (password !== confirmPassword) return "Passwords do not match";
  return undefined;
};

const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
const branches = [
  'Computer Science',
  'Electronics & Communication',
  'Mechanical Engineering',
  'Civil Engineering',
  'Electrical Engineering',
  'Information Technology',
  'Chemical Engineering',
  'Biotechnology',
  'Aerospace Engineering',
  'Other'
];

export default function SignUp() {
  const navigate = useNavigate();
  const { signUp, signInWithGoogle, signInWithGithub, user } = useFirebase();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    college: "",
    year: "",
    branch: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Redirect if already logged in
  if (user && !isLoading) {
    navigate('/');
    return null;
  }

  const passwordStrength = getPasswordStrength(formData.password);

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    newErrors.firstName = validateName(formData.firstName, "First name");
    newErrors.lastName = validateName(formData.lastName, "Last name");
    newErrors.email = validateEmail(formData.email);
    newErrors.college = validateCollege(formData.college);
    
    if (!formData.year) newErrors.year = "Please select your year";
    if (!formData.branch) newErrors.branch = "Please select your branch";
    
    newErrors.password = validatePassword(formData.password);
    newErrors.confirmPassword = validateConfirmPassword(formData.password, formData.confirmPassword);
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the Terms and Privacy Policy";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== undefined);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      await signUp(formData.email, formData.password, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        college: formData.college,
        year: formData.year,
        branch: formData.branch
      });
      setIsSuccess(true);
      setTimeout(() => navigate('/'), 2000);
    } catch (error: any) {
      console.error('Registration error:', error);
      setErrors({
        general: error.message || (
          error.code === 'auth/email-already-in-use'
            ? "This email is already registered. Please use a different email or try logging in."
            : "Registration failed. Please try again."
        )
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignUp = async (provider: 'google' | 'github') => {
    setIsLoading(true);
    setErrors({});

    try {
      if (provider === 'google') {
        await signInWithGoogle();
      } else {
        await signInWithGithub();
      }
      setIsSuccess(true);
      setTimeout(() => navigate('/'), 1500);
    } catch (error: any) {
      console.error('Social signup error:', error);
      if (error.message && error.message.includes('not available in this environment')) {
        setErrors({ general: error.message });
      } else {
        setErrors({ general: "Social signup failed. Please try again or use email/password registration." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = (score: number) => {
    if (score <= 2) return "bg-red-500";
    if (score <= 3) return "bg-yellow-500";
    if (score <= 4) return "bg-blue-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = (score: number) => {
    if (score <= 2) return "Weak";
    if (score <= 3) return "Fair";
    if (score <= 4) return "Good";
    return "Strong";
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Welcome to BTech Study Hub!</h2>
              <p className="text-muted-foreground">
                Your account has been created successfully. You're now part of our learning community!
              </p>
              <div className="space-y-3">
                <Button asChild className="w-full bg-gradient-education text-white">
                  <Link to="/">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-education text-white p-12 items-center justify-center">
        <div className="max-w-md text-center space-y-8">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-bold">BTech Study Hub</span>
          </div>
          
          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight">
              Start Your Engineering Excellence Journey
            </h1>
            <p className="text-xl text-blue-100">
              Join 10,000+ students mastering BTech concepts with our comprehensive platform
            </p>
          </div>

          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span>Free access to premium study materials</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span>Real-time chat with fellow students</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span>Personalized learning progress tracking</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span>Expert-curated content for all subjects</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="flex-1 flex items-center justify-center p-4 overflow-y-auto">
        <Card className="w-full max-w-md shadow-xl my-8">
          <CardHeader className="text-center space-y-2">
            <div className="lg:hidden flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-education rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">BTech Study Hub</span>
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">Create Account</CardTitle>
            <CardDescription className="text-muted-foreground">
              Join thousands of engineering students
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {errors.general && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.general}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className={`pl-10 ${errors.firstName ? "border-destructive" : ""}`}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.firstName && (
                    <p className="text-sm text-destructive">{errors.firstName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className={`pl-10 ${errors.lastName ? "border-destructive" : ""}`}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.lastName && (
                    <p className="text-sm text-destructive">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                    disabled={isLoading}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="college">College/University</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="college"
                    type="text"
                    placeholder="Enter your college name"
                    value={formData.college}
                    onChange={(e) => handleInputChange("college", e.target.value)}
                    className={`pl-10 ${errors.college ? "border-destructive" : ""}`}
                    disabled={isLoading}
                  />
                </div>
                {errors.college && (
                  <p className="text-sm text-destructive">{errors.college}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <select
                    id="year"
                    value={formData.year}
                    onChange={(e) => handleInputChange("year", e.target.value)}
                    className={`w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${errors.year ? "border-destructive" : ""}`}
                    disabled={isLoading}
                  >
                    <option value="">Select year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  {errors.year && (
                    <p className="text-sm text-destructive">{errors.year}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="branch">Branch</Label>
                  <select
                    id="branch"
                    value={formData.branch}
                    onChange={(e) => handleInputChange("branch", e.target.value)}
                    className={`w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${errors.branch ? "border-destructive" : ""}`}
                    disabled={isLoading}
                  >
                    <option value="">Select branch</option>
                    {branches.map((branch) => (
                      <option key={branch} value={branch}>{branch}</option>
                    ))}
                  </select>
                  {errors.branch && (
                    <p className="text-sm text-destructive">{errors.branch}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={`pl-10 pr-10 ${errors.password ? "border-destructive" : ""}`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                
                {formData.password && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Password strength:</span>
                      <span className={`font-medium ${passwordStrength.score >= 4 ? 'text-green-600' : passwordStrength.score >= 3 ? 'text-blue-600' : passwordStrength.score >= 2 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {getPasswordStrengthText(passwordStrength.score)}
                      </span>
                    </div>
                    <Progress 
                      value={(passwordStrength.score / 5) * 100} 
                      className="h-2"
                    />
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className={`flex items-center space-x-1 ${passwordStrength.requirements.length ? 'text-green-600' : 'text-muted-foreground'}`}>
                        {passwordStrength.requirements.length ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                        <span>8+ characters</span>
                      </div>
                      <div className={`flex items-center space-x-1 ${passwordStrength.requirements.uppercase ? 'text-green-600' : 'text-muted-foreground'}`}>
                        {passwordStrength.requirements.uppercase ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                        <span>Uppercase</span>
                      </div>
                      <div className={`flex items-center space-x-1 ${passwordStrength.requirements.lowercase ? 'text-green-600' : 'text-muted-foreground'}`}>
                        {passwordStrength.requirements.lowercase ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                        <span>Lowercase</span>
                      </div>
                      <div className={`flex items-center space-x-1 ${passwordStrength.requirements.number ? 'text-green-600' : 'text-muted-foreground'}`}>
                        {passwordStrength.requirements.number ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                        <span>Number</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className={`pl-10 pr-10 ${errors.confirmPassword ? "border-destructive" : ""}`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="flex items-start space-x-2">
                  <input 
                    type="checkbox" 
                    checked={formData.agreeToTerms}
                    onChange={(e) => handleInputChange("agreeToTerms", e.target.checked)}
                    className="mt-1 rounded border-border"
                    disabled={isLoading}
                  />
                  <span className="text-sm text-muted-foreground">
                    I agree to the{" "}
                    <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
                    {" "}and{" "}
                    <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                  </span>
                </label>
                {errors.agreeToTerms && (
                  <p className="text-sm text-destructive">{errors.agreeToTerms}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-education text-white hover:opacity-90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or sign up with</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleSocialSignUp('google')}
                  disabled={isLoading}
                >
                  <Chrome className="w-4 h-4 mr-2" />
                  Google
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSocialSignUp('github')}
                  disabled={isLoading}
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Social login may require additional setup.{" "}
                <Link to="/firebase-config" className="text-primary hover:underline">
                  Setup instructions
                </Link>
              </p>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign in here
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
