import { Work, People, Business, Label } from '@mui/icons-material';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';

import Drawer from 'components/Drawer.tsx';
import { DRAWER_WIDTH } from 'utils/index.ts';

type NavItem = {
  label: string;
  to: string;
  icon: React.ReactElement;
};

const navItems: NavItem[] = [
  {
    label: 'Nabídky',
    to: '/dashboard/offers',
    icon: <Work />,
  },
  {
    label: 'Osoby',
    to: '/dashboard/persons',
    icon: <People />,
  },
  {
    label: 'Společnosti',
    to: '/dashboard/companies',
    icon: <Business />,
  },
  {
    label: 'Technologie',
    to: '/dashboard/tags',
    icon: <Label />,
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <Drawer>
        <Toolbar />
        <List>
          {navItems.map((item) => (
            <ListItem key={item.to} disablePadding>
              <ListItemButton
                divider
                onClick={() => navigate(item.to)}
                sx={{ pl: 2 }}
              >
                <ListItemIcon sx={{ color: (t) => t.palette.primary.main }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontSize: 'large' }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        sx={{
          width: `calc(100% - ${DRAWER_WIDTH}px)`,
          ml: `${DRAWER_WIDTH}px`,
        }}
      >
        <Outlet />
      </Box>
    </>
  );
};

export default Dashboard;
