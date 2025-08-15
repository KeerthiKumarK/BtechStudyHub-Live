import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Video, 
  Play, 
  Clock, 
  Users, 
  TrendingUp, 
  BookOpen,
  Search,
  Filter,
  Star,
  Eye,
  ChevronRight
} from "lucide-react";

interface VideoData {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  views: string;
  rating: number;
  description: string;
  youtubeId: string;
  thumbnail: string;
  topic: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
}

interface SubjectVideos {
  [language: string]: VideoData[];
}

const videosData: Record<string, SubjectVideos> = {
  "Mathematics": {
    "English": [
      {
        id: "math-en-1",
        title: "Calculus: Limits and Derivatives",
        instructor: "Prof. Gilbert Strang",
        duration: "45:30",
        views: "125K",
        rating: 4.8,
        description: "Comprehensive introduction to calculus covering limits, continuity, and derivatives with practical applications.",
        youtubeId: "WUvTyaaNkzM",
        thumbnail: "https://img.youtube.com/vi/WUvTyaaNkzM/maxresdefault.jpg",
        topic: "Calculus",
        difficulty: "Beginner",
        tags: ["Limits", "Derivatives", "Continuity"]
      },
      {
        id: "math-en-2",
        title: "Linear Algebra: Matrix Operations",
        instructor: "Dr. Khan Academy",
        duration: "38:15",
        views: "89K",
        rating: 4.6,
        description: "Understanding matrix operations, determinants, and eigenvalues for engineering applications.",
        youtubeId: "kYB8IZa5AuE",
        thumbnail: "https://img.youtube.com/vi/kYB8IZa5AuE/maxresdefault.jpg",
        topic: "Linear Algebra",
        difficulty: "Intermediate",
        tags: ["Matrices", "Determinants", "Eigenvalues"]
      },
      {
        id: "math-en-3",
        title: "Differential Equations for Engineers",
        instructor: "MIT OpenCourseWare",
        duration: "52:45",
        views: "156K",
        rating: 4.9,
        description: "Solving ordinary differential equations with engineering applications and real-world examples.",
        youtubeId: "p_di4Zn4wz4",
        thumbnail: "https://img.youtube.com/vi/p_di4Zn4wz4/maxresdefault.jpg",
        topic: "Differential Equations",
        difficulty: "Advanced",
        tags: ["ODEs", "Engineering Applications", "Solutions"]
      }
    ],
    "Hindi": [
      {
        id: "math-hi-1",
        title: "कैलकुलस: सीमा और अवकलज (Calculus: Limits and Derivatives)",
        instructor: "गणित गुरु (Math Guru)",
        duration: "42:20",
        views: "78K",
        rating: 4.5,
        description: "हिंदी में कैलकुलस की मूल बातें, सीमा और अवकलज की व्याख्या उदाहरणों के साथ।",
        youtubeId: "WUvTyaaNkzM",
        thumbnail: "https://img.youtube.com/vi/WUvTyaaNkzM/maxresdefault.jpg",
        topic: "कैलकुलस",
        difficulty: "Beginner",
        tags: ["सीमा", "अवकलज", "नि���ंतरता"]
      },
      {
        id: "math-hi-2",
        title: "रैखिक बीजगणित: मैट्रिक्स संक्रियाएं",
        instructor: "इंजीनियरिंग फंडा",
        duration: "35:10",
        views: "65K",
        rating: 4.4,
        description: "मैट्रिक्स संक्रियाओं, निर्धारकों और eigenvectors की हिंदी में आसान व्याख्या।",
        youtubeId: "kYB8IZa5AuE",
        thumbnail: "https://img.youtube.com/vi/kYB8IZa5AuE/maxresdefault.jpg",
        topic: "रैखिक बीजगणित",
        difficulty: "Intermediate",
        tags: ["मैट्रिक्स", "निर्धारक", "आइगनवैल्यू"]
      }
    ],
    "Telugu": [
      {
        id: "math-te-1",
        title: "కాలిక్యులస్: పరిమితులు మరియు డెరివేటివ్స్",
        instructor: "తెలుగు మ్యాథ్ టీచర్",
        duration: "40:15",
        views: "45K",
        rating: 4.3,
        description: "కాలిక్యులస్ యొక్క ప్రాథమిక భావనలు, పరిమితులు మరియు డెరివేటివ్స్ తెలుగులో వివరణ.",
        youtubeId: "WUvTyaaNkzM",
        thumbnail: "https://img.youtube.com/vi/WUvTyaaNkzM/maxresdefault.jpg",
        topic: "కాలిక్యులస్",
        difficulty: "Beginner",
        tags: ["పరిమితులు", "డెరివేటివ్స్", "కొనసాగింపు"]
      }
    ]
  },
  "Computer Science": {
    "English": [
      {
        id: "cs-en-1",
        title: "Data Structures and Algorithms",
        instructor: "CS Dojo",
        duration: "55:30",
        views: "245K",
        rating: 4.9,
        description: "Complete guide to data structures including arrays, linked lists, trees, and graph algorithms.",
        youtubeId: "8hly31xKli0",
        thumbnail: "https://img.youtube.com/vi/8hly31xKli0/maxresdefault.jpg",
        topic: "Data Structures",
        difficulty: "Intermediate",
        tags: ["Arrays", "Linked Lists", "Trees", "Graphs"]
      },
      {
        id: "cs-en-2",
        title: "Object-Oriented Programming in Java",
        instructor: "Derek Banas",
        duration: "48:45",
        views: "189K",
        rating: 4.7,
        description: "Learn OOP concepts in Java: classes, objects, inheritance, polymorphism, and encapsulation.",
        youtubeId: "Qgl81fPcLc8",
        thumbnail: "https://img.youtube.com/vi/Qgl81fPcLc8/maxresdefault.jpg",
        topic: "Java Programming",
        difficulty: "Beginner",
        tags: ["OOP", "Classes", "Inheritance", "Polymorphism"]
      },
      {
        id: "cs-en-3",
        title: "Database Management Systems",
        instructor: "Gate Smashers",
        duration: "62:15",
        views: "312K",
        rating: 4.8,
        description: "Complete DBMS concepts covering normalization, SQL, transactions, and database design.",
        youtubeId: "h0j0QN2b57M",
        thumbnail: "https://img.youtube.com/vi/h0j0QN2b57M/maxresdefault.jpg",
        topic: "Database",
        difficulty: "Intermediate",
        tags: ["SQL", "Normalization", "Transactions", "ACID"]
      }
    ],
    "Hindi": [
      {
        id: "cs-hi-1",
        title: "डेटा स्ट्रक्चर्स और एल्गोरिदम",
        instructor: "कोडिंग निंजा हिंदी",
        duration: "50:20",
        views: "156K",
        rating: 4.6,
        description: "डेटा ��्ट्रक्चर्स की पूरी जानकारी हिंदी में - arrays, linked lists, trees और algorithms।",
        youtubeId: "8hly31xKli0",
        thumbnail: "https://img.youtube.com/vi/8hly31xKli0/maxresdefault.jpg",
        topic: "डेटा स्ट्रक्चर्स",
        difficulty: "Intermediate",
        tags: ["Arrays", "Linked Lists", "Trees", "Algorithms"]
      },
      {
        id: "cs-hi-2",
        title: "जावा में ऑब्जेक्ट ओरिएंटेड प्रोग्रामिंग",
        instructor: "जावा गुरु",
        duration: "45:30",
        views: "98K",
        rating: 4.5,
        description: "जावा में OOP की मूल बातें - classes, objects, inheritance और polymorphism हिंदी में।",
        youtubeId: "Qgl81fPcLc8",
        thumbnail: "https://img.youtube.com/vi/Qgl81fPcLc8/maxresdefault.jpg",
        topic: "जावा प्रोग्रामिंग",
        difficulty: "Beginner",
        tags: ["OOP", "Classes", "Inheritance", "Polymorphism"]
      }
    ],
    "Telugu": [
      {
        id: "cs-te-1",
        title: "డేటా స్ట్రక��చర్స్ మరియు అల్గోరిథమ్స్",
        instructor: "తెలుగు కోడింగ్",
        duration: "47:45",
        views: "67K",
        rating: 4.4,
        description: "డేటా స్ట్రక్చర్స్ మరియు అల్గోరిథమ్స్ తెలుగులో వివరణ - arrays నుండి trees వరకు.",
        youtubeId: "8hly31xKli0",
        thumbnail: "https://img.youtube.com/vi/8hly31xKli0/maxresdefault.jpg",
        topic: "డేటా స్ట్రక్చర్స్",
        difficulty: "Intermediate",
        tags: ["Arrays", "Linked Lists", "Trees", "అల్గోరిథమ్స్"]
      }
    ]
  },
  "Physics": {
    "English": [
      {
        id: "phy-en-1",
        title: "Classical Mechanics for Engineers",
        instructor: "Walter Lewin",
        duration: "58:20",
        views: "203K",
        rating: 4.9,
        description: "Fundamental principles of mechanics: Newton's laws, energy, momentum, and rotational dynamics.",
        youtubeId: "4a0FbQdH3dY",
        thumbnail: "https://img.youtube.com/vi/4a0FbQdH3dY/maxresdefault.jpg",
        topic: "Mechanics",
        difficulty: "Intermediate",
        tags: ["Newton's Laws", "Energy", "Momentum", "Rotation"]
      },
      {
        id: "phy-en-2",
        title: "Electromagnetic Theory",
        instructor: "Physics Galaxy",
        duration: "65:15",
        views: "178K",
        rating: 4.7,
        description: "Complete electromagnetic theory covering electric fields, magnetic fields, and Maxwell's equations.",
        youtubeId: "w-w7eWBjLeI",
        thumbnail: "https://img.youtube.com/vi/w-w7eWBjLeI/maxresdefault.jpg",
        topic: "Electromagnetism",
        difficulty: "Advanced",
        tags: ["Electric Fields", "Magnetic Fields", "Maxwell's Equations"]
      }
    ],
    "Hindi": [
      {
        id: "phy-hi-1",
        title: "इंजीनियरिंग भौतिकी: यांत्रिकी",
        instructor: "फिजिक्स वाला",
        duration: "52:30",
        views: "134K",
        rating: 4.6,
        description: "इंजीनियरिंग भौतिकी की मूल बातें - न्यूटन के नियम, ऊर्जा और गति हिंदी में।",
        youtubeId: "4a0FbQdH3dY",
        thumbnail: "https://img.youtube.com/vi/4a0FbQdH3dY/maxresdefault.jpg",
        topic: "यांत्रिकी",
        difficulty: "Intermediate",
        tags: ["न्यूटन के नियम", "ऊर्जा", "गति", "घूर्णन"]
      }
    ],
    "Telugu": [
      {
        id: "phy-te-1",
        title: "ఇంజనీరింగ్ ఫిజిక్స్: మెకానిక్స్",
        instructor: "తెలుగు ఫిజిక్స్",
        duration: "49:15",
        views: "78K",
        rating: 4.5,
        description: "ఇంజనీరింగ్ ఫిజిక్స్ యొక్క ప్రాథమిక సూత్రాలు - న్యూటన్ నియమాలు మరియు మెకానిక్స్.",
        youtubeId: "4a0FbQdH3dY",
        thumbnail: "https://img.youtube.com/vi/4a0FbQdH3dY/maxresdefault.jpg",
        topic: "మెకానిక్స్",
        difficulty: "Intermediate",
        tags: ["న్యూటన్ నియమాలు", "శక్తి", "మొమెంటం", "రొటేషన్"]
      }
    ]
  },
  "Electronics": {
    "English": [
      {
        id: "elec-en-1",
        title: "Digital Electronics Fundamentals",
        instructor: "Ben Eater",
        duration: "43:30",
        views: "267K",
        rating: 4.8,
        description: "Understanding digital logic, Boolean algebra, and logic gate design for electronic circuits.",
        youtubeId: "gI-qXk7XojA",
        thumbnail: "https://img.youtube.com/vi/gI-qXk7XojA/maxresdefault.jpg",
        topic: "Digital Logic",
        difficulty: "Beginner",
        tags: ["Logic Gates", "Boolean Algebra", "Digital Circuits"]
      },
      {
        id: "elec-en-2",
        title: "Analog Electronics and Op-Amps",
        instructor: "ElectronicsHub",
        duration: "56:45",
        views: "145K",
        rating: 4.6,
        description: "Operational amplifiers, analog circuits, and signal processing fundamentals for engineers.",
        youtubeId: "7FYHt5XviKc",
        thumbnail: "https://img.youtube.com/vi/7FYHt5XviKc/maxresdefault.jpg",
        topic: "Analog Electronics",
        difficulty: "Intermediate",
        tags: ["Op-Amps", "Analog Circuits", "Signal Processing"]
      }
    ],
    "Hindi": [
      {
        id: "elec-hi-1",
        title: "डिजिटल इलेक्ट्रॉनिक्स की मूल बातें",
        instructor: "इलेक्ट्रॉनिक्स गुरु",
        duration: "41:20",
        views: "89K",
        rating: 4.5,
        description: "डिजिटल लॉजिक, Boolean algebra और logic gates की हिंदी में आसान व्याख्या।",
        youtubeId: "gI-qXk7XojA",
        thumbnail: "https://img.youtube.com/vi/gI-qXk7XojA/maxresdefault.jpg",
        topic: "डिजिटल लॉजिक",
        difficulty: "Beginner",
        tags: ["Logic Gates", "Boolean Algebra", "Digital Circuits"]
      }
    ],
    "Telugu": [
      {
        id: "elec-te-1",
        title: "డిజిటల్ ఎలక్ట్రానిక్స్ బేసిక్స్",
        instructor: "తెలుగు ఎలక్ట్రానిక్స్",
        duration: "38:45",
        views: "52K",
        rating: 4.3,
        description: "డిజిటల్ లాజిక్, Boolean algebra మరియు logic gates తెలుగులో వివరణ.",
        youtubeId: "gI-qXk7XojA",
        thumbnail: "https://img.youtube.com/vi/gI-qXk7XojA/maxresdefault.jpg",
        topic: "డిజిటల్ లాజిక్",
        difficulty: "Beginner",
        tags: ["లాజిక్ గేట్స్", "Boolean Algebra", "డిజిటల్ సర్క్యూట్స్"]
      }
    ]
  }
};

