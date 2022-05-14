import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut as authSignOut,
    User
} from "firebase/auth";

import { auth } from ".";

// Sign up handler
export const signUp = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);

// Sign in handler
export const signIn = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

// Sign out handler
export const signOut = () => authSignOut(auth);

// Subscribe to auth state changes
export const onAuthChanged = (cb: (u: User | null) => void) =>
    onAuthStateChanged(auth, cb);
