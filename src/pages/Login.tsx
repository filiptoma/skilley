import { Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Form from 'components/form/Form.tsx';
import PasswordInput from 'components/form/PasswordInput.tsx';
import SubmitButton from 'components/form/SubmitButton.tsx';
import TextInput from 'components/form/TextInput.tsx';
import Link from 'components/Link.tsx';
import { signIn } from 'firebase/authentication.ts';
import { getUserData } from 'firebase/database.ts';
import useLoggedInUser from 'hooks/useLoggedInUser.tsx';
import useNotifications from 'hooks/useNotifications.ts';
import Centered from 'layout/Centered.tsx';
import { getAuthError } from 'utils/index.ts';
import { LoginSchema } from 'utils/schemas.ts';

const Login = () => {
  const { notifySuccess, notifyError } = useNotifications();
  const navigate = useNavigate();
  const [, setUser] = useLoggedInUser();

  return (
    <Centered>
      <Stack spacing={4} p={8} minWidth="40%">
        <Typography variant="h4">
          <strong>Přihlášení</strong>
        </Typography>
        <Form
          schema={LoginSchema}
          onSubmit={async (v) => {
            try {
              const u = await signIn(v.email, v.password);
              const userData = await getUserData(u.user.uid);
              setUser((prev) => ({ ...prev!, data: userData }));
              notifySuccess('Přihlášen 👍');
              navigate(userData?.role === 'COMPANY' ? '/offers/my' : '/');
            } catch (e) {
              notifyError(getAuthError(e));
            }
          }}
        >
          <TextInput id="email" label="Email" />
          <PasswordInput id="password" label="Heslo" />
          <Link to="/register">Registrovat se</Link>
          <SubmitButton>Přihlásit</SubmitButton>
        </Form>
      </Stack>
    </Centered>
  );
};

export default Login;
