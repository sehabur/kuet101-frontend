import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { Box, Button, Grid, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

import Spinner from '../components/shared/Spinner';
import AlumniCard from '../components/shared/AlumniCard';

const FindYourMates = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  const [findYourMatesData, setFindYourMatesData] = useState(null);

  const getFindYourMatesData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/findYourMates`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setFindYourMatesData(response.data.users);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getFindYourMatesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  useEffect(() => {
    if (!auth?.isLoggedIn) {
      navigate('/signin');
    }
  }, [navigate, auth]);

  return (
    <>
      <Spinner open={isLoading} />
      <Box sx={{ my: 0 }}>
        <Box
          sx={{ maxWidth: '1080px', mx: 'auto', py: 4, textAlign: 'center' }}
        >
          <Typography
            variant="h5"
            sx={{ fontFamily: 'Proza Libre, sans-serif', mb: 4, px: 2 }}
            color="secondary.main"
          >
            Trending people in your community
          </Typography>

          {findYourMatesData?.usersByTrend?.length > 0 ? (
            <Grid
              container
              spacing={3}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              {findYourMatesData?.usersByTrend.map((user) => (
                <Grid
                  item
                  xs={12}
                  sm={3}
                  sx={{ mx: { xs: 4, sm: 0 }, mb: { xs: 0, sm: 1 } }}
                >
                  <AlumniCard data={user} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography>No alumni found with trending profile</Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ my: 4, bgcolor: grey[50] }}>
        <Box
          sx={{
            maxWidth: '1080px',
            mx: 'auto',
            pt: 4,
            pb: 8,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontFamily: 'Proza Libre, sans-serif', mt: 2, mb: 4, px: 2 }}
            color="secondary.main"
          >
            Alumni from your department
          </Typography>
          {findYourMatesData?.usersByDept?.length > 0 ? (
            <Grid
              container
              spacing={3}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              {findYourMatesData?.usersByDept.map((user) => (
                <Grid
                  item
                  xs={12}
                  sm={3}
                  sx={{ mx: { xs: 4, sm: 0 }, mb: { xs: 0, sm: 1 } }}
                >
                  <AlumniCard data={user} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography>No alumni found matching your profile</Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ my: 4 }}>
        <Box
          sx={{ maxWidth: '1080px', mx: 'auto', py: 4, textAlign: 'center' }}
        >
          <Typography
            variant="h5"
            sx={{ fontFamily: 'Proza Libre, sans-serif', mb: 4, px: 2 }}
            color="secondary.main"
          >
            Alumni from your batch
          </Typography>

          {findYourMatesData?.usersByBatch?.length > 0 ? (
            <Grid
              container
              spacing={3}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              {findYourMatesData?.usersByBatch.map((user) => (
                <Grid
                  item
                  xs={12}
                  sm={3}
                  sx={{ mx: { xs: 4, sm: 0 }, mb: { xs: 0, sm: 1 } }}
                >
                  <AlumniCard data={user} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography>No alumni found matching your profile</Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ mt: 4, pb: 4, bgcolor: grey[50] }}>
        <Box
          sx={{ maxWidth: '1080px', mx: 'auto', py: 4, textAlign: 'center' }}
        >
          <Typography
            variant="h5"
            sx={{ fontFamily: 'Proza Libre, sans-serif', mb: 4, px: 2 }}
            color="secondary.main"
          >
            Alumni from your home district
          </Typography>

          {findYourMatesData?.usersByHomeDistrict?.length > 0 ? (
            <Grid
              container
              spacing={3}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              {findYourMatesData?.usersByHomeDistrict.map((user) => (
                <Grid
                  item
                  xs={12}
                  sm={3}
                  sx={{ mx: { xs: 4, sm: 0 }, mb: { xs: 0, sm: 1 } }}
                >
                  <AlumniCard data={user} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography>No alumni found matching your profile</Typography>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          bgcolor: '#202F7A',
        }}
      >
        <Typography variant="h5" sx={{ color: grey[200] }}>
          Cannot find the alumni you are looking for?
        </Typography>
        <Typography variant="h6" sx={{ color: grey[200], mt: 2 }}>
          Try our advanced search
        </Typography>

        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/search-alumni"
          sx={{ fontSize: '1.1rem', px: 6, py: 1.5, mt: 4 }}
        >
          Search for an alumni
        </Button>
      </Box>
    </>
  );
};

export default FindYourMates;
