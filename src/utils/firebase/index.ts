import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

initializeApp({
    apiKey: "AIzaSyASjKz2R_KjD-zdqys4u5I0yxBTsk4H9bY",
    authDomain: "skilley-mvp.firebaseapp.com",
    projectId: "skilley-mvp",
    storageBucket: "skilley-mvp.appspot.com",
    messagingSenderId: "1018192897310",
    appId: "1:1018192897310:web:91f2113263ccd7f9d5550f"
});

export const auth = getAuth();

export const firestore = getFirestore();
