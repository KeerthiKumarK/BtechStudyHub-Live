import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Construction } from "lucide-react";

interface ComingSoonProps {
  pageName: string;
  description?: string;
}

export default function ComingSoon({ pageName, description }: ComingSoonProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-16 h-16 bg-gradient-education rounded-full flex items-center justify-center mx-auto mb-6">
          <Construction className="w-8 h-8 text-white" />
        </div>
        
        <h1 className="text-3xl font-bold text-foreground mb-4">
          {pageName} Coming Soon
        </h1>
        
        <p className="text-muted-foreground mb-6">
          {description || `We're working hard to bring you the ${pageName.toLowerCase()} section. Stay tuned for updates!`}
        </p>
        
        <p className="text-sm text-muted-foreground mb-8">
          Want to see this page implemented? Let us know what features you'd like to see!
        </p>
        
        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          
          <Button variant="outline" asChild className="w-full">
            <Link to="/contact">
              Request Features
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
