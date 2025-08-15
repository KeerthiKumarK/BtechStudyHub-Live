import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  BookOpen, 
  Download, 
  Eye, 
  Search,
  Filter,
  Star,
  Clock,
  FileText,
  Users,
  TrendingUp,
  ChevronRight,
  X
} from "lucide-react";

interface TextbookData {
  id: string;
  title: string;
  author: string;
  subject: string;
  year: string;
  pages: number;
  size: string;
  rating: number;
  downloads: number;
  description: string;
  pdfUrl: string;
  coverImage?: string;
  tags: string[];
}

const textbooksData: Record<string, TextbookData[]> = {
  "year1": [
    {
      id: "math101-1",
      title: "Engineering Mathematics - I",
      author: "B.S. Grewal",
      subject: "Mathematics",
      year: "1st Year",
      pages: 1200,
      size: "45.2 MB",
      rating: 4.5,
      downloads: 1250,
      description: "Comprehensive guide covering calculus, differential equations, and linear algebra for engineering students.",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      tags: ["Calculus", "Differential Equations", "Linear Algebra"]
    },
    {
      id: "phy101-1",
      title: "Physics for Engineers",
      author: "Resnick, Halliday & Krane",
      subject: "Physics",
      year: "1st Year",
      pages: 980,
      size: "38.7 MB",
      rating: 4.7,
      downloads: 950,
      description: "Fundamental physics concepts with engineering applications and problem-solving techniques.",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      tags: ["Mechanics", "Thermodynamics", "Waves"]
    },
    {
      id: "chem101-1",
      title: "Engineering Chemistry",
      author: "Jain & Jain",
      subject: "Chemistry",
      year: "1st Year",
      pages: 650,
      size: "28.3 MB",
      rating: 4.2,
      downloads: 800,
      description: "Chemistry fundamentals for engineering applications including materials science and environmental chemistry.",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      tags: ["Organic Chemistry", "Materials", "Environmental"]
    },
    {
      id: "prog101-1",
      title: "Programming in C",
      author: "Yashavant Kanetkar",
      subject: "Programming",
      year: "1st Year",
      pages: 420,
      size: "22.1 MB",
      rating: 4.6,
      downloads: 1500,
      description: "Complete guide to C programming with practical examples and exercises.",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      tags: ["C Programming", "Data Structures", "Algorithms"]
    }
  ],
  "year2": [
    {
      id: "ds201-1",
      title: "Data Structures and Algorithms",
      author: "Cormen, Leiserson, Rivest & Stein",
      subject: "Computer Science",
      year: "2nd Year",
      pages: 1320,
      size: "52.8 MB",
      rating: 4.8,
      downloads: 2100,
      description: "Comprehensive coverage of fundamental algorithms and data structures with mathematical analysis.",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      tags: ["Algorithms", "Data Structures", "Analysis"]
    },
    {
      id: "math201-1",
      title: "Engineering Mathematics - II",
      author: "B.S. Grewal",
      subject: "Mathematics",
      year: "2nd Year",
      pages: 1100,
      size: "42.5 MB",
      rating: 4.4,
      downloads: 1100,
      description: "Advanced mathematical concepts including complex analysis, probability, and statistics.",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      tags: ["Complex Analysis", "Probability", "Statistics"]
    },
    {
      id: "de201-1",
      title: "Digital Electronics",
      author: "Morris Mano",
      subject: "Electronics",
      year: "2nd Year",
      pages: 780,
      size: "35.2 MB",
      rating: 4.5,
      downloads: 890,
      description: "Digital logic design, Boolean algebra, and sequential circuits for engineering applications.",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      tags: ["Digital Logic", "Boolean Algebra", "Circuits"]
    }
  ],
  "year3": [
    {
      id: "os301-1",
      title: "Operating System Concepts",
      author: "Silberschatz, Galvin & Gagne",
      subject: "Computer Science",
      year: "3rd Year",
      pages: 950,
      size: "48.3 MB",
      rating: 4.7,
      downloads: 1800,
      description: "Comprehensive guide to operating systems including process management, memory management, and file systems.",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      tags: ["OS Concepts", "Process Management", "Memory"]
    },
    {
      id: "db301-1",
      title: "Database System Concepts",
      author: "Silberschatz, Korth & Sudarshan",
      subject: "Computer Science",
      year: "3rd Year",
      pages: 1200,
      size: "55.7 MB",
      rating: 4.6,
      downloads: 1650,
      description: "Database design, SQL, transaction processing, and database administration concepts.",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      tags: ["Database Design", "SQL", "Transactions"]
    },
    {
      id: "cn301-1",
      title: "Computer Networks",
      author: "Andrew Tanenbaum",
      subject: "Computer Science",
      year: "3rd Year",
      pages: 890,
      size: "41.2 MB",
      rating: 4.5,
      downloads: 1400,
      description: "Network protocols, architecture, and security for modern computer networks.",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      tags: ["Networking", "Protocols", "Security"]
    }
  ],
  "year4": [
    {
      id: "ml401-1",
      title: "Machine Learning",
      author: "Tom Mitchell",
      subject: "Computer Science",
      year: "4th Year",
      pages: 720,
      size: "39.8 MB",
      rating: 4.8,
      downloads: 2200,
      description: "Comprehensive introduction to machine learning algorithms and applications.",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      tags: ["ML Algorithms", "Neural Networks", "Deep Learning"]
    },
    {
      id: "ai401-1",
      title: "Artificial Intelligence: A Modern Approach",
      author: "Stuart Russell & Peter Norvig",
      subject: "Computer Science",
      year: "4th Year",
      pages: 1150,
      size: "58.3 MB",
      rating: 4.9,
      downloads: 1950,
      description: "The definitive guide to artificial intelligence covering search, logic, planning, and learning.",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      tags: ["AI Fundamentals", "Search Algorithms", "Logic"]
    },
    {
      id: "cloud401-1",
      title: "Cloud Computing: Concepts & Practice",
      author: "Rajkumar Buyya",
      subject: "Computer Science",
      year: "4th Year",
      pages: 650,
      size: "32.1 MB",
      rating: 4.4,
      downloads: 1300,
      description: "Cloud computing architectures, services, and deployment models with practical examples.",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      tags: ["Cloud Architecture", "AWS", "Distributed Systems"]
    }
  ]
};

