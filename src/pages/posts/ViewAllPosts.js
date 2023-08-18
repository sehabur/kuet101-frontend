/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Spinner from '../../components/shared/Spinner';
import PostCard from '../../components/shared/PostCard';
import { Link as RouterLink } from 'react-router-dom';

import AddCircleIcon from '@mui/icons-material/AddCircle';

const ViewAllPosts = () => {
  const [posts, setPosts] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const auth = useSelector((state) => state.auth);

  const userId = auth ? auth._id : null;

  useEffect(() => {
    if (userId) getPosts();
  }, [userId]);

  const getPosts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/posts?user=${userId}&limit=20`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setPosts(response.data.posts);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: '1400px', mx: 'auto', py: 4, px: 2, mb: 4 }}>
      <Spinner open={isLoading} />
      <Box
        sx={{
          mb: 4,
          px: 2,
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4, px: 2 }}>
          <Typography variant="h4" sx={{ fontSize: '2rem' }}>
            Recent Posts
          </Typography>
          <Typography sx={{ my: 1 }}>
            Read views, perspectives and Posts from your alumni community.
          </Typography>
          <Button
            variant="text"
            color="primary"
            component={RouterLink}
            to="/posts/create"
            startIcon={<AddCircleIcon />}
          >
            Create new post
          </Button>
          <Button
            variant="outlined"
            color="primary"
            component={RouterLink}
            to={`/posts/my-posts/${userId}`}
            sx={{ py: 0.25, ml: 2 }}
          >
            My posts
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {posts && posts.map((post) => <PostCard post={post} />)}
      </Box>
    </Box>
  );
};

export default ViewAllPosts;
