import { AccountCircle, Login, Logout, Person } from '@mui/icons-material';
import {
  AppBar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from 'components/Logo.tsx';
import { signOut } from 'firebase/authentication.ts';
import useLoggedInUser from 'hooks/useLoggedInUser.tsx';
import useNotifications from 'hooks/useNotifications.ts';

const Header = () => {
  const [user] = useLoggedInUser();
  const navigate = useNavigate();
  const { notifySuccess } = useNotifications();

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        px={4}
      >
        <Toolbar disableGutters>
          <Logo />
        </Toolbar>
        <Toolbar disableGutters>
          {user ? (
            <>
              <IconButton
                id="account-menu-button"
                edge="end"
                aria-label="menu používatele"
                aria-controls="account-menu"
                aria-haspopup="true"
                onClick={(e) => setMenuAnchorEl(e.currentTarget)}
                color="inherit"
                sx={{ borderRadius: 1 }}
              >
                <Typography mr={2}>
                  <strong>{user.user.email}</strong>
                </Typography>
                <AccountCircle fontSize="medium" />
              </IconButton>
              <Menu
                id="account-menu"
                anchorEl={menuAnchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                open={Boolean(menuAnchorEl)}
                onClose={() => setMenuAnchorEl(null)}
                MenuListProps={{
                  'aria-labelledby': 'account-menu-button',
                }}
              >
                <MenuItem
                  disabled={user.data?.role === 'ADMIN'}
                  onClick={async () => {
                    setMenuAnchorEl(null);
                    navigate('/profile');
                  }}
                >
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
          ) : (
            <IconButton
              edge="end"
              onClick={() => navigate('/login')}
              color="inherit"
              sx={{ borderRadius: 1 }}
            >
              <Typography mr={1}>
                <strong>Přihlásit se</strong>
              </Typography>
              <Login fontSize="medium" />
            </IconButton>
          )}
        </Toolbar>
      </Stack>
    </AppBar>
  );
};

export default Header;
