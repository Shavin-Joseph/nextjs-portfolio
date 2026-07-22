import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDC8-xNR7J3zGzkX_FT0CHobOP8HdZzNWg",
  authDomain: "havinjosephdotme.firebaseapp.com",
  projectId: "havinjosephdotme",
  storageBucket: "havinjosephdotme.firebasestorage.app",
  messagingSenderId: "736636360035",
  appId: "1:736636360035:web:08ef5e06078b9cea876f56",
  measurementId: "G-RYPNNKS9J9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);