import React from 'react';
import { useFirebase } from '@/contexts/FirebaseContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Wifi, WifiOff, Database, DatabaseZap, Shield } from 'lucide-react';

export default function ConnectionStatus() {
  const { isOnline, firebaseConnected, useFallbackAuth } = useFirebase();

  // Don't show anything if everything is working
  if (isOnline && firebaseConnected) {
    return null;
  }

  return (
    <div className="fixed top-16 left-4 right-4 z-50 max-w-md mx-auto">
      {!isOnline && (
        <Alert className="mb-2 border-red-200 bg-red-50">
          <WifiOff className="w-4 h-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>No Internet Connection</strong>
            <br />
            Please check your network connection and try again.
          </AlertDescription>
        </Alert>
      )}

      {isOnline && !firebaseConnected && (
        <Alert className="mb-2 border-orange-200 bg-orange-50">
          <Database className="w-4 h-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Database Connection Issue</strong>
            <br />
            Having trouble connecting to our servers. Some features may not work properly.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
