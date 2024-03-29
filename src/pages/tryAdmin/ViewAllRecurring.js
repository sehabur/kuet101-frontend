/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import Spinner from "../../components/shared/Spinner";
import PostCard from "../../components/shared/PostCard";
import { Link as RouterLink } from "react-router-dom";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import DonorCard from "../../components/shared/DonorCard";
import ReactTimeAgo from "react-time-ago";
import InfoDialog from "../../components/shared/InfoDialog";

const ViewAllRecurring = () => {
  const [posts, setPosts] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const auth = useSelector((state) => state.auth);

  const userId = auth ? auth._id : null;

  const [errorMessage, setErrorMessage] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState();

  const handleDialogOnClose = () => {
    setDialogOpen(false);
  };

  const handleClickDialogOpen = (e, post) => {
    setDialogContent(post.description);
    setDialogOpen(true);
  };

  useEffect(() => {
    if (userId) getPosts();
  }, [userId]);

  const getPosts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/try/recurringDonation`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setPosts(response.data.donations);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "1400px",
        mx: "auto",
        py: 4,
        px: 2,
        mb: 4,
        minHeight: "600px",
      }}
    >
      <InfoDialog
        dialogOpen={dialogOpen}
        dialogOnClose={handleDialogOnClose}
        dialogTitle="Donation request details"
      >
        {dialogContent}
      </InfoDialog>

      {/* <Spinner open={isLoading} />
      <Box>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
      </Box> */}
      <Box
        sx={{
          mb: 4,
          px: 2,
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4, px: 2 }}>
          <Typography variant="h4" sx={{ fontSize: "1.5rem" }}>
            All Recurring Donation Requests
          </Typography>
        </Box>
      </Box>

      {/* <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
          mb: 4,
        }}
      >
        <TextField
          select
          name="isActive"
          label="Status"
          size="small"
          required
          value={formInputs.isActive}
          onChange={handleChange}
          sx={{ width: 300, mb: 2 }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value={true}>Active</MenuItem>
          <MenuItem value={false}>Inactive</MenuItem>
        </TextField>
      </Box> */}

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        {posts?.map((post) => (
          <Paper variant="outlined" sx={{ m: 1, px: 2, py: 1 }}>
            <Typography>
              Type: {post.type} | Amount: {post.amount}
            </Typography>
            <Typography>
              Requestor:{" "}
              <Typography
                component={RouterLink}
                to={`/profile/${post.user._id}`}
              >
                {post.user.firstName} {post.user.lastName}
              </Typography>
            </Typography>
            <Typography sx={{ fontSize: ".8rem", mt: 0.5, mb: 1 }}>
              <ReactTimeAgo
                date={post.createdAt}
                locale="en-US"
                timeStyle="round-minute"
              />
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={(e) => handleClickDialogOpen(e, post)}
            >
              Details
            </Button>
          </Paper>
        ))}

        {/* {formInputs.isActive === "all"
          ? posts?.map((post) => (
              <Box sx={{ display: "block" }}>
                <DonorCard post={post} path="try-admin/active-donor" />
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={(e) => handleDelete(e, post._id)}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            ))
          : posts
              ?.filter((item) => item.isActive === formInputs.isActive)
              .map((post) => (
                <Box sx={{ display: "block" }}>
                  <DonorCard post={post} path="try-admin/active-donor" />
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={(e) => handleDelete(e, post._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>
              ))}

        {formInputs.isActive !== "all" &&
          posts?.filter((item) => item.isActive === formInputs.isActive)
            .length < 1 && (
            <Typography sx={{ pt: 12, fontSize: "1.4rem" }}>
              No post found
            </Typography>
          )} */}
      </Box>
    </Box>
  );
};

export default ViewAllRecurring;
