/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/shared/Spinner';
import ReactTimeAgo from 'react-time-ago';
import { Link as RouterLink } from 'react-router-dom';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

const PostDetails = () => {
  const { id: postId } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const [postDetails, setPostDetails] = useState(null);

  const auth = useSelector((state) => state.auth);

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
      setPostDetails(response.data.post);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getPostDetails();
  }, [auth]);

  return (
    <Box sx={{ maxWidth: '950px', mx: 'auto', py: 4, px: 2, mb: 4 }}>
      <Spinner open={isLoading} />

      {postDetails && (
        <>
          <Typography variant="title" sx={{ my: 2, fontSize: '1.8rem' }}>
            {postDetails.title}
          </Typography>

          <Typography
            sx={{
              fontSize: '.9rem',
              fontStyle: 'italic',
              ml: 0.3,
              mt: 1,
              mb: 2,
            }}
          >
            Posted by{' '}
            <Typography
              sx={{ display: 'inline' }}
              component={RouterLink}
              to={`/profile/${postDetails.user._id}`}
            >
              {postDetails.user.firstName} {postDetails.user.lastName}
            </Typography>{' '}
            <ReactTimeAgo
              date={postDetails.createdAt}
              locale="en-US"
              timeStyle="round-minute"
            />
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            <PhotoProvider>
              {postDetails.images.map((image) => (
                <PhotoView
                  src={`${process.env.REACT_APP_CLOUD_IMAGE_URL}/${image}`}
                >
                  <Box
                    sx={{
                      width: { xs: '95vw', sm: 220 },
                      pr: 2,
                      height: 175,
                      mb: 2,
                      ':hover': {
                        cursor: 'pointer',
                      },
                    }}
                    // component={RouterLink}
                    // to={`${process.env.REACT_APP_CLOUD_IMAGE_URL}/${image}`}
                    // target="_blank"
                  >
                    <img
                      src={`${process.env.REACT_APP_CLOUD_IMAGE_URL}/${image}`}
                      sx={{
                        width: { xs: '95vw', sm: 220 },
                        pr: 2,
                        height: 175,
                        mb: 2,
                      }}
                      alt="no img available"
                      width="100%"
                      height="100%"
                      style={{
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                </PhotoView>
              ))}
            </PhotoProvider>
          </Box>

          <Typography paragraph={true} sx={{ mt: 2, whiteSpace: 'pre-wrap' }}>
            {postDetails.description}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default PostDetails;
