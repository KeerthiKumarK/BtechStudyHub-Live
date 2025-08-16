import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  Search,
  Plus,
  MessageCircle,
  Calendar,
  MapPin,
  Clock,
  ExternalLink,
  Globe,
  Hash,
  BookOpen,
  GraduationCap,
  Star,
  UserPlus,
  Link as LinkIcon,
  Video,
  FileText,
  Award,
  TrendingUp,
  Target,
  Zap,
} from "lucide-react";

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  college: string;
  subject: string;
  members: number;
  maxMembers: number;
  avatar: string;
  category:
    | "Academic"
    | "Project"
    | "Competitive Programming"
    | "Placement Prep";
  tags: string[];
  lastActivity: string;
  isPrivate: boolean;
  admin: string;
  joinLink?: string;
}

interface GroupLink {
  id: string;
  title: string;
  description: string;
  url: string;
  type:
    | "WhatsApp"
    | "Telegram"
    | "Discord"
    | "Slack"
    | "Study Material"
    | "YouTube"
    | "Website";
  members?: number;
  category: string;
  featured: boolean;
}

// Mock data for study groups
const mockStudyGroups: StudyGroup[] = [
  {
    id: "1",
    name: "CS 3rd Year - Data Structures",
    description:
      "Collaborative learning group for Data Structures and Algorithms. Daily practice sessions and doubt clearing.",
    college: "IIT Delhi",
    subject: "Computer Science",
    members: 45,
    maxMembers: 50,
    avatar: "https://ui-avatars.com/api/?name=DS&background=3b82f6&color=fff",
    category: "Academic",
    tags: ["DSA", "Algorithms", "Coding"],
    lastActivity: "2 hours ago",
    isPrivate: false,
    admin: "Rahul Sharma",
    joinLink: "#",
  },
  {
    id: "2",
    name: "Web Development Bootcamp",
    description:
      "Learn full-stack web development with MERN stack. Weekly projects and code reviews.",
    college: "NIT Trichy",
    subject: "Web Development",
    members: 32,
    maxMembers: 40,
    avatar: "https://ui-avatars.com/api/?name=WD&background=10b981&color=fff",
    category: "Project",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    lastActivity: "1 hour ago",
    isPrivate: false,
    admin: "Priya Patel",
    joinLink: "#",
  },
  {
    id: "3",
    name: "Competitive Programming Club",
    description:
      "Daily contests, problem discussions, and interview preparation. From beginner to advanced level.",
    college: "BITS Pilani",
    subject: "Competitive Programming",
    members: 67,
    maxMembers: 75,
    avatar: "https://ui-avatars.com/api/?name=CP&background=f59e0b&color=fff",
    category: "Competitive Programming",
    tags: ["CodeChef", "Codeforces", "LeetCode"],
    lastActivity: "30 minutes ago",
    isPrivate: false,
    admin: "Arjun Kumar",
    joinLink: "#",
  },
  {
    id: "4",
    name: "Placement Preparation 2024",
    description:
      "Mock interviews, resume reviews, and company-specific preparation. Success stories and tips sharing.",
    college: "VIT Vellore",
    subject: "Placement Preparation",
    members: 89,
    maxMembers: 100,
    avatar: "https://ui-avatars.com/api/?name=PP&background=8b5cf6&color=fff",
    category: "Placement Prep",
    tags: ["Interviews", "Resume", "Aptitude"],
    lastActivity: "15 minutes ago",
    isPrivate: false,
    admin: "Sneha Reddy",
    joinLink: "#",
  },
  {
    id: "5",
    name: "Machine Learning Study Circle",
    description:
      "Weekly paper discussions, project collaborations, and hands-on ML implementations.",
    college: "IIT Bombay",
    subject: "Machine Learning",
    members: 28,
    maxMembers: 35,
    avatar: "https://ui-avatars.com/api/?name=ML&background=ef4444&color=fff",
    category: "Academic",
    tags: ["Python", "TensorFlow", "PyTorch", "AI"],
    lastActivity: "3 hours ago",
    isPrivate: true,
    admin: "Vikram Singh",
    joinLink: "#",
  },
];

