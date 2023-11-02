import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../../components/shared/Spinner';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link as RouterLink } from 'react-router-dom';
import { departments } from '../../data/mappingFile';
import { grey } from '@mui/material/colors';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

const Gallery = () => {
  const [isLoading, setIsLoading] = useState(false);

  const auth = useSelector((state) => state.auth);

  const [formActiveStatus, setFormActiveStatus] = useState();

  const [galleryImageSetActiveStatus, setGalleryImageSetActiveStatus] =
    useState({
      imageId: '',
      isActive: '',
    });

  const [galleryImages, setGalleryImages] = useState(null);

  const [errorMessage, setErrorMessage] = useState('');

  const [successMessage, setSuccessMessage] = useState('');

  const handleGetGalleryImagesSubmit = async () => {
    try {
      setIsLoading(true);

      const queryString =
        formActiveStatus !== 'all' ? `active=${formActiveStatus}` : '';

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/getGalleryImages?${queryString}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setGalleryImages(response.data.galleryImage);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleImageActiveStatusSubmit = async () => {
    try {
      setIsLoading(true);

      const response = await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/updateGalleryImageActiveStatus`,
        {
          imageId: galleryImageSetActiveStatus.imageId,
          isActive: galleryImageSetActiveStatus.isActive,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      if (response.status === 201) {
        setErrorMessage('');
        setSuccessMessage('Gallery Image status update successful.');
      } else {
        setErrorMessage('Gallery Image status update failed.');
        setSuccessMessage('');
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setErrorMessage('Gallery Image status update failed.');
      setSuccessMessage('');
    }
  };

  const handleFormChange = (event) => {
    setFormActiveStatus(event.target.value);
  };

  const handleGalleryImageActiveStatusChange = (event, imageId) => {
    setGalleryImageSetActiveStatus({
      imageId,
      isActive: event.target.value,
    });
  };

  return (
    <>
      <Spinner open={isLoading} />

      <Box>
        <Box sx={{ py: 2.5, bgcolor: 'secondary.main' }}>
          <Box
            sx={{
              maxWidth: '1250px',
              mx: 'auto',
              px: 2,
              textAlign: { xs: 'center', sm: 'left' },
            }}
          >
            <Typography
              variant="h4"
              sx={{ color: grey[100], fontSize: '1.9rem' }}
            >
              Photo Gallery
            </Typography>
            <Typography sx={{ fontSize: '1rem', color: grey[300] }}>
              A visual walk through the memory lane
            </Typography>
          </Box>
        </Box>
        <Box sx={{ bgcolor: grey[100] }}>
          <Box
            sx={{
              maxWidth: '1250px',
              mx: 'auto',
              px: 2,
              pt: 2,
            }}
          >
            <TextField
              select
              label="Active status"
              name="isActive"
              size="small"
              value={formActiveStatus}
              onChange={handleFormChange}
              sx={{ minWidth: 160, mr: 2, mb: 2 }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value={true}>Active</MenuItem>
              <MenuItem value={false}>Inactive</MenuItem>
            </TextField>

            <Button
              variant="contained"
              color="primary"
              onClick={handleGetGalleryImagesSubmit}
              sx={{ mr: 4, mb: 2 }}
            >
              Apply
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            maxWidth: '1250px',
            mx: 'auto',
            px: 2,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: { xs: 'center', sm: 'flex-start' },
            flexWrap: 'wrap',
            mt: 4,
            minHeight: '60vh',
          }}
        >
          {galleryImages?.length > 0 ? (
            galleryImages.map((item) => (
              <Box sx={{ mb: { xs: 2, sm: 4 }, mr: { xs: 0, sm: 4 } }}>
                <Card
                  sx={{
                    maxWidth: 275,
                    minWidth: 200,
                  }}
                  variant="outlined"
                >
                  <CardActionArea>
                    <PhotoProvider>
                      <PhotoView
                        src={`${process.env.REACT_APP_CLOUD_IMAGE_URL}/${item.image}`}
                      >
                        <CardMedia
                          component="img"
                          height="200"
                          image={`${process.env.REACT_APP_CLOUD_IMAGE_URL}/${item.image}`}
                          alt="green iguana"
                        />
                      </PhotoView>
                    </PhotoProvider>
                  </CardActionArea>
                  <CardContent>
                    <Typography
                      gutterBottom
                      color="primary.dark"
                      sx={{ fontSize: '1rem' }}
                    >
                      {item.title}
                      <Typography
                        gutterBottom
                        color="text.primary"
                        sx={{ fontSize: '.8rem' }}
                      >
                        {item.department} {', '} {item.batch}
                      </Typography>
                    </Typography>

                    <Typography
                      sx={{ fontSize: '.75rem', fontStyle: 'italic' }}
                    >
                      uploaded by {item.uploadedBy.firstName}{' '}
                      {item.uploadedBy.lastName}
                    </Typography>
                  </CardContent>
                </Card>
                {auth.isAdmin && (
                  <Box sx={{ mt: 2 }}>
                    <TextField
                      select
                      label="Active status"
                      name="isActive"
                      size="small"
                      onChange={(e) =>
                        handleGalleryImageActiveStatusChange(e, item._id)
                      }
                      sx={{ minWidth: 160, mr: 2 }}
                    >
                      <MenuItem value={true}>Active</MenuItem>
                      <MenuItem value={false}>Inactive</MenuItem>
                    </TextField>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ px: 3 }}
                      onClick={handleImageActiveStatusSubmit}
                    >
                      Save
                    </Button>

                    {errorMessage && (
                      <Alert severity="error">{errorMessage}</Alert>
                    )}
                    {successMessage && (
                      <Alert severity="success">{successMessage}</Alert>
                    )}
                  </Box>
                )}
              </Box>
            ))
          ) : (
            <Box>
              <Typography>No image found. Try a different search.</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Gallery;
