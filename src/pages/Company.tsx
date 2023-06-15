import { Stack, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import OfferCard from 'components/offer/OfferCard.tsx';
import {
  UserData,
  getUserData,
  offersByCompanyQuery,
} from 'firebase/database.ts';
import { useSnapshot } from 'hooks/useSnapshot.ts';
import { sortOffersByTopped } from 'utils/index.ts';

const Company = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState<UserData>();
  const [isLoading, setIsLoading] = useState(true);

  const [offers] = useSnapshot(offersByCompanyQuery(id!));

  const offerCount = useMemo(() => {
    const count = offers.length;
    if (count === 0) return 'Žádná aktuální ponuka';
    if (count === 1) return '1 aktuální ponuka';
    if (count > 1 && count < 5) return `${count} aktuální ponuky`;
    return `${count} aktuálních ponuk`;
  }, [offers]);

  useEffect(() => {
    if (!id) return;
    (async () => {
      setIsLoading(true);
      try {
        const data = await getUserData(id);
        setCompany(data);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);

  if (isLoading) return null;

  return (
    <Stack spacing={6}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ backgroundColor: (theme) => theme.palette.background.paper }}
        p={4}
        borderRadius={2}
      >
        <Stack spacing={1}>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{ color: (theme) => theme.palette.primary.main }}
          >
            {company?.name}
          </Typography>
          <Typography variant="h4" fontWeight={900}>
            {offerCount}
          </Typography>
        </Stack>
      </Stack>
      <Stack spacing={2} px={4} maxWidth="60%">
        <Typography variant="h6" fontWeight={900}>
          O SPOLEČNOSTI
        </Typography>
        <Typography style={{ whiteSpace: 'pre-wrap' }}>
          {company?.bio ?? 'Zatím tady nic není'}
        </Typography>
      </Stack>
      <Stack spacing={2}>
        <Typography variant="h6" fontWeight={900} px={4}>
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

export default Company;
