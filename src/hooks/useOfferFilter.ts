import { QueryConstraint, getDocs, where } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';

import {
  JobOffer,
  offersByFilterQuery,
  tagsCollection,
} from 'firebase/database.ts';
import { JobFormNames, JobPlaceNames, JobSkillNames } from 'utils/index.ts';

import useNotifications from './useNotifications.ts';
import { useSnapshot } from './useSnapshot.ts';

export type OfferFilterSymbols = 'skills' | 'tags' | 'places' | 'forms';

export const OfferFilterNames: Record<OfferFilterSymbols, string> = {
  skills: 'Znalostní úroveň',
  tags: 'Technologie',
  places: 'Místo',
  forms: 'Forma',
};

const useOfferFilter = () => {
  const { notifyError } = useNotifications();
  const [tags] = useSnapshot(tagsCollection);

  const buttons = useMemo<
    Record<OfferFilterSymbols, { label: string; value: unknown }[]>
  >(
    () => ({
      skills: Object.entries(JobSkillNames).map(([k, v]) => ({
        label: v,
        value: k,
      })),
      tags: tags.map((tag) => ({ label: tag.name, value: tag })),
      places: Object.entries(JobPlaceNames).map(([k, v]) => ({
        label: v,
        value: k,
      })),
      forms: Object.entries(JobFormNames).map(([k, v]) => ({
        label: v,
        value: k,
      })),
    }),
    [tags],
  );

  const [filter, setFilter] = useState<Record<OfferFilterSymbols, unknown[]>>({
    skills: [],
    tags: [],
    places: [],
    forms: [],
  });

  const constraints = useMemo<QueryConstraint[]>(() => {
    const arr: QueryConstraint[] = [];
    if (filter.skills.length > 0) {
      arr.push(where('skill', 'in', filter.skills));
    }
    if (filter.places.length > 0) {
      arr.push(where('place', 'in', filter.places));
    }
    if (filter.forms.length > 0) {
      arr.push(where('form', 'in', filter.forms));
    }
    if (filter.tags.length > 0) {
      arr.push(where('tags', 'array-contains-any', filter.tags));
    }
    return arr;
  }, [filter]);

  const [offers, setOffers] = useState<JobOffer[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const snapshot = await getDocs(offersByFilterQuery(constraints));
        setOffers(snapshot.docs.map((doc) => doc.data()));
      } catch (e) {
        console.error(e);
        notifyError();
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [constraints]);

  return { filter, setFilter, offers, buttons };
};

export default useOfferFilter;
