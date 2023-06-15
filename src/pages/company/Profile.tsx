import { Delete, Edit } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'components/Button.tsx';
import OfferCard from 'components/offer/OfferCard.tsx';
import { deleteUserData, offersByCompanyQuery } from 'firebase/database.ts';
import useLoggedInUser from 'hooks/useLoggedInUser.tsx';
import useNotifications from 'hooks/useNotifications.ts';
import { useSnapshot } from 'hooks/useSnapshot.ts';
import { sortOffersByTopped } from 'utils/index.ts';

const Profile = () => {
  const [user] = useLoggedInUser();
  const navigate = useNavigate();
  const { notifySuccess } = useNotifications();

  const [offers] = useSnapshot(offersByCompanyQuery(user!.user.uid));
  const [isDeleting, setIsDeleting] = useState(false);

  const offerCount = useMemo(() => {
    const count = offers.length;
    if (count === 0) return 'Žádná aktuální ponuka';
    if (count === 1) return '1 aktuální ponuka';
    if (count > 1 && count < 5) return `${count} aktuální ponuky`;
    return `${count} aktuálních ponuk`;
  }, [offers]);

  return (
    <Stack spacing={6}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ bgcolor: (theme) => theme.palette.background.paper }}
        p={4}
        borderRadius={2}
      >
        <Stack spacing={1}>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{ color: (theme) => theme.palette.primary.main }}
          >
            {user?.data?.name}
          </Typography>
          <Typography variant="h4" fontWeight={900}>
            {offerCount}
          </Typography>
        </Stack>
        <Stack spacing={1}>
          <Button
            variant="secondary"
            startIcon={<Edit />}
            onClick={() => navigate('/profile/edit')}
          >
            Upravit profil
          </Button>
          <Button
            color="error"
            loading={isDeleting}
            startIcon={<Delete />}
            onClick={async () => {
              setIsDeleting(true);
              try {
                await deleteUserData(user!.user.uid);
                await user!.user.delete();
                notifySuccess('Profil úspěšně vymazaný');
                navigate('/');
              } finally {
                setIsDeleting(false);
              }
            }}
          >
            Vymazat profil
          </Button>
        </Stack>
      </Stack>
      <Stack spacing={2} px={4} maxWidth="60%">
        <Typography variant="h6" fontWeight={900}>
          O SPOLEČNOSTI
        </Typography>
        <Typography style={{ whiteSpace: 'pre-wrap' }}>
          {user?.data?.bio ?? 'Zatím tady nic není'}
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

export default Profile;
