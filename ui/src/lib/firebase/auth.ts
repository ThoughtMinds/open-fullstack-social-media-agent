import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "@/utils/firebase.browser";

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(getErrorMessage(error.code));
  }
};

export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(getErrorMessage(error.code));
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error("Failed to sign out.");
  }
};

export const formatAuthUser = (user: User) => ({
  uid: user.uid,
  email: user.email,
});

const getErrorMessage = (errorCode: string) => {
  switch (errorCode) {
    case "auth/user-not-found":
      return "No user found with this email.";
    case "auth/wrong-password":
      return "Incorrect password.";
    case "auth/invalid-email":
      return "Invalid email address.";
    case "auth/invalid-credential":
      return "Invalid credentials.";
    case "auth/email-already-in-use":
      return "This email is already in use.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";
    default:
      return "An error occurred. Please try again.";
  }
};