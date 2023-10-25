import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@mui/material';

const AlumniCard = ({ data }) => {
  return (
    <>
      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <CardActionArea
          component={RouterLink}
          to={`/profile/${data._id}`}
          sx={{ pt: 2 }}
        >
          <Avatar
            src={`${process.env.REACT_APP_CLOUD_IMAGE_URL}/${data.profilePicture}`}
            sx={{ width: 100, height: 100, mx: 'auto' }}
          />
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              color="primary.dark"
            >
              {`${data.firstName} ${data.lastName}`}
            </Typography>

            <Typography variant="body2">
              {data.status === 'seekingJob' &&
                'I am still seeking an appropiate opportunity'}

              {data.status === 'runningStudent' && 'I am a running student'}

              {!['seekingJob', 'runningStudent'].includes(data.status) &&
                `${data.currentJobTitle} at ${data.currentOrganization}`}
            </Typography>

            <Typography variant="body1" sx={{ mt: 1 }} color="text.secondary">
              {data.departmentShort}, {data.batch}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default AlumniCard;
