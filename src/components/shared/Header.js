import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import { authActions } from '../../store';
import ToastMessage from './ToastMessage';

const Header = () => {
  const theme = useTheme();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const [logoutSuccess, setLogoutSuccess] = useState(false);

  const matchesSmDown = useMediaQuery(theme.breakpoints.down('sm'));

  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);

  const [exploreMenuAnchorEl, setExploreMenuAnchorEl] = useState(null);

  const [mobileViewMenuAnchorEl, setMobileViewMenuAnchorEl] = useState(null);

  const [tutionMenuAnchorEl, setTutionMenuAnchorEl] = useState(null);

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

  const handleTutionMenuOpen = (event) => {
    setTutionMenuAnchorEl(event.currentTarget);
  };
  const handleTutionMenuClose = () => {
    setTutionMenuAnchorEl(null);
  };

  const handleNavigation = (navigateTo, type) => {
    if (type === 'profile') {
      handleProfileMenuClose();
    } else if (type === 'mobileView') {
      handleMobileViewMenuClose();
    } else if (type === 'explore') {
      handleExploreMenuClose();
    } else if (type === 'tution') {
      handleTutionMenuClose();
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
    navigate('/signin');
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
        Hello, {auth?.firstName}
      </Typography>
      <Divider sx={{ mb: 1 }} />
      <MenuItem
        onClick={() => handleNavigation(`/profile/${auth._id}`, 'profile')}
      >
        <ListItemIcon>
          <ManageAccountsIcon color="primary" />
        </ListItemIcon>
        <ListItemText>
          <Typography>My Profile</Typography>
        </ListItemText>
      </MenuItem>

      {auth?.isAdmin && (
        <MenuItem
          onClick={() => handleNavigation(`/admin/dashboard`, 'profile')}
        >
          <ListItemIcon>
            <AdminPanelSettingsIcon color="primary" />
          </ListItemIcon>
          <ListItemText>
            <Typography>Admin panel</Typography>
          </ListItemText>
        </MenuItem>
      )}

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
        onClick={() => handleNavigation('/find-your-mates', 'explore')}
        sx={{ px: 4 }}
      >
        Find Your Mates
      </MenuItem>
      <MenuItem
        onClick={() => handleNavigation('/posts', 'explore')}
        sx={{ px: 4 }}
      >
        Posts
      </MenuItem>
      <MenuItem
        onClick={() => handleNavigation('/gallery', 'explore')}
        sx={{ px: 4 }}
      >
        Photo Gallery
      </MenuItem>
      <MenuItem
        onClick={() => handleNavigation('/aboutus', 'explore')}
        sx={{ px: 4 }}
      >
        About Us
      </MenuItem>
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
      <MenuItem
        sx={{ px: 4, color: 'primary.dark' }}
        onClick={() => handleNavigation('/search-alumni', 'mobileView')}
      >
        Seach alumni
      </MenuItem>
      <MenuItem
        sx={{ px: 4, color: 'primary.dark' }}
        onClick={() => handleNavigation('/find-your-mates', 'mobileView')}
      >
        Find your mates
      </MenuItem>

      <MenuItem
        sx={{ px: 4, color: 'primary.dark' }}
        onClick={() => handleNavigation('/search-blood', 'mobileView')}
      >
        Blood
      </MenuItem>

      <MenuItem
        sx={{ px: 4, color: 'primary.dark' }}
        onClick={() => handleNavigation('/learning', 'mobileView')}
      >
        Learning hub
      </MenuItem>

      <MenuItem
        sx={{ px: 4, color: 'primary.dark' }}
        onClick={() => handleNavigation('/tutor/find', 'mobileView')}
      >
        Find a tutor
      </MenuItem>
      <MenuItem
        sx={{ px: 4, color: 'primary.dark' }}
        onClick={() => handleNavigation('/tutor/enroll', 'mobileView')}
      >
        Enroll to be a tutor
      </MenuItem>

      <MenuItem
        onClick={() => handleNavigation('/posts', 'mobileView')}
        sx={{ px: 4, color: 'primary.dark' }}
      >
        Posts
      </MenuItem>
      <MenuItem
        onClick={() => handleNavigation('/gallery', 'mobileView')}
        sx={{ px: 4, color: 'primary.dark' }}
      >
        Photo Gallery
      </MenuItem>
      <MenuItem
        onClick={() => handleNavigation('/aboutus', 'mobileView')}
        sx={{ px: 4, color: 'primary.dark' }}
      >
        About Us
      </MenuItem>
    </Menu>
  );

  const tutionMenu = (
    <Menu
      anchorEl={tutionMenuAnchorEl}
      open={Boolean(tutionMenuAnchorEl)}
      onClose={handleTutionMenuClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <MenuItem
        sx={{ px: 4 }}
        onClick={() => handleNavigation('/tutor/find', 'tution')}
      >
        Find a tutor
      </MenuItem>
      <MenuItem
        sx={{ px: 4 }}
        onClick={() => handleNavigation('/tutor/enroll', 'tution')}
      >
        Enroll to be a tutor
      </MenuItem>
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
        <Toolbar sx={{ width: { xs: 'inherit', sm: '1280px' }, mx: 'auto' }}>
          <Box
            sx={{
              pt: 0.7,
            }}
            component={RouterLink}
            to="/"
          >
            <img src="/images/logo.png" alt="logo" width="180" />
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {!matchesSmDown && (
            <>
              <Button
                color="primary"
                onClick={() => handleNavigation('/search-alumni')}
                sx={{ mx: 1 }}
              >
                Search alumni
              </Button>

              <Button
                color="primary"
                onClick={() => handleNavigation('/search-blood')}
                sx={{ mx: 1 }}
              >
                Blood
              </Button>

              <Button
                color="primary"
                onClick={() => handleNavigation('/learning')}
                sx={{ mx: 1 }}
              >
                Learning hub
              </Button>

              <Button
                color="primary"
                sx={{ mx: 1 }}
                endIcon={<ArrowDropDownIcon sx={{ ml: -1 }} />}
                onClick={handleTutionMenuOpen}
              >
                Tution
              </Button>
              {tutionMenu}

              <Button
                color="primary"
                sx={{ mx: 1 }}
                endIcon={<ArrowDropDownIcon sx={{ ml: -1 }} />}
                onClick={handleExploreMenuOpen}
              >
                More
              </Button>
              {exploreMenu}
            </>
          )}
          {matchesSmDown && (
            <MenuIcon
              color="primary"
              onClick={handleMobileViewMenuOpen}
              sx={{ mx: 1, fontSize: '1.8rem' }}
            />
          )}

          <Avatar
            src={`${process.env.REACT_APP_CLOUD_IMAGE_URL}/${auth?.profilePicture}`}
            alt={auth?.firstName}
            onClick={handleProfileMenuOpen}
            sx={{
              color: 'secondary.main',
              bgcolor: '#ddd',
              mx: 2,
            }}
          />
          {profileMenu}

          {mobileViewMenu}
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
