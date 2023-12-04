import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Typography,
} from '@mui/material';

import Spinner from '../../components/shared/Spinner';

const AlumniDetails = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  const [userDetails, setUserDetails] = useState(null);

  const { id } = useParams();

  let displayPhoneNo = true;
  if (auth?.gender === 'male' && userDetails?.gender === 'female') {
    displayPhoneNo = false;
  }

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
  }, [id]);

  useEffect(() => {
    if (!auth?.isLoggedIn) {
      navigate('/signin');
    }
  }, [navigate, auth]);

  return (
    <Box sx={{ maxWidth: '850px', mx: 'auto', py: 4, px: 2, mb: 4 }}>
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
            <Typography variant="h4" sx={{ fontSize: '2rem' }}>
              {userDetails.firstName} {userDetails.lastName}
            </Typography>

            {id === auth?._id && (
              <>
                <Button
                  variant="outlined"
                  color="warning"
                  component={RouterLink}
                  to={`/profile/edit/${id}`}
                  sx={{ py: 0.25, my: 1, mr: 2 }}
                >
                  Edit profile
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  component={RouterLink}
                  to={`/posts/my-posts/${id}`}
                  sx={{ py: 0.25, my: 1, mr: 2 }}
                >
                  My posts
                </Button>
              </>
            )}

            <Typography
              color="primary.dark"
              sx={{ mt: 0.5, fontSize: '1.3rem' }}
            >
              {userDetails.status === 'seekingJob' &&
                'I am still seeking an appropiate opportunity'}

              {userDetails.status === 'runningStudent' &&
                'I am a running student'}

              {!['seekingJob', 'runningStudent'].includes(userDetails.status) &&
                `${userDetails.currentJobTitle} at ${userDetails.currentOrganization}`}
            </Typography>

            <Divider sx={{ my: 2 }} light={true} />

            <Typography sx={{ mb: 1, fontSize: '1.15rem' }}>
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

            <Typography variant="body1" sx={{ mt: 1 }}>
              Blood Group: {userDetails.bloodGroup}
            </Typography>

            <Divider sx={{ my: 2 }} light={true} />
            <Typography variant="body1" sx={{ mb: 2 }} color="text.secondary">
              Contact information
            </Typography>

            <Typography variant="body1" sx={{ mt: 1 }}>
              E-mail: {userDetails.email}
            </Typography>
            {displayPhoneNo && userDetails.phoneNo && (
              <Typography variant="body1" sx={{ mt: 1 }}>
                Phone number: {userDetails?.phoneNo || 'Not available'}
              </Typography>
            )}
            <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
              Present location: {userDetails.presentDistrict}
            </Typography>
            {userDetails.linkedinProfileUrl && (
              <Button
                variant="outlined"
                sx={{ mt: 1, mr: 2 }}
                component={RouterLink}
                to={userDetails.linkedinProfileUrl}
                target="_blank"
              >
                Linkedin profile
              </Button>
            )}

            {userDetails.facebookProfileUrl && (
              <Button
                variant="outlined"
                sx={{ mt: 1 }}
                component={RouterLink}
                to={userDetails.facebookProfileUrl}
                target="_blank"
              >
                Facebook profile
              </Button>
            )}

            <Divider sx={{ my: 2 }} light={true} />
            <Typography variant="body1" sx={{ mb: 2 }} color="text.secondary">
              Interests
            </Typography>
            {userDetails.interests
              .filter((item) => item !== '')
              .map((item) => (
                <Chip label={item} sx={{ mr: 1.5 }} />
              ))}
            {userDetails.interests.filter((item) => item !== '').length < 1 && (
              <Typography>No interest added</Typography>
            )}

            <Typography variant="body1" sx={{ my: 2 }} color="text.secondary">
              Expert zone
            </Typography>
            {userDetails.expertin
              .filter((item) => item !== '')
              .map((item) => (
                <Chip label={item} sx={{ mr: 1.5 }} />
              ))}
            {userDetails.expertin.filter((item) => item !== '').length < 1 && (
              <Typography>No expert zone added</Typography>
            )}

            {id === auth?._id && (
              <>
                <Divider sx={{ mt: 3 }} light={true} />
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6" color="success.dark">
                    Referral Code: {userDetails.selfReferralCode}
                  </Typography>
                  <Typography color="text.secondary">
                    Use this code to refer another alumni
                  </Typography>
                </Box>
              </>
            )}
            <Typography sx={{ mt: 4, fontSize: '.9rem', fontStyle: 'italic' }}>
              Profile last updated on{' '}
              {format(new Date(userDetails.createdAt), 'dd/MM/yyyy')}
            </Typography>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default AlumniDetails;
