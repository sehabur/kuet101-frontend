import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import Spinner from '../../components/shared/Spinner';
import TutorCard from '../../components/shared/TutorCard';
import { grey } from '@mui/material/colors';
import { districts } from '../../data/mappingFile';

const FindTutor = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  const [findTutorData, setFindTutorData] = useState(null);

  const [district, setDistrict] = useState('all');

  const handleChange = (event) => {
    setDistrict(event.target.value);
  };

  const handleSubmit = async () => {
    getTutorData(district);
  };

  const getTutorData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/findTutor?district=${district}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setFindTutorData(response.data.tutors);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getTutorData();
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
      <Box sx={{ bgcolor: grey[100] }}>
        <Box
          sx={{
            maxWidth: '980px',
            mx: 'auto',
            px: 2,
            pt: 2,
          }}
        >
          <TextField
            select
            label="Present district"
            name="presentDistrict"
            size="small"
            value={district}
            onChange={handleChange}
            sx={{ minWidth: 175, mr: 2, mb: 2 }}
          >
            <MenuItem value="all">Select All</MenuItem>
            {districts.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mb: 2, px: 3 }}
            onClick={handleSubmit}
          >
            Search
          </Button>
        </Box>
      </Box>
      <Box sx={{ my: 0 }}>
        <Box
          sx={{ maxWidth: '1080px', mx: 'auto', py: 4, textAlign: 'center' }}
        >
          <Typography
            variant="h5"
            sx={{ fontFamily: 'Proza Libre, sans-serif', mb: 4, px: 2 }}
            color="secondary.main"
          >
            Find a tutor
          </Typography>
          <Typography
            sx={{ fontFamily: 'Proza Libre, sans-serif', mb: 4, px: 2 }}
          >
            Are you looking for a Kuet student as a part time tutor? Explore
            available tutors below, find the one that maches your requirements
            and contact him.
          </Typography>
          <Grid
            container
            spacing={3}
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
          >
            {findTutorData?.length > 0 ? (
              findTutorData.map((tutors) => (
                <Grid
                  item
                  xs={12}
                  sm={3}
                  sx={{ mx: { xs: 4, sm: 0 }, mb: { xs: 0, sm: 1 } }}
                >
                  <TutorCard data={tutors} />
                </Grid>
              ))
            ) : (
              <Box>
                <Typography sx={{ fontSize: '1.5rem', my: 8 }}>
                  No tutor available
                </Typography>
              </Box>
            )}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default FindTutor;
