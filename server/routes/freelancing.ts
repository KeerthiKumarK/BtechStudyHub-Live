import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

export interface FreelancingSubmission {
  id: string;
  userId: string;
  skills: string;
  experience: string;
  contactEmail: string;
  timestamp: number;
  status: 'pending' | 'contacted' | 'closed';
}

// Email configuration - you would set these in your environment variables
const createEmailTransporter = () => {
  // For production, use a service like SendGrid, AWS SES, or similar
  return nodemailer.createTransporter({
    // Gmail configuration example (replace with your email service)
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS  // Your app password
    }
  });
};

export const submitFreelancingForm = async (req: Request, res: Response) => {
  try {
    const { skills, experience, contactEmail } = req.body;

    // Validate required fields
    if (!skills || !experience || !contactEmail) {
      return res.status(400).json({
        error: 'Missing required fields: skills, experience, and contactEmail are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail)) {
      return res.status(400).json({
        error: 'Invalid email format'
      });
    }

    const submissionData = {
      skills,
      experience,
      contactEmail,
      timestamp: new Date().toISOString(),
      submittedAt: new Date().toLocaleString()
    };

    // Log the submission
    console.log('Freelancing form submitted:', submissionData);

    // Send email notification to kolakeerthikumar@gmail.com
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const transporter = createEmailTransporter();
        
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: 'kolakeerthikumar@gmail.com',
          subject: 'New Part-Time Job Application - BTech Study Hub',
          html: `
            <h2>New Part-Time Job Application Received</h2>
            <p>A new student has submitted their information for part-time opportunities:</p>
            
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
              <h3>Applicant Details:</h3>
              <p><strong>Contact Email:</strong> ${contactEmail}</p>
              <p><strong>Submitted On:</strong> ${submissionData.submittedAt}</p>
            </div>
            
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
              <h3>Skills:</h3>
              <p>${skills}</p>
            </div>
            
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
              <h3>Experience:</h3>
              <p>${experience}</p>
            </div>
            
            <p style="margin-top: 20px; color: #666;">
              This application was submitted through the BTech Study Hub platform.
            </p>
          `
        };

        await transporter.sendMail(mailOptions);
        console.log('Email notification sent successfully');
      } else {
        console.log('Email credentials not configured, skipping email notification');
      }
    } catch (emailError) {
      console.error('Error sending email notification:', emailError);
      // Don't fail the request if email fails
    }

    res.status(201).json({
      message: 'Application submitted successfully',
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Error submitting freelancing form:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

export const getFreelancingSubmissions = async (req: Request, res: Response) => {
  try {
    const { limit = 10, status = 'pending' } = req.query;

    // In a real application, you would query your database
    // This endpoint would typically be protected and only accessible by admins
    const sampleSubmissions: Partial<FreelancingSubmission>[] = [
      {
        id: 'sample-1',
        skills: 'React, Node.js, Python',
        experience: '2 years of web development',
        contactEmail: 'student@example.com',
        timestamp: Date.now() - 86400000, // 1 day ago
        status: 'pending'
      }
    ];

    res.json({
      submissions: sampleSubmissions,
      total: sampleSubmissions.length,
      limit: Number(limit)
    });
  } catch (error) {
    console.error('Error fetching freelancing submissions:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

export const updateSubmissionStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'contacted', 'closed'].includes(status)) {
      return res.status(400).json({
        error: 'Invalid status. Must be one of: pending, contacted, closed'
      });
    }

    // In a real application, you would update the database record
    console.log(`Updating submission ${id} status to ${status}`);

    res.json({
      message: 'Submission status updated successfully',
      id,
      status
    });
  } catch (error) {
    console.error('Error updating submission status:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};
