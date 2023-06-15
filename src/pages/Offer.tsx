import { Edit } from '@mui/icons-material';
import {
  Alert,
  AlertTitle,
  Box,
  Stack,
  Typography,
  colors,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BackButton from 'components/BackButton.tsx';
import Button from 'components/Button.tsx';
import Error from 'components/Error.tsx';
import Link from 'components/Link.tsx';
import Modal from 'components/Modal.tsx';
import { JobOffer, getOffer } from 'firebase/database.ts';
import useLoggedInUser from 'hooks/useLoggedInUser.tsx';
import useNotifications from 'hooks/useNotifications.ts';
import { JobFormNames, JobPlaceNames, timestampToDayjs } from 'utils/index.ts';

const Offer = () => {
  const { id } = useParams();
  const [user] = useLoggedInUser();
  const { notifyError } = useNotifications();
  const navigate = useNavigate();

  const [offer, setOffer] = useState<JobOffer>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [contactModal, setContactModal] = useState(false);

  useEffect(() => {
    (async () => {
      if (!id) {
        setIsError(true);
        return;
      }
      setIsLoading(true);
      try {
        const o = await getOffer(id);
        if (!o) setIsError(true);
        setOffer(o);
      } catch (e) {
        setIsError(true);
        console.error(e);
        notifyError();
      } finally {
        setIsLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading && null}
      {isError && <Error />}
      {!isLoading && !isError && (
        <Stack spacing={4}>
          <BackButton />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            p={4}
            borderRadius={2}
            border={offer?.isTopped ? 4 : 0}
            borderColor={colors.amber[300]}
            sx={{ backgroundColor: (theme) => theme.palette.background.paper }}
          >
            <Stack spacing={2}>
              {offer?.isTopped && (
                <Box
                  bgcolor={colors.amber[300]}
                  alignSelf="start"
                  px={1}
                  py={0.5}
                  borderRadius={2}
                  color={colors.common.black}
                >
                  <Typography variant="body2" fontWeight={700}>
                    TOPOVANÁ
                  </Typography>
                </Box>
              )}
              <Box>
                <Link to={`/company/${offer?.company.id}`}>
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    sx={{ color: (theme) => theme.palette.primary.main }}
                    alignSelf="start"
                  >
                    {offer?.company.name}
                  </Typography>
                </Link>
                <Typography variant="h4" fontWeight={900}>
                  {offer?.name}
                </Typography>
              </Box>
            </Stack>
            <Box mr={4}>
              <Typography variant="subtitle1">
                Místo:
                <strong> {JobPlaceNames[offer!.place]}</strong>
              </Typography>
              <Typography variant="subtitle1">
                Plat:
                <strong> {offer!.wage.toLocaleString()} CZK</strong>
              </Typography>
              <Typography variant="subtitle1">
                Forma:
                <strong> {JobFormNames[offer!.form]}</strong>
              </Typography>
              <Typography variant="subtitle1">
                Nástup:
                <strong>
                  {' '}
                  {timestampToDayjs(offer!.start).format('DD.MM.YYYY')}
                </strong>
              </Typography>
              <Typography variant="subtitle1" mt={2}>
                Poslední aktualizace:
                <strong>
                  {' '}
                  {timestampToDayjs(offer!.updatedAt).format('DD.MM.YYYY')}
                </strong>
              </Typography>
            </Box>
          </Stack>
          {!offer?.isApproved && (
            <Alert severity="error">
              <AlertTitle>
                <strong>Nabídka není ověřena</strong>
              </AlertTitle>
              Tato nabídka ještě není ověřena a schválena moderátorem,
              postupujte s ohledem.
            </Alert>
          )}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="start"
          >
            <Stack direction="row" gap={1} maxWidth="50%" flexWrap="wrap">
              {offer?.tags.map((tag) => (
                <Box
                  key={tag.id}
                  bgcolor={colors.grey[200]}
                  px={2}
                  py={1}
                  borderRadius={2}
                >
                  <Typography color={colors.grey[700]} fontWeight={700}>
                    {tag.name}
                  </Typography>
                </Box>
              ))}
            </Stack>
            {user && (
              <div>
                {user!.data!.role === 'COMPANY' ? (
                  <Button
                    variant="secondary"
                    startIcon={<Edit />}
                    onClick={() => navigate(`/offers/${id}/edit`)}
                  >
                    Upravit nabídku
                  </Button>
                ) : (
                  <Button
                    sx={{ paddingX: 6, paddingY: 2 }}
                    onClick={() => setContactModal(true)}
                  >
                    Mám zájem
                  </Button>
                )}
              </div>
            )}
          </Stack>
          <Stack spacing={2} maxWidth="60%">
            <Typography variant="h6" fontWeight={900}>
              NÁPLŇ PRÁCE
            </Typography>
            <Typography style={{ whiteSpace: 'pre-wrap' }}>
              {offer?.description}
            </Typography>
          </Stack>
          <Stack spacing={2} maxWidth="60%">
            <Typography variant="h6" fontWeight={900}>
              POŽADAVKY NA UCHAZEČE
            </Typography>
            <Typography style={{ whiteSpace: 'pre-wrap' }}>
              {offer?.requirements}
            </Typography>
          </Stack>
          <Stack spacing={2} maxWidth="60%">
            <Typography variant="h6" fontWeight={900}>
              BENEFITY PRO ZAMĚSTNANCE
            </Typography>
            <Typography style={{ whiteSpace: 'pre-wrap' }}>
              {offer?.offering}
            </Typography>
          </Stack>
        </Stack>
      )}
      <Modal isOpen={contactModal} onClose={() => setContactModal(false)}>
        <Stack spacing={6} p={4}>
          <Typography variant="h5" fontWeight={900} textAlign="center">
            Kontakt na společnost
          </Typography>
          <Typography
            variant="h6"
            color="primary"
            textAlign="center"
            fontWeight={700}
          >
            {offer?.company.email}
          </Typography>
          <Button
            variant="secondary"
            fullWidth
            onClick={() => setContactModal(false)}
          >
            Zavřít
          </Button>
        </Stack>
      </Modal>
    </>
  );
};

export default Offer;
