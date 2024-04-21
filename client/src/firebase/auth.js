import { auth } from "./firebase";
import {database} from "./firebase";
import {set, ref} from 'firebase/database';
import { createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword, signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from "firebase/auth";

export const createUser = async (email, password) => {
    const userCredential = await firebaseCreateUserWithEmailAndPassword(auth, email, password);
    const userID = userCredential.user.uid;
    await initializeUserData(userID);
    await firebaseSignOut(auth);
    return userCredential;
};

export const signIn = (email, password) => {
    return firebaseSignInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = signInWithPopup(auth, provider);
    // to store user login information use: result.user
    return result;
};

export const signOut = async() => {
  try {
    await firebaseSignOut(auth);
  } catch(error) {
    console.log("Sign out error", error.message);
  }
};

async function initializeUserData(userID) {
    try {
      // Set initial values for user data in the Realtime Database
      await set(ref(database, userID), {
        caloriesConsumed: 0, 
        savedRecipes: {
          0: "test"
        }
      });
      console.log('User data initialized successfully');
    } catch (error) {
      console.error('Error initializing user data:', error.message);
      throw error;
    }
  }
