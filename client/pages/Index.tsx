import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  HelpCircle, 
  FileText, 
  Video, 
  TrendingUp, 
  MessageCircle, 
  Users, 
  Briefcase,
  GraduationCap,
  Star,
  ArrowRight,
  CheckCircle,
  PlayCircle,
  Download,
  Trophy,
  Clock,
  Target,
  Zap,
  Globe,
  Shield
} from "lucide-react";

const features = [
  {
    icon: HelpCircle,
    title: "MCQ Practice",
    description: "Thousands of MCQs organized by year and subject covering all 4 years of BTech",
    link: "/mcqs",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    stats: "5000+ Questions"
  },
  {
    icon: BookOpen,
    title: "Digital Textbooks",
    description: "Downloadable PDF textbooks categorized by year and subject for easy access",
    link: "/textbooks",
    color: "text-green-600",
    bgColor: "bg-green-50",
    stats: "200+ Books"
  },
  {
    icon: FileText,
    title: "Previous Papers",
    description: "Well-structured past exam papers with easy search functionality",
    link: "/papers",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    stats: "500+ Papers"
  },
  {
    icon: Video,
    title: "Video Lectures",
    description: "Curated YouTube videos for each subject with organized content structure",
    link: "/videos",
    color: "text-red-600",
    bgColor: "bg-red-50",
    stats: "1000+ Videos"
  },
  {
    icon: TrendingUp,
    title: "Skill Development",
    description: "Handpicked learning resources, free tools, and skill enhancement content",
    link: "/skills",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    stats: "50+ Skills"
  },
  {
    icon: Briefcase,
    title: "Internships",
    description: "Current internship opportunities with application guidance and tips",
    link: "/internships",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    stats: "Live Opportunities"
  }
];

const communityFeatures = [
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Real-time chat with fellow students for instant help and discussions",
    link: "/chat"
  },
  {
    icon: Users,
    title: "Study Groups",
    description: "College-based groups for focused discussions and collaborative learning",
    link: "/community"
  },
  {
    icon: Star,
    title: "Freelancing",
    description: "Connect with admin for freelance opportunities and project work",
    link: "/freelancing"
  }
];

const stats = [
  { label: "Active Students", value: "10,000+", icon: Users },
  { label: "Study Materials", value: "5,000+", icon: BookOpen },
  { label: "Success Rate", value: "95%", icon: Trophy },
  { label: "Colleges Connected", value: "100+", icon: GraduationCap }
];

const benefits = [
  "Comprehensive study materials for all 4 years",
  "Expert-curated content and resources",
  "Progress tracking and performance analytics",
  "Active community of engineering students",
  "Regular updates and new content",
  "Mobile-friendly responsive design"
];

export default function Index() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToStudyMaterials = () => {
    const studyMaterialsSection = document.getElementById('study-materials-section');
    if (studyMaterialsSection) {
      studyMaterialsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="absolute inset-0 bg-gradient-education opacity-5"></div>
        <div className="container mx-auto px-4 py-20 relative">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex justify-center mb-6">
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
                <Zap className="w-4 h-4 mr-2" />
                India's Leading BTech Study Platform
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Your Complete
              <span className="bg-gradient-education bg-clip-text text-transparent"> BTech Study</span>
              <br />Companion
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Access comprehensive study materials, practice MCQs, connect with peers, and accelerate your engineering journey with our modern learning platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-gradient-education text-white hover:opacity-90 transition-opacity">
                <PlayCircle className="w-5 h-5 mr-2" />
                Start Learning Now
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/about">
                  <Globe className="w-5 h-5 mr-2" />
                  Learn More
                </Link>
              </Button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-2">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive resources designed specifically for BTech students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {feature.stats}
                      </Badge>
                    </div>
                    <CardDescription className="text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button asChild variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Link to={feature.link}>
                        Explore Now
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Join Our Learning Community
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect, collaborate, and grow with thousands of engineering students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {communityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-education rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="w-full">
                      <Link to={feature.link}>
                        Join Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Choose BTech Study Hub?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Built by engineers, for engineers. We understand your journey and provide exactly what you need to succeed.
              </p>
              
              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-gradient-education text-white">
                  <Link to="/mcqs">
                    <Target className="w-5 h-5 mr-2" />
                    Start Practicing
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/textbooks">
                    <Download className="w-5 h-5 mr-2" />
                    Browse Resources
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-education rounded-2xl p-8 text-white">
                <div className="flex items-center space-x-3 mb-6">
                  <Shield className="w-8 h-8" />
                  <div>
                    <h3 className="text-xl font-semibold">Trusted by Students</h3>
                    <p className="text-blue-100">Across 100+ Engineering Colleges</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <Clock className="w-6 h-6 mx-auto mb-2" />
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="text-sm text-blue-100">Available</div>
                  </div>
                  <div className="text-center">
                    <Trophy className="w-6 h-6 mx-auto mb-2" />
                    <div className="text-2xl font-bold">95%</div>
                    <div className="text-sm text-blue-100">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-education text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your BTech Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful engineering students who've accelerated their learning with BTech Study Hub.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100" asChild>
              <Link to="/signup">
                <GraduationCap className="w-5 h-5 mr-2" />
                Get Started Free
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
              <Link to="/contact">
                <MessageCircle className="w-5 h-5 mr-2" />
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
