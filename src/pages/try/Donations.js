import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import Spinner from "../../components/shared/Spinner";
import PostCard from "../../components/shared/PostCard";
import HorizontalRuleRoundedIcon from "@mui/icons-material/HorizontalRuleRounded";
import { Link as RouterLink } from "react-router-dom";
import { grey } from "@mui/material/colors";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import DonorCard from "../../components/shared/DonorCard";
import DonationEventCard from "../../components/shared/DonationEventCard";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Donations = () => {
  const theme = useTheme();
  const matchesSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const [posts, setPosts] = useState(null);

  const [donors, setDonors] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const auth = useSelector((state) => state.auth);

  const userId = auth ? auth._id : null;

  const [value, setValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (userId) {
      getPosts();
      getDonors();
    }
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

  const getDonors = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/try/activeDonor`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setDonors(response.data.donors);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Box sx={{ my: 6 }}>
        <Spinner open={isLoading} />
        <Box sx={{ textAlign: "center", mb: 4, px: 2 }}>
          <HorizontalRuleRoundedIcon
            sx={{ fontSize: "3rem" }}
            color="warning"
          />
          <Typography variant="h4" color="text.primary">
            Ongoing Donation Events
          </Typography>
          <Typography sx={{ my: 1 }}>
            Donate to the currently running events and help a Kuetians fight
            back
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          {posts &&
            posts
              .filter((post) => post.isActive === true)
              .map((post) => <DonationEventCard post={post} />)}
        </Box>

        {/* <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/posts"
            sx={{ fontSize: "1.1rem", px: 4, py: 1, mt: 4 }}
          >
            Show more Posts
          </Button>
        </Box> */}
      </Box>
      <Box sx={{ my: 6 }}>
        <Spinner open={isLoading} />
        <Box sx={{ textAlign: "center", mb: 4, px: 2 }}>
          <HorizontalRuleRoundedIcon
            sx={{ fontSize: "3rem" }}
            color="warning"
          />
          <Typography variant="h4" color="text.primary">
            Previous Donation Events
          </Typography>
          <Typography sx={{ my: 1 }}>
            Donation Events organized by TRY previously
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          {posts &&
            posts
              .filter((post) => post.isActive === false)
              .map((post) => <DonationEventCard post={post} />)}
        </Box>

        {/* <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/posts"
            sx={{ fontSize: "1.1rem", px: 4, py: 1, mt: 4 }}
          >
            Show more Posts
          </Button>
        </Box> */}
      </Box>

      <Box sx={{ my: 6 }}>
        <Spinner open={isLoading} />
        <Box sx={{ textAlign: "center", mb: 4, px: 2 }}>
          <HorizontalRuleRoundedIcon
            sx={{ fontSize: "3rem" }}
            color="warning"
          />
          <Typography variant="h4" color="text.primary">
            Active Donors
          </Typography>
          {/* <Typography sx={{ my: 1 }}>
            Donation Events organized by TRY previously
          </Typography> */}
        </Box>
        <Box sx={{ width: "100%" }}>
          <Box>
            <Tabs
              centered
              variant={matchesSmUp ? "standard" : "fullWidth"}
              textColor="primary"
              indicatorColor="primary"
              value={value}
              onChange={handleTabChange}
              aria-label="basic tabs example"
            >
              <Tab
                sx={{ fontSize: { xs: "1rem", sm: "1.2rem" }, px: 4, mx: 4 }}
                label="Company"
              />
              <Tab
                sx={{ fontSize: { xs: "1rem", sm: "1.2rem" }, px: 4, mx: 4 }}
                label="University"
              />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "stretch",
                maxWidth: 1300,
                mx: "auto",
              }}
            >
              {donors &&
                donors
                  .filter((post) => post.type === "company")
                  .map((post) => (
                    <Box sx={{ mx: { xs: 2, sm: 3 }, my: { xs: 2, sm: 4 } }}>
                      <DonorCard post={post} />
                    </Box>
                  ))}
            </Box>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "stretch",
                maxWidth: 1300,
                mx: "auto",
              }}
            >
              {donors &&
                donors
                  .filter((post) => post.type === "university")
                  .map((post) => (
                    <Box sx={{ mx: { xs: 2, sm: 3 }, my: { xs: 2, sm: 4 } }}>
                      <DonorCard post={post} />
                    </Box>
                  ))}
            </Box>
          </CustomTabPanel>
        </Box>
      </Box>
    </Box>
  );
};

export default Donations;
