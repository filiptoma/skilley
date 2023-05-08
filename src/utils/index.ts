import dayjs from 'dayjs';
import { FirebaseError } from 'firebase/app';
import { Timestamp } from 'firebase/firestore';
import { omit } from 'lodash-es';
import React from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod';

import { JobOffer, Role } from 'firebase/database.ts';

import { TJobForm, TJobPlace, TJobSkill } from './schemas.ts';

export const DRAWER_WIDTH = 300;

const appendIssue = (
  obj: Record<string, unknown>,
  i: z.ZodIssue,
): Record<string, unknown> => {
  const [curr, ...path] = i.path;
  if (!path.length) return { ...obj, [curr as string | number]: i.message };
  if (typeof path[0] === 'number')
    return { ...obj, [curr as string | number]: [i.message] };
  return {
    ...obj,
    [curr as string | number]: appendIssue(
      (obj[curr as string | number] ?? {}) as Record<string, unknown>,
      {
        ...i,
        path,
      },
    ),
  };
};

export const zodToFinalFormError = <T extends Record<string, unknown>>(
  error: z.ZodError<T>,
) => error.issues.reduce(appendIssue, {});

export const noop = () => {};

export const inputOptionsMapper = (names: Record<symbol, string>) =>
  Object.entries(names).map(([key, label]) => ({
    key,
    value: key,
    label: label as string,
  }));

const getNodeText = (node: React.ReactNode): string => {
  if (node === null || node === undefined) return '';

  if (Array.isArray(node))
    return node
      .map(getNodeText)
      .filter((v) => v)
      .join(' ');

  if (React.isValidElement(node)) {
    if (Array.isArray(node.props.children))
      return node.props.children
        .map(getNodeText)
        .filter((v: unknown) => v)
        .join(' ');
    return getNodeText(node.props.children);
  }

  return String(node);
};

export const timeoutAsync = (ms: number) =>
  new Promise((resolver) => {
    setTimeout(resolver, ms);
  });

export type LinkProps = {
  to: string;
  title?: string;
  inNewTab?: boolean;
} & (
  | { external: true; download?: boolean }
  | { external?: false; state?: unknown }
);

export const getLinkProps = ({
  to,
  inNewTab,
  title,
  children,
  ...props
}: LinkProps & {
  children: React.ReactNode;
}) => ({
  title: title ?? getNodeText(children),
  ...(props.external
    ? {
        component: 'a' as const,
        href: to,
        ...omit(props, ['external', 'link']),
      }
    : {
        component: Link,
        to,
        ...omit(props, ['external', 'link']),
      }),
  ...(inNewTab ? { target: '_blank', rel: 'noreferrer noopener' } : {}),
});

export const getAuthError = (error: unknown): string | undefined => {
  const firebaseErrors: Record<string, string> = {
    'auth/email-already-exists': 'Email se již používá',
    'auth/email-already-in-use': 'Email se již používá',
    'auth/wrong-password': 'Nesprávný email nebo heslo',
    'auth/user-not-found': 'Nesprávný email nebo heslo',
  };
  return error instanceof FirebaseError
    ? firebaseErrors[error.code]
    : undefined;
};

export const timestampToDate = (timestamp: unknown) =>
  (timestamp as Timestamp).toDate();

export const timestampToDayjs = (timestamp: unknown) =>
  dayjs(timestampToDate(timestamp));

export const sortOffersByTopped = (a: JobOffer, b: JobOffer) =>
  Number(b.isTopped) - Number(a.isTopped);

export const UserRoleNames: Record<Role, string> = {
  ADMIN: 'Admin',
  PERSON: 'Osoba',
  COMPANY: 'Společnost',
};

export const JobSkillNames: Record<TJobSkill, string> = {
  JUNIOR: 'Junior',
  MEDIOR: 'Medior',
  SENIOR: 'Senior',
};

export const JobPlaceNames: Record<TJobPlace, string> = {
  BRATISLAVA: 'Bratislava',
  BRNO: 'Brno',
  REMOTE: 'Remote',
};

export const JobFormNames: Record<TJobForm, string> = {
  FULLTIME: 'Plný pracovní úvazek',
  PARTTIME: 'Částečný pracovní úvazek',
  INTERNSHIP: 'Stáž',
  FREELANCE: 'Freelance',
};
