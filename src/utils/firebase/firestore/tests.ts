import {
    arrayRemove,
    arrayUnion,
    collection,
    CollectionReference,
    doc,
    DocumentReference,
    getDoc,
    setDoc,
    updateDoc
} from "firebase/firestore";

import { firestore } from "..";

import { TQuestion, TTest } from "../../../common/types";

export const testsDoc = (id: string) =>
    doc(firestore, "tests", id) as DocumentReference<TTest>;

export const testsCol = collection(
    firestore,
    "tests"
) as CollectionReference<TTest>;

export const getTest = (id: string) => getDoc(testsDoc(id));

export const setTest = (id: string, payload: TTest) => setDoc(testsDoc(id), payload);

export const updateTest = (id: string, payload: Partial<TTest>) =>
    updateDoc(testsDoc(id), payload);

export const addQuestion = (id: string, payload: TQuestion) =>
    updateDoc(testsDoc(id), {
        questions: arrayUnion(payload)
    });

export const removeQuestion = (id: string, payload: TQuestion) =>
    updateDoc(testsDoc(id), {
        questions: arrayRemove(payload)
    });
