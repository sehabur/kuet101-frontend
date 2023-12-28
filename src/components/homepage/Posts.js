/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Spinner from '../shared/Spinner';
import PostCard from '../shared/PostCard';

import { Link as RouterLink } from 'react-router-dom';
import { grey } from '@mui/material/colors';
const Posts = () => {
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
        `${process.env.REACT_APP_BACKEND_URL}/api/posts?user=${userId}&limit=4`,
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
    <Box sx={{ pt: { xs: 12, sm: 20 }, pb: 8, bgcolor: grey[50] }}>
      <Spinner open={isLoading} />
      <Box sx={{ textAlign: 'center', mb: 4, px: 2 }}>
        <Typography variant="h4">Recent Posts</Typography>
        <Typography sx={{ my: 1 }}>
          Read views, perspectives and Posts from your alumni community.
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'stretch',
        }}
      >
        {posts && posts.map((post) => <PostCard post={post} />)}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/posts"
          sx={{ fontSize: '1.1rem', px: 4, py: 1, mt: 4 }}
        >
          Show more Posts
        </Button>
      </Box>
    </Box>
  );
};

export default Posts;
