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
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const DonorCard = ({ post, path = "" }) => {
  return (
    <>
      {post && (
        <Card
          sx={{ maxWidth: 345, minWidth: 350, borderRadius: 2 }}
          elevation={12}
        >
          <PhotoProvider>
            <PhotoView
              src={`${process.env.REACT_APP_CLOUD_IMAGE_URL}/${post.image}`}
            >
              <CardMedia
                sx={{ height: 230, cursor: "pointer" }}
                image={
                  post?.image
                    ? `${process.env.REACT_APP_CLOUD_IMAGE_URL}/${post.image}`
                    : `/images/fallback.jpg`
                }
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/fallback.jpg"; // fallback image //
                }}
                alt="No image available"
              />
            </PhotoView>
          </PhotoProvider>
          <CardContent sx={{ bgcolor: grey[100] }}>
            <Typography variant="title" sx={{ fontSize: "1.2rem" }}>
              {post.title.substr(0, 70) + (post.title.length > 70 ? ".." : "")}
            </Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default DonorCard;
