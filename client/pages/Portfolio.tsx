import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  FileText, 
  Download, 
  Eye, 
  Star, 
  Briefcase,
  User,
  Code,
  Palette,
  Layout as LayoutIcon,
  Award,
  TrendingUp,
  Target,
  Zap,
  CheckCircle,
  ExternalLink,
  Heart,
  Filter,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Template {
  id: string;
  name: string;
  category: 'Portfolio' | 'Resume';
  type: 'Modern' | 'Classic' | 'Creative' | 'Minimalist' | 'Professional';
  description: string;
  thumbnail: string;
  previewUrl: string;
  downloadUrl: string;
  featured: boolean;
  downloads: number;
  rating: number;
  tags: string[];
  forField: string[];
  complexity: 'Beginner' | 'Intermediate' | 'Advanced';
}

// Mock data for templates
const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'Software Developer Portfolio',
    category: 'Portfolio',
    type: 'Modern',
    description: 'A sleek and modern portfolio template perfect for software developers. Features project showcases, skills sections, and responsive design.',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    previewUrl: '#',
    downloadUrl: '#',
    featured: true,
    downloads: 1250,
    rating: 4.8,
    tags: ['React', 'Responsive', 'Dark Mode', 'Projects'],
    forField: ['Software Development', 'Web Development'],
    complexity: 'Intermediate'
  },
  {
    id: '2',
    name: 'Professional Resume Template',
    category: 'Resume',
    type: 'Professional',
    description: 'Clean and professional resume template suitable for all engineering fields. ATS-friendly design with multiple color schemes.',
    thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop',
    previewUrl: '#',
    downloadUrl: '#',
    featured: true,
    downloads: 2100,
    rating: 4.9,
    tags: ['ATS Friendly', 'PDF', 'Word', 'Multiple Colors'],
    forField: ['All Fields'],
    complexity: 'Beginner'
  },
  {
    id: '3',
    name: 'Creative Designer Portfolio',
    category: 'Portfolio',
    type: 'Creative',
    description: 'Vibrant and creative portfolio template for designers and creative professionals. Includes gallery sections and interactive elements.',
    thumbnail: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=300&fit=crop',
    previewUrl: '#',
    downloadUrl: '#',
    featured: false,
    downloads: 890,
    rating: 4.7,
    tags: ['Creative', 'Gallery', 'Animation', 'Colorful'],
    forField: ['UI/UX Design', 'Graphic Design'],
    complexity: 'Advanced'
  },
  {
    id: '4',
    name: 'Minimalist Resume',
    category: 'Resume',
    type: 'Minimalist',
    description: 'Simple and elegant resume template focusing on content. Perfect for those who prefer a clean, distraction-free design.',
    thumbnail: 'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=400&h=300&fit=crop',
    previewUrl: '#',
    downloadUrl: '#',
    featured: false,
    downloads: 1680,
    rating: 4.6,
    tags: ['Simple', 'Clean', 'Typography', 'PDF'],
    forField: ['Engineering', 'Research'],
    complexity: 'Beginner'
  },
  {
    id: '5',
    name: 'Data Scientist Portfolio',
    category: 'Portfolio',
    type: 'Professional',
    description: 'Data-focused portfolio template with project analytics, visualization sections, and GitHub integration.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    previewUrl: '#',
    downloadUrl: '#',
    featured: true,
    downloads: 750,
    rating: 4.8,
    tags: ['Data Viz', 'Analytics', 'Python', 'GitHub'],
    forField: ['Data Science', 'Machine Learning'],
    complexity: 'Intermediate'
  },
  {
    id: '6',
    name: 'Classic Engineer Resume',
    category: 'Resume',
    type: 'Classic',
    description: 'Traditional resume template with a professional layout. Ideal for engineering positions and corporate applications.',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
    previewUrl: '#',
    downloadUrl: '#',
    featured: false,
    downloads: 1420,
    rating: 4.5,
    tags: ['Traditional', 'Corporate', 'Professional', 'Engineering'],
    forField: ['Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering'],
    complexity: 'Beginner'
  },
  {
    id: '7',
    name: 'Mobile App Developer Portfolio',
    category: 'Portfolio',
    type: 'Modern',
    description: 'Mobile-first portfolio template showcasing app projects with interactive demos and download links.',
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
    previewUrl: '#',
    downloadUrl: '#',
    featured: false,
    downloads: 620,
    rating: 4.7,
    tags: ['Mobile', 'Apps', 'Interactive', 'Demos'],
    forField: ['Mobile Development', 'App Development'],
    complexity: 'Intermediate'
  },
  {
    id: '8',
    name: 'Creative Resume Template',
    category: 'Resume',
    type: 'Creative',
    description: 'Modern creative resume with unique layout and design elements. Perfect for creative and tech fields.',
    thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
    previewUrl: '#',
    downloadUrl: '#',
    featured: false,
    downloads: 950,
    rating: 4.4,
    tags: ['Creative', 'Modern', 'Unique', 'Design'],
    forField: ['Design', 'Creative Technology'],
    complexity: 'Advanced'
  }
];

