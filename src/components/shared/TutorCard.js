import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Avatar, Button, Card, CardContent, Typography } from '@mui/material';

const TutorCard = ({ data }) => {
  return (
    <>
      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <Avatar
          src={`${process.env.REACT_APP_CLOUD_IMAGE_URL}/${data.userProfile.profilePicture}`}
          sx={{ width: 100, height: 100, mx: 'auto', mt: 2 }}
        />
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            color="primary.dark"
          >
            {`${data.userProfile.firstName} ${data.userProfile.lastName}`}
          </Typography>

          <Typography variant="body1">
            {data.userProfile.departmentShort}, {data.userProfile.batch}
          </Typography>

          <Typography variant="body1" color="success.dark" sx={{ mt: 1 }}>
            Available at {data.area}, {data.district}
          </Typography>

          <Button
            component={RouterLink}
            to={`/profile/${data.userProfile._id}`}
            variant="outlined"
            sx={{ mt: 2 }}
          >
            See profile
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default TutorCard;
