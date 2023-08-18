import React from 'react';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const PostCard = ({ post, isMyPost, handlePostDelete }) => {
  return (
    <>
      {post && (
        <Card
          sx={{ maxWidth: 325, minWidth: 280, mx: 2, mb: 2 }}
          variant="text"
        >
          <CardActionArea
            component={RouterLink}
            to={`/posts/${post._id}`}
            sx={{ py: 2 }}
          >
            <CardMedia
              sx={{ height: 200, ml: 2, mr: 4 }}
              image={
                post.image
                  ? `${process.env.REACT_APP_CLOUD_IMAGE_URL}/${post.image}`
                  : `/fallback.jpg`
              }
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/fallback.jpg'; // fallback image //
              }}
              alt="No image available"
            />
            <CardContent sx={{ pb: 0 }}>
              <Typography variant="title" sx={{ fontSize: '1.2rem' }}>
                {post.title}
              </Typography>

              <Typography sx={{ mt: 1.2 }} color="text.secondary">
                {post.description.substr(0, 130) +
                  (post.description.length > 130 ? '..' : '')}
              </Typography>
              <Typography
                textAlign="right"
                sx={{
                  mt: 1,
                  fontSize: '.75rem',
                  fontStyle: 'italic',
                }}
              >
                posted{' '}
                <ReactTimeAgo
                  date={post.createdAt}
                  locale="en-US"
                  timeStyle="round-minute"
                />
              </Typography>
            </CardContent>
          </CardActionArea>
          {isMyPost && (
            <CardActions>
              <Button
                size="small"
                color="error"
                variant="text"
                sx={{ ml: 0.8 }}
                startIcon={<DeleteOutlineIcon />}
                onClick={() => handlePostDelete(post._id)}
              >
                Delete post
              </Button>
            </CardActions>
          )}
        </Card>
      )}
    </>
  );
};

export default PostCard;
