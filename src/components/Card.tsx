import { CardActionArea, Paper } from '@mui/material';
import { PropsWithChildren } from 'react';

const Card = (props: PropsWithChildren<{ onClick: () => void }>) => {
  const { children, onClick } = props;

  return (
    <Paper variant="elevation" elevation={0} sx={{ borderRadius: 2 }}>
      <CardActionArea onClick={onClick}>{children}</CardActionArea>
    </Paper>
  );
};

export default Card;
