import { Delete, Edit } from '@mui/icons-material';
import { Stack, Typography, colors, useTheme } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'components/Button.tsx';
import { deleteUserData } from 'firebase/database.ts';
import useLoggedInUser from 'hooks/useLoggedInUser.tsx';
import useNotifications from 'hooks/useNotifications.ts';

const Profile = () => {
  const [user] = useLoggedInUser();
  const navigate = useNavigate();
  const theme = useTheme();
  const { notifySuccess } = useNotifications();

  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <Stack spacing={6}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        bgcolor={colors.grey[100]}
        p={4}
        borderRadius={2}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          color={theme.palette.primary.main}
        >
          {user?.data?.name}
        </Typography>
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
          O MNĚ
        </Typography>
        <Typography style={{ whiteSpace: 'pre-wrap' }}>
          {user?.data?.bio ?? 'Zatím tady nic není'}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Profile;
