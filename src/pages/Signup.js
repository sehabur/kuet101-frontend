import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { useState } from 'react';
import ImageUploader from 'react-image-upload';
import 'react-image-upload/dist/index.css';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { compressImageFile } from '../helper';

import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { departments, districts, status } from '../data/mappingFile';
import axios from 'axios';
import Spinner from '../components/shared/Spinner';

const Signup = () => {
  const [formInputs, setFormInputs] = useState({
    firstName: '',
    lastName: '',
    homeDistrict: '',
    presentDistrict: '',
    departmentShort: '',
    batch: '',
    email: '',
    phoneNo: '',
    linkedinProfileUrl: '',
    facebookProfileUrl: '',
    status: '',
    currentJobTitle: '',
    currentOrganization: '',
    profilePicture: null,
    password: '',
    confirmPassword: '',
    referral: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

  const [isImageSelected, setIsImageSelected] = useState(false);

  const navigate = useNavigate();

  // const auth = useSelector((state) => state.auth);

  const handleSuccessDialogOpen = () => {
    setOpenSuccessDialog(true);
  };

  const handleSuccessDialogClose = () => {
    setOpenSuccessDialog(false);
  };

  const handleChange = (event) => {
    setFormInputs({
      ...formInputs,
      [event.target.name]: event.target.value,
    });
  };
  // console.log(formInputs);

  const getImageFileObject = async ({ file }) => {
    setIsImageSelected(true);
    console.log(file);

    const compressedFile = await compressImageFile(file, 0.08);

    setFormInputs({
      ...formInputs,
      profilePicture: compressedFile,
    });
  };

  const runAfterImageDelete = (file) => {
    setIsImageSelected(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (formInputs.password === formInputs.confirmPassword) {
        setIsLoading(true);

        let formData = new FormData();

        departments.forEach((item) => {
          if (item.short === formInputs.departmentShort) {
            formData.append('departmentLong', item.long);
          }
        });
        for (let key in formInputs) {
          formData.append(key, formInputs[key]);
        }

        // const response = await axios.post(
        //   `${process.env.REACT_APP_BACKEND_URL}/api/register`,
        //   formData
        // );

        const response = await axios.post(
          `http://localhost:5000/api/users/register`,
          formData
        );

        if (response.status === 201) {
          setErrorMessage('');
          setIsLoading(false);
          handleSuccessDialogOpen();
        }
      } else {
        setErrorMessage(`Password does not match with confirm password`);
      }
    } catch (error) {
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

  // useEffect(() => {
  //   if (auth) {
  //     if (auth.isLoggedIn) {
  //       navigate('/');
  //     }
  //   }
  // }, [auth, navigate]);

  const successDialog = (
    <Dialog open={openSuccessDialog}>
      <Box sx={{ p: 1, mb: 2 }}>
        <DialogTitle>Account creation successful</DialogTitle>
        <DialogContent>
          <DialogContentText>Dear {formInputs.firstName},</DialogContentText>
          <DialogContentText>
            Your account has been created successfully. Please sign in to
            continue visiting the site.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            onClick={handleSuccessDialogClose}
            variant="contained"
            component={RouterLink}
            to="/signin"
            sx={{ px: 4 }}
          >
            Continue to Sign In
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );

  return (
    <Box sx={{ maxWidth: '760px', mx: 'auto', p: 4 }}>
      <Spinner open={isLoading} />
      {successDialog}
      <Box sx={{ textAlign: 'center' }}>
        <Box sx={{ mt: 2 }}>
          <img src="logo.png" alt="logo" width="275" />
        </Box>
        <Typography
          sx={{
            fontFamily: 'Proza Libre, sans-serif',
            fontSize: '1.2rem',
            textAlign: 'center',
            mt: 1,
            mb: 1,
            px: 2,
          }}
        >
          Helps you connect and share with your kuetian community.
        </Typography>

        <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
          Create new account
        </Typography>
      </Box>

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <Grid
        container
        spacing={3}
        component="form"
        onSubmit={handleSubmit}
        sx={{ mb: 2 }}
      >
        <Grid item xs={12}>
          <Typography
            sx={{
              fontSize: '1.1rem',
              color: 'primary.main',
              textAlign: 'left',
              ml: 0.5,
              mt: 2,
            }}
          >
            Basic information
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="First Name"
            name="firstName"
            fullWidth
            required
            value={formInputs.firstName}
            onChange={handleChange}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Last Name"
            name="lastName"
            fullWidth
            required
            value={formInputs.lastName}
            onChange={handleChange}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Home District"
            name="homeDistrict"
            fullWidth
            required
            value={formInputs.homeDistrict}
            onChange={handleChange}
          >
            {districts.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Present District"
            name="presentDistrict"
            fullWidth
            required
            value={formInputs.presentDistrict}
            onChange={handleChange}
          >
            {districts.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <Typography
            sx={{
              fontSize: '1.1rem',
              color: 'primary.main',
              textAlign: 'left',
              ml: 0.5,
              mt: 2,
            }}
          >
            University details
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            select
            label="Department"
            name="departmentShort"
            fullWidth
            required
            value={formInputs.departmentShort}
            onChange={handleChange}
          >
            {departments.map((option) => (
              <MenuItem key={option.short} value={option.short}>
                {option.long}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Roll Number"
            name="rollNo"
            fullWidth
            required
            type="number"
            placeholder="example: 0903042"
            value={formInputs.rollNo}
            onChange={handleChange}
          ></TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Joining year/Batch"
            name="batch"
            fullWidth
            required
            type="number"
            placeholder="example: 2009"
            value={formInputs.batch}
            onChange={handleChange}
          ></TextField>
        </Grid>

        <Grid item xs={12}>
          <Typography
            sx={{
              fontSize: '1.1rem',
              color: 'primary.main',
              textAlign: 'left',
              ml: 0.5,
              mt: 2,
            }}
          >
            Contact
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="E-mail"
            name="email"
            type="email"
            fullWidth
            required
            value={formInputs.email}
            onChange={handleChange}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Phone Number (optional)"
            name="phoneNo"
            type="number"
            placeholder="example: 01711xxxxxx..."
            fullWidth
            value={formInputs.phoneNo}
            onChange={handleChange}
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Linkedin Profile URL"
            name="linkedinProfileUrl"
            type="url"
            fullWidth
            required
            value={formInputs.linkedinProfileUrl}
            onChange={handleChange}
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Facebook Profile URL"
            name="facebookProfileUrl"
            type="url"
            fullWidth
            required
            value={formInputs.facebookProfileUrl}
            onChange={handleChange}
          ></TextField>
        </Grid>

        <Grid item xs={12}>
          <Typography
            sx={{
              fontSize: '1.1rem',
              color: 'primary.main',
              textAlign: 'left',
              ml: 0.5,
              mt: 2,
            }}
          >
            Current status
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Status"
            name="status"
            fullWidth
            required
            value={formInputs.status}
            onChange={handleChange}
          >
            {status.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Position"
            name="currentJobTitle"
            fullWidth
            required
            value={formInputs.currentJobTitle}
            onChange={handleChange}
          ></TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Organization Name"
            name="currentOrganization"
            fullWidth
            required
            value={formInputs.currentOrganization}
            onChange={handleChange}
          ></TextField>
        </Grid>

        <Grid item xs={12}>
          <Typography
            sx={{
              fontSize: '1.1rem',
              color: 'primary.main',
              textAlign: 'left',
              ml: 0.5,
              mt: 2,
            }}
          >
            Upload profile picture (optional)
          </Typography>
        </Grid>

        <Grid item xs={12} sx={{ ml: 0.5 }}>
          <ImageUploader
            onFileAdded={(img) => getImageFileObject(img)}
            onFileRemoved={(img) => runAfterImageDelete(img)}
            style={{
              height: isImageSelected ? 175 : 25,
              width: isImageSelected ? 175 : 25,
              background: 'transparent',
              borderRadius: 12,
            }}
            deleteIcon={
              <DeleteIcon
                sx={{
                  display: ` ${!isImageSelected && 'none'}`,
                  color: 'white',
                  bgcolor: 'red',
                  fontSize: '1.8rem',
                }}
              />
            }
            uploadIcon={
              <CloudUploadIcon
                sx={{
                  display: ` ${isImageSelected && 'none'}`,
                  color: 'primary.main',
                  fontSize: '4rem',
                }}
              />
            }
          />
        </Grid>

        <Grid item xs={12}>
          <Typography
            sx={{
              fontSize: '1.1rem',
              color: 'primary.main',
              textAlign: 'left',
              ml: 0.5,
              mt: 2,
            }}
          >
            Set password
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Password"
            name="password"
            type="password"
            inputProps={{ minLength: 6 }}
            placeholder="minimun 6 character"
            fullWidth
            required
            value={formInputs.password}
            onChange={handleChange}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="minimun 6 character"
            fullWidth
            required
            value={formInputs.confirmPassword}
            onChange={handleChange}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Referral Code"
            name="referral"
            type="number"
            fullWidth
            required
            value={formInputs.referral}
            onChange={handleChange}
          ></TextField>
        </Grid>

        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 4, mb: 3, py: 1.1, fontSize: '1.1rem' }}
          >
            Sign Up
          </Button>
        </Grid>
      </Grid>

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <Box
        sx={{
          textAlign: 'center',
          mt: 4,
          mb: 8,
        }}
      >
        <Typography>Already have an account?</Typography>

        <Button
          variant="outlined"
          color="primary"
          component={RouterLink}
          to="/signin"
          sx={{ fontSize: '1rem', px: 4, py: 1, mt: 1 }}
        >
          Sign In
        </Button>
      </Box>
    </Box>
  );
};

export default Signup;
