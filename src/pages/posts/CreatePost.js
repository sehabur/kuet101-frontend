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
import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ImageUploader from '../../components/shared/ImageUploader';
import { postCategoryList } from '../../data/mappingFile';

const CreatePost = () => {
  const auth = useSelector((state) => state.auth);

  const formDefaultState = {
    title: '',
    category: '',
    description: '',
    images: [],
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

  const handleImageSelection = (selectedImages) => {
    setFormInputs({
      ...formInputs,
      images: selectedImages,
    });
  };

  const handleImageLoading = (state) => {
    setIsLoading(state);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const formData = new FormData();

      for (let key in formInputs) {
        if (key === 'images') {
          formInputs[key].forEach((image) => {
            formData.append('image', image);
          });
        } else {
          formData.append(key, formInputs[key]);
        }
      }

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/posts`,
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
          Create new post
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
            select
            name="category"
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
          <ImageUploader
            getImageFiles={handleImageSelection}
            getImageLoading={handleImageLoading}
          />
        </Grid>

        <Grid item xs={12}>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          {success && (
            <Alert severity="success">Post creation successful</Alert>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              type="submit"
              sx={{ my: 2, px: 4, py: 1.2 }}
            >
              Create Post
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreatePost;
