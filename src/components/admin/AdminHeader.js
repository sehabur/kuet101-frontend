import { AppBar, Box, Button, Menu, MenuItem, Toolbar } from "@mui/material";
import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";

const AdminHeader = () => {
  const navigate = useNavigate();

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const auth = useSelector((state) => state.auth);

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
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      {auth?.isAdmin && ["superAdmin", "editor"].includes(auth?.adminRole) && (
        <>
          <MenuItem
            onClick={() => handleNavigation("/admin/dashboard")}
            sx={{ px: 4 }}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            onClick={() => handleNavigation("/admin/all-users")}
            sx={{ px: 4 }}
          >
            Users list
          </MenuItem>
          <MenuItem
            onClick={() => handleNavigation("/admin/user-profile")}
            sx={{ px: 4 }}
          >
            User profile
          </MenuItem>
          <MenuItem
            onClick={() => handleNavigation("/admin/all-posts")}
            sx={{ px: 4 }}
          >
            Posts
          </MenuItem>
          <MenuItem
            onClick={() => handleNavigation("/admin/gallery")}
            sx={{ px: 4 }}
          >
            Gallery
          </MenuItem>
        </>
      )}

      {auth?.isAdmin &&
        ["superAdmin", "editor", "try"].includes(auth?.adminRole) && (
          <>
            <MenuItem
              onClick={() => handleNavigation("/try-admin/donation/create")}
              sx={{ px: 4 }}
            >
              Create Donation
            </MenuItem>
            <MenuItem
              onClick={() => handleNavigation("/try-admin/donation")}
              sx={{ px: 4 }}
            >
              All Donations
            </MenuItem>
            <MenuItem
              onClick={() => handleNavigation("/try-admin/active-donor/create")}
              sx={{ px: 4 }}
            >
              Create active donor
            </MenuItem>
            <MenuItem
              onClick={() => handleNavigation("/try-admin/active-donor")}
              sx={{ px: 4 }}
            >
              All active donor
            </MenuItem>
            <MenuItem
              onClick={() =>
                handleNavigation("/try-admin/all-special-donation")
              }
              sx={{ px: 4 }}
            >
              All special donation
            </MenuItem>
            <MenuItem
              onClick={() =>
                handleNavigation("/try-admin/all-recurring-donation")
              }
              sx={{ px: 4 }}
            >
              All recurring donation
            </MenuItem>
          </>
        )}

      <MenuItem onClick={() => handleNavigation("/")} sx={{ px: 4 }}>
        Back to website
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "white",
          borderBottom: `1px solid #d8daf9`,
        }}
        elevation={0}
      >
        <Toolbar sx={{ width: { xs: "inherit", sm: "1080px" }, mx: "auto" }}>
          <Box
            sx={{
              pt: 0.7,
            }}
          >
            <img src="/images/logo.png" alt="logo" width="180" />
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* <Box
            sx={{
              display: { xs: "none", sm: "block" },
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
              to="/admin/all-posts"
              sx={{ mx: 1 }}
            >
              Posts
            </Button>

            <Button
              color="primary"
              component={RouterLink}
              to="/admin/gallery"
              sx={{ mx: 1 }}
            >
              Gallery
            </Button>

            <Button
              color="primary"
              component={RouterLink}
              to="/"
              sx={{ mx: 1 }}
            >
              Back to website
            </Button>
          </Box> */}

          <Box>
            <MenuIcon
              color="primary"
              onClick={handleMenuOpen}
              sx={{ mx: 1, fontSize: "1.8rem" }}
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
