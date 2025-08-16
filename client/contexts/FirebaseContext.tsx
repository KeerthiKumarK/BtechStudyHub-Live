import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider
} from 'firebase/auth';
import {
  ref,
  push,
  set,
  onValue,
  off,
  remove,
  update,
  serverTimestamp,
  DatabaseReference
} from 'firebase/database';
import { auth, database } from '@/lib/firebase';
import { sanitizeFirebaseData, createSafeUserProfile, createSafeMessage } from '@/lib/firebaseUtils';

// Types
export interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  email?: string;
  avatar?: string;
  content: string;
  timestamp: number;
  edited?: boolean;
  editedAt?: number;
  roomId: string;
}

export interface FeedbackEntry {
  id: string;
  userId: string;
  name: string;
  email: string;
  rating: number;
  feedback: string;
  additionalNeeds?: string;
  timestamp: number;
  status: 'pending' | 'reviewed' | 'resolved';
}

export interface FreelancingSubmission {
  id: string;
  userId: string;
  skills: string;
  experience: string;
  contactEmail: string;
  timestamp: number;
  status: 'pending' | 'contacted' | 'closed';
}

export interface ChatRoom {
  id: string;
  name: string;
  description: string;
  type: 'general' | 'year' | 'subject';
  memberCount: number;
  lastMessage?: ChatMessage;
  createdAt: number;
  createdBy: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  college?: string;
  year?: string;
  branch?: string;
  bio?: string;
  phone?: string;
  linkedIn?: string;
  github?: string;
  isOnline: boolean;
  lastSeen: number;
  joinedAt: number;
  profileImageURL?: string;
}

