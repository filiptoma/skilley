import { Box, Stack, Typography, colors } from '@mui/material';

import Card from 'components/Card.tsx';
import { JobOffer } from 'firebase/database.ts';
import { JobFormNames, JobPlaceNames, timestampToDayjs } from 'utils/index.ts';

type Props = {
  offer: JobOffer;
  onClick: () => void;
};

const OfferCard = (props: Props) => {
  const { offer, onClick } = props;

  return (
    <Card onClick={onClick}>
      <Stack
        direction="row"
        alignItems="center"
        px={4}
        py={2}
        borderRadius="inherit"
        border={offer.isTopped ? 4 : 2}
        borderColor={colors.grey[200]}
        sx={{
          borderColor: (theme) =>
            offer.isTopped ? colors.amber[300] : theme.palette.background.paper,
        }}
      >
        <Box minWidth="70%">
          <Typography color={colors.grey[500]} fontWeight={700}>
            {offer.company.name}
          </Typography>
          <Typography variant="h6" fontWeight={700}>
            {offer.name}
          </Typography>
          <Stack direction="row" spacing={1} pt={1}>
            {offer.tags.slice(0, 5).map((tag) => (
              <Box
                key={tag.id}
                bgcolor={colors.grey[200]}
                px={1}
                py={0.5}
                borderRadius={2}
              >
                <Typography fontSize="small" color={colors.grey[700]}>
                  {tag.name}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
        <Box>
          <Typography>
            Místo:
            <strong> {JobPlaceNames[offer.place]}</strong>
          </Typography>
          <Typography>
            Plat:
            <strong> {offer.wage.toLocaleString()} CZK</strong>
          </Typography>
          <Typography>
            Forma:
            <strong> {JobFormNames[offer.form]}</strong>
          </Typography>
          <Typography>
            Nástup:
            <strong>
              {' '}
              {timestampToDayjs(offer.start).format('DD.MM.YYYY')}
            </strong>
          </Typography>
          {!offer.isApproved && (
            <Typography my={1} fontWeight={700} color="error" fontSize={20}>
              Neověřena
            </Typography>
          )}
        </Box>
      </Stack>
    </Card>
  );
};

export default OfferCard;
