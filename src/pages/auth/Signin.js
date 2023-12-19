import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
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
  useMediaQuery,
  useTheme,
  InputAdornment,
  IconButton,
} from '@mui/material';

import { authActions } from '../../store';
import Spinner from '../../components/shared/Spinner';
import { grey } from '@mui/material/colors';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Signin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    rollNo: '',
    password: '',
    keepMeLoggedin: false,
  });

  const auth = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const theme = useTheme();

  const matchesSmDown = useMediaQuery(theme.breakpoints.down('sm'));

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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

  useEffect(() => {
    if (auth) {
      if (auth.isLoggedIn) {
        navigate('/');
      }
    }
  }, [auth, navigate]);

  return (
    <>
      <Spinner open={isLoading} />
      <Box
        sx={{
          bgcolor: { xs: '#ffffff', sm: grey[100] },
          height: '100vh',
          width: '100vw',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: { xs: 'flex-start', sm: 'center' },
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            maxWidth: '500px',
            mr: { xs: 0, sm: 16 },
            mb: { xs: 2, sm: 0 },
            textAlign: 'center',
          }}
        >
          <Box sx={{ mt: { xs: 6 } }}>
            <img src="/images/logo.png" alt="logo" width="75%" />
          </Box>
          <Typography
            sx={{
              fontFamily: 'Proza Libre, sans-serif',
              fontSize: { xs: '1.3rem', sm: '1.8rem' },
              textAlign: 'center',
              mt: { xs: 1, sm: 4 },
              px: 2,
            }}
          >
            Helps you connect and share with your kuetian community.
          </Typography>
        </Box>
        <Box>
          <Paper
            elevation={matchesSmDown ? 0 : 24}
            component="form"
            onSubmit={handleSubmit}
            sx={{
              pt: 3,
              pb: 5,
              px: 8,
              maxWidth: '380px',
              mx: 'auto',
              textAlign: 'center',
              borderRadius: { xs: 0, sm: 2 },
            }}
          >
            <Typography variant="h6">Sign In</Typography>

            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

            <Box sx={{ mt: 2 }}>
              <TextField
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
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
                color="primary"
                sx={{ mt: 2, mb: 3, py: 1.1, fontSize: '1.2rem' }}
              >
                Sign in
              </Button>

              <Typography
                component={RouterLink}
                to="/manage-password/reset-link"
                sx={{
                  textAlign: 'center',
                  fontSize: '1rem',
                  textDecoration: 'none',
                }}
              >
                Forgotten password?
              </Typography>
              <Divider sx={{ my: 3 }} />

              <Button
                variant="contained"
                color="success"
                fullWidth
                component={RouterLink}
                to="/signup"
                sx={{ py: 1.4, fontSize: '1rem' }}
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
