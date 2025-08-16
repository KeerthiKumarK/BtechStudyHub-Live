import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getDatabase, connectDatabaseEmulator } from 'firebase/database';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAPrU7_F5U0kDqosgI0eVU8VWsPdXQLDug",
  authDomain: "btechstudyhub-5c16d.firebaseapp.com",
  projectId: "btechstudyhub-5c16d",
  storageBucket: "btechstudyhub-5c16d.firebasestorage.app",
  messagingSenderId: "512504024293",
  appId: "1:512504024293:web:02636f482be10065d8580c"
};

// Validate Firebase configuration
const validateFirebaseConfig = () => {
  const requiredFields = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
  const missingFields = requiredFields.filter(field => !firebaseConfig[field as keyof typeof firebaseConfig]);

  if (missingFields.length > 0) {
    console.error('Missing Firebase configuration fields:', missingFields);
    throw new Error(`Firebase configuration incomplete. Missing: ${missingFields.join(', ')}`);
  }
};

// Validate configuration before initializing
validateFirebaseConfig();

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Firebase initialization failed:', error);
  throw new Error('Failed to initialize Firebase. Please check your configuration.');
}

// Initialize Firebase services
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);

// Test Firebase connection
export const testFirebaseConnection = async () => {
  try {
    // Simple connectivity test
    const testRef = ref(database, '.info/connected');
    return new Promise((resolve, reject) => {
      const unsubscribe = onValue(testRef, (snapshot) => {
        unsubscribe();
        if (snapshot.val() === true) {
          console.log('Firebase connection test successful');
          resolve(true);
        } else {
          console.warn('Firebase connection test failed - not connected');
          reject(new Error('Firebase connection test failed'));
        }
      }, (error) => {
        unsubscribe();
        console.error('Firebase connection test error:', error);
        reject(error);
      });
    });
  } catch (error) {
    console.error('Firebase connection test failed:', error);
    throw error;
  }
};

// For development: Connect to Firebase emulators if running locally
// Uncomment these lines if you want to use Firebase emulators in development
/*
if (import.meta.env.DEV) {
  try {
    connectAuthEmulator(auth, 'http://localhost:9099');
    connectDatabaseEmulator(database, 'localhost', 9000);
    connectStorageEmulator(storage, 'localhost', 9199);
    connectFirestoreEmulator(firestore, 'localhost', 8080);
  } catch (error) {
    console.log('Firebase emulators already connected or not available');
  }
}
*/

export default app;
