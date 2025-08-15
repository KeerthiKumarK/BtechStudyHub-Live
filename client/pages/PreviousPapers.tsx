import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  FileText, 
  Download, 
  Eye, 
  Search,
  Filter,
  Star,
  Clock,
  Users,
  TrendingUp,
  ChevronRight,
  X,
  Calendar,
  Award
} from "lucide-react";

interface PaperData {
  id: string;
  title: string;
  subject: string;
  year: string;
  examType: string;
  examYear: string;
  semester: string;
  pages: number;
  size: string;
  rating: number;
  downloads: number;
  description: string;
  pdfUrl: string;
  tags: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  university: string;
}

const papersData: Record<string, PaperData[]> = {
  "year1": [
    {
      id: "math101-paper-1",
      title: "Engineering Mathematics - I Mid Semester Exam",
      subject: "Mathematics",
      year: "1st Year",
      examType: "Mid Semester",
      examYear: "2023",
      semester: "1st Semester",
      pages: 8,
      size: "2.3 MB",
      rating: 4.5,
      downloads: 850,
      description: "Comprehensive mid-semester exam covering calculus, differential equations, and matrix algebra.",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      tags: ["Calculus", "Differential Equations", "Matrix Algebra"],
      difficulty: "Medium",
      university: "JNTUH"
    },
    {
      id: "phy101-paper-1",
      title: "Physics for Engineers End Semester Exam",
      subject: "Physics",
      year: "1st Year",
      examType: "End Semester",
      examYear: "2023",
      semester: "1st Semester",
      pages: 12,
      size: "3.1 MB",
      rating: 4.3,
      downloads: 720,
      description: "Final examination covering mechanics, thermodynamics, and wave motion with practical applications.",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      tags: ["Mechanics", "Thermodynamics", "Waves", "Practical"],
      difficulty: "Hard",
      university: "JNTUH"
    },
    {
      id: "chem101-paper-1",
      title: "Engineering Chemistry Mid Semester",
      subject: "Chemistry",
      year: "1st Year",
      examType: "Mid Semester",
      examYear: "2023",
      semester: "2nd Semester",
      pages: 6,
      size: "1.8 MB",
      rating: 4.1,
      downloads: 650,
      description: "Mid-semester exam focusing on organic chemistry and material science fundamentals.",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      tags: ["Organic Chemistry", "Materials", "Environmental Chemistry"],
      difficulty: "Easy",
      university: "JNTUH"
    },
    {
      id: "prog101-paper-1",
      title: "Programming in C End Semester Exam",
      subject: "Programming",
      year: "1st Year",
      examType: "End Semester",
      examYear: "2023",
      semester: "2nd Semester",
      pages: 10,
      size: "2.7 MB",
      rating: 4.6,
      downloads: 950,
      description: "Comprehensive programming exam with coding problems and theoretical questions.",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      tags: ["C Programming", "Data Structures", "Algorithms", "Coding"],
      difficulty: "Medium",
      university: "JNTUH"
    }
  ],
  "year2": [
    {
      id: "ds201-paper-1",
      title: "Data Structures and Algorithms End Semester",
      subject: "Computer Science",
      year: "2nd Year",
      examType: "End Semester",
      examYear: "2023",
      semester: "3rd Semester",
      pages: 14,
      size: "4.2 MB",
      rating: 4.8,
      downloads: 1200,
      description: "Advanced examination covering sorting algorithms, trees, graphs, and complexity analysis.",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      tags: ["Algorithms", "Data Structures", "Complexity", "Trees", "Graphs"],
      difficulty: "Hard",
      university: "JNTUH"
    },
    {
      id: "math201-paper-1",
      title: "Engineering Mathematics - II Mid Semester",
      subject: "Mathematics",
      year: "2nd Year",
      examType: "Mid Semester",
      examYear: "2023",
      semester: "3rd Semester",
      pages: 8,
      size: "2.5 MB",
      rating: 4.2,
      downloads: 680,
      description: "Mid-semester exam covering complex analysis, probability theory, and statistical methods.",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      tags: ["Complex Analysis", "Probability", "Statistics"],
      difficulty: "Medium",
      university: "JNTUH"
    },
    {
      id: "de201-paper-1",
      title: "Digital Electronics End Semester Exam",
      subject: "Electronics",
      year: "2nd Year",
      examType: "End Semester",
      examYear: "2023",
      semester: "4th Semester",
      pages: 10,
      size: "3.3 MB",
      rating: 4.4,
      downloads: 780,
      description: "Comprehensive exam on digital logic design, Boolean algebra, and sequential circuits.",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      tags: ["Digital Logic", "Boolean Algebra", "Sequential Circuits", "Design"],
      difficulty: "Medium",
      university: "JNTUH"
    }
  ],
  "year3": [
    {
      id: "os301-paper-1",
      title: "Operating Systems End Semester Exam",
      subject: "Computer Science",
      year: "3rd Year",
      examType: "End Semester",
      examYear: "2023",
      semester: "5th Semester",
      pages: 12,
      size: "3.8 MB",
      rating: 4.7,
      downloads: 1100,
      description: "Advanced OS concepts including process scheduling, memory management, and file systems.",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      tags: ["Process Management", "Memory Management", "File Systems", "Scheduling"],
      difficulty: "Hard",
      university: "JNTUH"
    },
    {
      id: "db301-paper-1",
      title: "Database Management Systems Mid Semester",
      subject: "Computer Science",
      year: "3rd Year",
      examType: "Mid Semester",
      examYear: "2023",
      semester: "5th Semester",
      pages: 9,
      size: "2.9 MB",
      rating: 4.5,
      downloads: 890,
      description: "Database design principles, SQL queries, normalization, and transaction management.",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      tags: ["Database Design", "SQL", "Normalization", "Transactions"],
      difficulty: "Medium",
      university: "JNTUH"
    },
    {
      id: "cn301-paper-1",
      title: "Computer Networks End Semester Exam",
      subject: "Computer Science",
      year: "3rd Year",
      examType: "End Semester",
      examYear: "2023",
      semester: "6th Semester",
      pages: 11,
      size: "3.5 MB",
      rating: 4.3,
      downloads: 950,
      description: "Network protocols, OSI model, TCP/IP, and network security fundamentals.",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      tags: ["Network Protocols", "OSI Model", "TCP/IP", "Security"],
      difficulty: "Hard",
      university: "JNTUH"
    }
  ],
  "year4": [
    {
      id: "ml401-paper-1",
      title: "Machine Learning End Semester Exam",
      subject: "Computer Science",
      year: "4th Year",
      examType: "End Semester",
      examYear: "2023",
      semester: "7th Semester",
      pages: 15,
      size: "4.8 MB",
      rating: 4.9,
      downloads: 1400,
      description: "Advanced ML algorithms, neural networks, deep learning, and practical applications.",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      tags: ["ML Algorithms", "Neural Networks", "Deep Learning", "Applications"],
      difficulty: "Hard",
      university: "JNTUH"
    },
    {
      id: "ai401-paper-1",
      title: "Artificial Intelligence Mid Semester",
      subject: "Computer Science",
      year: "4th Year",
      examType: "Mid Semester",
      examYear: "2023",
      semester: "7th Semester",
      pages: 10,
      size: "3.2 MB",
      rating: 4.6,
      downloads: 1050,
      description: "AI fundamentals, search algorithms, knowledge representation, and expert systems.",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      tags: ["AI Fundamentals", "Search Algorithms", "Knowledge Representation"],
      difficulty: "Medium",
      university: "JNTUH"
    },
    {
      id: "cloud401-paper-1",
      title: "Cloud Computing End Semester Exam",
      subject: "Computer Science",
      year: "4th Year",
      examType: "End Semester",
      examYear: "2023",
      semester: "8th Semester",
      pages: 12,
      size: "3.7 MB",
      rating: 4.4,
      downloads: 820,
      description: "Cloud architectures, virtualization, service models, and deployment strategies.",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      tags: ["Cloud Architecture", "Virtualization", "Service Models", "Deployment"],
      difficulty: "Medium",
      university: "JNTUH"
    }
  ]
};

