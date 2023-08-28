import {
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

  const [formInputs, setFormInputs] = useState({
    batch: auth?.batch,
    department: auth?.departmentShort,
  });

  const [galleryImages, setGalleryImages] = useState(null);

  const getGalleryImages = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/posts/getGalleryImages?batch=${formInputs.batch}&dept=${formInputs.department}&limit=40`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setGalleryImages(response.data.images);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setFormInputs({
      ...formInputs,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (auth?.isLoggedIn) getGalleryImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

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
              label="Batch"
              name="batch"
              required
              type="number"
              size="small"
              placeholder="example: 2009"
              value={formInputs.batch}
              onChange={handleChange}
              sx={{ maxWidth: 130, mr: 2, mb: 2 }}
            />

            <TextField
              select
              label="Department"
              name="department"
              required
              size="small"
              value={formInputs.department}
              onChange={handleChange}
              sx={{ minWidth: 110, mr: 2, mb: 2 }}
            >
              {departments.map((option) => (
                <MenuItem key={option.short} value={option.short}>
                  {option.short}
                </MenuItem>
              ))}
            </TextField>
            <Button
              variant="contained"
              color="primary"
              onClick={getGalleryImages}
              sx={{ mr: 4, mb: 2 }}
            >
              Apply
            </Button>

            <Button
              variant="outlined"
              color="warning"
              component={RouterLink}
              to="/gallery/add-photo"
              startIcon={<AddCircleIcon />}
              sx={{ mb: 2 }}
            >
              Add new photo
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
              <Card
                sx={{
                  maxWidth: 275,
                  minWidth: 200,
                  mb: { xs: 2, sm: 4 },
                  mr: { xs: 0, sm: 4 },
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

                  <Typography sx={{ fontSize: '.75rem', fontStyle: 'italic' }}>
                    uploaded by {item.uploadedBy.firstName}{' '}
                    {item.uploadedBy.lastName}
                  </Typography>
                </CardContent>
              </Card>
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
