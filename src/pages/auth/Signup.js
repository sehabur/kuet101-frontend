import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-image-upload/dist/index.css';
import { Link as RouterLink } from 'react-router-dom';

import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

import {
  departments,
  districts,
  status,
  bloodGroupList,
  interests,
} from '../../data/mappingFile';
import Spinner from '../../components/shared/Spinner';
import ImageEditor from '../../components/shared/ImageEditor';

const Signup = () => {
  const [formInputs, setFormInputs] = useState({
    firstName: '',
    lastName: '',
    homeDistrict: '',
    currentlyLiveIn: '',
    presentDistrict: '',
    gender: '',
    bloodGroup: '',
    bloodDonationEnable: '',
    departmentShort: '',
    rollNo: '',
    batch: '',
    email: '',
    phoneNo: '',
    linkedinProfileUrl: '',
    facebookProfileUrl: '',
    status: '',
    currentJobTitle: '',
    currentOrganization: '',
    registrationNo: '',
    interests: [],
    expertin: [],
    profilePicture: null,
    password: '',
    confirmPassword: '',
    referral: '',
  });

  const [interestsList, setInterestsList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

  const [openRollPatternDialog, setOpenRollPatternDialog] = useState(false);

  const handleImageEditorCallback = (imageData) => {
    setFormInputs({
      ...formInputs,
      profilePicture: imageData,
    });
  };

  const handleSuccessDialogOpen = () => {
    setOpenSuccessDialog(true);
  };

  const handleSuccessDialogClose = () => {
    setOpenSuccessDialog(false);
  };

  const handleRollPatternDialogOpen = () => {
    setOpenRollPatternDialog(true);
  };

  const handleRollPatternDialogClose = () => {
    setOpenRollPatternDialog(false);
  };

  const handleAutoCompleteChange = (name, value) => {
    setFormInputs({
      ...formInputs,
      [name]: value,
    });
  };

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

      if (formInputs.password === formInputs.confirmPassword) {
        if (['seekingJob', 'runningStudent'].includes(formInputs.status)) {
          formInputs.currentJobTitle = 'notApplicable';
          formInputs.currentOrganization = 'notApplicable';
        }

        let formData = new FormData();

        departments.forEach((item) => {
          if (item.short === formInputs.departmentShort) {
            formData.append('departmentLong', item.long);
          }
        });

        for (let key in formInputs) {
          formData.append(key, formInputs[key]);
        }

        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/register`,
          formData
        );

        if (response.status === 201) {
          setErrorMessage('');
          handleSuccessDialogOpen();
        } else {
          setErrorMessage('Account creation failed');
        }
      } else {
        setErrorMessage(`Password does not match with confirm password`);
      }
      setIsLoading(false);
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

  const getInerests = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/users/getAllInterests`
    );
    const data = [...new Set(res.data.concat(interests))];
    setInterestsList(data);
  };

  useEffect(() => {
    getInerests();
  }, []);

  const successDialog = (
    <Dialog open={openSuccessDialog}>
      <Box sx={{ p: 1, mb: 2 }}>
        <DialogTitle>Account creation successful</DialogTitle>
        <DialogContent>
          <DialogContentText>Dear {formInputs.firstName},</DialogContentText>
          <DialogContentText>
            Your account has been created and is now pending for approval. You
            will get an email shortly once it is approved.
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

  const rollPatternDialog = (
    <Dialog open={openRollPatternDialog}>
      <DialogTitle>Roll number pattern helper</DialogTitle>
      <DialogContent>
        <img src="/images/roll-pattern.jpg" alt="roll" width="100%" />
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          onClick={handleRollPatternDialogClose}
          variant="outlined"
          sx={{ mb: 1 }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box sx={{ maxWidth: '760px', mx: 'auto', p: 4 }}>
      <Spinner open={isLoading} />
      {successDialog}
      {rollPatternDialog}
      <Box sx={{ textAlign: 'center' }}>
        <Box sx={{ mt: 2 }}>
          <img src="/images/logo.png" alt="logo" width="275" />
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
            label="Currently live in"
            name="currentlyLiveIn"
            fullWidth
            required
            value={formInputs.currentlyLiveIn}
            onChange={handleChange}
          >
            <MenuItem key="insideBd" value="insideBd">
              Inside Bangladesh
            </MenuItem>
            <MenuItem key="outsideBd" value="outsideBd">
              Outside of Bangladesh
            </MenuItem>
          </TextField>
        </Grid>

        {formInputs.currentlyLiveIn === 'outsideBd' ? (
          <Grid item xs={12} sm={6}>
            <TextField
              label="Present Address"
              name="presentDistrict"
              fullWidth
              required
              helperText="Please write state and country"
              value={formInputs.presentDistrict}
              onChange={handleChange}
              sx={{
                '.MuiFormHelperText-root': {
                  color: 'warning.main',
                },
              }}
            />
          </Grid>
        ) : (
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
        )}

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
            label="Gender"
            name="gender"
            fullWidth
            required
            value={formInputs.gender}
            onChange={handleChange}
          >
            <MenuItem key="female" value="female">
              Female
            </MenuItem>
            <MenuItem key="male" value="male">
              Male
            </MenuItem>
            <MenuItem key="other" value="other">
              Other
            </MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Blood Group"
            name="bloodGroup"
            fullWidth
            required
            value={formInputs.bloodGroup}
            onChange={handleChange}
          >
            {bloodGroupList.map((group) => (
              <MenuItem key={group} value={group}>
                {group}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Available to donate blood"
            name="bloodDonationEnable"
            fullWidth
            required
            value={formInputs.bloodDonationEnable}
            onChange={handleChange}
          >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
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
            placeholder="example: 0903042"
            value={formInputs.rollNo}
            onChange={handleChange}
          ></TextField>
          <Button
            color="warning"
            onClick={handleRollPatternDialogOpen}
            sx={{ fontSize: '.8rem', textDecoration: 'underline' }}
          >
            Check roll pattern
          </Button>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Batch"
            name="batch"
            fullWidth
            required
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
            helperText="Please ensure to fill this field as this url will be used further to update your profile"
            sx={{
              '.MuiFormHelperText-root': {
                color: 'warning.main',
              },
            }}
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

        {!['seekingJob', 'runningStudent'].includes(formInputs.status) && (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Position"
                name="currentJobTitle"
                fullWidth
                required={
                  !['seekingJob', 'runningStudent'].includes(formInputs.status)
                }
                value={formInputs.currentJobTitle}
                onChange={handleChange}
              ></TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Organization Name"
                name="currentOrganization"
                fullWidth
                required={
                  !['seekingJob', 'runningStudent'].includes(formInputs.status)
                }
                helperText="Please write the full name"
                value={formInputs.currentOrganization}
                onChange={handleChange}
                sx={{
                  '.MuiFormHelperText-root': {
                    color: 'warning.main',
                  },
                }}
              ></TextField>
            </Grid>
          </>
        )}

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
            Other information
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            freeSolo
            multiple
            options={interestsList}
            onChange={(event, value, reason = 'selectOption') => {
              handleAutoCompleteChange('interests', value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                name="interests"
                label="Area of interest"
                placeholder="Select from list or add your own"
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            freeSolo
            multiple
            options={interestsList}
            onChange={(event, value, reason = 'selectOption') => {
              handleAutoCompleteChange('expertin', value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                name="expertin"
                label="Area of expertise"
                placeholder="Select from list or add your own"
              />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Alumni registration Number"
            name="registrationNo"
            fullWidth
            value={formInputs.registrationNo}
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
          <ImageEditor
            prevImageUrl={null}
            imageEditorCallback={handleImageEditorCallback}
            imageHeight={175}
            imageWidth={175}
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
            placeholder="Minimum 6 character"
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
            placeholder="Minimum 6 character"
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
