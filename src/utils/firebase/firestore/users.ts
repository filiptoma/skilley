import {
    collection,
    CollectionReference,
    DocumentReference,
    doc,
    getDoc,
    setDoc
} from "firebase/firestore";

import { firestore } from "..";

import { TUser } from "../../../common/types";

export const usersDoc = (uid: string) =>
    doc(firestore, "users", uid) as DocumentReference<TUser>;

export const usersCol = collection(
    firestore,
    "users"
) as CollectionReference<TUser>;

export const getUser = (uid: string) => getDoc(usersDoc(uid));

export const setUser = (uid: string, payload: TUser) =>
    setDoc(usersDoc(uid), payload);