// Mock data for group links
const mockGroupLinks: GroupLink[] = [
  {
    id: "1",
    title: "BTech CS All Years",
    description:
      "Main WhatsApp group for all Computer Science students across different years",
    url: "https://chat.whatsapp.com/example1",
    type: "WhatsApp",
    members: 256,
    category: "General",
    featured: true,
  },
  {
    id: "2",
    title: "Coding Interview Prep",
    description:
      "Discord server for coding interview preparation with daily challenges",
    url: "https://discord.gg/example2",
    type: "Discord",
    members: 180,
    category: "Interview Prep",
    featured: true,
  },
  {
    id: "3",
    title: "Free Programming Courses",
    description:
      "Telegram channel with curated free programming courses and tutorials",
    url: "https://t.me/example3",
    type: "Telegram",
    members: 1200,
    category: "Learning Resources",
    featured: false,
  },
  {
    id: "4",
    title: "Web Dev Projects Hub",
    description:
      "Collaboration space for web development projects and code reviews",
    url: "https://slack.com/example4",
    type: "Slack",
    members: 95,
    category: "Project Collaboration",
    featured: false,
  },
  {
    id: "5",
    title: "DSA Master Class",
    description:
      "YouTube playlist with comprehensive Data Structures and Algorithms tutorials",
    url: "https://youtube.com/playlist/example5",
    type: "YouTube",
    category: "Learning Resources",
    featured: true,
  },
  {
    id: "6",
    title: "Engineering Study Materials",
    description:
      "Repository of textbooks, notes, and study materials for all branches",
    url: "https://drive.google.com/example6",
    type: "Study Material",
    category: "Study Resources",
    featured: false,
  },
];

const categories = [
  "All",
  "Academic",
  "Project",
  "Competitive Programming",
  "Placement Prep",
];
const linkCategories = [
  "All",
  "General",
  "Interview Prep",
  "Learning Resources",
  "Project Collaboration",
  "Study Resources",
];

