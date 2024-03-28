import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import React from "react";

import { Link as RouterLink } from "react-router-dom";
const Tution = () => {
  return (
    <>
      <Box
        sx={{
          maxWidth: "1024px",
          mx: "auto",
          py: { xs: 4, sm: 12 },
          px: { xs: 2, sm: 0 },
        }}
      >
        <Grid container spacing={{ xs: 2, sm: 12 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ mb: 4, px: 2 }}>
              <Typography
                sx={{ mt: 1, fontSize: "1.8rem", fontWeight: "bold" }}
                color="primary.dark"
              >
                Looking for a tutor?
              </Typography>
              <Typography
                sx={{ mt: 2, mb: 2, fontSize: "1.1rem" }}
                color="text.secondary"
              >
                Are you looking for a Kuet student as a part time tutor? Explore
                who are available to be a tutor, find the one that maches your
                requirements.
              </Typography>

              <Button
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/tutor/find"
                sx={{ fontSize: "1rem", px: 4, py: 1, mt: 2 }}
              >
                Find a tutor
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ mb: 4, px: 2 }}>
              <Typography
                sx={{ mt: 1, fontSize: "1.8rem", fontWeight: "bold" }}
                color="primary.dark"
              >
                Enroll to be a tutor
              </Typography>
              <Typography
                sx={{ mt: 2, mb: 2, fontSize: "1.1rem" }}
                color="text.secondary"
              >
                Are you looking for a tution? Enroll mentioning your area of
                availibility and wait for some other alumni to get match with
                your profile and availibility area.
              </Typography>

              <Button
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/tutor/enroll"
                sx={{ fontSize: "1rem", px: 4, py: 1, mt: 2 }}
              >
                Enroll now
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Paper
          elevation={0}
          sx={{
            maxWidth: "1024px",
            bgcolor: grey[100],
            mx: "auto",
            textAlign: "center",
            px: 2,
            pt: 3,
            pb: 4,
            mt: 8,
            borderRadius: 4,
          }}
        >
          <Typography
            sx={{
              mt: 1,
              fontSize: "2rem",
              fontWeight: 500,
              mb: 3,
              color: "success.dark",
            }}
          >
            Bachelor & Family House Rental
          </Typography>
          <Typography
            sx={{ mt: 2, mb: 2, fontSize: "1.2rem" }}
            color="text.secondary"
          >
            Are you looking for renting house to a family or bachelor ? Enroll
            now and wait for some other alumni to get a match with your rent
            specification and availibility area.
          </Typography>
          <Typography
            sx={{ mt: 2, mb: 4, fontSize: "1.2rem" }}
            color="text.primary"
          >
            If you are interested in getting rent check out at our available
            rental posts
          </Typography>
          <Button
            variant="outlined"
            color="success"
            component={RouterLink}
            to="/tolet/enroll"
            sx={{ fontSize: "1rem", px: 4, py: 1, mx: 1, my: 1 }}
          >
            Post a rental
          </Button>
          <Button
            variant="contained"
            color="success"
            component={RouterLink}
            to="/tolet/find"
            sx={{ fontSize: "1rem", px: 4, py: 1, mx: 1, my: 1 }}
          >
            Find a rental
          </Button>
        </Paper>
      </Box>
    </>
  );
};

export default Tution;
