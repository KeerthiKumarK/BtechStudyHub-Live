import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  Clock,
  MessageSquare,
  User,
  Globe,
  Github,
  Linkedin,
  Twitter
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setMessage({ type: 'error', text: 'Please fill in all required fields.' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      // Submit to backend API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage({ 
          type: 'success', 
          text: 'Thank you for your message! We will get back to you soon.' 
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessage({ 
        type: 'error', 
        text: 'Failed to send message. Please try again or contact us directly at kolakeerthikumar@gmail.com' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get in touch with us for any questions, suggestions, or collaboration opportunities. 
              We're here to help you succeed in your BTech journey!
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              {/* Contact Details */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="w-6 h-6 text-blue-600" />
                    <span>Get In Touch</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <a 
                        href="mailto:kolakeerthikumar@gmail.com" 
                        className="text-blue-600 hover:underline"
                      >
                        kolakeerthikumar@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <p className="text-gray-600">Available via email</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Response Time</p>
                      <p className="text-gray-600">24-48 hours</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Globe className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Location</p>
                      <p className="text-gray-600">India</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card>
                <CardHeader>
                  <CardTitle>Connect With Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <Button 
                      variant="outline" 
                      className="flex flex-col items-center p-4 h-auto"
                      onClick={() => window.open('https://github.com', '_blank')}
                    >
                      <Github className="w-6 h-6 mb-2" />
                      <span className="text-xs">GitHub</span>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="flex flex-col items-center p-4 h-auto"
                      onClick={() => window.open('https://linkedin.com', '_blank')}
                    >
                      <Linkedin className="w-6 h-6 mb-2 text-blue-600" />
                      <span className="text-xs">LinkedIn</span>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="flex flex-col items-center p-4 h-auto"
                      onClick={() => window.open('https://twitter.com', '_blank')}
                    >
                      <Twitter className="w-6 h-6 mb-2 text-blue-400" />
                      <span className="text-xs">Twitter</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Office Hours */}
              <Card>
                <CardHeader>
                  <CardTitle>Support Hours</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium">Emergency Only</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Send className="w-6 h-6 text-blue-600" />
                    <span>Send us a Message</span>
                  </CardTitle>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                        placeholder="What is your message about?"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                        rows={6}
                        placeholder="Tell us how we can help you..."
                      />
                    </div>

                    {message && (
                      <Alert className={message.type === 'error' ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}>
                        <AlertDescription className={message.type === 'error' ? 'text-red-800' : 'text-green-800'}>
                          {message.text}
                        </AlertDescription>
                      </Alert>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full bg-blue-600 hover:bg-blue-700" 
                      disabled={isSubmitting}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* FAQ Section */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-1">How can I access premium content?</h4>
                    <p className="text-gray-600 text-sm">
                      Currently, all our content is free for BTech students. We're working on premium features that will be announced soon.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-1">Can I contribute content to the platform?</h4>
                    <p className="text-gray-600 text-sm">
                      Yes! We welcome contributions from students and educators. Contact us with your content ideas and we'll guide you through the process.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-1">Is there a mobile app available?</h4>
                    <p className="text-gray-600 text-sm">
                      We're currently developing mobile apps for iOS and Android. Stay tuned for updates by following our social media channels.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-1">How do I report technical issues?</h4>
                    <p className="text-gray-600 text-sm">
                      Please use the contact form above or email us directly with a detailed description of the issue, including your browser and device information.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
