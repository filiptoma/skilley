import { AccountCircle, Logout, Person } from '@mui/icons-material';
import {
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from 'components/Logo.tsx';
import { signOut } from 'firebase/authentication.ts';
import useLoggedInUser from 'hooks/useLoggedInUser.tsx';
import useNotifications from 'hooks/useNotifications.ts';

import Fixed from './Fixed.tsx';

const Header = () => {
  const [user] = useLoggedInUser();
  const theme = useTheme();
  const navigate = useNavigate();
  const { notifySuccess } = useNotifications();

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <Fixed align="top">
      <Stack
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: 'white',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 4,
            py: 1,
          }}
        >
          <Logo />
          {user && (
            <>
              <IconButton
                id="account-menu-button"
                edge="end"
                aria-label="menu používatele"
                aria-controls="account-menu"
                aria-haspopup="true"
                onClick={(e) => setMenuAnchorEl(e.currentTarget)}
                color="inherit"
                sx={{ borderRadius: 2 }}
              >
                <Typography mr={2}>
                  <strong>{user.user.email}</strong>
                </Typography>
                <AccountCircle fontSize="medium" />
              </IconButton>
              <Menu
                id="account-menu"
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={() => setMenuAnchorEl(null)}
                MenuListProps={{
                  'aria-labelledby': 'account-menu-button',
                }}
              >
                <MenuItem disabled>
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  Profil
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={async () => {
                    setMenuAnchorEl(null);
                    await signOut();
                    notifySuccess('Odhlášen');
                    navigate('/');
                  }}
                >
                  <ListItemIcon>
                    <Logout />
                  </ListItemIcon>
                  Odhlásit se
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Stack>
    </Fixed>
  );
};

export default Header;
