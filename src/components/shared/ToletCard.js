import React from "react";
import { Link as RouterLink } from "react-router-dom";

import {
  Avatar,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";

const TutorCard = ({ data }) => {
  return (
    <>
      <Card
        // variant="outlined"
        elevation={4}
        sx={{ borderRadius: 3, width: "340px", textAlign: "left" }}
      >
        {/* <Avatar
          src={`${process.env.REACT_APP_CLOUD_IMAGE_URL}/${data.userProfile.profilePicture}`}
          sx={{ width: 100, height: 100, mx: 'auto', mt: 2 }}
        /> */}
        <CardContent>
          <Typography
            gutterBottom
            variant="h2"
            component="div"
            sx={{ fontSize: "1.4rem", fontWeight: 500 }}
          >
            {data.area}, {data.district}
          </Typography>

          <Chip
            label={data.type.toUpperCase()}
            variant="outlined"
            color="success"
          />

          <Typography variant="body1" sx={{ mt: 2 }}>
            {data.description}
          </Typography>

          <Button
            component={RouterLink}
            to={`/profile/${data.userProfile._id}`}
            sx={{ mt: 1, ml: -1 }}
          >
            Get contact info
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default TutorCard;
