import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Briefcase, 
  Search, 
  MapPin, 
  Clock, 
  DollarSign, 
  Calendar,
  ExternalLink,
  Filter,
  Heart,
  Star,
  Users,
  GraduationCap,
  Code,
  Smartphone,
  Globe,
  Database,
  Target,
  TrendingUp,
  Award,
  CheckCircle
} from 'lucide-react';

interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Remote' | 'Onsite' | 'Hybrid';
  duration: string;
  stipend: string;
  description: string;
  requirements: string[];
  skills: string[];
  category: string;
  postedDate: string;
  deadline: string;
  applicationLink: string;
  logo: string;
  featured: boolean;
  saved: boolean;
}

// Mock data for internships
const mockInternships: Internship[] = [
  {
    id: '1',
    title: 'Software Development Intern',
    company: 'TechCorp Solutions',
    location: 'Bangalore, India',
    type: 'Hybrid',
    duration: '6 months',
    stipend: '₹25,000/month',
    description: 'Join our dynamic team to work on cutting-edge web applications using React, Node.js, and modern development practices.',
    requirements: ['Currently pursuing BTech/BE in Computer Science', 'Strong programming fundamentals', 'Knowledge of web technologies'],
    skills: ['React', 'Node.js', 'JavaScript', 'Git'],
    category: 'Software Development',
    postedDate: '2024-01-15',
    deadline: '2024-02-15',
    applicationLink: '#',
    logo: 'https://ui-avatars.com/api/?name=TC&background=3b82f6&color=fff',
    featured: true,
    saved: false
  },
  {
    id: '2',
    title: 'Data Science Intern',
    company: 'Analytics Pro',
    location: 'Hyderabad, India',
    type: 'Remote',
    duration: '4 months',
    stipend: '₹20,000/month',
    description: 'Work with real-world datasets to build machine learning models and create insightful data visualizations.',
    requirements: ['Knowledge of Python/R', 'Basic understanding of statistics', 'Curious about data analysis'],
    skills: ['Python', 'Pandas', 'Machine Learning', 'SQL'],
    category: 'Data Science',
    postedDate: '2024-01-12',
    deadline: '2024-02-20',
    applicationLink: '#',
    logo: 'https://ui-avatars.com/api/?name=AP&background=10b981&color=fff',
    featured: false,
    saved: true
  },
  {
    id: '3',
    title: 'Mobile App Development Intern',
    company: 'MobileFirst Inc',
    location: 'Mumbai, India',
    type: 'Onsite',
    duration: '5 months',
    stipend: '₹22,000/month',
    description: 'Develop native mobile applications for Android and iOS platforms using modern frameworks and best practices.',
    requirements: ['Knowledge of mobile development', 'Experience with React Native or Flutter', 'Portfolio of mobile projects'],
    skills: ['React Native', 'Flutter', 'Firebase', 'UI/UX Design'],
    category: 'Mobile Development',
    postedDate: '2024-01-10',
    deadline: '2024-02-10',
    applicationLink: '#',
    logo: 'https://ui-avatars.com/api/?name=MF&background=f59e0b&color=fff',
    featured: true,
    saved: false
  },
  {
    id: '4',
    title: 'Frontend Developer Intern',
    company: 'WebCraft Studios',
    location: 'Pune, India',
    type: 'Hybrid',
    duration: '6 months',
    stipend: '₹18,000/month',
    description: 'Create beautiful and responsive user interfaces for web applications using modern frontend technologies.',
    requirements: ['HTML, CSS, JavaScript knowledge', 'Familiarity with React or Vue.js', 'Eye for design'],
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'],
    category: 'Frontend Development',
    postedDate: '2024-01-08',
    deadline: '2024-02-25',
    applicationLink: '#',
    logo: 'https://ui-avatars.com/api/?name=WC&background=8b5cf6&color=fff',
    featured: false,
    saved: false
  },
  {
    id: '5',
    title: 'DevOps Engineer Intern',
    company: 'CloudOps Technologies',
    location: 'Chennai, India',
    type: 'Remote',
    duration: '4 months',
    stipend: '₹28,000/month',
    description: 'Learn and implement DevOps practices including CI/CD, containerization, and cloud infrastructure management.',
    requirements: ['Basic Linux knowledge', 'Understanding of cloud concepts', 'Interest in automation'],
    skills: ['Docker', 'Kubernetes', 'AWS', 'Jenkins', 'Linux'],
    category: 'DevOps',
    postedDate: '2024-01-05',
    deadline: '2024-02-12',
    applicationLink: '#',
    logo: 'https://ui-avatars.com/api/?name=CO&background=ef4444&color=fff',
    featured: true,
    saved: true
  },
  {
    id: '6',
    title: 'UI/UX Design Intern',
    company: 'DesignHub Creative',
    location: 'Delhi, India',
    type: 'Onsite',
    duration: '3 months',
    stipend: '₹15,000/month',
    description: 'Design user-centered interfaces and experiences for web and mobile applications using industry-standard tools.',
    requirements: ['Portfolio of design work', 'Knowledge of Figma/Adobe XD', 'Understanding of design principles'],
    skills: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research'],
    category: 'Design',
    postedDate: '2024-01-03',
    deadline: '2024-02-18',
    applicationLink: '#',
    logo: 'https://ui-avatars.com/api/?name=DH&background=06b6d4&color=fff',
    featured: false,
    saved: false
  }
];

