// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmJyfc0rI_LGre0a73EnOaP24XK4kCM6s",
  authDomain: "ccb-auth-d5134.firebaseapp.com",
  projectId: "ccb-auth-d5134",
  storageBucket: "ccb-auth-d5134.appspot.com",
  messagingSenderId: "659462386792",
  appId: "1:659462386792:web:4e14d10e99c8d2508677dd", 
  databaseURL: "https://ccb-auth-d5134-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, auth, database };