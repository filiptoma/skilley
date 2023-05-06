import { Stack } from '@mui/material';
import { onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'components/Button.tsx';
import { JobOffer, offersCollection } from 'firebase/database.ts';

const Home = () => {
  const navigate = useNavigate();
  const [offers, setOffers] = useState<JobOffer[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(offersCollection, (snapshot) => {
      setOffers(snapshot.docs.map((doc) => doc.data()));
    });
    return () => {
      unsub();
    };
  }, []);

  return (
    <Stack spacing={4}>
      <Button onClick={() => navigate('/offers/new')}>Přidat nabídku</Button>
    </Stack>
  );
};

export default Home;
