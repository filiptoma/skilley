import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const navigate = useNavigate();
  return (
    <Typography
      variant="h4"
      fontFamily="Fugaz One"
      sx={{ cursor: 'pointer' }}
      onClick={() => navigate('/')}
    >
      Skilley
    </Typography>
  );
};

export default Logo;
