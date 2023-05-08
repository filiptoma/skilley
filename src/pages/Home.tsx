import { Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import OfferCard from 'components/offer/OfferCard.tsx';
import { offersCollection } from 'firebase/database.ts';
import { useSnapshot } from 'hooks/useSnapshot.ts';
import { sortOffersByTopped } from 'utils/index.ts';

const Home = () => {
  const navigate = useNavigate();
  const [offers] = useSnapshot(offersCollection);

  return (
    <Stack spacing={6}>
      <Stack spacing={2}>
        <Typography variant="h6" fontWeight={900}>
          PRACOVNÍ NABÍDKY
        </Typography>
        {offers.sort(sortOffersByTopped).map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            onClick={() => navigate(`/offers/${offer.id}`)}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default Home;
