import {
  ArrowCircleUp,
  Delete,
  MoreVert,
  Recommend,
} from '@mui/icons-material';
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  colors,
} from '@mui/material';
import { onSnapshot, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import {
  JobOffer,
  deleteOffer,
  offersByFilterQuery,
  updateOffer,
} from 'firebase/database.ts';
import { timestampToDayjs } from 'utils/index.ts';

const Actions = (props: { offer: JobOffer }) => {
  const { offer } = props;

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <>
      <IconButton onClick={(e) => setMenuAnchorEl(e.currentTarget)}>
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={() => setMenuAnchorEl(null)}
      >
        {offer.isTopped === false && (
          <MenuItem
            onClick={async () => {
              setMenuAnchorEl(null);
              await updateOffer(offer.id, {
                ...offer,
                isTopped: true,
              });
            }}
          >
            <ListItemIcon sx={{ color: colors.amber[600] }}>
              <ArrowCircleUp />
            </ListItemIcon>
            <ListItemText>Topovat</ListItemText>
          </MenuItem>
        )}
        {offer.isApproved === false && (
          <MenuItem
            onClick={async () => {
              setMenuAnchorEl(null);
              await updateOffer(offer.id, {
                ...offer,
                isApproved: true,
              });
            }}
          >
            <ListItemIcon sx={{ color: (t) => t.palette.success.main }}>
              <Recommend />
            </ListItemIcon>
            <ListItemText>Schválit</ListItemText>
          </MenuItem>
        )}
        <MenuItem
          onClick={async () => {
            setMenuAnchorEl(null);
            await deleteOffer(offer.id);
          }}
        >
          <ListItemIcon sx={{ color: (t) => t.palette.error.main }}>
            <Delete />
          </ListItemIcon>
          <ListItemText>Vymazat</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

const OffersDashboard = () => {
  const [showOffers, setShowOffers] = useState<'pending' | 'all'>('all');
  const [offers, setOffers] = useState<JobOffer[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      showOffers === 'pending'
        ? offersByFilterQuery([where('isApproved', '==', false)])
        : offersByFilterQuery([]),
      (snapshot) => {
        setOffers(snapshot.docs.map((doc) => doc.data()));
      },
    );

    return () => {
      unsubscribe();
    };
  }, [showOffers]);

  return (
    <Stack spacing={6}>
      <Typography variant="h5" fontWeight={900}>
        Nabídky
      </Typography>
      <ToggleButtonGroup
        value={showOffers}
        exclusive
        onChange={(_e, v) => setShowOffers(v)}
      >
        <ToggleButton value="pending">Čekající na schválení</ToggleButton>
        <ToggleButton value="all">Všechny</ToggleButton>
      </ToggleButtonGroup>
      <Paper variant="outlined" sx={{ width: '100%' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell sx={{ minWidth: 370 }}>
                  <Typography fontWeight={700}>Název</Typography>
                </TableCell>
                <TableCell sx={{ minWidth: 170 }}>
                  <Typography fontWeight={700}>Společnost</Typography>
                </TableCell>
                <TableCell sx={{ minWidth: 120 }}>
                  <Typography fontWeight={700}>Topovaná</Typography>
                </TableCell>
                <TableCell sx={{ minWidth: 120 }}>
                  <Typography fontWeight={700}>Schválena</Typography>
                </TableCell>
                <TableCell sx={{ minWidth: 170 }}>
                  <Typography fontWeight={700}>Vytvořena</Typography>
                </TableCell>
                <TableCell sx={{ minWidth: 170 }}>
                  <Typography fontWeight={700}>Upravena</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {offers.map((offer) => (
                <TableRow
                  key={offer.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell padding="checkbox">
                    <Actions offer={offer} />
                  </TableCell>
                  <TableCell>{offer.name}</TableCell>
                  <TableCell>{offer.company.name}</TableCell>
                  <TableCell>{String(offer.isTopped)}</TableCell>
                  <TableCell>{String(offer.isApproved)}</TableCell>
                  <TableCell>
                    {timestampToDayjs(offer.createdAt).format(
                      'DD-MM-YYYY HH:mm:ss',
                    )}
                  </TableCell>
                  <TableCell>
                    {timestampToDayjs(offer.updatedAt).format(
                      'DD-MM-YYYY HH:mm:ss',
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Stack>
  );
};

export default OffersDashboard;
