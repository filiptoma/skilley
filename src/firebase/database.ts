import {
  DocumentReference,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from 'firebase/firestore';

import firebase from './index.ts';

const db = getFirestore(firebase);

export type Role = 'ADMIN' | 'PERSON' | 'COMPANY';

export type UserData = {
  id: string;
  role: Role;
};

const usersDoc = (id: string) =>
  doc(db, 'users', id) as DocumentReference<UserData>;

export const getUserData = async (id: string) => {
  const user = await getDoc(usersDoc(id));
  return user.data();
};

export const setUserData = async (id: string, data: UserData) => {
  await setDoc(usersDoc(id), data);
  return getUserData(id);
};
