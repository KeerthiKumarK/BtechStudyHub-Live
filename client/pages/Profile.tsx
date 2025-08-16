import React, { useState, useRef } from 'react';
import { useFirebase } from '@/contexts/FirebaseContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Camera, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Calendar,
  Github,
  Linkedin,
  Edit,
  Save,
  X,
  Upload
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Profile: React.FC = () => {
  const { user, userProfile, updateUserProfile, uploadProfileImage } = useFirebase();
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [profileImageKey, setProfileImageKey] = useState(Date.now());
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    displayName: userProfile?.displayName || '',
    email: userProfile?.email || '',
    phone: userProfile?.phone || '',
    college: userProfile?.college || '',
    year: userProfile?.year || '',
    branch: userProfile?.branch || '',
    bio: userProfile?.bio || '',
    linkedIn: userProfile?.linkedIn || '',
    github: userProfile?.github || ''
  });

  React.useEffect(() => {
    if (userProfile) {
      setFormData({
        displayName: userProfile.displayName || '',
        email: userProfile.email || '',
        phone: userProfile.phone || '',
        college: userProfile.college || '',
        year: userProfile.year || '',
        branch: userProfile.branch || '',
        bio: userProfile.bio || '',
        linkedIn: userProfile.linkedIn || '',
        github: userProfile.github || ''
      });
      // Update profile image key when userProfile changes to force re-render
      setProfileImageKey(Date.now());
    }
  }, [userProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Please select a valid image file.' });
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'Please select an image smaller than 5MB.' });
      return;
    }

    setIsUploading(true);
    setMessage(null);

    try {
      await uploadProfileImage(file);
      setMessage({ type: 'success', text: 'Profile image updated successfully!' });
      // Force immediate re-render of the profile image
      setProfileImageKey(Date.now());
      // Clear the file input to allow re-uploading the same file
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage({ type: 'error', text: 'Failed to upload image. Please try again.' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setIsSaving(true);
    setMessage(null);

    try {
      await updateUserProfile({
        displayName: formData.displayName,
        phone: formData.phone || undefined,
        college: formData.college || undefined,
        year: formData.year || undefined,
        branch: formData.branch || undefined,
        bio: formData.bio || undefined,
        linkedIn: formData.linkedIn || undefined,
        github: formData.github || undefined
      });

      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // Reset form data to original values
    if (userProfile) {
      setFormData({
        displayName: userProfile.displayName || '',
        email: userProfile.email || '',
        phone: userProfile.phone || '',
        college: userProfile.college || '',
        year: userProfile.year || '',
        branch: userProfile.branch || '',
        bio: userProfile.bio || '',
        linkedIn: userProfile.linkedIn || '',
        github: userProfile.github || ''
      });
    }
    setIsEditing(false);
    setMessage(null);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Please log in to view your profile.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Profile</h1>
          <p className="text-lg text-gray-600">
            Manage your account settings and personal information
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Image & Basic Info */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-6 h-6 text-blue-600" />
                <span>Profile Picture</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="relative inline-block mb-6">
                <Avatar className="w-32 h-32 mx-auto" key={`${userProfile?.profileImageURL}-${profileImageKey}`}>
                  <AvatarImage
                    src={userProfile?.profileImageURL || userProfile?.photoURL}
                    alt={userProfile?.displayName || 'Profile'}
                    key={`img-${userProfile?.profileImageURL}-${profileImageKey}`}
                  />
                  <AvatarFallback className="text-2xl bg-blue-100 text-blue-600">
                    {getInitials(userProfile?.displayName || 'User')}
                  </AvatarFallback>
                </Avatar>
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow-lg transition-colors disabled:opacity-50"
                >
                  {isUploading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Camera className="w-4 h-4" />
                  )}
                </button>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {userProfile?.displayName || 'User'}
              </h2>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>{userProfile?.email}</span>
                </div>
                
                {userProfile?.college && (
                  <div className="flex items-center justify-center space-x-2">
                    <GraduationCap className="w-4 h-4" />
                    <span>{userProfile.college}</span>
                  </div>
                )}
                
                {userProfile?.joinedAt && (
                  <div className="flex items-center justify-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {formatDate(userProfile.joinedAt)}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-2 text-sm">
                  <div className={`w-2 h-2 rounded-full ${userProfile?.isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                  <span className="text-gray-600">
                    {userProfile?.isOnline ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Edit className="w-6 h-6 text-blue-600" />
                  <span>Personal Information</span>
                </CardTitle>
                
                {!isEditing ? (
                  <Button 
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    size="sm"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button 
                      onClick={handleSave}
                      disabled={isSaving}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {isSaving ? 'Saving...' : 'Save'}
                    </Button>
                    <Button 
                      onClick={handleCancel}
                      variant="outline"
                      size="sm"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="displayName">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="displayName"
                        name="displayName"
                        value={formData.displayName}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="Enter your full name"
                      />
                    ) : (
                      <p className="mt-1 px-3 py-2 bg-gray-50 rounded-md text-gray-900">
                        {formData.displayName || 'Not specified'}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <p className="mt-1 px-3 py-2 bg-gray-50 rounded-md text-gray-500">
                      {formData.email} (Cannot be changed)
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="Enter your phone number"
                      />
                    ) : (
                      <p className="mt-1 px-3 py-2 bg-gray-50 rounded-md text-gray-900">
                        {formData.phone || 'Not specified'}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="college">College/University</Label>
                    {isEditing ? (
                      <Input
                        id="college"
                        name="college"
                        value={formData.college}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="Enter your college name"
                      />
                    ) : (
                      <p className="mt-1 px-3 py-2 bg-gray-50 rounded-md text-gray-900">
                        {formData.college || 'Not specified'}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="year">Academic Year</Label>
                    {isEditing ? (
                      <select
                        id="year"
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Year</option>
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                        <option value="Graduate">Graduate</option>
                      </select>
                    ) : (
                      <p className="mt-1 px-3 py-2 bg-gray-50 rounded-md text-gray-900">
                        {formData.year || 'Not specified'}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="branch">Branch/Department</Label>
                    {isEditing ? (
                      <Input
                        id="branch"
                        name="branch"
                        value={formData.branch}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="e.g., Computer Science"
                      />
                    ) : (
                      <p className="mt-1 px-3 py-2 bg-gray-50 rounded-md text-gray-900">
                        {formData.branch || 'Not specified'}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  {isEditing ? (
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      className="mt-1"
                      rows={3}
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="mt-1 px-3 py-2 bg-gray-50 rounded-md text-gray-900 min-h-[80px]">
                      {formData.bio || 'No bio added'}
                    </p>
                  )}
                </div>

                {/* Social Links */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Links</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="linkedIn" className="flex items-center space-x-2">
                        <Linkedin className="w-4 h-4 text-blue-600" />
                        <span>LinkedIn Profile</span>
                      </Label>
                      {isEditing ? (
                        <Input
                          id="linkedIn"
                          name="linkedIn"
                          value={formData.linkedIn}
                          onChange={handleInputChange}
                          className="mt-1"
                          placeholder="https://linkedin.com/in/yourname"
                        />
                      ) : (
                        <p className="mt-1 px-3 py-2 bg-gray-50 rounded-md text-gray-900">
                          {formData.linkedIn ? (
                            <a 
                              href={formData.linkedIn} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              {formData.linkedIn}
                            </a>
                          ) : (
                            'Not specified'
                          )}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="github" className="flex items-center space-x-2">
                        <Github className="w-4 h-4 text-gray-900" />
                        <span>GitHub Profile</span>
                      </Label>
                      {isEditing ? (
                        <Input
                          id="github"
                          name="github"
                          value={formData.github}
                          onChange={handleInputChange}
                          className="mt-1"
                          placeholder="https://github.com/yourname"
                        />
                      ) : (
                        <p className="mt-1 px-3 py-2 bg-gray-50 rounded-md text-gray-900">
                          {formData.github ? (
                            <a 
                              href={formData.github} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              {formData.github}
                            </a>
                          ) : (
                            'Not specified'
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {message && (
                  <Alert className={message.type === 'error' ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}>
                    <AlertDescription className={message.type === 'error' ? 'text-red-800' : 'text-green-800'}>
                      {message.text}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
