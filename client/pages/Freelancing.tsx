import React, { useState } from 'react';
import { useFirebase } from '@/contexts/FirebaseContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Briefcase, Clock, Mail, Star, Users, Globe } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface FreelancingPortal {
  name: string;
  description: string;
  url: string;
  category: string;
  rating: number;
  features: string[];
}

const freelancingPortals: FreelancingPortal[] = [
  {
    name: "Upwork",
    description: "Global freelancing platform with diverse opportunities across multiple skills and industries.",
    url: "https://www.upwork.com",
    category: "General",
    rating: 4.2,
    features: ["Hourly & Fixed Projects", "Secure Payment", "Client Reviews", "Skills Tests"]
  },
  {
    name: "Fiverr",
    description: "Marketplace for creative and digital services starting at $5.",
    url: "https://www.fiverr.com",
    category: "Creative",
    rating: 4.0,
    features: ["Gig-based System", "Package Options", "Quick Turnaround", "Creative Focus"]
  },
  {
    name: "Freelancer",
    description: "Competitive bidding platform for freelance projects worldwide.",
    url: "https://www.freelancer.com",
    category: "General",
    rating: 3.9,
    features: ["Contest Participation", "Bidding System", "Milestone Payments", "Skills Certification"]
  },
  {
    name: "Guru",
    description: "Professional freelancing platform with focus on long-term relationships.",
    url: "https://www.guru.com",
    category: "Professional",
    rating: 4.1,
    features: ["WorkRoom Collaboration", "Multiple Payment Options", "Work History", "SafePay Protection"]
  },
  {
    name: "99designs",
    description: "Design-focused platform for creative professionals and design contests.",
    url: "https://99designs.com",
    category: "Design",
    rating: 4.3,
    features: ["Design Contests", "1-to-1 Projects", "Design Portfolio", "Client Matching"]
  },
  {
    name: "Toptal",
    description: "Exclusive network for top 3% of freelance software developers and designers.",
    url: "https://www.toptal.com",
    category: "Tech",
    rating: 4.5,
    features: ["Top Talent Only", "Premium Rates", "Client Matching", "Rigorous Screening"]
  },
  {
    name: "PeoplePerHour",
    description: "UK-based platform connecting businesses with freelance professionals.",
    url: "https://www.peopleperhour.com",
    category: "Professional",
    rating: 4.0,
    features: ["Hourlies System", "Project Proposals", "AI Matching", "Workstream Tools"]
  },
  {
    name: "SimplyHired",
    description: "Job search engine that includes many freelance and remote opportunities.",
    url: "https://www.simplyhired.com",
    category: "Job Search",
    rating: 3.8,
    features: ["Job Aggregation", "Salary Estimates", "Company Reviews", "Remote Filter"]
  }
];

const PortalCard: React.FC<{ portal: FreelancingPortal }> = ({ portal }) => {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-blue-500">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-900">{portal.name}</CardTitle>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-600">{portal.rating}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
            {portal.category}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4 leading-relaxed">{portal.description}</p>
        
        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
          <ul className="space-y-1">
            {portal.features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700" 
          onClick={() => window.open(portal.url, '_blank')}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Visit {portal.name}
        </Button>
      </CardContent>
    </Card>
  );
};

const Freelancing: React.FC = () => {
  const { user, submitFreelancingForm } = useFirebase();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    skills: '',
    experience: '',
    contactEmail: ''
  });

  React.useEffect(() => {
    if (user?.email) {
      setFormData(prev => ({ ...prev, contactEmail: user.email }));
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setMessage({ type: 'error', text: 'Please log in to submit your information.' });
      return;
    }

    if (!formData.skills || !formData.experience || !formData.contactEmail) {
      setMessage({ type: 'error', text: 'Please fill in all required fields.' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      await submitFreelancingForm({
        skills: formData.skills,
        experience: formData.experience,
        contactEmail: formData.contactEmail
      });

      setMessage({ 
        type: 'success', 
        text: 'Your information has been submitted successfully! We will contact you when part-time opportunities become available.' 
      });
      
      // Reset form
      setFormData({
        skills: '',
        experience: '',
        contactEmail: user.email || ''
      });
    } catch (error) {
      console.error('Error submitting freelancing form:', error);
      setMessage({ type: 'error', text: 'Failed to submit your information. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Freelancing Opportunities</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover popular freelancing platforms and register for part-time opportunities to earn while you study.
          </p>
        </div>

        {/* Popular Freelancing Portals */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <Globe className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Popular Freelancing Portals</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {freelancingPortals.map((portal, index) => (
              <PortalCard key={index} portal={portal} />
            ))}
          </div>
        </div>

        {/* Part-Time Income Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-t-purple-500">
          <div className="flex items-center mb-6">
            <Briefcase className="w-8 h-8 text-purple-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Part-Time Income</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Coming Soon Message */}
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-purple-600 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">Coming Soon!</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Part-time jobs will be posted soon. We're working on partnering with local businesses 
                and online companies to bring you flexible job opportunities that fit your student schedule.
              </p>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">What to expect:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Flexible working hours
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Remote and on-site opportunities
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Student-friendly employers
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Competitive hourly rates
                  </li>
                </ul>
              </div>
            </div>

            {/* Registration Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-6 h-6 text-purple-600" />
                  <span>Register Your Interest</span>
                </CardTitle>
                <p className="text-gray-600">
                  Submit your details to be notified when part-time opportunities become available.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="skills">Skills *</Label>
                    <Textarea
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                      rows={3}
                      placeholder="List your skills (e.g., Programming, Graphic Design, Content Writing, Data Entry, etc.)"
                    />
                  </div>

                  <div>
                    <Label htmlFor="experience">Experience *</Label>
                    <Textarea
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                      rows={3}
                      placeholder="Describe your relevant experience, projects, or previous work (include both academic and professional experience)"
                    />
                  </div>

                  <div>
                    <Label htmlFor="contactEmail">Contact Email *</Label>
                    <Input
                      id="contactEmail"
                      name="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {message && (
                    <Alert className={message.type === 'error' ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}>
                      <AlertDescription className={message.type === 'error' ? 'text-red-800' : 'text-green-800'}>
                        {message.text}
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-purple-600 hover:bg-purple-700" 
                    disabled={isSubmitting}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-16 bg-blue-50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">💡 Freelancing Tips for Students</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Start Small</h4>
              <p className="text-gray-700 text-sm">Begin with simple projects to build your portfolio and reputation.</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Time Management</h4>
              <p className="text-gray-700 text-sm">Balance freelance work with your studies using effective scheduling.</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Skill Development</h4>
              <p className="text-gray-700 text-sm">Continuously improve your skills to access higher-paying projects.</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Professional Profile</h4>
              <p className="text-gray-700 text-sm">Create compelling profiles that highlight your academic background.</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Communication</h4>
              <p className="text-gray-700 text-sm">Maintain clear, professional communication with clients.</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Portfolio Building</h4>
              <p className="text-gray-700 text-sm">Showcase your best work and academic projects effectively.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Freelancing;