const allSubjects = Array.from(
  new Set(
    Object.values(textbooksData)
      .flat()
      .map(book => book.subject)
  )
);

export default function Textbooks() {
  const [selectedYear, setSelectedYear] = useState("year1");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState<TextbookData | null>(null);
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);

  const currentBooks = textbooksData[selectedYear as keyof typeof textbooksData] || [];
  
  const filteredBooks = currentBooks.filter(book => {
    const matchesSubject = selectedSubject === "all" || book.subject === selectedSubject;
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSubject && matchesSearch;
  });

  const totalBooks = Object.values(textbooksData).flat().length;
  const totalDownloads = Object.values(textbooksData).flat().reduce((sum, book) => sum + book.downloads, 0);

  const handleReadOnline = (book: TextbookData) => {
    setSelectedBook(book);
    setIsPdfViewerOpen(true);
  };

  const handleDownload = (book: TextbookData) => {
    // In a real application, this would trigger the actual download
    console.log(`Downloading: ${book.title}`);
    
    // Create a temporary link to simulate download
    const link = document.createElement('a');
    link.href = book.pdfUrl;
    link.download = `${book.title}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getYearBooks = (year: string) => {
    return textbooksData[year as keyof typeof textbooksData]?.length || 0;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-education rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Digital Textbooks</h1>
              <p className="text-muted-foreground">Access comprehensive study materials for all BTech subjects</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">{totalBooks}</p>
                    <p className="text-sm text-muted-foreground">Total Books</p>
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
                  <Users className="w-8 h-8 text-education-orange" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">15+</p>
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
                    <p className="text-2xl font-bold text-foreground">4.6</p>
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
                  <label className="text-sm font-medium">Search Books</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search by title, author..."
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

                {/* Year Statistics */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Books by Year</label>
                  {["year1", "year2", "year3", "year4"].map((year, index) => (
                    <div key={year} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                      <span className="text-sm">{index + 1}st Year</span>
                      <Badge variant="outline">{getYearBooks(year)}</Badge>
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
                    {filteredBooks.length} Books Found
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Showing results for {selectedYear.replace('year', '')} Year
                    {selectedSubject !== 'all' && ` - ${selectedSubject}`}
                  </p>
                </div>
              </div>

              {/* Book Lists */}
              {["year1", "year2", "year3", "year4"].map((year) => (
                <TabsContent key={year} value={year} className="space-y-6">
                  {filteredBooks.length === 0 ? (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-foreground mb-2">No books found</h3>
                        <p className="text-muted-foreground">
                          Try adjusting your search or filter criteria.
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid gap-6">
                      {filteredBooks.map((book) => (
                        <Card key={book.id} className="hover:shadow-lg transition-all duration-300">
                          <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                              {/* Book Info */}
                              <div className="md:col-span-3 space-y-4">
                                <div>
                                  <div className="flex items-start justify-between mb-2">
                                    <h3 className="text-xl font-semibold text-foreground line-clamp-2">
                                      {book.title}
                                    </h3>
                                    <div className="flex items-center space-x-1 ml-4">
                                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                      <span className="text-sm font-medium">{book.rating}</span>
                                    </div>
                                  </div>
                                  <p className="text-muted-foreground mb-2">by {book.author}</p>
                                  <p className="text-sm text-muted-foreground line-clamp-2">
                                    {book.description}
                                  </p>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                  {book.tags.map((tag, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>

                                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                                  <div className="flex items-center space-x-1">
                                    <FileText className="w-4 h-4" />
                                    <span>{book.pages} pages</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Download className="w-4 h-4" />
                                    <span>{book.downloads} downloads</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{book.size}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="md:col-span-1 flex flex-col space-y-3">
                                <Button
                                  onClick={() => handleReadOnline(book)}
                                  className="w-full bg-gradient-education text-white hover:opacity-90"
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  Read Online
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() => handleDownload(book)}
                                  className="w-full"
                                >
                                  <Download className="w-4 h-4 mr-2" />
                                  Download PDF
                                </Button>
                                <div className="text-center">
                                  <Badge variant="outline" className="text-xs">
                                    {book.subject}
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
                    {selectedBook?.title}
                  </DialogTitle>
                  <DialogDescription className="mt-1">
                    by {selectedBook?.author} • {selectedBook?.pages} pages
                  </DialogDescription>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => selectedBook && handleDownload(selectedBook)}
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
              {selectedBook && (
                <iframe
                  src={selectedBook.pdfUrl}
                  width="100%"
                  height="100%"
                  className="border border-border rounded-lg"
                  title={`PDF Viewer - ${selectedBook.title}`}
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
