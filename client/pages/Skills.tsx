import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Play, 
  Clock, 
  ExternalLink, 
  Users, 
  BookOpen,
  Search,
  Filter,
  Star,
  Eye,
  Code,
  Globe,
  Wrench,
  FileText,
  Lightbulb
} from "lucide-react";

interface SkillVideo {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  views: string;
  rating: number;
  description: string;
  youtubeId: string;
  thumbnail: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
}

interface OnlineResource {
  id: string;
  name: string;
  type: 'Documentation' | 'Learning Platform' | 'Tool' | 'Practice' | 'Community';
  url: string;
  description: string;
  isFree: boolean;
  rating: number;
  tags: string[];
}

interface SkillData {
  videos: {
    [language: string]: SkillVideo[];
  };
  resources: OnlineResource[];
}

const skillsData: Record<string, SkillData> = {
  "Java": {
    videos: {
      "English": [
        {
          id: "java-en-1",
          title: "Java Full Course for Beginners",
          instructor: "Bro Code",
          duration: "12:03:19",
          views: "2.8M",
          rating: 4.9,
          description: "Complete Java programming course covering basics to advanced concepts with hands-on projects.",
          youtubeId: "xk4_1vDrzzo",
          thumbnail: "https://img.youtube.com/vi/xk4_1vDrzzo/maxresdefault.jpg",
          difficulty: "Beginner",
          tags: ["OOP", "Data Structures", "Projects"]
        },
        {
          id: "java-en-2",
          title: "Java 8 Features and Lambda Expressions",
          instructor: "Java Brains",
          duration: "1:45:30",
          views: "456K",
          rating: 4.7,
          description: "Advanced Java 8 features including lambda expressions, streams, and functional programming.",
          youtubeId: "gpIUfj3KaOc",
          thumbnail: "https://img.youtube.com/vi/gpIUfj3KaOc/maxresdefault.jpg",
          difficulty: "Advanced",
          tags: ["Lambda", "Streams", "Functional Programming"]
        }
      ],
      "Hindi": [
        {
          id: "java-hi-1",
          title: "जावा प्रोग्रामिंग फुल कोर्स हिंदी में",
          instructor: "CodeWithHarry",
          duration: "8:15:42",
          views: "1.2M",
          rating: 4.8,
          description: "जावा प्रोग्रामिंग की पूरी जानकारी हिंदी में - basics से advanced तक।",
          youtubeId: "ntLJmHOJ0ME",
          thumbnail: "https://img.youtube.com/vi/ntLJmHOJ0ME/maxresdefault.jpg",
          difficulty: "Beginner",
          tags: ["हिंदी", "Basic to Advanced", "Projects"]
        },
        {
          id: "java-hi-2",
          title: "जावा OOP कॉन्सेप्ट्स हिंदी में",
          instructor: "Geeky Shows",
          duration: "2:30:15",
          views: "567K",
          rating: 4.6,
          description: "ऑब्जेक्ट ओरिएंटेड प्रोग्रामिंग की सभी concepts हिंदी में detailed explanation के साथ।",
          youtubeId: "BSVKUk58K6U",
          thumbnail: "https://img.youtube.com/vi/BSVKUk58K6U/maxresdefault.jpg",
          difficulty: "Intermediate",
          tags: ["OOP", "हिंदी", "Advanced"]
        }
      ],
      "Telugu": [
        {
          id: "java-te-1",
          title: "జావా ప్రోగ్రామింగ్ తెలుగులో",
          instructor: "Telugu Tech Guru",
          duration: "6:45:30",
          views: "234K",
          rating: 4.5,
          description: "జావా ప్రోగ్రామింగ్ యొక్క పూర్తి కోర్స్ తెలుగులో - ప్రాథమిక నుండి అధునాతన వరకు.",
          youtubeId: "eIrMbAQSU34",
          thumbnail: "https://img.youtube.com/vi/eIrMbAQSU34/maxresdefault.jpg",
          difficulty: "Beginner",
          tags: ["తెలుగు", "Basic", "OOP"]
        }
      ]
    },
    resources: [
      {
        id: "java-res-1",
        name: "Oracle Java Documentation",
        type: "Documentation",
        url: "https://docs.oracle.com/javase/",
        description: "Official Java documentation with comprehensive API references and tutorials.",
        isFree: true,
        rating: 4.9,
        tags: ["Official", "API", "Reference"]
      },
      {
        id: "java-res-2",
        name: "LeetCode Java Problems",
        type: "Practice",
        url: "https://leetcode.com/problemset/all/?search=java",
        description: "Practice Java programming with coding challenges and interview questions.",
        isFree: false,
        rating: 4.8,
        tags: ["Practice", "Interview", "Algorithms"]
      },
      {
        id: "java-res-3",
        name: "Spring Framework",
        type: "Tool",
        url: "https://spring.io/",
        description: "Popular Java framework for building enterprise applications.",
        isFree: true,
        rating: 4.7,
        tags: ["Framework", "Enterprise", "Web Development"]
      },
      {
        id: "java-res-4",
        name: "IntelliJ IDEA Community",
        type: "Tool",
        url: "https://www.jetbrains.com/idea/",
        description: "Powerful IDE for Java development with intelligent code assistance.",
        isFree: true,
        rating: 4.8,
        tags: ["IDE", "Development", "Tools"]
      }
    ]
  },
  "Python": {
    videos: {
      "English": [
        {
          id: "python-en-1",
          title: "Python Full Course - Learn Python in 12 Hours",
          instructor: "Programming with Mosh",
          duration: "6:14:07",
          views: "15.2M",
          rating: 4.9,
          description: "Complete Python programming course for beginners covering syntax, data structures, and projects.",
          youtubeId: "_uQrJ0TkZlc",
          thumbnail: "https://img.youtube.com/vi/_uQrJ0TkZlc/maxresdefault.jpg",
          difficulty: "Beginner",
          tags: ["Complete Course", "Projects", "Data Structures"]
        },
        {
          id: "python-en-2",
          title: "Django Full Course for Beginners",
          instructor: "freeCodeCamp",
          duration: "4:20:50",
          views: "3.1M",
          rating: 4.8,
          description: "Learn Django web framework for Python to build full-stack web applications.",
          youtubeId: "F5mRW0jo-U4",
          thumbnail: "https://img.youtube.com/vi/F5mRW0jo-U4/maxresdefault.jpg",
          difficulty: "Intermediate",
          tags: ["Django", "Web Development", "Full Stack"]
        }
      ],
      "Hindi": [
        {
          id: "python-hi-1",
          title: "पायथन प्रोग्रा��िंग फुल कोर्स हिंदी में",
          instructor: "CodeWithHarry",
          duration: "13:56:22",
          views: "3.8M",
          rating: 4.8,
          description: "पायथन प्रोग्रामिंग की complete tutorial हिंदी में - basic से advanced concepts तक।",
          youtubeId: "7wnove7K-ZQ",
          thumbnail: "https://img.youtube.com/vi/7wnove7K-ZQ/maxresdefault.jpg",
          difficulty: "Beginner",
          tags: ["हिंदी", "Complete", "Projects"]
        },
        {
          id: "python-hi-2",
          title: "Python Django Web Development हिंदी में",
          instructor: "Technical Suneja",
          duration: "5:45:30",
          views: "890K",
          rating: 4.6,
          description: "Django framework के साथ web development सीखें हिंदी में complete project के साथ।",
          youtubeId: "OTmQOjsl0eg",
          thumbnail: "https://img.youtube.com/vi/OTmQOjsl0eg/maxresdefault.jpg",
          difficulty: "Intermediate",
          tags: ["Django", "Web Development", "हिंदी"]
        }
      ],
      "Telugu": [
        {
          id: "python-te-1",
          title: "పైథన్ ప్రోగ్రామింగ్ తెలుగులో",
          instructor: "Telugu Programming",
          duration: "8:30:15",
          views: "445K",
          rating: 4.5,
          description: "పైథన్ ప్రోగ్రామింగ్ పూర్తి కోర్స్ తెలుగులో - basic నుండి advanced వరకు.",
          youtubeId: "QXeEoD0pB3E",
          thumbnail: "https://img.youtube.com/vi/QXeEoD0pB3E/maxresdefault.jpg",
          difficulty: "Beginner",
          tags: ["తెలుగు", "Complete Course", "Basic to Advanced"]
        }
      ]
    },
    resources: [
      {
        id: "python-res-1",
        name: "Python.org Documentation",
        type: "Documentation",
        url: "https://docs.python.org/",
        description: "Official Python documentation with tutorials, library reference, and language reference.",
        isFree: true,
        rating: 4.9,
        tags: ["Official", "Documentation", "Reference"]
      },
      {
        id: "python-res-2",
        name: "PyPI - Python Package Index",
        type: "Tool",
        url: "https://pypi.org/",
        description: "Repository of Python packages and libraries for various applications.",
        isFree: true,
        rating: 4.8,
        tags: ["Packages", "Libraries", "Repository"]
      },
      {
        id: "python-res-3",
        name: "Jupyter Notebook",
        type: "Tool",
        url: "https://jupyter.org/",
        description: "Interactive development environment for Python, perfect for data science and analysis.",
        isFree: true,
        rating: 4.7,
        tags: ["IDE", "Data Science", "Interactive"]
      },
      {
        id: "python-res-4",
        name: "Real Python",
        type: "Learning Platform",
        url: "https://realpython.com/",
        description: "High-quality Python tutorials and articles for all skill levels.",
        isFree: false,
        rating: 4.8,
        tags: ["Tutorials", "Articles", "Learning"]
      }
    ]
  },
  "JavaScript": {
    videos: {
      "English": [
        {
          id: "js-en-1",
          title: "JavaScript Full Course for Beginners",
          instructor: "freeCodeCamp",
          duration: "3:26:42",
          views: "4.2M",
          rating: 4.9,
          description: "Complete JavaScript course covering ES6+, DOM manipulation, and modern JavaScript features.",
          youtubeId: "PkZNo7MFNFg",
          thumbnail: "https://img.youtube.com/vi/PkZNo7MFNFg/maxresdefault.jpg",
          difficulty: "Beginner",
          tags: ["ES6", "DOM", "Modern JS"]
        },
        {
          id: "js-en-2",
          title: "React JS Full Course 2024",
          instructor: "Dave Gray",
          duration: "9:12:30",
          views: "1.8M",
          rating: 4.8,
          description: "Master React.js with hooks, context, and modern React patterns for building web applications.",
          youtubeId: "RVFAyFWO4go",
          thumbnail: "https://img.youtube.com/vi/RVFAyFWO4go/maxresdefault.jpg",
          difficulty: "Intermediate",
          tags: ["React", "Hooks", "Components"]
        }
      ],
      "Hindi": [
        {
          id: "js-hi-1",
          title: "JavaScript फुल कोर्स हिंदी में",
          instructor: "Thapa Technical",
          duration: "12:01:25",
          views: "2.1M",
          rating: 4.7,
          description: "JavaScript की complete tutorial हिंदी में - basic से advanced concepts और projects के साथ।",
          youtubeId: "chx9Rs41W6g",
          thumbnail: "https://img.youtube.com/vi/chx9Rs41W6g/maxresdefault.jpg",
          difficulty: "Beginner",
          tags: ["ह���ंदी", "Complete", "Projects"]
        },
        {
          id: "js-hi-2",
          title: "React JS हिंदी में सीखें",
          instructor: "Code Step by Step",
          duration: "8:45:15",
          views: "756K",
          rating: 4.6,
          description: "React.js framework सीखें हिंदी में complete practical projects के साथ।",
          youtubeId: "tiLWCNFzThE",
          thumbnail: "https://img.youtube.com/vi/tiLWCNFzThE/maxresdefault.jpg",
          difficulty: "Intermediate",
          tags: ["React", "हिंदी", "Projects"]
        }
      ],
      "Telugu": [
        {
          id: "js-te-1",
          title: "జావాస్క్రిప్ట్ తెలుగులో",
          instructor: "Telugu Coder",
          duration: "7:30:45",
          views: "312K",
          rating: 4.4,
          description: "జావాస్క్రిప్ట్ ప్రోగ్రామింగ్ తెలుగులో - ప్రాథమిక నుండి అధునాతన వరకు.",
          youtubeId: "W6NZfCO5SIk",
          thumbnail: "https://img.youtube.com/vi/W6NZfCO5SIk/maxresdefault.jpg",
          difficulty: "Beginner",
          tags: ["తెలుగు", "Web Development", "DOM"]
        }
      ]
    },
    resources: [
      {
        id: "js-res-1",
        name: "MDN Web Docs",
        type: "Documentation",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        description: "Comprehensive JavaScript documentation and tutorials by Mozilla.",
        isFree: true,
        rating: 4.9,
        tags: ["Documentation", "Reference", "Tutorials"]
      },
      {
        id: "js-res-2",
        name: "JavaScript.info",
        type: "Learning Platform",
        url: "https://javascript.info/",
        description: "Modern JavaScript tutorial with detailed explanations and examples.",
        isFree: true,
        rating: 4.8,
        tags: ["Tutorial", "Modern JS", "Examples"]
      },
      {
        id: "js-res-3",
        name: "Node.js",
        type: "Tool",
        url: "https://nodejs.org/",
        description: "JavaScript runtime for server-side development and building scalable applications.",
        isFree: true,
        rating: 4.7,
        tags: ["Runtime", "Server-side", "Backend"]
      },
      {
        id: "js-res-4",
        name: "CodePen",
        type: "Practice",
        url: "https://codepen.io/",
        description: "Online code editor for front-end development with HTML, CSS, and JavaScript.",
        isFree: true,
        rating: 4.6,
        tags: ["Editor", "Practice", "Frontend"]
      }
    ]
  },
  "HTML & CSS": {
    videos: {
      "English": [
        {
          id: "html-en-1",
          title: "HTML & CSS Full Course - Build a Website Tutorial",
          instructor: "freeCodeCamp",
          duration: "11:07:45",
          views: "5.8M",
          rating: 4.9,
          description: "Complete HTML and CSS course for building responsive websites from scratch.",
          youtubeId: "mU6anWqZJcc",
          thumbnail: "https://img.youtube.com/vi/mU6anWqZJcc/maxresdefault.jpg",
          difficulty: "Beginner",
          tags: ["Responsive", "Website", "Complete"]
        },
        {
          id: "html-en-2",
          title: "CSS Grid & Flexbox Course",
          instructor: "Traversy Media",
          duration: "2:15:30",
          views: "1.2M",
          rating: 4.8,
          description: "Master CSS Grid and Flexbox for modern web layouts and responsive design.",
          youtubeId: "jV8B24rSN5o",
          thumbnail: "https://img.youtube.com/vi/jV8B24rSN5o/maxresdefault.jpg",
          difficulty: "Intermediate",
          tags: ["Grid", "Flexbox", "Layouts"]
        }
      ],
      "Hindi": [
        {
          id: "html-hi-1",
          title: "HTML CSS पूरा कोर्स हिंदी में",
          instructor: "CodeWithHarry",
          duration: "6:12:25",
          views: "2.3M",
          rating: 4.8,
          description: "HTML और CSS की complete tutorial हिंदी में - website बनाना सीखें।",
          youtubeId: "BsDoLVMnmZs",
          thumbnail: "https://img.youtube.com/vi/BsDoLVMnmZs/maxresdefault.jpg",
          difficulty: "Beginner",
          tags: ["हिंदी", "Website", "Complete"]
        }
      ],
      "Telugu": [
        {
          id: "html-te-1",
          title: "HTML CSS తెలుగులో",
          instructor: "Telugu Web Dev",
          duration: "4:45:20",
          views: "189K",
          rating: 4.5,
          description: "HTML మరియు CSS తెలుగులో - వెబ్‌సైట్ డిజైన్ మరియు డెవలప్‌మెంట్.",
          youtubeId: "80nxoeJwyqA",
          thumbnail: "https://img.youtube.com/vi/80nxoeJwyqA/maxresdefault.jpg",
          difficulty: "Beginner",
          tags: ["తెలుగు", "Website", "Design"]
        }
      ]
    },
    resources: [
      {
        id: "html-res-1",
        name: "W3Schools",
        type: "Learning Platform",
        url: "https://www.w3schools.com/",
        description: "Comprehensive web development tutorials with interactive examples and exercises.",
        isFree: true,
        rating: 4.7,
        tags: ["Tutorials", "Interactive", "Reference"]
      },
      {
        id: "html-res-2",
        name: "CSS-Tricks",
        type: "Learning Platform",
        url: "https://css-tricks.com/",
        description: "Advanced CSS techniques, tips, and tricks for modern web development.",
        isFree: true,
        rating: 4.8,
        tags: ["CSS", "Tips", "Advanced"]
      },
      {
        id: "html-res-3",
        name: "Bootstrap",
        type: "Tool",
        url: "https://getbootstrap.com/",
        description: "Popular CSS framework for building responsive and mobile-first websites.",
        isFree: true,
        rating: 4.6,
        tags: ["Framework", "Responsive", "CSS"]
      },
      {
        id: "html-res-4",
        name: "Can I Use",
        type: "Tool",
        url: "https://caniuse.com/",
        description: "Browser support tables for HTML5, CSS3, and other web technologies.",
        isFree: true,
        rating: 4.7,
        tags: ["Browser Support", "Compatibility", "Reference"]
      }
    ]
  }
};

