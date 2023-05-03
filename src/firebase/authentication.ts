import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  User,
  onAuthStateChanged,
} from 'firebase/auth';

import firebase from './index.ts';

const Auth = getAuth(firebase);

export const signUp = (email: string, password: string) => {
  createUserWithEmailAndPassword(Auth, email, password);
};

export const signIn = (email: string, password: string) => {
  signInWithEmailAndPassword(Auth, email, password);
};

export const signOut = () => {
  fbSignOut(Auth);
};

export const onAuthChanged = (
  callback: (user: User | null) => Promise<void>,
) => {
  onAuthStateChanged(Auth, callback);
};
