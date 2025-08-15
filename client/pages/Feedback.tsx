import React, { useState, useEffect } from 'react';
import { useFirebase, FeedbackEntry } from '@/contexts/FirebaseContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, StarIcon, MessageSquare, Clock, User } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const StarRating: React.FC<{ rating: number; onRatingChange?: (rating: number) => void; readonly?: boolean }> = ({ 
  rating, 
  onRatingChange, 
  readonly = false 
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
          onMouseEnter={() => !readonly && setHoverRating(star)}
          onMouseLeave={() => !readonly && setHoverRating(0)}
          onClick={() => !readonly && onRatingChange?.(star)}
        >
          {star <= (hoverRating || rating) ? (
            <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
          ) : (
            <StarIcon className="w-6 h-6 text-gray-300" />
          )}
        </button>
      ))}
    </div>
  );
};

const FeedbackCard: React.FC<{ feedback: FeedbackEntry }> = ({ feedback }) => {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">{feedback.name}</p>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{formatDate(feedback.timestamp)}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <StarRating rating={feedback.rating} readonly />
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(feedback.status)}`}>
              {feedback.status}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Feedback:</h4>
            <p className="text-gray-700 leading-relaxed">{feedback.feedback}</p>
          </div>
          {feedback.additionalNeeds && (
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Additional Needs/Suggestions:</h4>
              <p className="text-gray-700 leading-relaxed">{feedback.additionalNeeds}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const Feedback: React.FC = () => {
  const { user, submitFeedback, subscribeFeedback } = useFirebase();
  const [feedbackList, setFeedbackList] = useState<FeedbackEntry[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 0,
    feedback: '',
    additionalNeeds: ''
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.displayName || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  useEffect(() => {
    setIsLoadingFeedback(true);
    const unsubscribe = subscribeFeedback((feedback) => {
      setFeedbackList(feedback);
      setIsLoadingFeedback(false);
    });
    return unsubscribe;
  }, [subscribeFeedback]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setMessage({ type: 'error', text: 'Please log in to submit feedback.' });
      return;
    }

    if (!formData.name || !formData.email || !formData.feedback || formData.rating === 0) {
      setMessage({ type: 'error', text: 'Please fill in all required fields and provide a rating.' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      await submitFeedback({
        name: formData.name,
        email: formData.email,
        rating: formData.rating,
        feedback: formData.feedback,
        additionalNeeds: formData.additionalNeeds || undefined
      });

      setMessage({ type: 'success', text: 'Thank you for your feedback! It has been submitted successfully.' });

      // Reset form (except name and email)
      setFormData(prev => ({
        ...prev,
        rating: 0,
        feedback: '',
        additionalNeeds: ''
      }));

      // Manually trigger a refresh of the feedback list after a short delay
      setTimeout(() => {
        // Force a re-render by re-subscribing to feedback
        const refreshUnsubscribe = subscribeFeedback(setFeedbackList);
        // Clean up after a brief moment
        setTimeout(() => refreshUnsubscribe(), 100);
      }, 500);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setMessage({ type: 'error', text: 'Failed to submit feedback. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Share Your Feedback</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Help us improve BTech Study Hub by sharing your thoughts, reviews, and suggestions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Feedback Form */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-6 h-6 text-blue-600" />
                <span>Submit Your Feedback</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
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
                    <Label htmlFor="email">Email *</Label>
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
                  <Label>Rating *</Label>
                  <div className="mt-2">
                    <StarRating rating={formData.rating} onRatingChange={handleRatingChange} />
                    <p className="text-sm text-gray-500 mt-1">Rate your experience with BTech Study Hub</p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="feedback">Feedback/Review *</Label>
                  <Textarea
                    id="feedback"
                    name="feedback"
                    value={formData.feedback}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                    rows={4}
                    placeholder="Share your thoughts about BTech Study Hub..."
                  />
                </div>

                <div>
                  <Label htmlFor="additionalNeeds">Additional Needs/Suggestions</Label>
                  <Textarea
                    id="additionalNeeds"
                    name="additionalNeeds"
                    value={formData.additionalNeeds}
                    onChange={handleInputChange}
                    className="mt-1"
                    rows={3}
                    placeholder="Any additional features or improvements you'd like to see..."
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
                  {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Recent Reviews */}
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="w-6 h-6 text-yellow-500" />
                  <span>Recent Reviews from Students</span>
                </CardTitle>
              </CardHeader>
            </Card>

            <div className="max-h-[600px] overflow-y-auto space-y-4">
              {isLoadingFeedback ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-500">Loading feedback...</p>
                  </CardContent>
                </Card>
              ) : feedbackList.length > 0 ? (
                feedbackList.slice(0, 10).map((feedback) => (
                  <FeedbackCard key={feedback.id} feedback={feedback} />
                ))
              ) : (
                <Card>
                  <CardContent className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No reviews yet. Be the first to share your feedback!</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
