import { Request, Response } from 'express';

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

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updates = req.body;

    // Validate user ID
    if (!userId) {
      return res.status(400).json({
        error: 'User ID is required'
      });
    }

    // Validate allowed fields
    const allowedFields = [
      'displayName', 'college', 'year', 'branch', 'bio', 
      'phone', 'linkedIn', 'github', 'profileImageURL'
    ];
    
    const updateFields = Object.keys(updates);
    const invalidFields = updateFields.filter(field => !allowedFields.includes(field));
    
    if (invalidFields.length > 0) {
      return res.status(400).json({
        error: `Invalid fields: ${invalidFields.join(', ')}`
      });
    }

    // Validate specific field formats
    if (updates.phone && !/^[\+]?[\d\s\-\(\)]+$/.test(updates.phone)) {
      return res.status(400).json({
        error: 'Invalid phone number format'
      });
    }

    if (updates.linkedIn && !updates.linkedIn.startsWith('https://')) {
      return res.status(400).json({
        error: 'LinkedIn URL must start with https://'
      });
    }

    if (updates.github && !updates.github.startsWith('https://')) {
      return res.status(400).json({
        error: 'GitHub URL must start with https://'
      });
    }

    if (updates.year && !['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate'].includes(updates.year)) {
      return res.status(400).json({
        error: 'Invalid year. Must be one of: 1st Year, 2nd Year, 3rd Year, 4th Year, Graduate'
      });
    }

    // In a real application, you would:
    // 1. Verify the user has permission to update this profile
    // 2. Update the database record
    // 3. Return the updated profile

    console.log(`Updating profile for user ${userId}:`, updates);

    res.json({
      message: 'Profile updated successfully',
      userId,
      updatedFields: updateFields,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        error: 'User ID is required'
      });
    }

    // In a real application, you would fetch from database
    // For now, return a sample response
    const sampleProfile: Partial<UserProfile> = {
      uid: userId,
      email: 'user@example.com',
      displayName: 'Sample User',
      college: 'Sample College',
      year: '3rd Year',
      branch: 'Computer Science',
      isOnline: true,
      lastSeen: Date.now(),
      joinedAt: Date.now() - 30 * 24 * 60 * 60 * 1000 // 30 days ago
    };

    res.json({
      profile: sampleProfile
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

export const uploadProfileImage = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({
        error: 'User ID is required'
      });
    }

    // In a real application, you would:
    // 1. Handle file upload (using multer or similar)
    // 2. Validate file type and size
    // 3. Upload to cloud storage (AWS S3, Google Cloud Storage, etc.)
    // 4. Update user profile with new image URL
    
    // For this example, we'll return a placeholder URL
    const placeholderURL = `https://ui-avatars.com/api/?name=User&background=0ea5e9&color=fff&size=200&${Date.now()}`;

    console.log(`Profile image upload requested for user ${userId}`);

    res.json({
      message: 'Profile image uploaded successfully',
      imageURL: placeholderURL,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Error uploading profile image:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

export const deleteProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        error: 'User ID is required'
      });
    }

    // In a real application, you would:
    // 1. Verify user has permission to delete this profile
    // 2. Delete related data (messages, feedback, etc.)
    // 3. Delete the user profile
    // 4. Clean up any uploaded files

    console.log(`Profile deletion requested for user ${userId}`);

    res.json({
      message: 'Profile deletion initiated',
      userId,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Error deleting profile:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};
