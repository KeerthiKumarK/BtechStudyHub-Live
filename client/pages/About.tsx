import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Target, 
  Users, 
  BookOpen, 
  TrendingUp, 
  Globe, 
  Shield, 
  Zap,
  Heart,
  Lightbulb,
  Rocket,
  Star,
  CheckCircle,
  ArrowRight,
  Code,
  Database,
  Smartphone
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: BookOpen,
    title: "Comprehensive Resources",
    description: "Textbooks, MCQs, previous papers, and video tutorials all in one place"
  },
  {
    icon: TrendingUp,
    title: "Skill Development",
    description: "Tools and resources to enhance both academic and career skills"
  },
  {
    icon: Users,
    title: "Community Engagement",
    description: "Connect with fellow students, share knowledge, and collaborate on projects"
  },
  {
    icon: Shield,
    title: "Secure & Scalable",
    description: "Built with Firebase for secure data storage and real-time collaboration"
  },
  {
    icon: Zap,
    title: "Modern Experience",
    description: "Smooth, responsive interface built with Next.js technology"
  },
  {
    icon: Target,
    title: "Progress Tracking",
    description: "Monitor your learning journey with comprehensive progress analytics"
  }
];

const technologies = [
  {
    icon: Code,
    name: "Next.js",
    description: "Modern React framework for optimal performance"
  },
  {
    icon: Database,
    name: "Firebase",
    description: "Secure, scalable backend infrastructure"
  },
  {
    icon: Smartphone,
    name: "Responsive Design",
    description: "Perfect experience across all devices"
  }
];

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Leveraging cutting-edge technology to transform education"
  },
  {
    icon: Heart,
    title: "Student-Centric",
    description: "Every feature designed with student success in mind"
  },
  {
    icon: Globe,
    title: "Accessibility",
    description: "Making quality education resources available to everyone"
  },
  {
    icon: Rocket,
    title: "Excellence",
    description: "Committed to delivering the highest quality learning experience"
  }
];

export default function About() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-education rounded-full flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About BTech Study Hub
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Empowering the next generation of engineers with innovative learning solutions
            </p>

            <div className="flex justify-center">
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
                <Star className="w-4 h-4 mr-2" />
                Trusted by 10,000+ Students
              </Badge>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 shadow-lg">
              <CardContent className="space-y-6">
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">BTech Study Hub</strong> is a modern EduTech platform designed to empower engineering students with easy access to study resources, skill development tools, and community engagement. Our mission is to simplify the learning process by providing a centralized hub where students can find textbooks, MCQs, previous year papers, video tutorials, internships, and much more — all in one place.
                  </p>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    The platform is built using <strong className="text-foreground">Next.js</strong> for a smooth, responsive, and interactive user experience, combined with <strong className="text-foreground">Firebase</strong> for secure, scalable data storage and real-time collaboration. With features like role-based dashboards, dark/light mode, and progress tracking, BTech Study Hub ensures that students can learn efficiently, stay organized, and enhance their skills for both academics and career opportunities.
                  </p>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    We aim to foster a supportive student community, where learners can share knowledge, ask questions, and collaborate on projects, bridging the gap between classroom learning and real-world application.
                  </p>
                  
                  <div className="bg-gradient-education text-white p-6 rounded-lg mt-8">
                    <p className="text-xl font-semibold text-center">
                      Join BTech Study Hub today and take your learning to the next level — smarter, faster, and more organized!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Makes Us Different
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the features that set BTech Study Hub apart from traditional learning platforms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-education rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Technology Stack */}
        <section className="mb-16 bg-muted/30 rounded-2xl p-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built with Modern Technology
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Leveraging the latest technologies to deliver exceptional performance and user experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {technologies.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-education rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{tech.name}</h3>
                  <p className="text-muted-foreground">{tech.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at BTech Study Hub
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-education rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg font-semibold">{value.title}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      {value.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Mission Statement */}
        <section className="mb-16">
          <Card className="bg-gradient-education text-white">
            <CardContent className="p-12 text-center">
              <Target className="w-12 h-12 mx-auto mb-6 opacity-80" />
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-xl leading-relaxed max-w-3xl mx-auto opacity-90">
                To democratize access to quality engineering education by creating an innovative, 
                comprehensive platform that bridges the gap between classroom learning and real-world application, 
                empowering students to achieve academic excellence and career success.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Community Impact */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Building a Learning Community
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    Connect with thousands of engineering students across India
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    Share knowledge, collaborate on projects, and learn together
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    Access mentorship and guidance from experienced peers
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    Stay updated with the latest industry trends and opportunities
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-gradient-education text-white">
                  <Link to="/community">
                    <Users className="w-4 h-4 mr-2" />
                    Join Community
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/contact">
                    Contact Us
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <Card className="p-8">
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
                    <div className="text-sm text-muted-foreground">Active Students</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">100+</div>
                      <div className="text-xs text-muted-foreground">Colleges</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">95%</div>
                      <div className="text-xs text-muted-foreground">Success Rate</div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-education-green">5,000+</div>
                    <div className="text-sm text-muted-foreground">Study Resources</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="p-12">
            <CardContent>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Ready to Transform Your Learning Journey?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of engineering students who are already experiencing the future of education
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="bg-gradient-education text-white">
                  <Link to="/signup">
                    <GraduationCap className="w-5 h-5 mr-2" />
                    Get Started Free
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/textbooks">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Explore Resources
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </Layout>
  );
}
