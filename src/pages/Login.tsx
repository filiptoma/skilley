import { Typography } from '@mui/material';

import useLoggedInUser from 'hooks/useLoggedInUser.tsx';

const Login = () => {
  const user = useLoggedInUser();
  console.log(user);
  return (
    <div>
      <Typography>login</Typography>
    </div>
  );
};

export default Login;
