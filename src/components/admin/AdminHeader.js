import { AppBar, Box, Button, Menu, MenuItem, Toolbar } from '@mui/material';
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';

const AdminHeader = () => {
  const navigate = useNavigate();

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (event) => {
    setMenuAnchorEl(null);
  };

  const handleNavigation = (navigateTo, type) => {
    handleMenuClose();
    navigate(navigateTo);
  };

  const menus = (
    <Menu
      anchorEl={menuAnchorEl}
      open={Boolean(menuAnchorEl)}
      onClose={handleMenuClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <MenuItem
        onClick={() => handleNavigation('/admin/dashboard')}
        sx={{ px: 4 }}
      >
        Dashboard
      </MenuItem>
      <MenuItem
        onClick={() => handleNavigation('/admin/all-users')}
        sx={{ px: 4 }}
      >
        Users list
      </MenuItem>
      <MenuItem
        onClick={() => handleNavigation('/admin/user-profile')}
        sx={{ px: 4 }}
      >
        User profile
      </MenuItem>
      <MenuItem onClick={() => handleNavigation('/')} sx={{ px: 4 }}>
        Back to website
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: 'white',
          borderBottom: `1px solid #d8daf9`,
        }}
        elevation={0}
      >
        <Toolbar sx={{ width: { xs: 'inherit', sm: '1080px' }, mx: 'auto' }}>
          <Box
            sx={{
              pt: 0.7,
            }}
          >
            <img src="/images/logo.png" alt="logo" width="180" />
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box
            sx={{
              display: { xs: 'none', sm: 'block' },
            }}
          >
            <Button
              color="primary"
              component={RouterLink}
              to="/admin/dashboard"
              sx={{ mx: 1 }}
            >
              Dashboard
            </Button>

            <Button
              color="primary"
              component={RouterLink}
              to="/admin/all-users"
              sx={{ mx: 1 }}
            >
              Users list
            </Button>

            <Button
              color="primary"
              component={RouterLink}
              to="/admin/user-profile"
              sx={{ mx: 1 }}
            >
              User profile
            </Button>

            <Button
              color="primary"
              component={RouterLink}
              to="/"
              sx={{ mx: 1 }}
            >
              Back to website
            </Button>
          </Box>

          <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            <MenuIcon
              color="primary"
              onClick={handleMenuOpen}
              sx={{ mx: 1, fontSize: '1.8rem' }}
            />
          </Box>
          {menus}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default AdminHeader;
