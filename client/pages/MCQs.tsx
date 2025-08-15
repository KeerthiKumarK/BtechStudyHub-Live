import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Clock, 
  Target, 
  TrendingUp, 
  Award,
  PlayCircle,
  RotateCcw,
  CheckCircle,
  XCircle,
  ChevronRight,
  Filter,
  Search
} from "lucide-react";

const subjects = {
  "year1": [
    { name: "Mathematics I", code: "MATH101", questions: 250, difficulty: "Medium" },
    { name: "Physics", code: "PHY101", questions: 180, difficulty: "Hard" },
    { name: "Chemistry", code: "CHEM101", questions: 200, difficulty: "Easy" },
    { name: "Engineering Graphics", code: "EG101", questions: 150, difficulty: "Medium" },
    { name: "Programming in C", code: "CS101", questions: 300, difficulty: "Medium" }
  ],
  "year2": [
    { name: "Data Structures", code: "CS201", questions: 280, difficulty: "Hard" },
    { name: "Mathematics II", code: "MATH201", questions: 220, difficulty: "Medium" },
    { name: "Digital Electronics", code: "ECE201", questions: 190, difficulty: "Medium" },
    { name: "Engineering Mechanics", code: "ME201", questions: 160, difficulty: "Easy" },
    { name: "Environmental Science", code: "EVS201", questions: 120, difficulty: "Easy" }
  ],
  "year3": [
    { name: "Operating Systems", code: "CS301", questions: 240, difficulty: "Hard" },
    { name: "Database Management", code: "CS302", questions: 260, difficulty: "Medium" },
    { name: "Computer Networks", code: "CS303", questions: 200, difficulty: "Hard" },
    { name: "Software Engineering", code: "CS304", questions: 180, difficulty: "Medium" },
    { name: "Compiler Design", code: "CS305", questions: 150, difficulty: "Hard" }
  ],
  "year4": [
    { name: "Machine Learning", code: "CS401", questions: 220, difficulty: "Hard" },
    { name: "Artificial Intelligence", code: "CS402", questions: 190, difficulty: "Hard" },
    { name: "Project Management", code: "CS403", questions: 140, difficulty: "Easy" },
    { name: "Cloud Computing", code: "CS404", questions: 160, difficulty: "Medium" },
    { name: "Cybersecurity", code: "CS405", questions: 180, difficulty: "Hard" }
  ]
};

const recentActivity = [
  { subject: "Data Structures", score: 85, total: 20, time: "2 hours ago" },
  { subject: "Operating Systems", score: 92, total: 15, time: "1 day ago" },
  { subject: "Machine Learning", score: 78, total: 25, time: "3 days ago" }
];

const practiceTests = [
  {
    title: "Computer Science Fundamentals",
    subjects: ["Programming", "Data Structures", "Algorithms"],
    questions: 50,
    duration: "90 min",
    difficulty: "Medium"
  },
  {
    title: "Core Engineering Mathematics",
    subjects: ["Calculus", "Linear Algebra", "Statistics"],
    questions: 40,
    duration: "75 min",
    difficulty: "Hard"
  },
  {
    title: "Digital Electronics & Logic",
    subjects: ["Boolean Algebra", "Logic Gates", "Circuits"],
    questions: 30,
    duration: "60 min",
    difficulty: "Easy"
  }
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy": return "text-green-600 bg-green-50";
    case "Medium": return "text-yellow-600 bg-yellow-50";
    case "Hard": return "text-red-600 bg-red-50";
    default: return "text-gray-600 bg-gray-50";
  }
};

export default function MCQs() {
  const [selectedYear, setSelectedYear] = useState("year1");
  const [searchTerm, setSearchTerm] = useState("");

  const currentSubjects = subjects[selectedYear as keyof typeof subjects];
  const filteredSubjects = currentSubjects.filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalQuestions = Object.values(subjects).flat().reduce((sum, subject) => sum + subject.questions, 0);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-education rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">MCQ Practice Hub</h1>
              <p className="text-muted-foreground">Master concepts with expertly crafted questions</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">{totalQuestions.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Total Questions</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Clock className="w-8 h-8 text-education-orange" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">45 min</p>
                    <p className="text-sm text-muted-foreground">Avg. Test Time</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-8 h-8 text-education-green" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">87%</p>
                    <p className="text-sm text-muted-foreground">Your Avg. Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Award className="w-8 h-8 text-education-purple" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">12</p>
                    <p className="text-sm text-muted-foreground">Tests Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={selectedYear} onValueChange={setSelectedYear} className="space-y-6">
              {/* Year Selection */}
              <div className="flex flex-col space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="year1">1st Year</TabsTrigger>
                  <TabsTrigger value="year2">2nd Year</TabsTrigger>
                  <TabsTrigger value="year3">3rd Year</TabsTrigger>
                  <TabsTrigger value="year4">4th Year</TabsTrigger>
                </TabsList>

                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search subjects..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </Button>
                </div>
              </div>

              {/* Subject Lists */}
              {["year1", "year2", "year3", "year4"].map((year) => (
                <TabsContent key={year} value={year} className="space-y-4">
                  <div className="grid gap-4">
                    {filteredSubjects.map((subject, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow group">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-lg font-semibold text-foreground">{subject.name}</h3>
                                <Badge variant="outline" className="text-xs">
                                  {subject.code}
                                </Badge>
                                <Badge className={`text-xs ${getDifficultyColor(subject.difficulty)}`}>
                                  {subject.difficulty}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <span className="flex items-center space-x-1">
                                  <Target className="w-4 h-4" />
                                  <span>{subject.questions} Questions</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>45-60 min</span>
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm">
                                <PlayCircle className="w-4 h-4 mr-2" />
                                Quick Test
                              </Button>
                              <Button size="sm" className="bg-gradient-education text-white">
                                Practice
                                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            {/* Practice Tests Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Featured Practice Tests</h2>
              <div className="grid gap-4">
                {practiceTests.map((test, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{test.title}</CardTitle>
                          <CardDescription className="flex items-center space-x-4 mt-2">
                            <span className="flex items-center space-x-1">
                              <Target className="w-4 h-4" />
                              <span>{test.questions} Questions</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{test.duration}</span>
                            </span>
                          </CardDescription>
                        </div>
                        <Badge className={`${getDifficultyColor(test.difficulty)}`}>
                          {test.difficulty}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {test.subjects.map((subject, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                        <Button className="bg-gradient-education text-white">
                          Start Test
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span>Your Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Completion</span>
                    <span className="font-medium">68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current Year Progress</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">127</p>
                    <p className="text-sm text-muted-foreground">Questions Solved</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">24</p>
                    <p className="text-sm text-muted-foreground">Days Streak</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm text-foreground">{activity.subject}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-foreground">{activity.score}%</p>
                      <p className="text-xs text-muted-foreground">{activity.total} Qs</p>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full mt-4">
                  View All Activity
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Resume Last Test
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Target className="w-4 h-4 mr-2" />
                  Random Practice
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Award className="w-4 h-4 mr-2" />
                  View Achievements
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
