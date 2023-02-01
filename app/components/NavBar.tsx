import { Drawer } from '@mui/material';
import { UserDto } from '~/models/user.server';
import NavList from './NavList';

interface NavBarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  email: UserDto['email'];
}

/**
 * Nav menu for application once logged-in. Vertical design and fixed open on left-hand side of screen for desktop.
 * Collapsible for smaller/mobile devices
 */
export default ({ mobileOpen, handleDrawerToggle, email }: NavBarProps) => {
  const drawerWidth = 250;

  return (
    <nav>
      <Drawer
        sx={{
          display: { sm: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant='temporary'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        anchor='left'
      >
        <NavList email={email} />
      </Drawer>
      <Drawer
        sx={{
          display: { sm: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant='permanent'
        anchor='left'
      >
        <NavList email={email} />
      </Drawer>
    </nav>
  );
};
