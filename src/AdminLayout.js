import React, { useEffect } from "react";

import { Outlet, useLocation } from "react-router-dom";

import AdminHeader from "./components/admin/AdminHeader";
import AdminFooter from "./components/admin/AdminFooter";
import { useSelector } from "react-redux";
import { Box, Paper, Typography } from "@mui/material";
import { red } from "@mui/material/colors";

const AdminLayout = () => {
  let location = useLocation();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      {auth?.isAdmin ? (
        <>
          <AdminHeader />
          <Outlet />
          <AdminFooter />
        </>
      ) : (
        <Box
          sx={{
            width: 600,
            mx: "auto",
            my: 12,
          }}
        >
          <Paper
            elevation={16}
            sx={{
              height: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              bgcolor: red[50],
              color: red[800],
            }}
          >
            <Typography variant="h5">Access Denied</Typography>
          </Paper>
        </Box>
      )}
    </>
  );
};

export default AdminLayout;
