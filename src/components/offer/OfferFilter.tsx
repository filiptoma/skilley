import { Box, Typography, colors, useTheme } from '@mui/material';

type Props = {
  label: string;
  active: boolean;
  onClick: () => void;
};

const OfferFilter = (props: Props) => {
  const { label, active, onClick } = props;

  const theme = useTheme();

  return (
    <Box
      bgcolor={active ? theme.palette.primary.main : colors.grey[200]}
      px={2}
      py={0.5}
      borderRadius={2}
      sx={{ cursor: 'pointer' }}
      onClick={onClick}
    >
      <Typography color={active ? 'white' : colors.grey[700]} fontWeight={700}>
        {label}
      </Typography>
    </Box>
  );
};

export default OfferFilter;
