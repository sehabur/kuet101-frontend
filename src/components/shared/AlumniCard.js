import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import { Link as RouterLink, useNavigate } from 'react-router-dom';

const AlumniCard = ({ data }) => {
  return (
    <>
      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <CardActionArea
          component={RouterLink}
          to={`/alumniDetails/${data._id}`}
        >
          <Avatar
            src={`${process.env.REACT_APP_CLOUD_IMAGE_URL}/${data.profilePicture}`}
            sx={{ width: 100, height: 100, mx: 'auto', mt: 2 }}
          />
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              color="primary.dark"
            >
              {data.firstName} {data.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.currentJobTitle} at {data.currentOrganization}
            </Typography>

            <Typography variant="body1" sx={{ mt: 1 }}>
              {data.departmentShort}, {data.batch}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default AlumniCard;