const categories = ['All', 'Software Development', 'Data Science', 'Mobile Development', 'Frontend Development', 'DevOps', 'Design'];
const locations = ['All Locations', 'Bangalore', 'Hyderabad', 'Mumbai', 'Pune', 'Chennai', 'Delhi'];
const types = ['All Types', 'Remote', 'Onsite', 'Hybrid'];

export default function Internships() {
  const [internships, setInternships] = useState<Internship[]>(mockInternships);
  const [filteredInternships, setFilteredInternships] = useState<Internship[]>(mockInternships);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedType, setSelectedType] = useState('All Types');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);

  // Filter internships based on search and filters
  useEffect(() => {
    let filtered = internships.filter(internship => {
      const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           internship.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || internship.category === selectedCategory;
      const matchesLocation = selectedLocation === 'All Locations' || internship.location.includes(selectedLocation);
      const matchesType = selectedType === 'All Types' || internship.type === selectedType;

      return matchesSearch && matchesCategory && matchesLocation && matchesType;
    });

    // Sort by featured first, then by posted date
    filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
    });

    setFilteredInternships(filtered);
  }, [internships, searchTerm, selectedCategory, selectedLocation, selectedType]);

  const toggleSaveInternship = (id: string) => {
    setInternships(prev => prev.map(internship => 
      internship.id === id ? { ...internship, saved: !internship.saved } : internship
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Software Development': return <Code className="w-4 h-4" />;
      case 'Data Science': return <Database className="w-4 h-4" />;
      case 'Mobile Development': return <Smartphone className="w-4 h-4" />;
      case 'Frontend Development': return <Globe className="w-4 h-4" />;
      case 'DevOps': return <Target className="w-4 h-4" />;
      case 'Design': return <Star className="w-4 h-4" />;
      default: return <Briefcase className="w-4 h-4" />;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
        {/* Header Section */}
        <div className="bg-gradient-education text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Briefcase className="w-8 h-8" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Find Your Perfect Internship
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Discover amazing internship opportunities from top companies and kickstart your career in technology.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold">{filteredInternships.length}</div>
                  <div className="text-sm text-blue-100">Live Opportunities</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-sm text-blue-100">Partner Companies</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">95%</div>
                  <div className="text-sm text-blue-100">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">₹25K</div>
                  <div className="text-sm text-blue-100">Avg. Stipend</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Search and Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    placeholder="Search internships, companies, or skills..."
                    className="pl-12 text-lg h-12"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Quick Filters */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant={showFilters ? "default" : "outline"}
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center space-x-2"
                  >
                    <Filter className="w-4 h-4" />
                    <span>Filters</span>
                  </Button>
                  
                  {categories.slice(1, 4).map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="flex items-center space-x-2"
                    >
                      {getCategoryIcon(category)}
                      <span>{category}</span>
                    </Button>
                  ))}
                </div>

                {/* Extended Filters */}
                {showFilters && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Location</label>
                      <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Work Type</label>
                      <Select value={selectedType} onValueChange={setSelectedType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {types.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {filteredInternships.length} internship{filteredInternships.length !== 1 ? 's' : ''}
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>

          {/* Internships Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {filteredInternships.map((internship) => (
              <Card key={internship.id} className={`group hover:shadow-lg transition-all duration-300 ${internship.featured ? 'ring-2 ring-primary/20' : ''}`}>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={internship.logo}
                        alt={internship.company}
                        className="w-12 h-12 rounded-lg"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                            {internship.title}
                          </CardTitle>
                          {internship.featured && (
                            <Badge variant="default" className="bg-gradient-education text-white">
                              <Star className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground font-medium">{internship.company}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleSaveInternship(internship.id)}
                      className={internship.saved ? 'text-red-500 hover:text-red-600' : 'text-muted-foreground hover:text-red-500'}
                    >
                      <Heart className={`w-5 h-5 ${internship.saved ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-muted-foreground line-clamp-2">{internship.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{internship.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">
                        {internship.type}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{internship.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium text-green-600">{internship.stipend}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {internship.skills.slice(0, 4).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {internship.skills.length > 4 && (
                      <Badge variant="secondary" className="text-xs">
                        +{internship.skills.length - 4} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Deadline: {formatDate(internship.deadline)}</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedInternship(internship)}>
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          {selectedInternship && (
                            <>
                              <DialogHeader>
                                <div className="flex items-center space-x-3 mb-4">
                                  <img
                                    src={selectedInternship.logo}
                                    alt={selectedInternship.company}
                                    className="w-12 h-12 rounded-lg"
                                  />
                                  <div>
                                    <DialogTitle className="text-xl">{selectedInternship.title}</DialogTitle>
                                    <DialogDescription className="text-lg font-medium">
                                      {selectedInternship.company}
                                    </DialogDescription>
                                  </div>
                                </div>
                              </DialogHeader>
                              
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="flex items-center space-x-2">
                                    <MapPin className="w-5 h-5 text-muted-foreground" />
                                    <span>{selectedInternship.location}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Badge variant="outline" className="px-3 py-1">
                                      {selectedInternship.type}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Clock className="w-5 h-5 text-muted-foreground" />
                                    <span>{selectedInternship.duration}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <DollarSign className="w-5 h-5 text-muted-foreground" />
                                    <span className="font-semibold text-green-600">{selectedInternship.stipend}</span>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-semibold mb-2">Description</h4>
                                  <p className="text-muted-foreground">{selectedInternship.description}</p>
                                </div>

                                <div>
                                  <h4 className="font-semibold mb-2">Requirements</h4>
                                  <ul className="space-y-1">
                                    {selectedInternship.requirements.map((req, index) => (
                                      <li key={index} className="flex items-start space-x-2">
                                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-muted-foreground">{req}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <div>
                                  <h4 className="font-semibold mb-2">Required Skills</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {selectedInternship.skills.map((skill) => (
                                      <Badge key={skill} variant="secondary">
                                        {skill}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-border">
                                  <div className="text-sm text-muted-foreground">
                                    <p>Posted: {formatDate(selectedInternship.postedDate)}</p>
                                    <p>Deadline: {formatDate(selectedInternship.deadline)}</p>
                                  </div>
                                  <Button className="bg-gradient-education text-white" asChild>
                                    <a href={selectedInternship.applicationLink} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="w-4 h-4 mr-2" />
                                      Apply Now
                                    </a>
                                  </Button>
                                </div>
                              </div>
                            </>
                          )}
                        </DialogContent>
                      </Dialog>
                      
                      <Button size="sm" className="bg-gradient-education text-white" asChild>
                        <a href={internship.applicationLink} target="_blank" rel="noopener noreferrer">
                          Apply
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredInternships.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No internships found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or filters to find more opportunities.
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setSelectedLocation('All Locations');
                    setSelectedType('All Types');
                  }}
                  variant="outline"
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Tips Section */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-6 h-6 text-primary" />
                <span>Internship Application Tips</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Build Your Skills</h4>
                  <p className="text-sm text-muted-foreground">
                    Focus on developing the technical skills mentioned in job requirements.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Create Projects</h4>
                  <p className="text-sm text-muted-foreground">
                    Build a portfolio of projects that demonstrate your abilities and passion.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Network Actively</h4>
                  <p className="text-sm text-muted-foreground">
                    Connect with professionals in your field through LinkedIn and events.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
