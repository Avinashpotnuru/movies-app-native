import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  UserCredential,
} from "firebase/auth";
import { auth } from "../config/firebase";

export const registerUser = async (
  name: string,
  email: string,
  password: string,
): Promise<UserCredential> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  if (userCredential.user) {
    await updateProfile(userCredential.user, {
      displayName: name,
    });
  }

  return userCredential;
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<UserCredential> => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = async (): Promise<void> => {
  await signOut(auth);
};
