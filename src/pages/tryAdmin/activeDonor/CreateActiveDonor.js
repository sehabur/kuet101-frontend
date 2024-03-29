import React from "react";
import {
  Alert,
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Spinner from "../../../components/shared/Spinner";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ImageUploader from "../../../components/shared/ImageUploader";

const CreateActiveDonor = () => {
  const auth = useSelector((state) => state.auth);

  const formDefaultState = {
    title: "",
    type: "",
    images: [],
  };

  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [success, setSuccess] = useState(false);

  const [formInputs, setFormInputs] = useState(formDefaultState);

  const handleChange = (event) => {
    setFormInputs({
      ...formInputs,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageSelection = (selectedImages) => {
    setFormInputs({
      ...formInputs,
      images: selectedImages,
    });
  };

  const handleImageLoading = (state) => {
    setIsLoading(state);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const formData = new FormData();

      for (let key in formInputs) {
        if (key === "images") {
          formData.append("image", formInputs["images"][0]);
        } else {
          formData.append(key, formInputs[key]);
        }
      }

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/try/activeDonor`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      if (response.status === 201) {
        setSuccess(true);
        setErrorMessage("");
        setIsLoading(false);
      }
    } catch (error) {
      setSuccess(false);

      if (error.response) {
        let composeMsg;
        if (error.response.data.message) {
          composeMsg = error.response.data.message;
        } else if (error.response.data.errors) {
          composeMsg = error.response.data.errors[0].msg;
        }
        setErrorMessage(`Post creation failed. ${composeMsg}`);
      }
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <Box sx={{ maxWidth: "760px", mx: "auto", p: 4 }}>
      <Spinner open={isLoading} />

      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h5" sx={{ mt: 2, mb: 4 }}>
          Create new donor
        </Typography>
      </Box>

      <Grid
        container
        spacing={3}
        component="form"
        onSubmit={handleSubmit}
        sx={{ mb: 2 }}
      >
        <Grid item xs={12}>
          <Typography
            sx={{
              color: "primary.main",
              textAlign: "left",
              ml: 0.5,
              my: 1,
            }}
          >
            Donor Name
          </Typography>
          <TextField
            name="title"
            fullWidth
            required
            value={formInputs.title}
            onChange={handleChange}
          ></TextField>
        </Grid>

        <Grid item xs={12}>
          <Typography
            sx={{
              color: "primary.main",
              textAlign: "left",
              ml: 0.5,
              my: 1,
            }}
          >
            Type
          </Typography>
          <TextField
            select
            name="type"
            fullWidth
            required
            value={formInputs.type}
            onChange={handleChange}
          >
            <MenuItem value="company">Company</MenuItem>
            <MenuItem value="university">University</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <Typography
            sx={{
              color: "primary.main",
              textAlign: "left",
              ml: 0.5,
              mt: 2,
            }}
          >
            Image (Upload 1 image only)
          </Typography>
        </Grid>

        <Grid item xs={12} sx={{ ml: 0.5 }}>
          <ImageUploader
            getImageFiles={handleImageSelection}
            getImageLoading={handleImageLoading}
          />
        </Grid>

        <Grid item xs={12}>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          {success && <Alert severity="success">Creation successful</Alert>}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              type="submit"
              sx={{ my: 2, px: 4, py: 1.2 }}
            >
              Create
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateActiveDonor;
