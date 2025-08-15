import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl font-bold text-primary mb-4">404</div>
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Oops! Page not found
          </h1>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Return to Home
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link to="/mcqs">
                <Search className="w-4 h-4 mr-2" />
                Browse MCQs
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
