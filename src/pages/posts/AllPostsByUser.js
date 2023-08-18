/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Alert, Box, Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Spinner from '../../components/shared/Spinner';
import PostCard from '../../components/shared/PostCard';
import { Link as RouterLink, useParams } from 'react-router-dom';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import ConfirmationDialog from '../../components/shared/ConfirmationDialog';

const AllPostsByUser = () => {
  const { id: userId } = useParams();

  const [posts, setPosts] = useState(null);

  const [deletePostId, setDeletePostId] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const [successMessage, setSuccessMessage] = useState('');

  const [dialogOpen, setDialogOpen] = useState(false);

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth?.isLoggedIn) getPosts();
  }, [auth]);

  const getPosts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/posts/user/${userId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth && auth.token}`,
          },
        }
      );
      setPosts(response.data.postsByUser);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handlePostDelete = async (postId) => {
    setDialogOpen(true);
    setDeletePostId(postId);
  };

  const handleDialogOnClose = async (e, action) => {
    if (action === 'confirm') {
      try {
        setIsLoading(true);
        const response = await axios.delete(
          `${process.env.REACT_APP_BACKEND_URL}/api/posts/${deletePostId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${auth && auth.token}`,
            },
          }
        );
        if (response.status === 200) {
          setSuccessMessage('Deletion successful');
          setErrorMessage('');
        } else {
          setSuccessMessage('');
          setErrorMessage('Deletion failed');
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setSuccessMessage('');
        setErrorMessage('Deletion failed');
      }
    }
    setDialogOpen(false);
  };

  return (
    <Box sx={{ maxWidth: '1400px', mx: 'auto', py: 4, px: 2, mb: 4 }}>
      <Spinner open={isLoading} />
      <ConfirmationDialog
        dialogOpen={dialogOpen}
        dialogOnClose={handleDialogOnClose}
        dialogTitle="Delete Post"
        dialogText="Do you really want to delete this post?"
      />
      <Box
        sx={{
          mb: 4,
          px: 2,
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4, px: 2 }}>
          <Typography variant="h4">My Posts</Typography>
          <Button
            variant="text"
            color="primary"
            component={RouterLink}
            to="/posts/create"
            startIcon={<AddCircleIcon />}
          >
            Create new post
          </Button>
        </Box>
      </Box>

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {posts &&
          posts.map((post) => (
            <Box>
              <PostCard
                key={post._id}
                post={post}
                isMyPost={true}
                handlePostDelete={handlePostDelete}
              />
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default AllPostsByUser;
