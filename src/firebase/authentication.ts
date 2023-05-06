import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  User,
  onAuthStateChanged,
} from 'firebase/auth';

import firebase from './index.ts';

const auth = getAuth(firebase);

export const signUp = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

export const signIn = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const signOut = () => fbSignOut(auth);

export const onAuthChanged = (callback: (user: User | null) => void) =>
  onAuthStateChanged(auth, callback);