interface FirebaseContextType {
  // Auth
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isOnline: boolean;
  firebaseConnected: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, additionalInfo: any) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  logout: () => Promise<void>;

  // Chat
  sendMessage: (roomId: string, content: string) => Promise<void>;
  editMessage: (messageId: string, roomId: string, newContent: string) => Promise<void>;
  deleteMessage: (messageId: string, roomId: string) => Promise<void>;
  subscribeToMessages: (roomId: string, callback: (messages: ChatMessage[]) => void) => () => void;
  subscribeToRooms: (callback: (rooms: ChatRoom[]) => void) => () => void;

  // User Management
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  setUserOnlineStatus: (isOnline: boolean) => Promise<void>;
  uploadProfileImage: (file: File) => Promise<string>;

  // Feedback
  submitFeedback: (feedback: Omit<FeedbackEntry, 'id' | 'userId' | 'timestamp' | 'status'>) => Promise<void>;
  subscribeFeedback: (callback: (feedback: FeedbackEntry[]) => void) => () => void;

  // Freelancing
  submitFreelancingForm: (submission: Omit<FreelancingSubmission, 'id' | 'userId' | 'timestamp' | 'status'>) => Promise<void>;
}

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [firebaseConnected, setFirebaseConnected] = useState(false);

  // Initialize default chat rooms if they don't exist
  const initializeDefaultRooms = async () => {
    const roomsRef = ref(database, 'chatRooms');
    
    const defaultRooms = [
      {
        id: 'general',
        name: 'General Discussion',
        description: 'Main chat room for all BTech students',
        type: 'general' as const,
        memberCount: 0,
        createdAt: Date.now(),
        createdBy: 'system'
      },
      {
        id: 'year-1',
        name: '1st Year Students',
        description: 'Chat for 1st year BTech students',
        type: 'year' as const,
        memberCount: 0,
        createdAt: Date.now(),
        createdBy: 'system'
      },
      {
        id: 'year-2',
        name: '2nd Year Students',
        description: 'Chat for 2nd year BTech students',
        type: 'year' as const,
        memberCount: 0,
        createdAt: Date.now(),
        createdBy: 'system'
      },
      {
        id: 'year-3',
        name: '3rd Year Students',
        description: 'Chat for 3rd year BTech students',
        type: 'year' as const,
        memberCount: 0,
        createdAt: Date.now(),
        createdBy: 'system'
      },
      {
        id: 'year-4',
        name: '4th Year Students',
        description: 'Chat for 4th year BTech students',
        type: 'year' as const,
        memberCount: 0,
        createdAt: Date.now(),
        createdBy: 'system'
      },
      {
        id: 'cs-subject',
        name: 'Computer Science',
        description: 'CS students discussion room',
        type: 'subject' as const,
        memberCount: 0,
        createdAt: Date.now(),
        createdBy: 'system'
      }
    ];

    for (const room of defaultRooms) {
      await set(ref(database, `chatRooms/${room.id}`), room);
    }
  };

  // Auth functions
  const signIn = async (email: string, password: string) => {
    try {
      // Check if we're online
      if (!navigator.onLine) {
        throw new Error('No internet connection. Please check your network and try again.');
      }

      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error('Sign in error:', error);

      // Provide more user-friendly error messages
      if (error.code === 'auth/network-request-failed') {
        throw new Error('Network connection failed. Please check your internet connection and try again.');
      } else if (error.code === 'auth/user-not-found') {
        throw new Error('No account found with this email address.');
      } else if (error.code === 'auth/wrong-password') {
        throw new Error('Incorrect password. Please try again.');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Invalid email address format.');
      } else if (error.code === 'auth/user-disabled') {
        throw new Error('This account has been disabled.');
      } else if (error.code === 'auth/too-many-requests') {
        throw new Error('Too many failed attempts. Please try again later.');
      }

      throw error;
    }
  };

  const signUp = async (email: string, password: string, additionalInfo: any) => {
    try {
      // Check if we're online
      if (!navigator.onLine) {
        throw new Error('No internet connection. Please check your network and try again.');
      }

      const result = await createUserWithEmailAndPassword(auth, email, password);

      // Update display name
      await updateProfile(result.user, {
        displayName: `${additionalInfo.firstName} ${additionalInfo.lastName}`
      });

      // Create user profile in database
      const userProfile = createSafeUserProfile(result.user, additionalInfo);
      await set(ref(database, `users/${result.user.uid}`), userProfile);
    } catch (error: any) {
      console.error('Sign up error:', error);

      // Provide more user-friendly error messages
      if (error.code === 'auth/network-request-failed') {
        throw new Error('Network connection failed. Please check your internet connection and try again.');
      } else if (error.code === 'auth/email-already-in-use') {
        throw new Error('An account with this email already exists.');
      } else if (error.code === 'auth/weak-password') {
        throw new Error('Password should be at least 6 characters long.');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Invalid email address format.');
      }

      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Create or update user profile
      const userProfile = createSafeUserProfile(result.user);
      await set(ref(database, `users/${result.user.uid}`), userProfile);
    } catch (error: any) {
      console.error('Google sign in error:', error);
      if (error.code === 'auth/unauthorized-domain') {
        throw new Error('Social login is not available in this environment. Please use email/password login or contact the administrator to configure authorized domains.');
      }
      throw error;
    }
  };

  const signInWithGithub = async () => {
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Create or update user profile
      const userProfile = createSafeUserProfile(result.user);
      await set(ref(database, `users/${result.user.uid}`), userProfile);
    } catch (error: any) {
      console.error('Github sign in error:', error);
      if (error.code === 'auth/unauthorized-domain') {
        throw new Error('Social login is not available in this environment. Please use email/password login or contact the administrator to configure authorized domains.');
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (user) {
        await setUserOnlineStatus(false);
      }
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  // Chat functions
  const sendMessage = async (roomId: string, content: string) => {
    if (!user) throw new Error('User not authenticated');

    const message = createSafeMessage(user, content, roomId);
    const messagesRef = ref(database, `messages/${roomId}`);
    await push(messagesRef, message);

    // Update room's last message
    const roomRef = ref(database, `chatRooms/${roomId}/lastMessage`);
    await set(roomRef, { ...message, id: 'temp' });
  };

  const editMessage = async (messageId: string, roomId: string, newContent: string) => {
    if (!user) throw new Error('User not authenticated');

    const messageRef = ref(database, `messages/${roomId}/${messageId}`);
    await update(messageRef, {
      content: newContent,
      edited: true,
      editedAt: Date.now()
    });
  };

  const deleteMessage = async (messageId: string, roomId: string) => {
    if (!user) throw new Error('User not authenticated');

    const messageRef = ref(database, `messages/${roomId}/${messageId}`);
    await remove(messageRef);
  };

  const subscribeToMessages = (roomId: string, callback: (messages: ChatMessage[]) => void) => {
    const messagesRef = ref(database, `messages/${roomId}`);
    
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messages: ChatMessage[] = Object.entries(data).map(([id, message]: [string, any]) => ({
          id,
          ...message
        }));
        
        // Sort messages by timestamp
        messages.sort((a, b) => a.timestamp - b.timestamp);
        callback(messages);
      } else {
        callback([]);
      }
    });

    return () => off(messagesRef, 'value', unsubscribe);
  };

  const subscribeToRooms = (callback: (rooms: ChatRoom[]) => void) => {
    const roomsRef = ref(database, 'chatRooms');
    
    const unsubscribe = onValue(roomsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const rooms: ChatRoom[] = Object.entries(data).map(([id, room]: [string, any]) => ({
          id,
          ...room
        }));
        callback(rooms);
      } else {
        callback([]);
      }
    });

    return () => off(roomsRef, 'value', unsubscribe);
  };

  // User management
  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!user) throw new Error('User not authenticated');

    const sanitizedUpdates = sanitizeFirebaseData(updates);
    const userRef = ref(database, `users/${user.uid}`);
    await update(userRef, sanitizedUpdates);
  };

  const setUserOnlineStatus = async (isOnline: boolean) => {
    if (!user) return;

    const userRef = ref(database, `users/${user.uid}`);
    await update(userRef, {
      isOnline,
      lastSeen: Date.now()
    });
  };

  const uploadProfileImage = async (file: File): Promise<string> => {
    if (!user) throw new Error('User not authenticated');

    // Create a local URL for the uploaded file to display immediately
    const localImageURL = URL.createObjectURL(file);

    // For a real implementation, you would upload to Firebase Storage
    // For now, we'll store the local URL and simulate the upload
    const timestamp = Date.now();

    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Update user profile with new image URL
    await updateUserProfile({
      profileImageURL: localImageURL,
      lastImageUpdate: timestamp
    });

    return localImageURL;
  };

  // Feedback functions
  const submitFeedback = async (feedbackData: Omit<FeedbackEntry, 'id' | 'userId' | 'timestamp' | 'status'>) => {
    if (!user) throw new Error('User not authenticated');

    const feedback: Omit<FeedbackEntry, 'id'> = {
      ...feedbackData,
      userId: user.uid,
      timestamp: Date.now(),
      status: 'pending'
    };

    const sanitizedFeedback = sanitizeFirebaseData(feedback);
    const feedbackRef = ref(database, 'feedback');
    await push(feedbackRef, sanitizedFeedback);
  };

  const subscribeFeedback = (callback: (feedback: FeedbackEntry[]) => void) => {
    const feedbackRef = ref(database, 'feedback');

    const unsubscribe = onValue(feedbackRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const feedbackList: FeedbackEntry[] = Object.entries(data).map(([id, feedback]: [string, any]) => ({
          id,
          ...feedback
        }));

        // Sort by timestamp (newest first)
        feedbackList.sort((a, b) => b.timestamp - a.timestamp);
        callback(feedbackList);
      } else {
        callback([]);
      }
    });

    return () => off(feedbackRef, 'value', unsubscribe);
  };

  // Freelancing functions
  const submitFreelancingForm = async (submissionData: Omit<FreelancingSubmission, 'id' | 'userId' | 'timestamp' | 'status'>) => {
    if (!user) throw new Error('User not authenticated');

    const submission: Omit<FreelancingSubmission, 'id'> = {
      ...submissionData,
      userId: user.uid,
      timestamp: Date.now(),
      status: 'pending'
    };

    const sanitizedSubmission = sanitizeFirebaseData(submission);
    const freelancingRef = ref(database, 'freelancingSubmissions');
    await push(freelancingRef, sanitizedSubmission);

    // Here you would typically send an email to kolakeerthikumar@gmail.com
    // For now, we'll just store it in the database
    console.log('Freelancing form submitted:', submission);
  };

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Firebase connection monitoring
  useEffect(() => {
    const connectedRef = ref(database, '.info/connected');
    const unsubscribe = onValue(connectedRef, (snapshot) => {
      setFirebaseConnected(snapshot.val() === true);
    });

    return unsubscribe;
  }, []);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        // Listen to user profile changes
        const userProfileRef = ref(database, `users/${user.uid}`);
        const profileUnsubscribe = onValue(userProfileRef, (snapshot) => {
          const profileData = snapshot.val();
          if (profileData) {
            setUserProfile(profileData);
          }
        });

        // Set user online
        await setUserOnlineStatus(true);

        // Initialize default rooms if needed
        await initializeDefaultRooms();

        setLoading(false);

        // Return cleanup function for profile listener
        return () => {
          off(userProfileRef, 'value', profileUnsubscribe);
        };
      } else {
        setUserProfile(null);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  // Set user offline when window is closed
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (user) {
        setUserOnlineStatus(false);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [user]);

  const value: FirebaseContextType = {
    user,
    userProfile,
    loading,
    isOnline,
    firebaseConnected,
    signIn,
    signUp,
    signInWithGoogle,
    signInWithGithub,
    logout,
    sendMessage,
    editMessage,
    deleteMessage,
    subscribeToMessages,
    subscribeToRooms,
    updateUserProfile,
    setUserOnlineStatus,
    uploadProfileImage,
    submitFeedback,
    subscribeFeedback,
    submitFreelancingForm
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};
