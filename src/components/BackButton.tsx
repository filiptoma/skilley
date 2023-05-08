import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import Button from './Button.tsx';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="text"
      size="large"
      onClick={() => navigate(-1)}
      startIcon={<ArrowBack />}
    >
      ZPĚT
    </Button>
  );
};

export default BackButton;
