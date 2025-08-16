import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useFirebase } from "@/contexts/FirebaseContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import WelcomeMessage from "./WelcomeMessage";
import {
  BookOpen,
  HelpCircle,
  FileText,
  Video,
  TrendingUp,
  MessageCircle,
  Users,
  Briefcase,
  Info,
  Phone,
  Menu,
  X,
  GraduationCap,
  Star,
  Sun,
  Moon
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const navigationItems = [
  { path: "/", label: "Home", icon: GraduationCap },
  { path: "/textbooks", label: "Textbooks", icon: BookOpen },
  { path: "/papers", label: "Previous Papers", icon: FileText },
  { path: "/videos", label: "Videos", icon: Video },
  { path: "/skills", label: "Skills", icon: TrendingUp },
  { path: "/chat", label: "Chat", icon: MessageCircle },
  { path: "/freelancing", label: "Freelancing", icon: Star },
  { path: "/mcqs", label: "MCQs", icon: HelpCircle },
  { path: "/internships", label: "Internships", icon: Briefcase },
  { path: "/community", label: "Community", icon: Users },
  { path: "/portfolio", label: "Portfolio", icon: FileText },
];

const secondaryItems = [
  { path: "/portfolio", label: "Portfolio", icon: Briefcase },
  { path: "/about", label: "About", icon: Info },
  { path: "/feedback", label: "Feedback", icon: MessageCircle },
  { path: "/contact", label: "Contact", icon: Phone },
];

export default function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const { user, userProfile, logout } = useFirebase();

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

    setIsDarkMode(shouldUseDark);
    if (shouldUseDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-education rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">
                BTech Study Hub
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.slice(0, 8).map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActivePath(item.path)
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted dark:hover:bg-slate-800"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              {/* Feedback Button */}
              <Link
                to="/feedback"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActivePath("/feedback")
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted dark:hover:bg-slate-800"
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Feedback</span>
              </Link>
            </nav>

            {/* Auth Section */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Dark Mode Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                className="relative"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-slate-600" />
                )}
              </Button>

              {user ? (
                <>
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={userProfile?.profileImageURL || userProfile?.photoURL}
                        alt={userProfile?.displayName || 'User'}
                      />
                      <AvatarFallback className="bg-gradient-education text-white text-xs font-semibold">
                        {userProfile?.displayName?.split(' ').map(n => n[0]).join('') || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-sm">
                      <p className="font-medium text-foreground">{userProfile?.displayName || 'User'}</p>
                      <p className="text-xs text-muted-foreground">{userProfile?.college}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/profile">Profile</Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => logout()}
                    >
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button size="sm" className="bg-gradient-education text-white" asChild>
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background dark:bg-slate-900">
            <div className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActivePath(item.path)
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted dark:hover:bg-slate-800"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              <div className="pt-2 border-t border-border">
                {secondaryItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted dark:hover:bg-slate-800 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
              <div className="pt-3 border-t border-border">
                {/* Dark Mode Toggle for Mobile */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleDarkMode}
                  className="w-full justify-start mb-3"
                >
                  {isDarkMode ? (
                    <>
                      <Sun className="w-4 h-4 mr-2 text-yellow-500" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4 mr-2" />
                      Dark Mode
                    </>
                  )}
                </Button>

                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 px-3 py-2">
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={userProfile?.profileImageURL || userProfile?.photoURL}
                          alt={userProfile?.displayName || 'User'}
                        />
                        <AvatarFallback className="bg-gradient-education text-white text-sm font-semibold">
                          {userProfile?.displayName?.split(' ').map(n => n[0]).join('') || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{userProfile?.displayName || 'User'}</p>
                        <p className="text-xs text-muted-foreground">{userProfile?.college}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                      <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                        Profile
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Button variant="ghost" size="sm" className="justify-start" asChild>
                      <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                        Login
                      </Link>
                    </Button>
                    <Button size="sm" className="bg-gradient-education text-white justify-start" asChild>
                      <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                        Sign Up
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Welcome Message */}
      <WelcomeMessage />

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-muted mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-education rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-foreground">
                  BTech Study Hub
                </span>
              </Link>
              <p className="text-muted-foreground mb-4 max-w-md">
                Empowering engineering students with comprehensive study materials, 
                expert-curated resources, and a vibrant learning community.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm">
                  Privacy Policy
                </Button>
                <Button variant="ghost" size="sm">
                  Terms of Service
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Study Resources</h3>
              <div className="space-y-2">
                <Link to="/mcqs" className="block text-muted-foreground hover:text-foreground transition-colors">
                  MCQ Practice
                </Link>
                <Link to="/textbooks" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Textbooks
                </Link>
                <Link to="/papers" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Previous Papers
                </Link>
                <Link to="/videos" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Video Lectures
                </Link>
              </div>
            </div>

            {/* Community */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Community</h3>
              <div className="space-y-2">
                <Link to="/community" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Study Groups
                </Link>
                <Link to="/chat" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Live Chat
                </Link>
                <Link to="/freelancing" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Freelancing
                </Link>
                <Link to="/portfolio" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Portfolio & Resume
                </Link>
                <Link to="/feedback" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Feedback
                </Link>
                <Link to="/about" className="block text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-muted-foreground">
              © 2024 BTech Study Hub. All rights reserved. Made with ❤️ for engineering students.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
