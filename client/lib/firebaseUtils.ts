/**
 * Utility functions for Firebase operations
 */

/**
 * Removes undefined values from an object recursively
 * Firebase Realtime Database doesn't allow undefined values
 */
export function sanitizeFirebaseData<T extends Record<string, any>>(obj: T): Partial<T> {
  const sanitized: any = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        // Recursively sanitize nested objects
        const nestedSanitized = sanitizeFirebaseData(value);
        if (Object.keys(nestedSanitized).length > 0) {
          sanitized[key] = nestedSanitized;
        }
      } else {
        sanitized[key] = value;
      }
    }
  }
  
  return sanitized;
}

/**
 * Creates a safe user profile object for Firebase
 */
export function createSafeUserProfile(user: any, additionalInfo?: any) {
  const baseProfile = {
    uid: user.uid,
    email: user.email || '',
    displayName: user.displayName || 'Anonymous User',
    isOnline: true,
    lastSeen: Date.now(),
    joinedAt: Date.now()
  };

  // Add photoURL only if it exists
  if (user.photoURL) {
    (baseProfile as any).photoURL = user.photoURL;
  }

  // Add additional info if provided
  if (additionalInfo) {
    if (additionalInfo.college) {
      (baseProfile as any).college = additionalInfo.college;
    }
    if (additionalInfo.year) {
      (baseProfile as any).year = additionalInfo.year;
    }
    if (additionalInfo.branch) {
      (baseProfile as any).branch = additionalInfo.branch;
    }
  }

  return sanitizeFirebaseData(baseProfile);
}

/**
 * Creates a safe message object for Firebase
 */
export function createSafeMessage(user: any, content: string, roomId: string) {
  const baseMessage = {
    userId: user.uid,
    username: user.displayName || 'Anonymous User',
    email: user.email || '',
    content,
    timestamp: Date.now(),
    roomId
  };

  // Add avatar only if it exists
  if (user.photoURL) {
    (baseMessage as any).avatar = user.photoURL;
  }

  return sanitizeFirebaseData(baseMessage);
}
