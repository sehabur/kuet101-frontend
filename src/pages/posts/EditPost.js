import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/shared/Spinner';

import {
  Alert,
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';

import ImageEditor from '../../components/shared/ImageEditor';
import ImageUploader from '../../components/shared/ImageUploader';
import { postCategoryList } from '../../data/mappingFile';

const EditPost = () => {
  const { id: postId } = useParams();

  const auth = useSelector((state) => state.auth);

  const [formInputs, setFormInputs] = useState({
    title: '',
    category: '',
    description: '',
    images: [],
  });

  const [preLoadedImages, setPreLoadedImages] = useState([]);

  const [isPostLoaded, setIsPostLoaded] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (event) => {
    setFormInputs({
      ...formInputs,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageSelection = (selectedImages) => {
    setFormInputs({
      ...formInputs,
      images: selectedImages,
    });
  };

  const handleImageLoading = (state) => {
    setIsLoading(state);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    try {
      let formData = new FormData();

      for (let key in formInputs) {
        if (key === 'images') {
          formInputs[key].forEach((image) => {
            formData.append('image', image);
          });
        } else {
          formData.append(key, formInputs[key]);
        }
      }

      const response = await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/api/posts/${postId}`,
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
        setSuccessMessage('Post edited successfully');
      } else {
        setErrorMessage('Post edit failed.');
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
        setErrorMessage(`Post edit failed. ${composeMsg}`);
      }
      setIsLoading(false);
    }
  };

  const getPostDetails = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/posts/${postId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth && auth.token}`,
          },
        }
      );
      setIsPostLoaded(true);
      setFormInputs(response.data.post);
      setPreLoadedImages([...response.data.post.images]);
      setErrorMessage('');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  useEffect(() => {
    if (auth?.isLoggedIn) getPostDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <Box sx={{ maxWidth: '760px', mx: 'auto', p: 4 }}>
      <Spinner open={isLoading} />

      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h5" sx={{ mt: 2, mb: 4 }}>
          Edit post
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
          <Typography
            sx={{
              color: 'primary.main',
              textAlign: 'left',
              ml: 0.5,
              my: 1,
            }}
          >
            Post Title
          </Typography>
          <TextField
            name="title"
            fullWidth
            required
            value={formInputs.title}
            onChange={handleChange}
          ></TextField>
        </Grid>

        <Grid item xs={12}>
          <Typography
            sx={{
              color: 'primary.main',
              textAlign: 'left',
              ml: 0.5,
              my: 1,
            }}
          >
            Category
          </Typography>
          <TextField
            name="category"
            select
            fullWidth
            required
            value={formInputs.category}
            onChange={handleChange}
          >
            {postCategoryList.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <Typography
            sx={{
              color: 'primary.main',
              textAlign: 'left',
              ml: 0.5,
              my: 1,
            }}
          >
            Description
          </Typography>
          <TextField
            multiline
            name="description"
            minRows={6}
            maxRows={24}
            fullWidth
            required
            value={formInputs.description}
            onChange={handleChange}
            sx={{ width: '100%' }}
          />
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
            Upload image (optional)
          </Typography>
        </Grid>

        <Grid item xs={12} sx={{ ml: 0.5 }}>
          {isPostLoaded && (
            <ImageUploader
              preLoadedImages={preLoadedImages}
              getImageFiles={handleImageSelection}
              getImageLoading={handleImageLoading}
            />
          )}
        </Grid>

        <Grid item xs={12}>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          {successMessage && <Alert severity="success">{successMessage}</Alert>}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              type="submit"
              sx={{ my: 2, px: 4, py: 1.2 }}
            >
              Edit Post
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditPost;
