import React, { useState, useEffect } from 'react';
// import {
//   Link as RouterLink,
//   useNavigate,
//   useSearchParams,
// } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { Box, Paper, Typography } from '@mui/material';

import Spinner from '../../components/shared/Spinner';
import { grey } from '@mui/material/colors';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);

  const auth = useSelector((state) => state.auth);

  const [userData, setUserData] = useState(null);

  const [postData, setPostData] = useState(null);
  const [tutionData, setTutionData] = useState(null);
  const [galleryData, setGalleryData] = useState(null);

  const getDashboardData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/getDashboardData`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setUserData(response.data.users[0]);
      setPostData(response.data.posts);
      setTutionData(response.data.tution);
      setGalleryData(response.data.gallery);
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
    <Box
      sx={{
        maxWidth: '1280px',
        mx: 'auto',
        px: 2,
        pt: 2,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <Spinner open={isLoading} />
      <Paper
        elevation={8}
        sx={{ width: 200, m: 2, p: 2, fontSize: '2rem', borderRadius: 2 }}
      >
        <Typography variant="h6" sx={{ mb: 1, color: 'primary.dark' }}>
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
              {item._id === true ? 'Active: ' : 'Inactive: '} {item.count}
            </Typography>
          </Box>
        ))}
        {userData?.approvalStatus?.map((item) => (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Approval Status
            </Typography>
            <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
              {item._id}: {item.count}
            </Typography>
          </Box>
        ))}
      </Paper>
      <Paper
        elevation={8}
        sx={{ width: 200, m: 2, p: 2, fontSize: '2rem', borderRadius: 2 }}
      >
        <Typography variant="h6" sx={{ mb: 1, color: 'primary.dark' }}>
          By Department
        </Typography>
        {userData?.department?.map((item) => (
          <Box>
            <Typography variant="body1">
              {item._id} {' : '} {item.count}
            </Typography>
          </Box>
        ))}
      </Paper>

      <Paper
        elevation={8}
        sx={{ width: 200, m: 2, p: 2, fontSize: '2rem', borderRadius: 2 }}
      >
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ mb: 1, color: 'primary.dark' }}>
            Posts
          </Typography>
          <Typography variant="body1">
            Total: {postData && postData[0].count + postData[1].count}
          </Typography>
          <Typography variant="body1">
            Active: {postData?.find((item) => item._id === true).count}
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ mb: 1, color: 'primary.dark' }}>
            Gallery Images
          </Typography>
          <Typography variant="body1">Total: </Typography>
          <Typography variant="body1">
            Active: {galleryData?.find((item) => item._id === true).count}
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ mb: 1, color: 'primary.dark' }}>
            Tution
          </Typography>
          <Typography variant="body1">
            Total:{' '}
            {tutionData &&
              tutionData[0].count +
                (tutionData.length > 1 ? tutionData[1].count : 0)}
          </Typography>
          <Typography variant="body1">
            Active: {tutionData?.find((item) => item._id === true).count}
          </Typography>
        </Box>
      </Paper>

      <Paper
        elevation={8}
        sx={{ width: 200, m: 2, p: 2, fontSize: '2rem', borderRadius: 2 }}
      >
        <Typography variant="h6" sx={{ mb: 1, color: 'primary.dark' }}>
          By Batch
        </Typography>
        {userData?.batch?.map((item) => (
          <Box>
            <Typography variant="body1">
              {item._id} {' : '} {item.count}
            </Typography>
          </Box>
        ))}
      </Paper>
    </Box>
  );
};

export default Dashboard;
