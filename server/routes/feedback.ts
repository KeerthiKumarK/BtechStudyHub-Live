import { Request, Response } from 'express';

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

// This would typically interface with your database
// For now, we'll return success responses since Firebase handles the storage
export const submitFeedback = async (req: Request, res: Response) => {
  try {
    const { name, email, rating, feedback, additionalNeeds } = req.body;

    // Validate required fields
    if (!name || !email || !rating || !feedback) {
      return res.status(400).json({
        error: 'Missing required fields: name, email, rating, and feedback are required'
      });
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        error: 'Rating must be between 1 and 5'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email format'
      });
    }

    // In a real application, you might:
    // 1. Save to database
    // 2. Send notification emails
    // 3. Queue for review
    // 4. Trigger webhooks

    console.log('Feedback submitted:', {
      name,
      email,
      rating,
      feedback,
      additionalNeeds,
      timestamp: new Date().toISOString()
    });

    res.status(201).json({
      message: 'Feedback submitted successfully',
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

export const getFeedback = async (req: Request, res: Response) => {
  try {
    const { limit = 10, status = 'pending' } = req.query;

    // In a real application, you would query your database
    // For now, return a sample response
    const sampleFeedback: Partial<FeedbackEntry>[] = [
      {
        id: 'sample-1',
        name: 'John Doe',
        rating: 5,
        feedback: 'Excellent platform for BTech students!',
        timestamp: Date.now() - 86400000, // 1 day ago
        status: 'reviewed'
      }
    ];

    res.json({
      feedback: sampleFeedback,
      total: sampleFeedback.length,
      limit: Number(limit)
    });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};
