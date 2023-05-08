import { Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import CheckboxInput from 'components/form/CheckboxInput.tsx';
import Form from 'components/form/Form.tsx';
import PasswordInput from 'components/form/PasswordInput.tsx';
import SubmitButton from 'components/form/SubmitButton.tsx';
import TextInput from 'components/form/TextInput.tsx';
import Link from 'components/Link.tsx';
import { signUp } from 'firebase/authentication.ts';
import { addUserData } from 'firebase/database.ts';
import useLoggedInUser from 'hooks/useLoggedInUser.tsx';
import useNotifications from 'hooks/useNotifications.ts';
import Centered from 'layout/Centered.tsx';
import { getAuthError } from 'utils/index.ts';
import { RegisterSchema } from 'utils/schemas.ts';

const Register = () => {
  const { notifySuccess, notifyError } = useNotifications();
  const navigate = useNavigate();
  const [, setUser] = useLoggedInUser();

  return (
    <Centered>
      <Stack spacing={4} p={8} minWidth="40%">
        <Typography variant="h4">
          <strong>Registrace</strong>
        </Typography>
        <Form
          schema={RegisterSchema}
          onSubmit={async (v) => {
            try {
              const u = await signUp(v.email, v.password);
              notifySuccess('Registrace úspěšná');
              const userData = await addUserData(u.user.uid, {
                id: u.user.uid,
                role: v.company ? 'COMPANY' : 'PERSON',
                name: '',
                email: u.user.email!,
              });
              setUser((prev) => ({ ...prev!, data: userData }));
              notifySuccess('Přihlášen 👍');
              navigate('/profile/edit');
            } catch (e) {
              notifyError(getAuthError(e));
            }
          }}
        >
          <TextInput id="email" label="Email" />
          <PasswordInput
            id="password"
            label="Heslo"
            helperText="Heslo musí mít alespoň 5 znaků"
          />
          <CheckboxInput id="company" label="Registrace společenosti" />
          <Link to="/login">Přihlásit se</Link>
          <SubmitButton>Registrovat účet</SubmitButton>
        </Form>
      </Stack>
    </Centered>
  );
};

export default Register;
