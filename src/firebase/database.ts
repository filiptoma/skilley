import {
  CollectionReference,
  DocumentReference,
  QueryConstraint,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';

import { TJobForm, TJobPlace, TJobSkill } from 'utils/schemas.ts';

import firebase from './index.ts';

const db = getFirestore(firebase);

export type Role = 'ADMIN' | 'PERSON' | 'COMPANY';

export type UserData = {
  id: string;
  role: Role;
  name: string;
  email: string;
  bio?: string;
};

export const usersCollection = collection(
  db,
  'users',
) as CollectionReference<UserData>;

export const usersByRoleQuery = (role: Role) =>
  query(usersCollection, where('role', '==', role));

const userDoc = (id: string) =>
  doc(db, 'users', id) as DocumentReference<UserData>;

export const getUserData = async (id: string) => {
  const user = await getDoc(userDoc(id));
  return user.data();
};

export const addUserData = async (id: string, data: UserData) => {
  await setDoc(userDoc(id), data);
  return getUserData(id);
};

export const updateUserData = async (id: string, data: UserData) => {
  await updateDoc(userDoc(id), data);
  return getUserData(id);
};

export const deleteUserData = async (id: string) => {
  await deleteDoc(userDoc(id));
};

export type JobOffer = {
  id: string;
  company: UserData;
  name: string;
  skill: TJobSkill;
  tags: Tag[];
  place: TJobPlace;
  form: TJobForm;
  wage: number;
  start: Date;
  createdAt: Date;
  updatedAt: Date;
  isTopped: boolean;
  isApproved: boolean;
  description: string;
  requirements: string;
  offering: string;
};

export const offersCollection = collection(
  db,
  'offers',
) as CollectionReference<JobOffer>;

export const offersByCompanyQuery = (companyId: string) =>
  query(offersCollection, where('company.id', '==', companyId));

export const offersByFilterQuery = (constraints: QueryConstraint[]) =>
  query(offersCollection, ...constraints);

const offerDoc = (id: string) =>
  doc(db, 'offers', id) as DocumentReference<JobOffer>;

export const getOffer = async (id: string) => {
  const offer = await getDoc(offerDoc(id));
  return offer.data();
};

export const addOffer = async (id: string, data: JobOffer) => {
  await setDoc(offerDoc(id), data);
  return getOffer(id);
};

export const updateOffer = async (id: string, data: JobOffer) => {
  await updateDoc(offerDoc(id), data);
  return getOffer(id);
};

export const deleteOffer = async (id: string) => {
  await deleteDoc(offerDoc(id));
};

export type Tag = {
  id: string;
  name: string;
};

const tagDoc = (id: string) => doc(db, 'tags', id) as DocumentReference<Tag>;

export const tagsCollection = collection(
  db,
  'tags',
) as CollectionReference<Tag>;

export const addTag = async (id: string, data: Tag) => {
  await setDoc(tagDoc(id), data);
};

export const deleteTag = async (id: string) => {
  await deleteDoc(tagDoc(id));
};
