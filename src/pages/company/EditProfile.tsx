import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Form from 'components/form/Form.tsx';
import SubmitButton from 'components/form/SubmitButton.tsx';
import TextAreaInput from 'components/form/TextAreaInput.tsx';
import TextInput from 'components/form/TextInput.tsx';
import { updateUserData } from 'firebase/database.ts';
import useLoggedInUser from 'hooks/useLoggedInUser.tsx';
import useNotifications from 'hooks/useNotifications.ts';
import { EditProfileSchema } from 'utils/schemas.ts';

const EditProfile = () => {
  const [user, setUser] = useLoggedInUser();
  const { notifySuccess, notifyError } = useNotifications();
  const navigate = useNavigate();

  return (
    <Box maxWidth="80%" px={16}>
      <Form
        title="Upravit profil"
        back
        schema={EditProfileSchema}
        initialValues={{ name: user?.data?.name, bio: user?.data?.bio }}
        onSubmit={async (v) => {
          try {
            const userData = await updateUserData(user!.user.uid, {
              ...user!.data!,
              name: v.name,
              bio: v.bio ?? '',
            });
            setUser((prev) => ({ ...prev!, data: userData }));
            notifySuccess('Profil úspěšně upraven');
            navigate('/profile');
          } catch (e) {
            console.error(e);
            notifyError();
          }
        }}
      >
        <TextInput
          id="name"
          label={
            user?.data?.role === 'COMPANY'
              ? 'Název společnosti'
              : 'Jméno a příjmení'
          }
        />
        <TextAreaInput
          id="bio"
          label={user?.data?.role === 'COMPANY' ? 'O nás' : 'O mně'}
        />
        <SubmitButton>Uložit</SubmitButton>
      </Form>
    </Box>
  );
};

export default EditProfile;
