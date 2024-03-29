/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import Spinner from "../../../components/shared/Spinner";
import PostCard from "../../../components/shared/PostCard";
import { Link as RouterLink } from "react-router-dom";

import AddCircleIcon from "@mui/icons-material/AddCircle";

const ViewAllPosts = () => {
  const [posts, setPosts] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const auth = useSelector((state) => state.auth);

  const userId = auth ? auth._id : null;

  const [formInputs, setFormInputs] = useState({
    isActive: "all",
  });

  const handleChange = (event) => {
    setFormInputs({
      ...formInputs,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (userId) getPosts();
  }, [userId]);

  const getPosts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/try/donation`,
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
      <Spinner open={isLoading} />
      <Box
        sx={{
          mb: 4,
          px: 2,
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4, px: 2 }}>
          <Typography variant="h4" sx={{ fontSize: "2rem" }}>
            All Donations
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
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
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {formInputs.isActive === "all"
          ? posts?.map((post) => (
              <PostCard post={post} path="try-admin/donation" />
            ))
          : posts
              ?.filter((item) => item.isActive === formInputs.isActive)
              .map((post) => (
                <PostCard post={post} path="try-admin/donation" />
              ))}

        {formInputs.isActive !== "all" &&
          posts?.filter((item) => item.isActive === formInputs.isActive)
            .length < 1 && (
            <Typography sx={{ pt: 12, fontSize: "1.4rem" }}>
              No post found
            </Typography>
          )}
      </Box>
    </Box>
  );
};

export default ViewAllPosts;