const allSubjects = Object.keys(videosData);
const languages = ["English", "Hindi", "Telugu"];

export default function Videos() {
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [searchTerm, setSearchTerm] = useState("");

  const currentVideos = videosData[selectedSubject]?.[selectedLanguage] || [];
  
  const filteredVideos = currentVideos.filter(video => 
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalVideos = Object.values(videosData).reduce((total, subject) => 
    total + Object.values(subject).reduce((subTotal, langVideos) => subTotal + langVideos.length, 0), 0
  );

  const totalViews = Object.values(videosData).reduce((total, subject) => 
    total + Object.values(subject).reduce((subTotal, langVideos) => 
      subTotal + langVideos.reduce((vidTotal, video) => 
        vidTotal + parseInt(video.views.replace('K', '000').replace('M', '000000')), 0
      ), 0
    ), 0
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleVideoClick = (youtubeId: string) => {
    window.open(`https://www.youtube.com/watch?v=${youtubeId}`, '_blank');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-education rounded-lg flex items-center justify-center">
              <Video className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Video Lectures</h1>
              <p className="text-muted-foreground">Learn from the best educational content with expert instructors</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Video className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">{totalVideos}</p>
                    <p className="text-sm text-muted-foreground">Total Videos</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Eye className="w-8 h-8 text-education-green" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">{(totalViews / 1000000).toFixed(1)}M</p>
                    <p className="text-sm text-muted-foreground">Total Views</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-8 h-8 text-education-orange" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">{allSubjects.length}</p>
                    <p className="text-sm text-muted-foreground">Subjects</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-8 h-8 text-education-purple" />
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
          {/* Sidebar Filters */}
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
                  <label className="text-sm font-medium">Search Videos</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search by title, instructor..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Subject Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <div className="space-y-2">
                    {allSubjects.map((subject) => (
                      <button
                        key={subject}
                        onClick={() => setSelectedSubject(subject)}
                        className={`w-full text-left p-2 rounded-md text-sm transition-colors ${
                          selectedSubject === subject
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted'
                        }`}
                      >
                        {subject}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Video Statistics */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Videos by Subject</label>
                  {allSubjects.map((subject) => {
                    const subjectTotal = Object.values(videosData[subject]).reduce(
                      (total, langVideos) => total + langVideos.length, 0
                    );
                    return (
                      <div key={subject} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <span className="text-sm">{subject}</span>
                        <Badge variant="outline">{subjectTotal}</Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
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
                      {selectedSubject} videos in {selectedLanguage}
                    </p>
                  </div>
                </div>

                {/* Video Grid */}
                {languages.map((language) => (
                  <TabsContent key={language} value={language} className="mt-6">
                    {filteredVideos.length === 0 ? (
                      <Card>
                        <CardContent className="py-12 text-center">
                          <Video className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-foreground mb-2">No videos found</h3>
                          <p className="text-muted-foreground">
                            Try selecting a different subject or language.
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
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
