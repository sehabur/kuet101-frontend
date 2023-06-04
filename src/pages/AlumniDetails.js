import React, { useState } from 'react';

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../components/shared/Spinner';
import { useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
const AlumniDetails = () => {
  const [isLoading, setIsLoading] = useState(false);

  const auth = useSelector((state) => state.auth);

  const [userDetails, setUserDetails] = useState(null);

  let { id } = useParams();

  const getUserDetails = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/profile/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setUserDetails(response.data.user);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <Box sx={{ maxWidth: '950px', mx: 'auto', py: 4, px: 2, mb: 4 }}>
      <Spinner open={isLoading} />
      {userDetails && (
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Grid item xs={12} sm={3} sx={{}}>
            <Avatar
              src={`${process.env.REACT_APP_CLOUD_IMAGE_URL}/${userDetails.profilePicture}`}
              sx={{ width: 150, height: 150, mx: 'auto', mt: 2 }}
            />
          </Grid>

          <Grid item xs={12} sm={9} sx={{ mt: 2 }}>
            <Typography variant="h4">
              {userDetails.firstName} {userDetails.lastName}
            </Typography>
            <Typography variant="h5" color="primary.dark" sx={{ mt: 0.5 }}>
              {userDetails.currentJobTitle} at {userDetails.currentOrganization}
            </Typography>
            <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
              Department of {userDetails.departmentLong}
            </Typography>
            <Chip
              label={`${userDetails.batch} Batch`}
              color="info"
              sx={{ borderRadius: 2, py: 0, mr: 2, fontSize: '1rem' }}
            />
            <Chip
              label={userDetails.rollNo}
              color="success"
              sx={{ borderRadius: 2, py: 0, fontSize: '1rem' }}
            />

            <Typography variant="body1" sx={{ mt: 3 }}>
              Home District: {userDetails.homeDistrict}
            </Typography>
            <Divider sx={{ my: 3 }} />
            <Typography
              variant="body1"
              sx={{ mt: 1, mb: 2 }}
              color="text.secondary"
            >
              Contact information
            </Typography>

            <Typography variant="body1" sx={{ mt: 1 }}>
              E-mail: {userDetails.email}
            </Typography>
            {userDetails.phoneNo && (
              <Typography variant="body1" sx={{ mt: 1 }}>
                Phone number: {userDetails.phoneNo}
              </Typography>
            )}
            <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
              Present location: {userDetails.presentDistrict}
            </Typography>
            <Button
              variant="outlined"
              sx={{ mt: 1, mr: 2 }}
              component={RouterLink}
              to={userDetails.linkedinProfileUrl}
              target="_blank"
            >
              Linkedin profile
            </Button>
            <Button
              variant="outlined"
              sx={{ mt: 1 }}
              component={RouterLink}
              to={userDetails.facebookProfileUrl}
              target="_blank"
            >
              Facebook profile
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default AlumniDetails;
