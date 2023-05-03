import {
  DocumentReference,
  doc,
  getDoc,
  getFirestore,
} from 'firebase/firestore';

import firebase from './index.ts';

const Database = getFirestore(firebase);

export type Role = 'ADMIN' | 'PERSON' | 'COMPANY';

export type UserData = {
  uid: string;
  role: Role;
};

export const getUserData = async (id: string) => {
  const users = await getDoc(
    doc(Database, 'users', id) as DocumentReference<UserData>,
  );
  return users.data();
};
