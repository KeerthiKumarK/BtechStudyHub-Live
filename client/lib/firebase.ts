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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);

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
