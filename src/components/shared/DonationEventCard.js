import React from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { grey } from "@mui/material/colors";
import InfoDialog from "./InfoDialog";
import { useState } from "react";

const DonationEventCard = ({ post, path = "try/donation" }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState();

  const handleDialogOnClose = () => {
    setDialogOpen(false);
  };

  const handleClickDialogOpen = (e, post) => {
    setDialogContent(post.paymentDetails);
    setDialogOpen(true);
  };

  return (
    <>
      <InfoDialog
        dialogOpen={dialogOpen}
        dialogOnClose={handleDialogOnClose}
        dialogTitle={post.title}
      >
        {dialogContent}
      </InfoDialog>

      {post && (
        <Card
          sx={{
            maxWidth: 325,
            minWidth: 280,
            m: 2,
          }}
          variant="outlined"
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
              e.target.src = "/images/fallback.jpg"; // fallback image //
            }}
            alt="No image available"
          />
          <CardContent sx={{ pb: 0 }}>
            <Typography variant="title" sx={{ fontSize: "1.2rem" }}>
              {post.title.substr(0, 70) + (post.title.length > 70 ? ".." : "")}
            </Typography>

            <Typography sx={{ mt: 1.2 }}>
              {post.description.substr(0, 100) +
                (post.description.length > 100 ? ".." : "")}
            </Typography>
            <Typography
              textAlign="right"
              sx={{
                mt: 1,
                fontSize: ".75rem",
                fontStyle: "italic",
              }}
            >
              posted{" "}
              <ReactTimeAgo
                date={post.createdAt}
                locale="en-US"
                timeStyle="round-minute"
              />
            </Typography>
          </CardContent>

          <CardActions sx={{ my: 2 }}>
            <Button
              size="small"
              color="primary"
              variant="outlined"
              sx={{ ml: 0.8 }}
              component={RouterLink}
              to={`/${path}/${post._id}`}
            >
              Learn more
            </Button>
            {post.isActive && (
              <Button
                size="small"
                color="success"
                variant="outlined"
                sx={{ ml: 2 }}
                onClick={(e) => handleClickDialogOpen(e, post)}
              >
                Donate
              </Button>
            )}
          </CardActions>
        </Card>
      )}
    </>
  );
};

export default DonationEventCard;