const categories = ['All', 'Portfolio', 'Resume'];
const types = ['All Types', 'Modern', 'Classic', 'Creative', 'Minimalist', 'Professional'];
const fields = ['All Fields', 'Software Development', 'Web Development', 'Data Science', 'UI/UX Design', 'Mobile Development'];
const complexities = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

export default function Portfolio() {
  const [templates, setTemplates] = useState<Template[]>(mockTemplates);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>(mockTemplates);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedField, setSelectedField] = useState('All Fields');
  const [selectedComplexity, setSelectedComplexity] = useState('All Levels');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Filter templates
  React.useEffect(() => {
    let filtered = templates.filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
      const matchesType = selectedType === 'All Types' || template.type === selectedType;
      const matchesField = selectedField === 'All Fields' || template.forField.includes(selectedField) || template.forField.includes('All Fields');
      const matchesComplexity = selectedComplexity === 'All Levels' || template.complexity === selectedComplexity;

      return matchesSearch && matchesCategory && matchesType && matchesField && matchesComplexity;
    });

    // Sort by featured first, then by downloads
    filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.downloads - a.downloads;
    });

    setFilteredTemplates(filtered);
  }, [templates, searchTerm, selectedCategory, selectedType, selectedField, selectedComplexity]);

  const toggleFavorite = (templateId: string) => {
    setFavorites(prev => 
      prev.includes(templateId) 
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    );
  };

  const getCategoryIcon = (category: Template['category']) => {
    return category === 'Portfolio' ? <Briefcase className="w-4 h-4" /> : <FileText className="w-4 h-4" />;
  };

  const getComplexityColor = (complexity: Template['complexity']) => {
    switch (complexity) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
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
                Portfolio & Resume Templates
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Professional templates to showcase your skills and land your dream job. Choose from modern portfolios and ATS-friendly resumes.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold">{filteredTemplates.length}</div>
                  <div className="text-sm text-blue-100">Templates</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">10K+</div>
                  <div className="text-sm text-blue-100">Downloads</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">4.7</div>
                  <div className="text-sm text-blue-100">Avg Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">Free</div>
                  <div className="text-sm text-blue-100">All Templates</div>
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
                    placeholder="Search templates by name, tags, or field..."
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
                  
                  {categories.slice(1).map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="flex items-center space-x-2"
                    >
                      {getCategoryIcon(category as Template['category'])}
                      <span>{category}</span>
                    </Button>
                  ))}
                </div>

                {/* Extended Filters */}
                {showFilters && (
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-border">
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
                      <label className="text-sm font-medium text-foreground mb-2 block">Type</label>
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
                    
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Field</label>
                      <Select value={selectedField} onValueChange={setSelectedField}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fields.map((field) => (
                            <SelectItem key={field} value={field}>
                              {field}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Complexity</label>
                      <Select value={selectedComplexity} onValueChange={setSelectedComplexity}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {complexities.map((complexity) => (
                            <SelectItem key={complexity} value={complexity}>
                              {complexity}
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
              Showing {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''}
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className={`group hover:shadow-lg transition-all duration-300 ${template.featured ? 'ring-2 ring-primary/20' : ''}`}>
                <div className="relative">
                  <img
                    src={template.thumbnail}
                    alt={template.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg flex items-center justify-center space-x-2">
                    <Button size="sm" variant="secondary" asChild>
                      <a href={template.previewUrl} target="_blank" rel="noopener noreferrer">
                        <Eye className="w-4 h-4 mr-1" />
                        Preview
                      </a>
                    </Button>
                    <Button size="sm" variant="secondary" asChild>
                      <a href={template.downloadUrl} download>
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </a>
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                    onClick={() => toggleFavorite(template.id)}
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(template.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                  </Button>
                  {template.featured && (
                    <Badge className="absolute top-2 left-2 bg-gradient-education text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                        {template.name}
                      </CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="flex items-center space-x-1">
                          {getCategoryIcon(template.category)}
                          <span>{template.category}</span>
                        </Badge>
                        <Badge variant="secondary">{template.type}</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <p className="text-muted-foreground text-sm line-clamp-2">{template.description}</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{template.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Download className="w-4 h-4" />
                      <span>{template.downloads.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge className={getComplexityColor(template.complexity)}>
                      {template.complexity}
                    </Badge>
                    <div className="text-xs text-muted-foreground">
                      {template.forField.join(', ')}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {template.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {template.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{template.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                      <a href={template.previewUrl} target="_blank" rel="noopener noreferrer">
                        <Eye className="w-4 h-4 mr-1" />
                        Preview
                      </a>
                    </Button>
                    <Button size="sm" className="flex-1 bg-gradient-education text-white" asChild>
                      <a href={template.downloadUrl} download>
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredTemplates.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No templates found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or filters to find more templates.
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setSelectedType('All Types');
                    setSelectedField('All Fields');
                    setSelectedComplexity('All Levels');
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
                <Zap className="w-6 h-6 text-primary" />
                <span>Template Usage Tips</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Customize Content</h4>
                  <p className="text-sm text-muted-foreground">
                    Replace placeholder content with your own projects, skills, and experiences.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Palette className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Match Your Brand</h4>
                  <p className="text-sm text-muted-foreground">
                    Adjust colors, fonts, and styling to match your personal brand and preferences.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Tailor for Jobs</h4>
                  <p className="text-sm text-muted-foreground">
                    Modify templates to highlight skills and experiences relevant to specific job applications.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resource Links */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-6 h-6 text-primary" />
                <span>Additional Resources</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold">Portfolio Building</h4>
                  <div className="space-y-2">
                    <a href="#" className="flex items-center space-x-2 text-sm text-primary hover:underline">
                      <ExternalLink className="w-4 h-4" />
                      <span>Portfolio Best Practices Guide</span>
                    </a>
                    <a href="#" className="flex items-center space-x-2 text-sm text-primary hover:underline">
                      <ExternalLink className="w-4 h-4" />
                      <span>Showcasing Your Projects Effectively</span>
                    </a>
                    <a href="#" className="flex items-center space-x-2 text-sm text-primary hover:underline">
                      <ExternalLink className="w-4 h-4" />
                      <span>Portfolio Examples by Field</span>
                    </a>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold">Resume Writing</h4>
                  <div className="space-y-2">
                    <a href="#" className="flex items-center space-x-2 text-sm text-primary hover:underline">
                      <ExternalLink className="w-4 h-4" />
                      <span>ATS-Friendly Resume Tips</span>
                    </a>
                    <a href="#" className="flex items-center space-x-2 text-sm text-primary hover:underline">
                      <ExternalLink className="w-4 h-4" />
                      <span>Engineering Resume Templates</span>
                    </a>
                    <a href="#" className="flex items-center space-x-2 text-sm text-primary hover:underline">
                      <ExternalLink className="w-4 h-4" />
                      <span>Technical Skills Section Guide</span>
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