export default function Community() {
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>(mockStudyGroups);
  const [groupLinks, setGroupLinks] = useState<GroupLink[]>(mockGroupLinks);
  const [filteredGroups, setFilteredGroups] =
    useState<StudyGroup[]>(mockStudyGroups);
  const [filteredLinks, setFilteredLinks] =
    useState<GroupLink[]>(mockGroupLinks);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLinkCategory, setSelectedLinkCategory] = useState("All");
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [newGroupData, setNewGroupData] = useState({
    name: "",
    description: "",
    college: "",
    subject: "",
    category: "Academic" as StudyGroup["category"],
    isPrivate: false,
  });

  // Filter study groups
  useEffect(() => {
    let filtered = studyGroups.filter((group) => {
      const matchesSearch =
        group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.subject.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || group.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    setFilteredGroups(filtered);
  }, [studyGroups, searchTerm, selectedCategory]);

  // Filter group links
  useEffect(() => {
    let filtered = groupLinks.filter((link) => {
      const matchesSearch =
        link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedLinkCategory === "All" ||
        link.category === selectedLinkCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort by featured first
    filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });

    setFilteredLinks(filtered);
  }, [groupLinks, searchTerm, selectedLinkCategory]);

  const handleCreateGroup = () => {
    if (!newGroupData.name || !newGroupData.description) return;

    const newGroup: StudyGroup = {
      id: Date.now().toString(),
      ...newGroupData,
      members: 1,
      maxMembers: 50,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newGroupData.name.slice(0, 2))}&background=random&color=fff`,
      tags: [],
      lastActivity: "Just created",
      admin: "You",
      joinLink: "#",
    };

    setStudyGroups((prev) => [newGroup, ...prev]);
    setNewGroupData({
      name: "",
      description: "",
      college: "",
      subject: "",
      category: "Academic",
      isPrivate: false,
    });
    setShowCreateGroup(false);
  };

  const getCategoryIcon = (category: StudyGroup["category"]) => {
    switch (category) {
      case "Academic":
        return <BookOpen className="w-4 h-4" />;
      case "Project":
        return <Target className="w-4 h-4" />;
      case "Competitive Programming":
        return <TrendingUp className="w-4 h-4" />;
      case "Placement Prep":
        return <Award className="w-4 h-4" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  const getLinkIcon = (type: GroupLink["type"]) => {
    switch (type) {
      case "WhatsApp":
        return <MessageCircle className="w-4 h-4 text-green-600" />;
      case "Telegram":
        return <MessageCircle className="w-4 h-4 text-blue-500" />;
      case "Discord":
        return <MessageCircle className="w-4 h-4 text-indigo-600" />;
      case "Slack":
        return <MessageCircle className="w-4 h-4 text-purple-600" />;
      case "YouTube":
        return <Video className="w-4 h-4 text-red-600" />;
      case "Study Material":
        return <FileText className="w-4 h-4 text-orange-600" />;
      case "Website":
        return <Globe className="w-4 h-4 text-blue-600" />;
      default:
        return <LinkIcon className="w-4 h-4" />;
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
                  <Users className="w-8 h-8" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Study Groups & Community
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join collaborative study groups, connect with peers, and access
                curated learning resources to enhance your academic journey.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {filteredGroups.length}
                  </div>
                  <div className="text-sm text-blue-100">Active Groups</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm text-blue-100">Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-sm text-blue-100">Colleges</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm text-blue-100">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Search Bar */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search study groups, subjects, or colleges..."
                  className="pl-12 text-lg h-12"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Tabs for Study Groups and Group Links */}
          <Tabs defaultValue="groups" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2">
              <TabsTrigger
                value="groups"
                className="flex items-center space-x-2"
              >
                <Users className="w-4 h-4" />
                <span>Study Groups</span>
              </TabsTrigger>
              <TabsTrigger
                value="links"
                className="flex items-center space-x-2"
              >
                <LinkIcon className="w-4 h-4" />
                <span>Group Links</span>
              </TabsTrigger>
            </TabsList>

            {/* Study Groups Tab */}
            <TabsContent value="groups" className="space-y-6">
              {/* Category Filters and Create Button */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={
                        selectedCategory === category ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="flex items-center space-x-2"
                    >
                      {category !== "All" &&
                        getCategoryIcon(category as StudyGroup["category"])}
                      <span>{category}</span>
                    </Button>
                  ))}
                </div>

                <Dialog
                  open={showCreateGroup}
                  onOpenChange={setShowCreateGroup}
                >
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-education text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Group
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Study Group</DialogTitle>
                      <DialogDescription>
                        Start a new study group and invite your peers to
                        collaborate.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="groupName">Group Name *</Label>
                        <Input
                          id="groupName"
                          placeholder="e.g. Data Structures Study Group"
                          value={newGroupData.name}
                          onChange={(e) =>
                            setNewGroupData({
                              ...newGroupData,
                              name: e.target.value,
                            })
                          }
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="groupDescription">Description *</Label>
                        <Textarea
                          id="groupDescription"
                          placeholder="Brief description of your study group..."
                          value={newGroupData.description}
                          onChange={(e) =>
                            setNewGroupData({
                              ...newGroupData,
                              description: e.target.value,
                            })
                          }
                          className="mt-1"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="college">College</Label>
                          <Input
                            id="college"
                            placeholder="Your college name"
                            value={newGroupData.college}
                            onChange={(e) =>
                              setNewGroupData({
                                ...newGroupData,
                                college: e.target.value,
                              })
                            }
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="subject">Subject</Label>
                          <Input
                            id="subject"
                            placeholder="Main subject/topic"
                            value={newGroupData.subject}
                            onChange={(e) =>
                              setNewGroupData({
                                ...newGroupData,
                                subject: e.target.value,
                              })
                            }
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={newGroupData.category}
                          onValueChange={(value: StudyGroup["category"]) =>
                            setNewGroupData({
                              ...newGroupData,
                              category: value,
                            })
                          }
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Academic">Academic</SelectItem>
                            <SelectItem value="Project">Project</SelectItem>
                            <SelectItem value="Competitive Programming">
                              Competitive Programming
                            </SelectItem>
                            <SelectItem value="Placement Prep">
                              Placement Prep
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          onClick={handleCreateGroup}
                          disabled={
                            !newGroupData.name || !newGroupData.description
                          }
                          className="flex-1"
                        >
                          Create Group
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setShowCreateGroup(false)}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Study Groups Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGroups.map((group) => (
                  <Card
                    key={group.id}
                    className="group hover:shadow-lg transition-all duration-300"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={group.avatar} alt={group.name} />
                            <AvatarFallback>
                              {group.name.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <CardTitle className="text-lg font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                              {group.name}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                              {group.college}
                            </p>
                          </div>
                        </div>
                        {group.isPrivate && (
                          <Badge variant="secondary" className="text-xs">
                            Private
                          </Badge>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {group.description}
                      </p>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>
                            {group.members}/{group.maxMembers} members
                          </span>
                        </div>
                        <Badge
                          variant="outline"
                          className="flex items-center space-x-1"
                        >
                          {getCategoryIcon(group.category)}
                          <span>{group.category}</span>
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{group.lastActivity}</span>
                        </div>
                        <span className="text-muted-foreground">
                          Admin: {group.admin}
                        </span>
                      </div>

                      {group.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {group.tags.slice(0, 3).map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="flex space-x-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          View Details
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 bg-gradient-education text-white"
                          asChild
                        >
                          <a
                            href={group.joinLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <UserPlus className="w-4 h-4 mr-1" />
                            Join
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredGroups.length === 0 && (
                <Card className="text-center py-12">
                  <CardContent>
                    <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      No study groups found
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your search or create a new study group to
                      get started.
                    </p>
                    <Button
                      onClick={() => setShowCreateGroup(true)}
                      className="bg-gradient-education text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create New Group
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Group Links Tab */}
            <TabsContent value="links" className="space-y-6">
              {/* Category Filters for Links */}
              <div className="flex flex-wrap gap-2">
                {linkCategories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      selectedLinkCategory === category ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedLinkCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Group Links Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLinks.map((link) => (
                  <Card
                    key={link.id}
                    className={`group hover:shadow-lg transition-all duration-300 ${link.featured ? "ring-2 ring-primary/20" : ""}`}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                            {getLinkIcon(link.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <CardTitle className="text-lg font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                                {link.title}
                              </CardTitle>
                              {link.featured && (
                                <Badge
                                  variant="default"
                                  className="bg-gradient-education text-white"
                                >
                                  <Star className="w-3 h-3 mr-1" />
                                  Featured
                                </Badge>
                              )}
                            </div>
                            <Badge variant="outline" className="mt-1">
                              {link.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {link.description}
                      </p>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">{link.category}</Badge>
                        </div>
                        {link.members && (
                          <div className="flex items-center space-x-1 text-muted-foreground">
                            <Users className="w-4 h-4" />
                            <span>{link.members} members</span>
                          </div>
                        )}
                      </div>

                      <Button
                        size="sm"
                        className="w-full bg-gradient-education text-white"
                        asChild
                      >
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Join {link.type}
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredLinks.length === 0 && (
                <Card className="text-center py-12">
                  <CardContent>
                    <LinkIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      No group links found
                    </h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search or category filter to find
                      relevant links.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>

          {/* Community Guidelines */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-6 h-6 text-primary" />
                <span>Community Guidelines</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Be Respectful</h4>
                  <p className="text-sm text-muted-foreground">
                    Treat all members with respect and maintain a positive
                    learning environment.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Share Knowledge</h4>
                  <p className="text-sm text-muted-foreground">
                    Help others by sharing your knowledge and learning
                    resources.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Stay Focused</h4>
                  <p className="text-sm text-muted-foreground">
                    Keep discussions relevant to the group's purpose and
                    academic goals.
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
