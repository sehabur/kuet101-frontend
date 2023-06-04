import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { authActions } from '../../store';
import { useDispatch } from 'react-redux';
import ToastMessage from './ToastMessage';
const Header = () => {
  const theme = useTheme();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [logoutSuccess, setLogoutSuccess] = useState(false);

  const matchesSmDown = useMediaQuery(theme.breakpoints.down('sm'));

  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);

  const [exploreMenuAnchorEl, setExploreMenuAnchorEl] = useState(null);

  const [mobileViewMenuAnchorEl, setMobileViewMenuAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchorEl(event.currentTarget);
  };
  const handleProfileMenuClose = () => {
    setProfileMenuAnchorEl(null);
  };

  const handleExploreMenuOpen = (event) => {
    setExploreMenuAnchorEl(event.currentTarget);
  };
  const handleExploreMenuClose = () => {
    setExploreMenuAnchorEl(null);
  };

  const handleMobileViewMenuOpen = (event) => {
    setMobileViewMenuAnchorEl(event.currentTarget);
  };
  const handleMobileViewMenuClose = () => {
    setMobileViewMenuAnchorEl(null);
  };

  const handleNavigation = (navigateTo, type) => {
    if (type === 'profile') {
      handleProfileMenuClose();
    } else if (type === 'mobileView') {
      handleMobileViewMenuClose();
    } else if (type === 'explore') {
      handleExploreMenuClose();
    }
    navigate(navigateTo);
  };

  const handleLogoutToastColse = () => {
    setLogoutSuccess(false);
  };
  const handleLogout = () => {
    handleProfileMenuClose();
    localStorage.removeItem('userInfo');
    dispatch(authActions.logout());
    setLogoutSuccess(true);
    // navigate('/signin');
  };

  const profileMenu = (
    <Menu
      anchorEl={profileMenuAnchorEl}
      open={Boolean(profileMenuAnchorEl)}
      onClose={handleProfileMenuClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <Typography
        sx={{ mt: 1, mb: 1.4, mx: 4, maxWidth: '200px' }}
        textAlign="center"
      >
        Hello, Sehabur!
      </Typography>
      <Divider sx={{ mb: 1 }} />
      <MenuItem onClick={() => handleNavigation('/myAccount', 'profile')}>
        <ListItemIcon>
          <ManageAccountsIcon color="primary" />
        </ListItemIcon>
        <ListItemText>
          <Typography>My Profile</Typography>
        </ListItemText>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon color="primary" />
        </ListItemIcon>
        <ListItemText>
          <Typography>Logout</Typography>
        </ListItemText>
      </MenuItem>
    </Menu>
  );

  const exploreMenu = (
    <Menu
      anchorEl={exploreMenuAnchorEl}
      open={Boolean(exploreMenuAnchorEl)}
      onClose={handleExploreMenuClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <MenuItem
        sx={{ px: 4 }}
        onClick={() => handleNavigation('/events', 'explore')}
      >
        Events
      </MenuItem>
      <MenuItem sx={{ px: 4 }}>Stories</MenuItem>
      <MenuItem sx={{ px: 4 }}>Club activity</MenuItem>
      <MenuItem sx={{ px: 4 }}>Learning hub</MenuItem>
    </Menu>
  );

  const mobileViewMenu = (
    <Menu
      anchorEl={mobileViewMenuAnchorEl}
      open={Boolean(mobileViewMenuAnchorEl)}
      onClose={handleMobileViewMenuClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <MenuItem sx={{ px: 4, color: 'primary.dark' }}>Seach alumni</MenuItem>
      <MenuItem
        sx={{ px: 4, color: 'primary.dark' }}
        onClick={() => handleNavigation('/findYourMates', 'mobileView')}
        component={RouterLink}
        to="/findYourMates"
      >
        Find your mates
      </MenuItem>
      <MenuItem sx={{ px: 4, color: 'primary.dark' }}>Events</MenuItem>
      <MenuItem sx={{ px: 4, color: 'primary.dark' }}>Stories</MenuItem>
      <MenuItem sx={{ px: 4, color: 'primary.dark' }}>Club activity</MenuItem>
      <MenuItem sx={{ px: 4, color: 'primary.dark' }}>Learning hub</MenuItem>
    </Menu>
  );

  useEffect(() => {
    const authDataFromStorage = JSON.parse(localStorage.getItem('userInfo'));
    authDataFromStorage && dispatch(authActions.login(authDataFromStorage));
  }, [dispatch]);

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
        <Toolbar>
          <Box
            sx={{
              pt: 0.7,
              ml: { xs: 0, sm: 5 },
            }}
            component={RouterLink}
            to="/"
          >
            <img src="logo.png" alt="logo" width="180" />
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {!matchesSmDown && (
            <>
              <Button
                color="primary"
                component={RouterLink}
                to="/searchAlumni"
                sx={{ mx: 1 }}
              >
                Search alumni
              </Button>

              <Button
                color="primary"
                onClick={() => handleNavigation('/findYourMates')}
                sx={{ mx: 1 }}
              >
                Find your mates
              </Button>

              <Button
                color="primary"
                sx={{ mx: 1 }}
                endIcon={<ArrowDropDownIcon sx={{ ml: -1 }} />}
                onClick={handleExploreMenuOpen}
              >
                Explore
              </Button>
              {exploreMenu}
            </>
          )}

          <Avatar
            src="/static/images/avatar/1.jpg"
            alt="Remy Sharp"
            onClick={handleProfileMenuOpen}
            sx={{
              color: 'secondary.main',
              bgcolor: '#ddd',
              ml: 1,
              mr: { xs: 0, sm: 4 },
            }}
          />
          {profileMenu}
          {mobileViewMenu}

          {matchesSmDown && (
            <MenuIcon
              color="primary"
              onClick={handleMobileViewMenuOpen}
              sx={{ ml: 2, fontSize: '1.8rem' }}
            />
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />

      <ToastMessage
        open={logoutSuccess}
        omClose={handleLogoutToastColse}
        severity="success"
        message="Logout Successful!"
      />
    </>
  );
};

export default Header;
