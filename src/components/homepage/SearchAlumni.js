import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";

import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import CropSquareRoundedIcon from "@mui/icons-material/CropSquareRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";

const SearchAlumni = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        pt: { xs: 2, sm: 8 },
        pb: { xs: 2, sm: 8 },
        px: { xs: 2, sm: 0 },
        bgcolor: grey[100],
        spacing: 2,
      }}
    >
      <Card
        sx={{
          minWidth: { xs: "90vw", sm: 600 },
          pt: 1,
          pb: 2,
          mx: { sm: 2 },
          mb: { xs: 2, sm: 0 },
          borderTop: "3px solid #03a9f4",
          borderRadius: 0,
        }}
        elevation={0}
      >
        {/* <Box sx={{ px: 2 }}>
          <CardMedia
            component="img"
            alt="search alumni"
            height="140"
            image="/images/search_alumni.jpeg"
          />
        </Box> */}
        <CardContent>
          <Typography gutterBottom variant="h5" color="primary">
            Search people at popular organizations
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: "1rem", mb: 3 }}>
            Search for an alumni at different organizations
          </Typography>
          <Carousel
            duration={1000}
            navButtonsAlwaysVisible={true}
            animation="slide"
            navButtonsProps={{
              // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
              style: {
                backgroundColor: "transparent",
                color: grey[800],
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                px: 2,
              }}
            >
              <Chip
                label="Electrical"
                color="warning"
                variant="outlined"
                sx={{ px: 2, fontSize: "1rem", mb: 2 }}
              />
              <List sx={{ bgcolor: "#f7f5fc", mx: { xs: 0, sm: 4 }, py: 0 }}>
                <ListItem disablePadding disableGutters>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=walton"
                  >
                    <ListItemIcon>
                      <DashboardRoundedIcon
                        color="info"
                        sx={{ fontSize: "1rem" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="Walton Hi-Tech Industries PLC"
                    />
                  </ListItemButton>
                </ListItem>
                <Divider light />
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=square"
                  >
                    <ListItemIcon>
                      <DashboardRoundedIcon
                        color="info"
                        sx={{ fontSize: "1rem" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="Square Pharmaceuticals PLC"
                    />
                  </ListItemButton>
                </ListItem>

                <Divider light />
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=wartsila"
                  >
                    <ListItemIcon>
                      <DashboardRoundedIcon
                        color="info"
                        sx={{ fontSize: "1rem" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="Wartsila Corporation Bangladesh Ltd"
                    />
                  </ListItemButton>
                </ListItem>

                <Divider light />
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=summit"
                  >
                    <ListItemIcon>
                      <DashboardRoundedIcon
                        color="info"
                        sx={{ fontSize: "1rem" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="Summit Power Limited"
                    />
                  </ListItemButton>
                </ListItem>

                <Divider light />
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=pran rfl"
                  >
                    <ListItemIcon>
                      <DashboardRoundedIcon
                        color="info"
                        sx={{ fontSize: "1rem", m: 0, p: 0 }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="PRAN-RFL Group"
                    />
                  </ListItemButton>
                </ListItem>

                {/*                 
                <Divider light />
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=rural electrification breb"
                  >
                    <ListItemIcon>
                      <DashboardRoundedIcon
                        color="info"
                        sx={{ fontSize: "1rem" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="Bangladesh Rural Electrification Board (BREB)"
                    />
                  </ListItemButton>
                </ListItem>
                <Divider light />
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=local lged"
                  >
                    <ListItemIcon>
                      <DashboardRoundedIcon
                        color="info"
                        sx={{ fontSize: "1rem" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="Local Government Engineering Department (LGED)"
                    />
                  </ListItemButton>
                </ListItem>
                <Divider light />
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=power development bpdb"
                  >
                    <ListItemIcon>
                      <DashboardRoundedIcon
                        color="info"
                        sx={{ fontSize: "1rem" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="Bangladesh power development board (BPDB)"
                    />
                  </ListItemButton>
                </ListItem> */}
              </List>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Chip
                label="Mechanical"
                color="warning"
                variant="outlined"
                sx={{ px: 2, fontSize: "1rem", mb: 2 }}
              />
              <List sx={{ bgcolor: "#f7f5fc", mx: { xs: 0, sm: 4 }, py: 0 }}>
                <ListItem disablePadding disableGutters>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=energypac"
                  >
                    <ListItemIcon>
                      <DashboardRoundedIcon
                        color="info"
                        sx={{ fontSize: "1rem" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="ENERGYPAC ENGINEERING LTD."
                    />
                  </ListItemButton>
                </ListItem>
                <Divider light />
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=banglacat trac"
                  >
                    <ListItemIcon>
                      <DashboardRoundedIcon
                        color="info"
                        sx={{ fontSize: "1rem" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="Bangla Trac Limited (BanglaCAT)"
                    />
                  </ListItemButton>
                </ListItem>
                <Divider light />
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=transcom"
                  >
                    <ListItemIcon>
                      <DashboardRoundedIcon
                        color="info"
                        sx={{ fontSize: "1rem", m: 0, p: 0 }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="Transcom Beverages  Ltd"
                    />
                  </ListItemButton>
                </ListItem>
                <Divider light />
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=tobacco"
                  >
                    <ListItemIcon>
                      <DashboardRoundedIcon
                        color="info"
                        sx={{ fontSize: "1rem", m: 0, p: 0 }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="British American Tobacco"
                    />
                  </ListItemButton>
                </ListItem>
                <Divider light />
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=reneta"
                  >
                    <ListItemIcon>
                      <DashboardRoundedIcon
                        color="info"
                        sx={{ fontSize: "1rem", m: 0, p: 0 }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="Renata Limited"
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Chip
                label="Civil"
                color="warning"
                variant="outlined"
                sx={{ px: 2, fontSize: "1rem", mb: 2 }}
              />
              <List sx={{ bgcolor: "#f7f5fc", mx: { xs: 0, sm: 4 }, py: 0 }}>
                <ListItem disablePadding disableGutters>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=bridge"
                  >
                    <ListItemIcon>
                      <DashboardRoundedIcon
                        color="info"
                        sx={{ fontSize: "1rem" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="Bangladesh Bridge Authority"
                    />
                  </ListItemButton>
                </ListItem>
                <Divider light />
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=modern"
                  >
                    <ListItemIcon>
                      <DashboardRoundedIcon
                        color="info"
                        sx={{ fontSize: "1rem" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="Modern Structures Limited"
                    />
                  </ListItemButton>
                </ListItem>
                <Divider light />
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=max"
                  >
                    <ListItemIcon>
                      <DashboardRoundedIcon
                        color="info"
                        sx={{ fontSize: "1rem", m: 0, p: 0 }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="MAX Group"
                    />
                  </ListItemButton>
                </ListItem>
                <Divider light />
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=civil tcel"
                  >
                    <ListItemIcon>
                      <DashboardRoundedIcon
                        color="info"
                        sx={{ fontSize: "1rem", m: 0, p: 0 }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="The Civil Engineers Limited"
                    />
                  </ListItemButton>
                </ListItem>
                <Divider light />
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=promoters"
                  >
                    <ListItemIcon>
                      <DashboardRoundedIcon
                        color="info"
                        sx={{ fontSize: "1rem", m: 0, p: 0 }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="Project Promoters Private Limited"
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Chip
                label="CSE"
                color="warning"
                variant="outlined"
                sx={{ px: 2, fontSize: "1rem", mb: 2 }}
              />
              <List sx={{ bgcolor: "#f7f5fc", mx: { xs: 0, sm: 4 }, py: 0 }}>
                <ListItem disablePadding disableGutters>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=reve"
                  >
                    <ListItemIcon>
                      <DashboardRoundedIcon
                        color="info"
                        sx={{ fontSize: "1rem" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="REVE Systems Ltd."
                    />
                  </ListItemButton>
                </ListItem>
                <Divider light />
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=robi"
                  >
                    <ListItemIcon>
                      <DashboardRoundedIcon
                        color="info"
                        sx={{ fontSize: "1rem" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="Robi Axiata Ltd."
                    />
                  </ListItemButton>
                </ListItem>
                <Divider light />
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=samsung"
                  >
                    <ListItemIcon>
                      <DashboardRoundedIcon
                        color="info"
                        sx={{ fontSize: "1rem", m: 0, p: 0 }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="Samsung R&D Institute Bangladesh "
                    />
                  </ListItemButton>
                </ListItem>
                <Divider light />
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=bjit"
                  >
                    <ListItemIcon>
                      <DashboardRoundedIcon
                        color="info"
                        sx={{ fontSize: "1rem", m: 0, p: 0 }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="BJIT Inc"
                    />
                  </ListItemButton>
                </ListItem>
                <Divider light />
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=dutch"
                  >
                    <ListItemIcon>
                      <DashboardRoundedIcon
                        color="info"
                        sx={{ fontSize: "1rem", m: 0, p: 0 }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="Dutch Bangla Bank PLC"
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Chip
                label="BCEM"
                color="warning"
                variant="outlined"
                sx={{ px: 2, fontSize: "1rem", mb: 2 }}
              />
              <List sx={{ bgcolor: "#f7f5fc", mx: { xs: 0, sm: 4 }, py: 0 }}>
                <ListItem disablePadding disableGutters>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=sthapona"
                  >
                    <ListItemIcon>
                      <DashboardRoundedIcon
                        color="info"
                        sx={{ fontSize: "1rem" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="Sthapona Consultants Ltd"
                    />
                  </ListItemButton>
                </ListItem>
                <Divider light />
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=lged local"
                  >
                    <ListItemIcon>
                      <DashboardRoundedIcon
                        color="info"
                        sx={{ fontSize: "1rem" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="Local Government Engineering Department (LGED)"
                    />
                  </ListItemButton>
                </ListItem>
                <Divider light />
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=max"
                  >
                    <ListItemIcon>
                      <DashboardRoundedIcon
                        color="info"
                        sx={{ fontSize: "1rem", m: 0, p: 0 }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="Max Infrastructure Limited"
                    />
                  </ListItemButton>
                </ListItem>
                <Divider light />
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=staad"
                  >
                    <ListItemIcon>
                      <DashboardRoundedIcon
                        color="info"
                        sx={{ fontSize: "1rem", m: 0, p: 0 }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="Staad Engineers ltd"
                    />
                  </ListItemButton>
                </ListItem>
                <Divider light />
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=eastern"
                  >
                    <ListItemIcon>
                      <DashboardRoundedIcon
                        color="info"
                        sx={{ fontSize: "1rem", m: 0, p: 0 }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="Eastern Bank PLC"
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Chip
                label="IEM"
                color="warning"
                variant="outlined"
                sx={{ px: 2, fontSize: "1rem", mb: 2 }}
              />
              <List sx={{ bgcolor: "#f7f5fc", mx: { xs: 0, sm: 4 }, py: 0 }}>
                <ListItem disablePadding disableGutters>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=coats"
                  >
                    <ListItemIcon>
                      <DashboardRoundedIcon
                        color="info"
                        sx={{ fontSize: "1rem" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="Coats International Ltd."
                    />
                  </ListItemButton>
                </ListItem>
                <Divider light />
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=akij"
                  >
                    <ListItemIcon>
                      <DashboardRoundedIcon
                        color="info"
                        sx={{ fontSize: "1rem" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="Akij Plastics Ltd."
                    />
                  </ListItemButton>
                </ListItem>
                <Divider light />
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=swiss"
                  >
                    <ListItemIcon>
                      <DashboardRoundedIcon
                        color="info"
                        sx={{ fontSize: "1rem", m: 0, p: 0 }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="SWISS BIOHYGIENIC EQUIPMENT"
                    />
                  </ListItemButton>
                </ListItem>
                <Divider light />
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=onnorokom"
                  >
                    <ListItemIcon>
                      <DashboardRoundedIcon
                        color="info"
                        sx={{ fontSize: "1rem", m: 0, p: 0 }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="Onnorokom Electronics Co Ltd "
                    />
                  </ListItemButton>
                </ListItem>
                <Divider light />
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=remark"
                  >
                    <ListItemIcon>
                      <DashboardRoundedIcon
                        color="info"
                        sx={{ fontSize: "1rem", m: 0, p: 0 }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="Remark HB Limited"
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Carousel>
        </CardContent>
        <CardActions sx={{ px: 2, ml: { xs: 0, sm: 4 } }}>
          <Button variant="outlined" component={RouterLink} to="/search-alumni">
            Search more
          </Button>
        </CardActions>
      </Card>

      <Card
        sx={{
          minWidth: { xs: "90vw", sm: 600 },
          pt: 1,
          pb: 2,
          mx: { sm: 2 },
          mb: { xs: 2, sm: 0 },
          borderTop: "3px solid #4caf50",
          borderRadius: 0,
        }}
        elevation={0}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" color="primary">
            Kuetians at overseas universities
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3, fontSize: "1rem" }}>
            Find alumni at universities worldwide
          </Typography>
          <Carousel
            duration={1000}
            // animation="slide"
            navButtonsAlwaysVisible={true}
            navButtonsProps={{
              // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
              style: {
                backgroundColor: "transparent",
                color: grey[800],
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                px: 2,
              }}
            >
              <Chip
                label="University"
                color="warning"
                variant="outlined"
                sx={{ px: 2, fontSize: "1rem", mb: 2 }}
              />
              <List sx={{ bgcolor: "#f7f5fc", mx: { xs: 0, sm: 4 }, py: 0 }}>
                <ListItem disablePadding disableGutters>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=Glasgow"
                  >
                    <ListItemIcon>
                      <SchoolRoundedIcon
                        color="success"
                        sx={{ fontSize: "1rem" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="University of Glasgow"
                    />
                  </ListItemButton>
                </ListItem>
                <Divider light />
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=Saga"
                  >
                    <ListItemIcon component={RouterLink}>
                      <SchoolRoundedIcon
                        color="success"
                        sx={{ fontSize: "1rem" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="Saga University"
                    />
                  </ListItemButton>
                </ListItem>
                <Divider light />
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=Berlin"
                  >
                    <ListItemIcon>
                      <SchoolRoundedIcon
                        color="success"
                        sx={{ fontSize: "1rem" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="Technical University of Berlin"
                    />
                  </ListItemButton>
                </ListItem>
                <Divider light />
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=Pennsylvania"
                  >
                    <ListItemIcon component={RouterLink}>
                      <SchoolRoundedIcon
                        color="success"
                        sx={{ fontSize: "1rem" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="Pennsylvania State University-University Park"
                    />
                  </ListItemButton>
                </ListItem>
                <Divider light />
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=Carolina"
                  >
                    <ListItemIcon>
                      <SchoolRoundedIcon
                        color="success"
                        sx={{ fontSize: "1rem" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="University of North Carolina"
                    />
                  </ListItemButton>
                </ListItem>
                {/* <Divider light />
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=Florida"
                  >
                    <ListItemIcon>
                      <SchoolRoundedIcon
                        color="success"
                        sx={{ fontSize: "1rem" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="Florida International University"
                    />
                  </ListItemButton>
                </ListItem> */}
              </List>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                px: 2,
              }}
            >
              <Chip
                label="University"
                color="warning"
                variant="outlined"
                sx={{ px: 2, fontSize: "1rem", mb: 2 }}
              />
              <List sx={{ bgcolor: "#f7f5fc", mx: { xs: 0, sm: 4 }, py: 0 }}>
                <ListItem disablePadding disableGutters>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=Hamburg"
                  >
                    <ListItemIcon>
                      <SchoolRoundedIcon
                        color="success"
                        sx={{ fontSize: "1rem" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="Hamburg University of Technology"
                    />
                  </ListItemButton>
                </ListItem>
                <Divider light />
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=Kentucky"
                  >
                    <ListItemIcon component={RouterLink}>
                      <SchoolRoundedIcon
                        color="success"
                        sx={{ fontSize: "1rem" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="University of Kentucky "
                    />
                  </ListItemButton>
                </ListItem>
                <Divider light />
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=Chemnitz"
                  >
                    <ListItemIcon>
                      <SchoolRoundedIcon
                        color="success"
                        sx={{ fontSize: "1rem" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="Technische UniversitÃ¤t Chemnitz"
                    />
                  </ListItemButton>
                </ListItem>
                <Divider light />
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=utah"
                  >
                    <ListItemIcon component={RouterLink}>
                      <SchoolRoundedIcon
                        color="success"
                        sx={{ fontSize: "1rem" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="Utah State University"
                    />
                  </ListItemButton>
                </ListItem>
                <Divider light />
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to="/search-alumni?company=Minnesota"
                  >
                    <ListItemIcon>
                      <SchoolRoundedIcon
                        color="success"
                        sx={{ fontSize: "1rem" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0, p: 0, ml: -3 }}
                      primary="University of Minnesota - Twin Cities"
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Carousel>
        </CardContent>
        <CardActions sx={{ px: 2, ml: { xs: 0, sm: 4 } }}>
          <Button variant="outlined" component={RouterLink} to="/search-alumni">
            Search more
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default SearchAlumni;
