// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// Import Firestore SDK
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQlxXCKjKzIggiEYKtguvuXiz_49pjFGU",
  authDomain: "wordle-330a1.firebaseapp.com",
  projectId: "wordle-330a1",
  storageBucket: "wordle-330a1.firebasestorage.app",
  messagingSenderId: "264040730443",
  appId: "1:264040730443:web:fd6f01128784dea64622ce",
  measurementId: "G-GR4TTKP7WG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

// Export db to use in other files
export { db };
