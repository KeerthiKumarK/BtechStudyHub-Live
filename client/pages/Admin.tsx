import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "@/contexts/FirebaseContext";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Shield,
  Users,
  MessageCircle,
  FileText,
  BarChart3,
  Settings,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  Plus,
  Download,
  Upload,
  Lock,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  Globe,
  Database,
  Zap,
} from "lucide-react";

// Admin credentials
const ADMIN_EMAIL = "kolakeerthikumar@gmail.com";
const ADMIN_PASSWORD = "Keerthi@28";

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalMessages: number;
  totalGroups: number;
  totalFeedback: number;
  totalInternships: number;
}

interface AdminActivity {
  id: string;
  action: string;
  timestamp: number;
  user: string;
  details: string;
}

export default function Admin() {
  const navigate = useNavigate();
  const { user, userProfile } = useFirebase();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 1250,
    activeUsers: 320,
    totalMessages: 15430,
    totalGroups: 45,
    totalFeedback: 180,
    totalInternships: 25,
  });

  const [recentActivity] = useState<AdminActivity[]>([
    {
      id: "1",
      action: "User Registration",
      timestamp: Date.now() - 1000 * 60 * 15,
      user: "Priya Sharma",
      details: "New user joined from IIT Delhi",
    },
    {
      id: "2",
      action: "Message Sent",
      timestamp: Date.now() - 1000 * 60 * 30,
      user: "Rahul Kumar",
      details: "Message in Data Structures group",
    },
    {
      id: "3",
      action: "Feedback Submitted",
      timestamp: Date.now() - 1000 * 60 * 45,
      user: "Sneha Reddy",
      details: "Rating: 5 stars - Great platform!",
    },
    {
      id: "4",
      action: "Group Created",
      timestamp: Date.now() - 1000 * 60 * 60,
      user: "Arjun Singh",
      details: "ML Study Group - 15 members",
    },
    {
      id: "5",
      action: "File Upload",
      timestamp: Date.now() - 1000 * 60 * 90,
      user: "Vikram Patel",
      details: "Study material for Computer Networks",
    },
  ]);

  const [announcements, setAnnouncements] = useState([
    {
      id: "1",
      title: "Platform Maintenance",
      message: "Scheduled maintenance on Sunday 2-4 AM IST",
      type: "warning",
      active: true,
    },
    {
      id: "2",
      title: "New Features Released",
      message: "Portfolio templates and resume builder now available",
      type: "success",
      active: true,
    },
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    message: "",
    type: "info",
  });

  useEffect(() => {
    // Check if current user is admin
    if (user?.email === ADMIN_EMAIL) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);

  const { signIn } = useFirebase();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    // Verify the entered credentials match the admin credentials
    if (
      loginData.email === ADMIN_EMAIL &&
      loginData.password === ADMIN_PASSWORD
    ) {
      try {
        // Try to sign in the admin user
        await signIn(ADMIN_EMAIL, ADMIN_PASSWORD);
        // The useEffect will handle setting isAuthenticated when user changes
      } catch (error: any) {
        console.error("Admin login error:", error);
        setLoginError("Failed to authenticate admin user. Please try again.");
      }
    } else {
      setLoginError("Invalid admin credentials");
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const getTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const handleAddAnnouncement = () => {
    if (newAnnouncement.title && newAnnouncement.message) {
      const announcement = {
        id: Date.now().toString(),
        ...newAnnouncement,
        active: true,
      };
      setAnnouncements((prev) => [announcement, ...prev]);
      setNewAnnouncement({ title: "", message: "", type: "info" });
    }
  };

  const toggleAnnouncement = (id: string) => {
    setAnnouncements((prev) =>
      prev.map((ann) =>
        ann.id === id ? { ...ann, active: !ann.active } : ann,
      ),
    );
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((ann) => ann.id !== id));
  };

  // If not authenticated, show login form
  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-education rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Admin Access</CardTitle>
              <p className="text-muted-foreground">
                Please enter admin credentials to continue
              </p>
              <div className="mt-4 p-3 bg-muted rounded-lg text-sm">
                <p className="font-medium mb-1">Admin Credentials:</p>
                <p>Email: kolakeerthikumar@gmail.com</p>
                <p>Password: Keerthi@28</p>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    placeholder="Admin email"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    placeholder="Admin password"
                    className="mt-1"
                  />
                </div>
                {loginError && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                      {loginError}
                    </AlertDescription>
                  </Alert>
                )}
                <Button
                  type="submit"
                  className="w-full bg-gradient-education text-white"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Login to Admin Panel
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800">
        {/* Header */}
        <div className="bg-gradient-education text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">
                    Admin Dashboard
                  </h1>
                  <p className="text-blue-100">
                    BTech Study Hub - Control Panel
                  </p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white">
                Welcome, {userProfile?.displayName || "Admin"}
              </Badge>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Users</p>
                    <p className="text-2xl font-bold">
                      {stats.totalUsers.toLocaleString()}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">
                      Active Users
                    </p>
                    <p className="text-2xl font-bold">{stats.activeUsers}</p>
                  </div>
                  <Activity className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">
                      Total Messages
                    </p>
                    <p className="text-2xl font-bold">
                      {stats.totalMessages.toLocaleString()}
                    </p>
                  </div>
                  <MessageCircle className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">
                      Study Groups
                    </p>
                    <p className="text-2xl font-bold">{stats.totalGroups}</p>
                  </div>
                  <Users className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Feedback</p>
                    <p className="text-2xl font-bold">{stats.totalFeedback}</p>
                  </div>
                  <FileText className="w-8 h-8 text-indigo-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Internships</p>
                    <p className="text-2xl font-bold">
                      {stats.totalInternships}
                    </p>
                  </div>
                  <Globe className="w-8 h-8 text-teal-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Admin Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="announcements">Announcements</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Activity className="w-5 h-5" />
                      <span>Recent Activity</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg"
                        >
                          <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium text-sm">
                                {activity.action}
                              </p>
                              <span className="text-xs text-muted-foreground">
                                {getTimeAgo(activity.timestamp)}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {activity.user}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {activity.details}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Zap className="w-5 h-5" />
                      <span>Quick Actions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="h-auto p-4 flex-col">
                        <Database className="w-6 h-6 mb-2" />
                        <span className="text-sm">Backup Data</span>
                      </Button>
                      <Button variant="outline" className="h-auto p-4 flex-col">
                        <Download className="w-6 h-6 mb-2" />
                        <span className="text-sm">Export Users</span>
                      </Button>
                      <Button variant="outline" className="h-auto p-4 flex-col">
                        <Upload className="w-6 h-6 mb-2" />
                        <span className="text-sm">Import Content</span>
                      </Button>
                      <Button variant="outline" className="h-auto p-4 flex-col">
                        <BarChart3 className="w-6 h-6 mb-2" />
                        <span className="text-sm">Analytics</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Input
                        placeholder="Search users..."
                        className="max-w-sm"
                      />
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add User
                      </Button>
                    </div>
                    <p className="text-muted-foreground">
                      User management interface would be implemented here with
                      full CRUD operations.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Content Tab */}
            <TabsContent value="content">
              <Card>
                <CardHeader>
                  <CardTitle>Content Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-24 flex-col">
                      <FileText className="w-6 h-6 mb-2" />
                      <span>Manage Textbooks</span>
                    </Button>
                    <Button variant="outline" className="h-24 flex-col">
                      <MessageCircle className="w-6 h-6 mb-2" />
                      <span>Chat Moderation</span>
                    </Button>
                    <Button variant="outline" className="h-24 flex-col">
                      <Globe className="w-6 h-6 mb-2" />
                      <span>Internship Posts</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Announcements Tab */}
            <TabsContent value="announcements" className="space-y-6">
              {/* Create Announcement */}
              <Card>
                <CardHeader>
                  <CardTitle>Create Announcement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={newAnnouncement.title}
                        onChange={(e) =>
                          setNewAnnouncement({
                            ...newAnnouncement,
                            title: e.target.value,
                          })
                        }
                        placeholder="Announcement title"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        value={newAnnouncement.message}
                        onChange={(e) =>
                          setNewAnnouncement({
                            ...newAnnouncement,
                            message: e.target.value,
                          })
                        }
                        placeholder="Announcement message"
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                    <Button
                      onClick={handleAddAnnouncement}
                      className="bg-gradient-education text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Announcement
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Existing Announcements */}
              <Card>
                <CardHeader>
                  <CardTitle>Active Announcements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {announcements.map((announcement) => (
                      <div
                        key={announcement.id}
                        className="p-4 border rounded-lg"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-medium">
                                {announcement.title}
                              </h4>
                              <Badge
                                variant={
                                  announcement.active ? "default" : "secondary"
                                }
                              >
                                {announcement.active ? "Active" : "Inactive"}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground text-sm">
                              {announcement.message}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                toggleAnnouncement(announcement.id)
                              }
                            >
                              {announcement.active ? (
                                <Eye className="w-4 h-4" />
                              ) : (
                                <EyeOff className="w-4 h-4" />
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                deleteAnnouncement(announcement.id)
                              }
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3">Security Settings</h4>
                        <div className="space-y-2">
                          <Button
                            variant="outline"
                            className="w-full justify-start"
                          >
                            <Shield className="w-4 h-4 mr-2" />
                            Change Admin Password
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full justify-start"
                          >
                            <Lock className="w-4 h-4 mr-2" />
                            Two-Factor Authentication
                          </Button>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-3">System Maintenance</h4>
                        <div className="space-y-2">
                          <Button
                            variant="outline"
                            className="w-full justify-start"
                          >
                            <Database className="w-4 h-4 mr-2" />
                            Database Maintenance
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full justify-start"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            System Backup
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
