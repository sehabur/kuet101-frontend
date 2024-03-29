import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import RecurringDonation from "./RecurringDonation";
import SpecialDonation from "./SpecialDonation";
import { blue, grey, orange } from "@mui/material/colors";
import Carousel from "react-material-ui-carousel";
import Donations from "./Donations";

const Homepage = () => {
  const theme = useTheme();
  const matchesSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      <Box sx={{ py: 3, bgcolor: "secondary.dark" }}>
        <Box
          sx={{
            maxWidth: "850px",
            mx: "auto",
            px: 2,
          }}
        >
          <Stack direction="row" alignItems="center">
            <Avatar
              alt="try logo"
              src="/club_logos/try.jpeg"
              sx={{ width: 105, height: 105, mr: { xs: 3, sm: 6 } }}
            />
            <Box>
              <Typography variant="h4" sx={{ color: grey[100] }}>
                TRY
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: ".9rem", sm: "1.1rem" },
                  color: grey[300],
                }}
              >
                KUET SOCIAL SERVICE CLUB... ট্রাই খুলনা প্রকৌশল ও প্রযুক্তি
                বিশ্ববিদ্যালয় ( কুয়েটের) একটি মানবকল্যাণমূলক সংগঠন!!
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>

      <Box
        sx={{
          width: { xs: "100vw", sm: "1100px" },
          mx: "auto",
          my: { xs: 0, sm: 2 },
        }}
      >
        <Carousel
          duration={300}
          stopAutoPlayOnHover={false}
          indicators={false}
          navButtonsAlwaysVisible={true}
          autoPlay={false}
          height={matchesSmUp ? 530 : 220}
          navButtonsProps={{
            style: {
              backgroundColor: orange[500],
              color: grey[50],
            },
          }}
        >
          <img
            src="banners/try_banner_1.jpg"
            width="100%"
            style={{ borderRadius: matchesSmUp ? 10 : 0 }}
          />
          <img
            src="banners/try_banner_2.jpg"
            width="100%"
            style={{ borderRadius: matchesSmUp ? 10 : 0 }}
          />
        </Carousel>
      </Box>

      <Box>
        <Donations />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          spacing: 2,
          bgcolor: grey[50],
          py: { xs: 4, sm: 8 },
        }}
      >
        <SpecialDonation />
        <RecurringDonation />
      </Box>
    </>
  );
};

export default Homepage;
