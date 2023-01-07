import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

const viteEnv = import.meta.env;

export const firebaseConfig = {
  apiKey: viteEnv.VITE_API_KEY,
  authDomain: viteEnv.VITE_AUTH_DOMAIN,
  projectId: viteEnv.VITE_PROJECT_ID,
  storageBucket: viteEnv.VITE_STORAGE_BUCKET,
  messagingSenderId: viteEnv.VITE_MESSAGING_SENDER_ID,
  appId: viteEnv.VITE_APP_ID,
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);
