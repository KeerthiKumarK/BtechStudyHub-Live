import "./global.css";
import React from "react";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FirebaseProvider } from "@/contexts/FirebaseContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import FirebaseConfig from "./pages/FirebaseConfig";
import MCQs from "./pages/MCQs";
import Textbooks from "./pages/Textbooks";
import PreviousPapers from "./pages/PreviousPapers";
import Videos from "./pages/Videos";
import Skills from "./pages/Skills";
import Internships from "./pages/Internships";
import Chat from "./pages/Chat";
import Community from "./pages/Community";
import Freelancing from "./pages/Freelancing";
import Feedback from "./pages/Feedback";
import Profile from "./pages/Profile";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <FirebaseProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/firebase-config" element={<FirebaseConfig />} />
          <Route path="/mcqs" element={<MCQs />} />
          <Route path="/textbooks" element={<Textbooks />} />
          <Route path="/papers" element={<PreviousPapers />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/community" element={<Community />} />
          <Route path="/freelancing" element={<Freelancing />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </FirebaseProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
