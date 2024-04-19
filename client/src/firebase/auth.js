import { auth } from "./firebase";
import {database} from "./firebase";
import {set, ref} from 'firebase/database';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";


export const doCreateUserWithEmailAndPassord = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userID = userCredential.user.uid;
    await initializeUserData(userID);
    return userCredential;
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

export const doSignInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    // to store user login information use: result.user

    return result;
};

export const doSignOut = () => {
    return auth.signOut();
};

// export const doPasswordReset = (email) => {
//     return sendPasswordResetEmail(auth, email);
// };

// export const doPasswordChange = (password) => {
//     return doPasswordChange(auth.currentUser, password);
// };

// export const doSendEmailVerification = () => {
//     return sendEmailVerification(auth.currentUser, {
//         url: `${window.location.origin}/home`,
//     });
// };