import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/shared/Spinner';

import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';
import {
  batchList,
  bloodGroupList,
  departments,
  districts,
  interests,
  status,
} from '../../data/mappingFile';
import ImageEditor from '../../components/shared/ImageEditor';

const EditProfile = () => {
  const auth = useSelector((state) => state.auth);

  const [formInputs, setFormInputs] = useState({
    firstName: auth?.firstName,
    lastName: auth?.lastName,
    homeDistrict: auth?.homeDistrict,
    currentlyLiveIn: auth?.currentlyLiveIn,
    presentDistrict: auth?.presentDistrict,
    gender: auth?.gender,
    bloodGroup: auth?.bloodGroup,
    bloodDonationEnable: auth?.bloodDonationEnable,
    departmentShort: auth?.departmentShort,
    rollNo: auth?.rollNo,
    batch: auth?.batch,
    email: auth?.email,
    phoneNo: auth?.phoneNo,
    linkedinProfileUrl: auth?.linkedinProfileUrl,
    facebookProfileUrl: auth?.facebookProfileUrl,
    status: auth?.status,
    currentJobTitle: auth?.currentJobTitle || '',
    currentOrganization: auth?.currentOrganization || '',
    registrationNo: auth?.registrationNo,
    interests: auth?.interests,
    expertin: auth?.expertin,
    profilePicture: auth?.profilePicture || null,
    selfReferralCode: auth?.selfReferralCode,
  });

  // console.log(formInputs);

  const [interestsList, setInterestsList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  const [errorMessage, setErrorMessage] = useState('');

  const [successMessage, setSuccessMessage] = useState('');

  const handleImageEditorCallback = (imageData) => {
    setFormInputs({
      ...formInputs,
      profilePicture: imageData,
    });
  };

  const handleChange = (event) => {
    setFormInputs({
      ...formInputs,
      [event.target.name]: event.target.value,
    });
  };

  const handleAutoCompleteChange = (name, value) => {
    setFormInputs({
      ...formInputs,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    try {
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

      const response = await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/profile/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      if (response.status === 201) {
        setErrorMessage('');
        setSuccessMessage(
          'Profile update successful. Please re-login to take effect.'
        );
      } else {
        setErrorMessage('Profile update failed.');
        setSuccessMessage('');
      }
      setIsLoading(false);
    } catch (error) {
      setSuccessMessage('');
      if (error.response) {
        let composeMsg;
        if (error.response.data.message) {
          composeMsg = error.response.data.message;
        } else if (error.response.data.errors) {
          composeMsg = error.response.data.errors[0].msg;
        }
        setErrorMessage(`Profile update failed. ${composeMsg}`);
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

  useEffect(() => {
    if (!auth?.isLoggedIn) {
      navigate('/signin');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  return (
    <Box sx={{ maxWidth: '760px', mx: 'auto', p: 4 }}>
      <Spinner open={isLoading} />

      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h5" sx={{ my: 2 }}>
          Edit your profile
        </Typography>
      </Box>

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}

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
              value={formInputs.presentDistrict}
              onChange={handleChange}
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
            helperText="You need to use this roll for login"
            sx={{
              '.MuiFormHelperText-root': {
                color: 'warning.main',
              },
            }}
            // InputProps={{
            //   readOnly: true,
            // }}
          ></TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Batch"
            name="batch"
            fullWidth
            required
            select
            value={formInputs.batch}
            onChange={handleChange}
          >
            {batchList.map((option) => (
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
            defaultValue={formInputs.interests.filter((item) => item !== '')}
            onChange={(event, value, reason = 'selectOption') => {
              handleAutoCompleteChange('interests', value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
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
            defaultValue={formInputs.expertin.filter((item) => item !== '')}
            onChange={(event, value, reason = 'selectOption') => {
              handleAutoCompleteChange('expertin', value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
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
            Profile picture (optional)
          </Typography>
        </Grid>

        <Grid item xs={12} sx={{ ml: 0.5 }}>
          <ImageEditor
            prevImageUrl={formInputs.profilePicture}
            imageEditorCallback={handleImageEditorCallback}
            imageHeight={175}
            imageWidth={175}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            component={RouterLink}
            to="/manage-password/change"
            variant="text"
            color="warning"
            sx={{
              fontSize: '1.1rem',
              textDecoration: 'underline',
            }}
          >
            Change Password
          </Button>

          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          {successMessage && <Alert severity="success">{successMessage}</Alert>}

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 4, mb: 3, py: 1.1, fontSize: '1.1rem' }}
          >
            Save and Update
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditProfile;
