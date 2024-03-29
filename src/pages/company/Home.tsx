import { Add } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Button from 'components/Button.tsx';
import OfferCard from 'components/offer/OfferCard.tsx';
import { offersByCompanyQuery } from 'firebase/database.ts';
import useLoggedInUser from 'hooks/useLoggedInUser.tsx';
import { useSnapshot } from 'hooks/useSnapshot.ts';
import { sortOffersByTopped } from 'utils/index.ts';

const Home = () => {
  const navigate = useNavigate();
  const [user] = useLoggedInUser();

  const [offers] = useSnapshot(offersByCompanyQuery(user!.user.uid));

  return (
    <Stack spacing={6}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" fontWeight={900}>
          Moje pracovní nabídky
        </Typography>
        <Button startIcon={<Add />} onClick={() => navigate('/offers/new')}>
          Přidat nabídku
        </Button>
      </Stack>
      <Stack spacing={2}>
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