const allSkills = Object.keys(skillsData);
const languages = ["English", "Hindi", "Telugu"];

export default function Skills() {
  const [selectedSkill, setSelectedSkill] = useState("Java");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("videos");

  const currentVideos = skillsData[selectedSkill]?.videos[selectedLanguage] || [];
  const currentResources = skillsData[selectedSkill]?.resources || [];
  
  const filteredVideos = currentVideos.filter(video => 
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredResources = currentResources.filter(resource =>
    resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalVideos = Object.values(skillsData).reduce((total, skill) => 
    total + Object.values(skill.videos).reduce((subTotal, langVideos) => subTotal + langVideos.length, 0), 0
  );

  const totalResources = Object.values(skillsData).reduce((total, skill) => 
    total + skill.resources.length, 0
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Documentation': return 'bg-blue-100 text-blue-800';
      case 'Learning Platform': return 'bg-purple-100 text-purple-800';
      case 'Tool': return 'bg-green-100 text-green-800';
      case 'Practice': return 'bg-orange-100 text-orange-800';
      case 'Community': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleVideoClick = (youtubeId: string) => {
    window.open(`https://www.youtube.com/watch?v=${youtubeId}`, '_blank');
  };

  const handleResourceClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-education rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Skill Development</h1>
              <p className="text-muted-foreground">Master programming skills with curated videos and resources</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">{allSkills.length}</p>
                    <p className="text-sm text-muted-foreground">Skills</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Play className="w-8 h-8 text-education-green" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">{totalVideos}</p>
                    <p className="text-sm text-muted-foreground">Video Tutorials</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Wrench className="w-8 h-8 text-education-orange" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">{totalResources}</p>
                    <p className="text-sm text-muted-foreground">Online Resources</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Globe className="w-8 h-8 text-education-purple" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">3</p>
                    <p className="text-sm text-muted-foreground">Languages</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="w-5 h-5" />
                  <span>Filters</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search videos, resources..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Skill Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Skill</label>
                  <div className="space-y-2">
                    {allSkills.map((skill) => (
                      <button
                        key={skill}
                        onClick={() => setSelectedSkill(skill)}
                        className={`w-full text-left p-2 rounded-md text-sm transition-colors ${
                          selectedSkill === skill
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted'
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Content Type</label>
                  <div className="space-y-2">
                    <button
                      onClick={() => setActiveTab("videos")}
                      className={`w-full text-left p-2 rounded-md text-sm transition-colors ${
                        activeTab === "videos"
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      Video Tutorials
                    </button>
                    <button
                      onClick={() => setActiveTab("resources")}
                      className={`w-full text-left p-2 rounded-md text-sm transition-colors ${
                        activeTab === "resources"
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      Online Tools & Resources
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="videos">Video Tutorials</TabsTrigger>
                  <TabsTrigger value="resources">Online Tools & Resources</TabsTrigger>
                </TabsList>

                {/* Video Tutorials Tab */}
                <TabsContent value="videos" className="space-y-6">
                  {/* Language Selection */}
                  <Tabs value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="English">English</TabsTrigger>
                      <TabsTrigger value="Hindi">हिंदी</TabsTrigger>
                      <TabsTrigger value="Telugu">తెలుగు</TabsTrigger>
                    </TabsList>

                    {/* Results Header */}
                    <div className="flex items-center justify-between mt-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {filteredVideos.length} Videos Found
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {selectedSkill} tutorials in {selectedLanguage}
                        </p>
                      </div>
                    </div>

                    {/* Video Grid */}
                    {languages.map((language) => (
                      <TabsContent key={language} value={language} className="mt-6">
                        {filteredVideos.length === 0 ? (
                          <Card>
                            <CardContent className="py-12 text-center">
                              <Play className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                              <h3 className="text-lg font-medium text-foreground mb-2">No videos found</h3>
                              <p className="text-muted-foreground">
                                Try selecting a different skill or language.
                              </p>
                            </CardContent>
                          </Card>
                        ) : (
                          <div className="grid gap-6">
                            {filteredVideos.map((video) => (
                              <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                                  {/* Video Thumbnail */}
                                  <div className="relative aspect-video md:aspect-auto">
                                    <img
                                      src={video.thumbnail}
                                      alt={video.title}
                                      className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                      <Button
                                        onClick={() => handleVideoClick(video.youtubeId)}
                                        size="lg"
                                        className="bg-red-600 hover:bg-red-700 text-white rounded-full"
                                      >
                                        <Play className="w-6 h-6" />
                                      </Button>
                                    </div>
                                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                                      {video.duration}
                                    </div>
                                  </div>

                                  {/* Video Info */}
                                  <div className="md:col-span-2 p-6">
                                    <div className="space-y-3">
                                      <div>
                                        <h3 className="text-xl font-semibold text-foreground line-clamp-2 mb-2">
                                          {video.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mb-1">
                                          by {video.instructor}
                                        </p>
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                          {video.description}
                                        </p>
                                      </div>

                                      <div className="flex flex-wrap gap-2">
                                        {video.tags.map((tag, index) => (
                                          <Badge key={index} variant="secondary" className="text-xs">
                                            {tag}
                                          </Badge>
                                        ))}
                                        <Badge className={`text-xs ${getDifficultyColor(video.difficulty)}`}>
                                          {video.difficulty}
                                        </Badge>
                                      </div>

                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                          <div className="flex items-center space-x-1">
                                            <Eye className="w-4 h-4" />
                                            <span>{video.views} views</span>
                                          </div>
                                          <div className="flex items-center space-x-1">
                                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                            <span>{video.rating}</span>
                                          </div>
                                          <div className="flex items-center space-x-1">
                                            <Clock className="w-4 h-4" />
                                            <span>{video.duration}</span>
                                          </div>
                                        </div>

                                        <Button
                                          onClick={() => handleVideoClick(video.youtubeId)}
                                          className="bg-red-600 hover:bg-red-700 text-white"
                                        >
                                          <Play className="w-4 h-4 mr-2" />
                                          Watch Now
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Card>
                            ))}
                          </div>
                        )}
                      </TabsContent>
                    ))}
                  </Tabs>
                </TabsContent>

                {/* Online Tools & Resources Tab */}
                <TabsContent value="resources" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        Online Tools & Resources
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Essential tools, documentation, and learning platforms for {selectedSkill}
                      </p>
                    </div>
                  </div>

                  {filteredResources.length === 0 ? (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <Wrench className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-foreground mb-2">No resources found</h3>
                        <p className="text-muted-foreground">
                          Try selecting a different skill or search term.
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid gap-4">
                      {filteredResources.map((resource) => (
                        <Card key={resource.id} className="hover:shadow-lg transition-all duration-300">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex-1 space-y-3">
                                <div>
                                  <div className="flex items-center space-x-3 mb-2">
                                    <h3 className="text-lg font-semibold text-foreground">
                                      {resource.name}
                                    </h3>
                                    <Badge className={`text-xs ${getTypeColor(resource.type)}`}>
                                      {resource.type}
                                    </Badge>
                                    {resource.isFree && (
                                      <Badge className="text-xs bg-green-100 text-green-800">
                                        Free
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground line-clamp-2">
                                    {resource.description}
                                  </p>
                                </div>

                                <div className="flex items-center justify-between">
                                  <div className="flex flex-wrap gap-2">
                                    {resource.tags.map((tag, index) => (
                                      <Badge key={index} variant="outline" className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                  
                                  <div className="flex items-center space-x-3">
                                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                      <span>{resource.rating}</span>
                                    </div>
                                    <Button
                                      onClick={() => handleResourceClick(resource.url)}
                                      variant="outline"
                                      size="sm"
                                    >
                                      <ExternalLink className="w-4 h-4 mr-2" />
                                      Visit
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
