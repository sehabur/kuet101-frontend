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
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import Spinner from '../components/shared/Spinner';
import axios from 'axios';
import { useSelector } from 'react-redux';
import AlumniCard from '../components/shared/AlumniCard';
import { useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
const FindYourMates = () => {
  const [isLoading, setIsLoading] = useState(false);

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
        </Box>
      </Box>

      <Box sx={{ my: 4, bgcolor: '#eee' }}>
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
          <Grid
            container
            spacing={3}
            display="flex"
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
          <Grid
            container
            spacing={3}
            display="flex"
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
            Alumni from your home district
          </Typography>
          <Grid
            container
            spacing={3}
            display="flex"
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
        </Box>
      </Box>

      <Box
        sx={{
          textAlign: 'center',
          mt: 4,
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
          to="/searchAlumni"
          sx={{ fontSize: '1.1rem', px: 6, py: 1.5, mt: 4 }}
        >
          Search for an alumni
        </Button>
      </Box>
    </>
  );
};

export default FindYourMates;
