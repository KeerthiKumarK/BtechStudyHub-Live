// Fallback authentication system when Firebase is unavailable
export interface FallbackUser {
  uid: string;
  email: string;
  displayName: string;
  isTemporary: boolean;
}

export interface FallbackUserProfile {
  uid: string;
  email: string;
  displayName: string;
  college?: string;
  year?: string;
  branch?: string;
  joinedAt: number;
  isOnline: boolean;
  profileImageURL?: string;
  isTemporary: boolean;
}

class FallbackAuthSystem {
  private users: Map<
    string,
    { user: FallbackUser; profile: FallbackUserProfile; password: string }
  > = new Map();
  private currentUser: FallbackUser | null = null;
  private listeners: Array<(user: FallbackUser | null) => void> = [];

  constructor() {
    // Load from localStorage if available
    const stored = localStorage.getItem("fallback_auth_data");
    if (stored) {
      try {
        const data = JSON.parse(stored);
        this.users = new Map(data.users || []);
        this.currentUser = data.currentUser || null;
      } catch (error) {
        console.warn("Failed to load fallback auth data:", error);
      }
    }

    // Create a demo user for testing
    this.createDemoUser();
  }

  private createDemoUser() {
    const demoUser: FallbackUser = {
      uid: "demo-user-123",
      email: "demo@example.com",
      displayName: "Demo User",
      isTemporary: true,
    };

    const demoProfile: FallbackUserProfile = {
      uid: "demo-user-123",
      email: "demo@example.com",
      displayName: "Demo User",
      college: "Demo College",
      year: "3rd Year",
      branch: "Computer Science",
      joinedAt: Date.now(),
      isOnline: true,
      isTemporary: true,
    };

    this.users.set("demo@example.com", {
      user: demoUser,
      profile: demoProfile,
      password: "demo123",
    });

    this.saveToStorage();
  }

  private saveToStorage() {
    try {
      const data = {
        users: Array.from(this.users.entries()),
        currentUser: this.currentUser,
      };
      localStorage.setItem("fallback_auth_data", JSON.stringify(data));
    } catch (error) {
      console.warn("Failed to save fallback auth data:", error);
    }
  }

  async signIn(email: string, password: string): Promise<FallbackUser> {
    const userData = this.users.get(email);
    if (!userData || userData.password !== password) {
      throw new Error("Invalid email or password");
    }

    this.currentUser = userData.user;
    this.saveToStorage();
    this.notifyListeners();
    return userData.user;
  }

  async signUp(
    email: string,
    password: string,
    additionalInfo: any,
  ): Promise<FallbackUser> {
    if (this.users.has(email)) {
      throw new Error("User already exists");
    }

    const uid = `fallback-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const user: FallbackUser = {
      uid,
      email,
      displayName: `${additionalInfo.firstName} ${additionalInfo.lastName}`,
      isTemporary: true,
    };

    const profile: FallbackUserProfile = {
      uid,
      email,
      displayName: user.displayName,
      college: additionalInfo.college,
      year: additionalInfo.year,
      branch: additionalInfo.branch,
      joinedAt: Date.now(),
      isOnline: true,
      isTemporary: true,
    };

    this.users.set(email, { user, profile, password });
    this.currentUser = user;
    this.saveToStorage();
    this.notifyListeners();
    return user;
  }

  async signOut(): Promise<void> {
    this.currentUser = null;
    this.saveToStorage();
    this.notifyListeners();
  }

  getCurrentUser(): FallbackUser | null {
    return this.currentUser;
  }

  getUserProfile(uid: string): FallbackUserProfile | null {
    for (const userData of this.users.values()) {
      if (userData.user.uid === uid) {
        return userData.profile;
      }
    }
    return null;
  }

  updateUserProfile(uid: string, updates: Partial<FallbackUserProfile>): void {
    for (const [email, userData] of this.users.entries()) {
      if (userData.user.uid === uid) {
        userData.profile = { ...userData.profile, ...updates };
        this.users.set(email, userData);
        this.saveToStorage();
        break;
      }
    }
  }

  onAuthStateChanged(
    callback: (user: FallbackUser | null) => void,
  ): () => void {
    this.listeners.push(callback);
    // Call immediately with current user
    callback(this.currentUser);

    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(callback);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.currentUser));
  }

  // Check if Firebase is available
  async testFirebaseConnection(): Promise<boolean> {
    try {
      // Try to make a simple request to Firebase
      const response = await fetch(
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/getProjectConfig?key=AIzaSyAPrU7_F5U0kDqosgI0eVU8VWsPdXQLDug",
      );
      return response.ok;
    } catch {
      return false;
    }
  }
}

export const fallbackAuth = new FallbackAuthSystem();
