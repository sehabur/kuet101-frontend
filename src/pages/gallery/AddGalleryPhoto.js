import {
  Alert,
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import Spinner from '../../components/shared/Spinner';
import ImageEditor from '../../components/shared/ImageEditor';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { departments } from '../../data/mappingFile';

const AddGalleryPhoto = () => {
  const auth = useSelector((state) => state.auth);

  const formDefaultState = {
    title: '',
    image: null,
  };

  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const [success, setSuccess] = useState(false);

  const [formInputs, setFormInputs] = useState(formDefaultState);

  const handleChange = (event) => {
    setFormInputs({
      ...formInputs,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageEditorCallback = (imageData) => {
    setFormInputs({
      ...formInputs,
      image: imageData,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const formData = new FormData();

      for (let key in formInputs) {
        formData.append(key, formInputs[key]);
      }

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/posts/addGalleryImages`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      if (response.status === 201) {
        setSuccess(true);
        setErrorMessage('');
        setIsLoading(false);
      }
    } catch (error) {
      setSuccess(false);

      if (error.response) {
        let composeMsg;
        if (error.response.data.message) {
          composeMsg = error.response.data.message;
        } else if (error.response.data.errors) {
          composeMsg = error.response.data.errors[0].msg;
        }
        setErrorMessage(`Post creation failed. ${composeMsg}`);
      }
      setIsLoading(false);
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (!auth?.isLoggedIn) {
  //     navigate('/signin');
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [navigate]);

  return (
    <Box sx={{ maxWidth: '760px', mx: 'auto', p: 4 }}>
      <Spinner open={isLoading} />

      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h5" sx={{ mt: 2, mb: 4 }}>
          Add new photo to gallery
        </Typography>
      </Box>

      <Grid
        container
        spacing={3}
        component="form"
        onSubmit={handleSubmit}
        sx={{ mb: 2 }}
      >
        <Grid item xs={12}>
          <TextField
            label="Title"
            name="title"
            fullWidth
            value={formInputs.title}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item xs={12} sm={7}>
          <TextField
            select
            label="Department"
            name="department"
            fullWidth
            required
            value={formInputs.department}
            onChange={handleChange}
          >
            {departments.map((option) => (
              <MenuItem key={option.short} value={option.short}>
                {option.long}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={5}>
          <TextField
            label="Batch"
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
              color: 'primary.main',
              textAlign: 'left',
              ml: 0.5,
              mt: 2,
            }}
          >
            Upload photo
          </Typography>
        </Grid>

        <Grid item xs={12} sx={{ ml: 0.5 }}>
          <ImageEditor
            prevImageUrl={null}
            imageEditorCallback={handleImageEditorCallback}
            imageHeight={220}
            imageWidth={320}
          />
        </Grid>

        <Grid item xs={12}>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          {success && <Alert severity="success">Photo upload successful</Alert>}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              type="submit"
              sx={{ my: 2, px: 4, py: 1.2 }}
            >
              Save
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddGalleryPhoto;
