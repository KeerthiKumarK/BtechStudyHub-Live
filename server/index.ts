import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { submitFeedback, getFeedback } from "./routes/feedback";
import { submitFreelancingForm, getFreelancingSubmissions, updateSubmissionStatus } from "./routes/freelancing";
import { updateProfile, getProfile, uploadProfileImage, deleteProfile } from "./routes/profile";
import { submitContactForm, getContactSubmissions, updateContactStatus } from "./routes/contact";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Feedback routes
  app.post("/api/feedback", submitFeedback);
  app.get("/api/feedback", getFeedback);

  // Freelancing routes
  app.post("/api/freelancing/submit", submitFreelancingForm);
  app.get("/api/freelancing/submissions", getFreelancingSubmissions);
  app.put("/api/freelancing/submissions/:id/status", updateSubmissionStatus);

  // Profile routes
  app.get("/api/profile/:userId", getProfile);
  app.put("/api/profile/:userId", updateProfile);
  app.post("/api/profile/:userId/image", uploadProfileImage);
  app.delete("/api/profile/:userId", deleteProfile);

  // Contact routes
  app.post("/api/contact", submitContactForm);
  app.get("/api/contact/submissions", getContactSubmissions);
  app.put("/api/contact/submissions/:id/status", updateContactStatus);

  return app;
}
