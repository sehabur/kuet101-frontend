import React, { useState, useEffect } from "react";
// import {
//   Link as RouterLink,
//   useNavigate,
//   useSearchParams,
// } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from "axios";
import { Box, Paper, Typography } from "@mui/material";
import Spinner from "../../components/shared/Spinner";
import { green } from "@mui/material/colors";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);

  const auth = useSelector((state) => state.auth);

  const [userData, setUserData] = useState(null);

  const [postData, setPostData] = useState(null);
  const [tutionData, setTutionData] = useState(null);
  const [galleryData, setGalleryData] = useState(null);

  const getItemCount = (data) => {
    let active = 0;
    let inactive = 0;
    for (let item of data) {
      if (item._id === "true") {
        active = item.count;
      } else if (item._id === "false") {
        inactive = item.count;
      }
    }
    let total = active + inactive;
    return [total, active, inactive];
  };

  const getDashboardData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/getDashboardData`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setUserData(response.data.users[0]);
      setPostData(getItemCount(response.data.posts));
      setTutionData(getItemCount(response.data.tution));
      setGalleryData(getItemCount(response.data.gallery));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.isLoggedIn) getDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <>
      {auth?.isAdmin && ["superAdmin", "editor"].includes(auth?.adminRole) ? (
        <Box
          sx={{
            maxWidth: "1280px",
            mx: "auto",
            px: 2,
            pt: 2,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Spinner open={isLoading} />
          <Paper
            elevation={8}
            sx={{ width: 200, m: 2, p: 2, fontSize: "2rem", borderRadius: 2 }}
          >
            <Typography variant="h6" sx={{ mb: 1, color: "primary.dark" }}>
              Users
            </Typography>

            <Box>
              <Typography variant="body1">
                Total users: {userData?.total[0].count}
              </Typography>
            </Box>

            {userData?.activeStatus?.map((item) => (
              <Box>
                <Typography variant="body1">
                  {item._id === true ? "Active: " : "Inactive: "} {item.count}
                </Typography>
              </Box>
            ))}
            {userData?.approvalStatus?.map((item) => (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  Approval Status
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ textTransform: "capitalize" }}
                >
                  {item._id}: {item.count}
                </Typography>
              </Box>
            ))}
          </Paper>
          <Paper
            elevation={8}
            sx={{ width: 200, m: 2, p: 2, fontSize: "2rem", borderRadius: 2 }}
          >
            <Typography variant="h6" sx={{ mb: 1, color: "primary.dark" }}>
              By Department
            </Typography>
            {userData?.department?.map((item) => (
              <Box>
                <Typography variant="body1">
                  {item._id} {" : "} {item.count}
                </Typography>
              </Box>
            ))}
          </Paper>

          <Paper
            elevation={8}
            sx={{ width: 200, m: 2, p: 2, fontSize: "2rem", borderRadius: 2 }}
          >
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 1, color: "primary.dark" }}>
                Posts
              </Typography>
              <Typography variant="body1">
                Total: {postData && postData[0]}
                {/* {postData &&
            (postData.find((item) => item._id === true)?.count ||
              0 + postData.find((item) => item._id === false)?.count ||
              0)} */}
              </Typography>
              <Typography variant="body1">
                Active: {postData && postData[1]}
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 1, color: "primary.dark" }}>
                Gallery Images
              </Typography>
              <Typography variant="body1">
                Total: {galleryData && galleryData[0]}
              </Typography>
              <Typography variant="body1">
                Active: {galleryData && galleryData[1]}
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 1, color: "primary.dark" }}>
                Tution
              </Typography>
              <Typography variant="body1">
                Total: {tutionData && tutionData[0]}
              </Typography>
              <Typography variant="body1">
                Active: {tutionData && tutionData[1]}
              </Typography>
            </Box>
          </Paper>

          <Paper
            elevation={8}
            sx={{ width: 200, m: 2, p: 2, fontSize: "2rem", borderRadius: 2 }}
          >
            <Typography variant="h6" sx={{ mb: 1, color: "primary.dark" }}>
              By Batch
            </Typography>
            {userData?.batch?.map((item) => (
              <Box>
                <Typography variant="body1">
                  {item._id} {" : "} {item.count}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              width: 600,
              mx: "auto",
              my: 12,
              px: 4,
            }}
          >
            <Paper
              elevation={0}
              variant="outlined"
              sx={{
                height: 120,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                bgcolor: green[50],
                color: green[800],
                borderRadius: 4,
              }}
            >
              <Typography variant="h5">
                Welcome to admin panel dashboard!
              </Typography>
            </Paper>
          </Box>
        </>
      )}
    </>
  );
};

export default Dashboard;
