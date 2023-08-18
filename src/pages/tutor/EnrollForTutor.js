import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Alert,
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

import Spinner from '../../components/shared/Spinner';
import { districts } from '../../data/mappingFile';

import { Link as RouterLink } from 'react-router-dom';

const EnrollForTutor = () => {
  const [formInputs, setFormInputs] = useState({
    district: '',
    area: '',
  });

  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (event) => {
    setFormInputs({
      ...formInputs,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/enrollForTutor`,
        formInputs,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      if (response.status === 201) {
        setErrorMessage('');
        setIsLoading(false);
        setSuccessMessage('Enrollment for being a tutor successful');
      }
    } catch (error) {
      setSuccessMessage('');
      if (error.response) {
        let composeMsg;
        if (error.response.data.message) {
          composeMsg = error.response.data.message;
        } else if (error.response.data.errors) {
          composeMsg = error.response.data.errors[0].msg;
        }
        setErrorMessage(`Account creation failed. ${composeMsg}`);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!auth?.isLoggedIn) {
      navigate('/signin');
    }
  }, [navigate, auth]);

  return (
    <Box
      sx={{ maxWidth: '550px', mx: 'auto', p: 4 }}
      component="form"
      onSubmit={handleSubmit}
    >
      <Spinner open={isLoading} />

      <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
        Enroll to be a tutor
      </Typography>

      <Typography sx={{ my: 2 }}>
        Are you looking for a tution? Enroll here and wait for some other alumni
        to get match with your profile and availibility area. Make sure your
        phone number is up-to-date.
      </Typography>

      <Button
        variant="outlined"
        color="info"
        component={RouterLink}
        to={`/tutor/my-enrollment/${auth?._id}`}
      >
        My tution enrollment
      </Button>

      <Typography variant="h6" sx={{ mt: 6 }}>
        New Application
      </Typography>

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}

      <TextField
        select
        label="Select district"
        name="district"
        fullWidth
        required
        value={formInputs.district}
        onChange={handleChange}
        sx={{ mt: 2 }}
      >
        {districts.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Area"
        name="area"
        fullWidth
        required
        value={formInputs.area}
        onChange={handleChange}
        sx={{ mt: 3 }}
      />

      <Button
        fullWidth
        variant="contained"
        type="submit"
        sx={{ mt: 4, mb: 3, py: 1.1, fontSize: '1.1rem' }}
      >
        Enroll
      </Button>
    </Box>
  );
};

export default EnrollForTutor;
