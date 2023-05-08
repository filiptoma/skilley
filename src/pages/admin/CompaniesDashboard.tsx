import { Delete, MoreVert } from '@mui/icons-material';
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
  Typography,
} from '@mui/material';
import { useState } from 'react';

import {
  UserData,
  deleteUserData,
  usersByRoleQuery,
} from 'firebase/database.ts';
import { useSnapshot } from 'hooks/useSnapshot.ts';
import { UserRoleNames } from 'utils/index.ts';

const Actions = (props: { user: UserData }) => {
  const { user } = props;

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
        <MenuItem
          onClick={async () => {
            setMenuAnchorEl(null);
            await deleteUserData(user.id);
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

const CompaniesDashboard = () => {
  const [users] = useSnapshot(usersByRoleQuery('COMPANY'));

  return (
    <Stack spacing={6}>
      <Typography variant="h5" fontWeight={900}>
        Společnosti
      </Typography>
      <Paper variant="outlined" sx={{ width: '100%' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>
                  <Typography fontWeight={700}>Email</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={700}>Název společnosti</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={700}>Role</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell padding="checkbox">
                    <Actions user={user} />
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{UserRoleNames[user.role]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Stack>
  );
};

export default CompaniesDashboard;
