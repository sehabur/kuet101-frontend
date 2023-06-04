import {
  Alert,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Spinner from '../components/shared/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';
import { useEffect } from 'react';

const Signin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState('');

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth) {
      if (auth.isLoggedIn) {
        navigate('/');
      }
    }
  }, [auth, navigate]);

  const [formData, setFormData] = useState({
    rollNo: '',
    password: '',
    keepMeLoggedin: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/login`,
        formData
      );
      if (response.status === 200) {
        dispatch(authActions.login(response.data.user));
        if (formData.keepMeLoggedin) {
          localStorage.setItem('userInfo', JSON.stringify(response.data.user));
        }
      }
      setIsLoading(false);
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          setErrorMessage(`Login Failed. ${error.response.data.message}`);
        } else {
          setErrorMessage(`Login Failed. Error Occured.`);
        }
      } else {
        setErrorMessage(`Login Failed. Error Occured`);
      }
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]:
        event.target.name === 'keepMeLoggedin'
          ? event.target.checked
          : event.target.value,
    });
  };

  return (
    <>
      <Spinner open={isLoading} />
      <Box
        sx={{
          backgroundColor: '#eceff1',
          height: '100vh',
          width: '100vw',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: { xs: 'flex-start', sm: 'center' },
          alignItems: 'center',
        }}
      >
        <Box
          sx={{ maxWidth: '550px', mr: { xs: 0, sm: 8 }, textAlign: 'center' }}
        >
          <Box sx={{ mt: { xs: 3 } }}>
            <img src="logo.png" alt="logo" width="80%" />
          </Box>
          <Typography
            sx={{
              fontFamily: 'Proza Libre, sans-serif',
              fontSize: { xs: '1.3rem', sm: '2rem' },
              textAlign: 'center',
              mt: 2,
              mb: 1,
              px: 2,
            }}
          >
            Helps you connect and share with your kuetian community.
          </Typography>
        </Box>
        <Box>
          <Paper
            elevation={4}
            component="form"
            onSubmit={handleSubmit}
            sx={{
              mt: 2,
              py: 3,
              px: 6,
              maxWidth: '400px',
              mx: 'auto',
              textAlign: 'center',
              borderRadius: 2,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Sign In
            </Typography>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            <Box sx={{ mt: 1 }}>
              <TextField
                type="number"
                margin="normal"
                required
                fullWidth
                label="Roll Number"
                name="rollNo"
                autoFocus
                value={formData.rollNo}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
              />

              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Keep me signed in"
                  checked={formData.keepMeLoggedin}
                  name="keepMeLoggedin"
                  color="primary"
                  onChange={handleInputChange}
                  sx={{ mt: 1.2 }}
                />
              </FormGroup>

              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{ mt: 2, mb: 3, py: 1.1, fontSize: '1.2rem' }}
              >
                Sign In
              </Button>

              <Typography
                component={RouterLink}
                to="#"
                sx={{ textAlign: 'center', fontSize: '1.1rem' }}
              >
                Forgotten password?
              </Typography>
              <Divider sx={{ mt: 2 }} />

              <Button
                variant="contained"
                color="success"
                component={RouterLink}
                to="/signup"
                sx={{ mt: 3, mb: 3, py: 1.2, px: 4, fontSize: '1.1rem' }}
              >
                Create new account
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default Signin;
