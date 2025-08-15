import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  Copy, 
  ExternalLink, 
  CheckCircle,
  Globe,
  Settings
} from "lucide-react";
import { useState } from "react";

export default function FirebaseConfigInstructions() {
  const [copiedDomain, setCopiedDomain] = useState(false);
  
  const currentDomain = window.location.origin;
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedDomain(true);
    setTimeout(() => setCopiedDomain(false), 2000);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-orange-500" />
          <CardTitle className="text-lg">Firebase Configuration Required</CardTitle>
        </div>
        <CardDescription>
          Social authentication requires domain authorization in your Firebase console.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <Alert>
          <Globe className="h-4 w-4" />
          <AlertDescription>
            <strong>Current Domain:</strong> {currentDomain}
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 h-6 px-2"
              onClick={() => copyToClipboard(currentDomain)}
            >
              {copiedDomain ? (
                <CheckCircle className="w-3 h-3 text-green-500" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </Button>
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <h3 className="font-semibold flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>How to Fix This Issue:</span>
          </h3>
          
          <div className="space-y-3 pl-6">
            <div className="flex items-start space-x-3">
              <Badge variant="outline" className="mt-0.5">1</Badge>
              <div>
                <p className="font-medium">Open Firebase Console</p>
                <p className="text-sm text-muted-foreground">
                  Go to{" "}
                  <Button
                    variant="link"
                    className="p-0 h-auto text-sm"
                    onClick={() => window.open('https://console.firebase.google.com', '_blank')}
                  >
                    console.firebase.google.com
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Badge variant="outline" className="mt-0.5">2</Badge>
              <div>
                <p className="font-medium">Select Your Project</p>
                <p className="text-sm text-muted-foreground">
                  Click on your BTech Study Hub project (btechstudyhub-5c16d)
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Badge variant="outline" className="mt-0.5">3</Badge>
              <div>
                <p className="font-medium">Navigate to Authentication</p>
                <p className="text-sm text-muted-foreground">
                  In the left sidebar, click "Authentication"
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Badge variant="outline" className="mt-0.5">4</Badge>
              <div>
                <p className="font-medium">Go to Settings</p>
                <p className="text-sm text-muted-foreground">
                  Click on the "Settings" tab at the top
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Badge variant="outline" className="mt-0.5">5</Badge>
              <div>
                <p className="font-medium">Add Authorized Domain</p>
                <p className="text-sm text-muted-foreground">
                  In the "Authorized domains" section, click "Add domain" and paste:
                </p>
                <div className="mt-2 p-2 bg-muted rounded-md font-mono text-sm flex items-center justify-between">
                  <span>{currentDomain.replace('https://', '').replace('http://', '')}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2"
                    onClick={() => copyToClipboard(currentDomain.replace('https://', '').replace('http://', ''))}
                  >
                    {copiedDomain ? (
                      <CheckCircle className="w-3 h-3 text-green-500" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Badge variant="outline" className="mt-0.5">6</Badge>
              <div>
                <p className="font-medium">Save Changes</p>
                <p className="text-sm text-muted-foreground">
                  Click "Save" and wait a few minutes for the changes to take effect
                </p>
              </div>
            </div>
          </div>
        </div>

        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Alternative:</strong> You can still use email/password authentication which works without additional configuration.
          </AlertDescription>
        </Alert>

        <div className="pt-4 border-t">
          <h4 className="font-medium mb-2">Need Help?</h4>
          <p className="text-sm text-muted-foreground">
            If you continue to experience issues after following these steps, please contact support or refer to the{" "}
            <Button
              variant="link"
              className="p-0 h-auto text-sm"
              onClick={() => window.open('https://firebase.google.com/docs/auth/web/start', '_blank')}
            >
              Firebase Authentication documentation
              <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
