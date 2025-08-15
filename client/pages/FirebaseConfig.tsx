import Layout from "@/components/Layout";
import FirebaseConfigInstructions from "@/components/FirebaseConfigInstructions";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Settings } from "lucide-react";

export default function FirebaseConfig() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link to="/login">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Link>
            </Button>
            
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-education rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Firebase Configuration</h1>
                <p className="text-muted-foreground">Set up social authentication for BTech Study Hub</p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <FirebaseConfigInstructions />

          {/* Footer Actions */}
          <div className="mt-8 text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/login">
                  Try Login Again
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/signup">
                  Create Account with Email
                </Link>
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Email/password authentication works immediately without additional setup
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
