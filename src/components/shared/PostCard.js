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
import { grey } from '@mui/material/colors';

const PostCard = ({ post, isMyPost, handlePostDelete, handlePostEdit }) => {
  return (
    <>
      {post && (
        <Card
          sx={{
            maxWidth: 325,
            minWidth: 280,
            m: 2,
          }}
          variant="outlined"
        >
          <CardActionArea
            component={RouterLink}
            to={`/posts/${post._id}`}
            sx={{
              py: 2,
            }}
          >
            <CardMedia
              sx={{ height: 160, mx: 2 }}
              image={
                post?.images?.length > 0
                  ? `${process.env.REACT_APP_CLOUD_IMAGE_URL}/${post.images[0]}`
                  : `/images/fallback.jpg`
              }
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/fallback.jpg'; // fallback image //
              }}
              alt="No image available"
            />
            <CardContent sx={{ pb: 0 }}>
              <Typography variant="title" sx={{ fontSize: '1.2rem' }}>
                {post.title.substr(0, 70) +
                  (post.title.length > 70 ? '..' : '')}
              </Typography>

              <Typography sx={{ mt: 1.2 }}>
                {post.description.substr(0, 100) +
                  (post.description.length > 100 ? '..' : '')}
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
            <CardActions sx={{ my: 1 }}>
              <Button
                size="small"
                color="primary"
                variant="outlined"
                sx={{ ml: 0.8 }}
                onClick={() => handlePostEdit(post._id)}
              >
                Edit
              </Button>
              <Button
                size="small"
                color="error"
                variant="outlined"
                sx={{ ml: 0.8 }}
                onClick={() => handlePostDelete(post._id)}
              >
                Delete
              </Button>
            </CardActions>
          )}
        </Card>
      )}
    </>
  );
};

export default PostCard;
