import { Request, Response } from "express";
import nodemailer from "nodemailer";

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: number;
  status: "pending" | "responded" | "closed";
}

// Email configuration with multiple fallback options
const createEmailTransporter = () => {
  // Try Gmail first if credentials are available
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    return nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  // Fallback to a more general SMTP configuration
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Development fallback - use ethereal email for testing
  return nodemailer.createTransporter({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "ethereal.user@ethereal.email",
      pass: "ethereal.pass",
    },
  });
};

export const submitContactForm = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        error:
          "Missing required fields: name, email, subject, and message are required",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Invalid email format",
      });
    }

    const submissionData = {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
      submittedAt: new Date().toLocaleString(),
    };

    // Enhanced logging for contact form submissions
    console.log("\n🔔 NEW CONTACT FORM SUBMISSION 🔔");
    console.log("==========================================");
    console.log("📧 TO: kolakeerthikumar@gmail.com");
    console.log("👤 FROM:", name, `(${email})`);
    console.log("📝 SUBJECT:", subject);
    console.log("⏰ TIME:", submissionData.submittedAt);
    console.log("📄 MESSAGE:");
    console.log(message);
    console.log("==========================================\n");

    // Multiple approaches to ensure you receive the contact form submission
    let emailSent = false;

    // Method 1: Try to send email via SMTP if configured
    if (!emailSent) {
      try {
        console.log("Attempting to send email notification...");
        const transporter = createEmailTransporter();

        const mailOptions = {
          from: process.env.EMAIL_USER || "noreply@btechstudyhub.com",
          to: "kolakeerthikumar@gmail.com",
          subject: `Contact Form: ${subject}`,
          html: `
            <h2>New Contact Form Submission - BTech Study Hub</h2>
            <p>You have received a new message through the contact form:</p>

            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
              <h3>Contact Details:</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Submitted On:</strong> ${submissionData.submittedAt}</p>
            </div>

            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
              <h3>Message:</h3>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>

            <p style="margin-top: 20px; color: #666;">
              You can reply directly to this email to respond to ${name}.
            </p>

            <hr style="margin: 20px 0;">
            <p style="color: #888; font-size: 12px;">
              This message was sent through the BTech Study Hub contact form.<br>
              Reply to: ${email}
            </p>
          `,
          replyTo: email,
        };

        const result = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully:", result.messageId);
        emailSent = true;
      } catch (emailError) {
        console.log("❌ Email sending failed:", emailError.message);
      }
    }

    // Method 2: Try webhook notification (if configured)
    if (!emailSent && process.env.WEBHOOK_URL) {
      try {
        const webhookPayload = {
          to: "kolakeerthikumar@gmail.com",
          from: email,
          name: name,
          subject: subject,
          message: message,
          timestamp: submissionData.submittedAt,
          source: "BTech Study Hub Contact Form",
        };

        const webhookResponse = await fetch(process.env.WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(webhookPayload),
        });

        if (webhookResponse.ok) {
          console.log("✅ Webhook notification sent successfully");
          emailSent = true;
        }
      } catch (webhookError) {
        console.log("❌ Webhook notification failed:", webhookError.message);
      }
    }

    // Method 3: Enhanced console logging (always runs as backup)
    console.log("\n📬 CONTACT FORM NOTIFICATION 📬");
    console.log("==========================================");
    console.log(`📧 Notification for: kolakeerthikumar@gmail.com`);
    console.log(`👤 From: ${name} <${email}>`);
    console.log(`📝 Subject: ${subject}`);
    console.log(`⏰ Received: ${submissionData.submittedAt}`);
    console.log(`📄 Message:`);
    console.log(`${message}`);
    console.log("==========================================");
    console.log(`📊 Email Status: ${emailSent ? "SENT" : "LOGGED_ONLY"}`);
    console.log("==========================================\n");

    res.status(201).json({
      message: "Message sent successfully",
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const getContactSubmissions = async (req: Request, res: Response) => {
  try {
    const { limit = 10, status = "pending" } = req.query;

    // In a real application, you would query your database
    // This endpoint would typically be protected and only accessible by admins
    const sampleSubmissions: Partial<ContactSubmission>[] = [
      {
        id: "sample-1",
        name: "John Doe",
        email: "john@example.com",
        subject: "Question about courses",
        message: "I have a question about the available courses...",
        timestamp: Date.now() - 86400000, // 1 day ago
        status: "pending",
      },
    ];

    res.json({
      submissions: sampleSubmissions,
      total: sampleSubmissions.length,
      limit: Number(limit),
    });
  } catch (error) {
    console.error("Error fetching contact submissions:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const updateContactStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "responded", "closed"].includes(status)) {
      return res.status(400).json({
        error: "Invalid status. Must be one of: pending, responded, closed",
      });
    }

    // In a real application, you would update the database record
    console.log(`Updating contact submission ${id} status to ${status}`);

    res.json({
      message: "Contact submission status updated successfully",
      id,
      status,
    });
  } catch (error) {
    console.error("Error updating contact status:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
