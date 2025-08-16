import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFirebase, ChatMessage, ChatRoom } from "@/contexts/FirebaseContext";
import { 
  MessageCircle, 
  Send, 
  Search,
  Users,
  Settings,
  Edit3,
  Trash2,
  MoreVertical,
  UserPlus,
  Hash,
  Clock,
  CheckCheck,
  Smile,
  Paperclip,
  Phone,
  Video,
  BookOpen,
  X
} from "lucide-react";

export default function Chat() {
  const navigate = useNavigate();
  const { 
    user, 
    userProfile, 
    sendMessage, 
    editMessage, 
    deleteMessage, 
    subscribeToMessages, 
    subscribeToRooms 
  } = useFirebase();
  
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [showRoomList, setShowRoomList] = useState(false);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [groupFormData, setGroupFormData] = useState({
    name: "",
    description: "",
    type: "general" as "general" | "year" | "subject"
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Subscribe to chat rooms
  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeToRooms((rooms) => {
      setChatRooms(rooms);
      if (!selectedRoom && rooms.length > 0) {
        setSelectedRoom(rooms[0]);
      }
    });

    return unsubscribe;
  }, [user, subscribeToRooms, selectedRoom]);

  // Subscribe to messages for selected room
  useEffect(() => {
    if (!selectedRoom || !user) return;

    const unsubscribe = subscribeToMessages(selectedRoom.id, (roomMessages) => {
      setMessages(roomMessages);
    });

    return unsubscribe;
  }, [selectedRoom, user, subscribeToMessages]);

  // Show authentication required if not logged in
  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 bg-gradient-education rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Authentication Required</h2>
            <p className="text-muted-foreground mb-6">
              Please log in to access the chat feature and connect with fellow students.
            </p>
            <Button 
              asChild 
              className="bg-gradient-education text-white"
              onClick={() => navigate('/login')}
            >
              <span>Login to Chat</span>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedRoom) return;

    try {
      await sendMessage(selectedRoom.id, newMessage);
      setNewMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleEditMessage = async (messageId: string, newContent: string) => {
    if (!selectedRoom) return;

    try {
      await editMessage(messageId, selectedRoom.id, newContent);
      setEditingMessageId(null);
      setEditContent("");
    } catch (error) {
      console.error('Error editing message:', error);
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    if (!selectedRoom) return;

    try {
      await deleteMessage(messageId, selectedRoom.id);
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatLastSeen = (timestamp: number) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleCreateGroup = async () => {
    if (!groupFormData.name.trim() || !groupFormData.description.trim()) {
      return;
    }

    try {
      // This would typically involve creating a new room in Firebase
      // For now, we'll just reset the form and close the dialog
      console.log('Creating group:', groupFormData);
      setGroupFormData({ name: "", description: "", type: "general" });
      setShowCreateGroup(false);
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  const filteredMessages = messages.filter(msg =>
    msg.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRooms = chatRooms.filter(room =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-4">
        <div className="h-[calc(100vh-8rem)] bg-background rounded-lg border border-border overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-4 h-full relative">
            
            {/* Sidebar - Chat Rooms */}
            <div className={`lg:col-span-1 border-r border-border bg-muted/30 ${
              showRoomList ? 'block absolute inset-0 z-10 lg:relative lg:z-auto' : 'hidden lg:block'
            }`}>
              {/* Header */}
              <div className="p-4 border-b border-border bg-background">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-foreground">Chat Rooms</h2>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="lg:hidden"
                      onClick={() => setShowRoomList(false)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="ghost">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Chat Settings</DialogTitle>
                          <DialogDescription>
                            Manage your chat preferences and room settings.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Button
                            className="w-full"
                            variant="outline"
                            onClick={() => setShowCreateGroup(true)}
                          >
                            <UserPlus className="w-4 h-4 mr-2" />
                            Create Group
                          </Button>
                          <Button className="w-full" variant="outline">
                            <Users className="w-4 h-4 mr-2" />
                            Manage Members
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {/* Create Group Dialog */}
                    <Dialog open={showCreateGroup} onOpenChange={setShowCreateGroup}>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Create New Group</DialogTitle>
                          <DialogDescription>
                            Create a new study group for your college or subject.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="groupName">Group Name *</Label>
                            <Input
                              id="groupName"
                              placeholder="e.g. Computer Science 2024"
                              value={groupFormData.name}
                              onChange={(e) => setGroupFormData({...groupFormData, name: e.target.value})}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="groupDescription">Description *</Label>
                            <Input
                              id="groupDescription"
                              placeholder="Brief description of the group"
                              value={groupFormData.description}
                              onChange={(e) => setGroupFormData({...groupFormData, description: e.target.value})}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="groupType">Group Type</Label>
                            <Select
                              value={groupFormData.type}
                              onValueChange={(value: "general" | "year" | "subject") =>
                                setGroupFormData({...groupFormData, type: value})
                              }
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select group type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="general">General Discussion</SelectItem>
                                <SelectItem value="year">Year-based Group</SelectItem>
                                <SelectItem value="subject">Subject-specific</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              onClick={handleCreateGroup}
                              disabled={!groupFormData.name.trim() || !groupFormData.description.trim()}
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
                </div>
                
                {/* Search Rooms */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search rooms..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Room List */}
              <ScrollArea className="flex-1">
                <div className="p-2 space-y-1">
                  {filteredRooms.map((room) => (
                    <Card
                      key={room.id}
                      className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                        selectedRoom?.id === room.id ? 'bg-primary/10 border-primary' : ''
                      }`}
                      onClick={() => {
                        setSelectedRoom(room);
                        setShowRoomList(false);
                      }}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-education rounded-full flex items-center justify-center">
                            {room.type === 'general' ? (
                              <Hash className="w-5 h-5 text-white" />
                            ) : room.type === 'year' ? (
                              <Users className="w-5 h-5 text-white" />
                            ) : (
                              <BookOpen className="w-5 h-5 text-white" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-sm text-foreground truncate">
                                {room.name}
                              </h3>
                              {room.lastMessage && (
                                <span className="text-xs text-muted-foreground">
                                  {formatLastSeen(room.lastMessage.timestamp)}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-xs text-muted-foreground truncate">
                                {room.lastMessage?.content || room.description}
                              </p>
                              <Badge variant="secondary" className="text-xs">
                                {room.memberCount}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Main Chat Area */}
            <div className="lg:col-span-3 flex flex-col">
              {selectedRoom ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-border bg-background">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="lg:hidden"
                          onClick={() => setShowRoomList(!showRoomList)}
                        >
                          <Users className="w-4 h-4" />
                        </Button>
                        <div className="w-10 h-10 bg-gradient-education rounded-full flex items-center justify-center">
                          <Hash className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{selectedRoom.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {selectedRoom.memberCount} members
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Messages Area */}
                  <ScrollArea className="flex-1 p-4 max-h-[60vh] overflow-y-auto">
                    <div className="space-y-4">
                      {filteredMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.userId === user.uid ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl ${
                              message.userId === user.uid
                                ? 'order-2'
                                : 'order-1'
                            }`}
                          >
                            <div className="flex items-end space-x-2 group">
                              {message.userId !== user.uid && (
                                <Avatar className="w-8 h-8">
                                  <AvatarImage src={message.avatar} />
                                  <AvatarFallback className="text-xs bg-gradient-education text-white">
                                    {getInitials(message.username)}
                                  </AvatarFallback>
                                </Avatar>
                              )}
                              
                              <div className="flex-1">
                                {message.userId !== user.uid && (
                                  <p className="text-xs text-muted-foreground mb-1 ml-1">
                                    {message.username}
                                  </p>
                                )}
                                
                                <div
                                  className={`relative p-3 rounded-lg ${
                                    message.userId === user.uid
                                      ? 'bg-primary text-primary-foreground ml-4'
                                      : 'bg-muted text-foreground'
                                  }`}
                                >
                                  {editingMessageId === message.id ? (
                                    <div className="space-y-2">
                                      <Input
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                        onKeyPress={(e) => {
                                          if (e.key === 'Enter') {
                                            handleEditMessage(message.id, editContent);
                                          }
                                        }}
                                        className="bg-background"
                                      />
                                      <div className="flex space-x-2">
                                        <Button
                                          size="sm"
                                          onClick={() => handleEditMessage(message.id, editContent)}
                                        >
                                          Save
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() => {
                                            setEditingMessageId(null);
                                            setEditContent("");
                                          }}
                                        >
                                          Cancel
                                        </Button>
                                      </div>
                                    </div>
                                  ) : (
                                    <>
                                      <p className="text-sm">{message.content}</p>
                                      {message.edited && (
                                        <p className="text-xs opacity-70 mt-1">
                                          edited {formatTime(message.editedAt!)}
                                        </p>
                                      )}
                                    </>
                                  )}

                                  {/* Message Actions */}
                                  {message.userId === user.uid && editingMessageId !== message.id && (
                                    <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <div className="flex space-x-1 bg-background border border-border rounded-md p-1">
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          className="h-6 w-6 p-0"
                                          onClick={() => {
                                            setEditingMessageId(message.id);
                                            setEditContent(message.content);
                                          }}
                                        >
                                          <Edit3 className="w-3 h-3" />
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          className="h-6 w-6 p-0 text-destructive"
                                          onClick={() => handleDeleteMessage(message.id)}
                                        >
                                          <Trash2 className="w-3 h-3" />
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                                
                                <div className={`flex items-center space-x-1 mt-1 ${
                                  message.userId === user.uid ? 'justify-end' : 'justify-start'
                                }`}>
                                  <span className="text-xs text-muted-foreground">
                                    {formatTime(message.timestamp)}
                                  </span>
                                  {message.userId === user.uid && (
                                    <CheckCheck className="w-3 h-3 text-primary" />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  {/* Message Input */}
                  <div className="p-4 border-t border-border bg-background">
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="ghost">
                        <Paperclip className="w-4 h-4" />
                      </Button>
                      <div className="flex-1 relative">
                        <Input
                          placeholder="Type a message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                          className="pr-12"
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute right-1 top-1/2 transform -translate-y-1/2"
                        >
                          <Smile className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="bg-gradient-education text-white"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No Room Selected</h3>
                    <p className="text-muted-foreground">
                      Select a chat room to start messaging with fellow students
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