const allSubjects = Array.from(
  new Set(
    Object.values(papersData)
      .flat()
      .map(paper => paper.subject)
  )
);

export default function PreviousPapers() {
  const [selectedYear, setSelectedYear] = useState("year1");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedExamType, setSelectedExamType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPaper, setSelectedPaper] = useState<PaperData | null>(null);
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);

  const currentPapers = papersData[selectedYear as keyof typeof papersData] || [];
  
  const filteredPapers = currentPapers.filter(paper => {
    const matchesSubject = selectedSubject === "all" || paper.subject === selectedSubject;
    const matchesExamType = selectedExamType === "all" || paper.examType === selectedExamType;
    const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSubject && matchesExamType && matchesSearch;
  });

  const totalPapers = Object.values(papersData).flat().length;
  const totalDownloads = Object.values(papersData).flat().reduce((sum, paper) => sum + paper.downloads, 0);

  const handleViewPaper = (paper: PaperData) => {
    setSelectedPaper(paper);
    setIsPdfViewerOpen(true);
  };

  const handleDownload = (paper: PaperData) => {
    console.log(`Downloading: ${paper.title}`);
    
    const link = document.createElement('a');
    link.href = paper.pdfUrl;
    link.download = `${paper.title}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getYearPapers = (year: string) => {
    return papersData[year as keyof typeof papersData]?.length || 0;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-education rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Previous Year Papers</h1>
              <p className="text-muted-foreground">Access past exam papers to prepare effectively for your exams</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <FileText className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">{totalPapers}</p>
                    <p className="text-sm text-muted-foreground">Total Papers</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Download className="w-8 h-8 text-education-green" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">{totalDownloads.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Downloads</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-8 h-8 text-education-orange" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">2019-2023</p>
                    <p className="text-sm text-muted-foreground">Years Covered</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Award className="w-8 h-8 text-education-purple" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">4.5</p>
                    <p className="text-sm text-muted-foreground">Avg. Rating</p>
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
                  <label className="text-sm font-medium">Search Papers</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search by title, subject..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Subject Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="all">All Subjects</option>
                    {allSubjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Exam Type Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Exam Type</label>
                  <select
                    value={selectedExamType}
                    onChange={(e) => setSelectedExamType(e.target.value)}
                    className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="all">All Types</option>
                    <option value="Mid Semester">Mid Semester</option>
                    <option value="End Semester">End Semester</option>
                  </select>
                </div>

                {/* Year Statistics */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Papers by Year</label>
                  {["year1", "year2", "year3", "year4"].map((year, index) => (
                    <div key={year} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                      <span className="text-sm">{index + 1}{index === 0 ? 'st' : index === 1 ? 'nd' : index === 2 ? 'rd' : 'th'} Year</span>
                      <Badge variant="outline">{getYearPapers(year)}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={selectedYear} onValueChange={setSelectedYear} className="space-y-6">
              {/* Year Selection */}
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="year1">1st Year</TabsTrigger>
                <TabsTrigger value="year2">2nd Year</TabsTrigger>
                <TabsTrigger value="year3">3rd Year</TabsTrigger>
                <TabsTrigger value="year4">4th Year</TabsTrigger>
              </TabsList>

              {/* Results Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {filteredPapers.length} Papers Found
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Showing results for {selectedYear.replace('year', '')} Year
                    {selectedSubject !== 'all' && ` - ${selectedSubject}`}
                    {selectedExamType !== 'all' && ` - ${selectedExamType}`}
                  </p>
                </div>
              </div>

              {/* Paper Lists */}
              {["year1", "year2", "year3", "year4"].map((year) => (
                <TabsContent key={year} value={year} className="space-y-6">
                  {filteredPapers.length === 0 ? (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-foreground mb-2">No papers found</h3>
                        <p className="text-muted-foreground">
                          Try adjusting your search or filter criteria.
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid gap-6">
                      {filteredPapers.map((paper) => (
                        <Card key={paper.id} className="hover:shadow-lg transition-all duration-300">
                          <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                              {/* Paper Info */}
                              <div className="md:col-span-3 space-y-4">
                                <div>
                                  <div className="flex items-start justify-between mb-2">
                                    <h3 className="text-xl font-semibold text-foreground line-clamp-2">
                                      {paper.title}
                                    </h3>
                                    <div className="flex items-center space-x-1 ml-4">
                                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                      <span className="text-sm font-medium">{paper.rating}</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                                    <span>{paper.examType} • {paper.examYear}</span>
                                    <span>{paper.semester}</span>
                                    <span>{paper.university}</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground line-clamp-2">
                                    {paper.description}
                                  </p>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                  {paper.tags.map((tag, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                  <Badge className={`text-xs ${getDifficultyColor(paper.difficulty)}`}>
                                    {paper.difficulty}
                                  </Badge>
                                </div>

                                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                                  <div className="flex items-center space-x-1">
                                    <FileText className="w-4 h-4" />
                                    <span>{paper.pages} pages</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Download className="w-4 h-4" />
                                    <span>{paper.downloads} downloads</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{paper.size}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="md:col-span-1 flex flex-col space-y-3">
                                <Button
                                  onClick={() => handleViewPaper(paper)}
                                  className="w-full bg-gradient-education text-white hover:opacity-90"
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Paper
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() => handleDownload(paper)}
                                  className="w-full"
                                >
                                  <Download className="w-4 h-4 mr-2" />
                                  Download PDF
                                </Button>
                                <div className="text-center">
                                  <Badge variant="outline" className="text-xs">
                                    {paper.subject}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>

        {/* PDF Viewer Dialog */}
        <Dialog open={isPdfViewerOpen} onOpenChange={setIsPdfViewerOpen}>
          <DialogContent className="max-w-6xl h-[90vh] p-0">
            <DialogHeader className="p-6 pb-4 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <DialogTitle className="text-xl font-semibold">
                    {selectedPaper?.title}
                  </DialogTitle>
                  <DialogDescription className="mt-1">
                    {selectedPaper?.examType} • {selectedPaper?.examYear} • {selectedPaper?.pages} pages
                  </DialogDescription>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => selectedPaper && handleDownload(selectedPaper)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsPdfViewerOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </DialogHeader>
            <div className="flex-1 p-6">
              {selectedPaper && (
                <iframe
                  src={selectedPaper.pdfUrl}
                  width="100%"
                  height="100%"
                  className="border border-border rounded-lg"
                  title={`PDF Viewer - ${selectedPaper.title}`}
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
