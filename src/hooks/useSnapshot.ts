import { Query, getDocs, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import useNotifications from './useNotifications.ts';

export const useSnapshot = <T>(query: Query<T>) => {
  const state = useState<T[]>([]);
  const [, setData] = state;

  useEffect(() => {
    const unsubscribe = onSnapshot(query, (snapshot) => {
      setData(snapshot.docs.map((doc) => doc.data()));
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
};

export const useSnapshotAsync = <T>(query: Query<T>) => {
  const { notifyError } = useNotifications();

  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const snapshot = await getDocs(query);
        setData(snapshot.docs.map((doc) => doc.data()));
      } catch (e) {
        console.error(e);
        notifyError();
      } finally {
        setIsLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, isLoading };
};
