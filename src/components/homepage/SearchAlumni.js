import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';

import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import CropSquareRoundedIcon from '@mui/icons-material/CropSquareRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';

const SearchAlumni = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        pt: { xs: 2, sm: 8 },
        pb: { xs: 2, sm: 8 },
        px: { xs: 2, sm: 0 },
        bgcolor: grey[100],
      }}
    >
      <Card
        sx={{
          maxWidth: 580,
          pt: 1,
          pb: 2,
          mr: { sm: 8 },
          mb: { xs: 2, sm: 0 },
          borderTop: '3px solid #03a9f4',
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
          <Typography color="text.secondary" sx={{ fontSize: '1rem', mb: 3 }}>
            Search for an alumni at different organizations
          </Typography>
          <List sx={{ bgcolor: '#f7f5fc', mx: { xs: 0, sm: 4 }, py: 0 }}>
            <ListItem disablePadding disableGutters>
              <ListItemButton
                component={RouterLink}
                to="/search-alumni?company=walton"
              >
                <ListItemIcon>
                  <DashboardRoundedIcon
                    color="info"
                    sx={{ fontSize: '1rem' }}
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
                    sx={{ fontSize: '1rem' }}
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
                to="/search-alumni?company=pran rfl"
              >
                <ListItemIcon>
                  <DashboardRoundedIcon
                    color="info"
                    sx={{ fontSize: '1rem', m: 0, p: 0 }}
                  />
                </ListItemIcon>
                <ListItemText
                  sx={{ m: 0, p: 0, ml: -3 }}
                  primary="PRAN-RFL Group"
                />
              </ListItemButton>
            </ListItem>
            <Divider light />
            <ListItem disablePadding>
              <ListItemButton
                component={RouterLink}
                to="/search-alumni?company=rural electrification breb"
              >
                <ListItemIcon>
                  <DashboardRoundedIcon
                    color="info"
                    sx={{ fontSize: '1rem' }}
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
                    sx={{ fontSize: '1rem' }}
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
                    sx={{ fontSize: '1rem' }}
                  />
                </ListItemIcon>
                <ListItemText
                  sx={{ m: 0, p: 0, ml: -3 }}
                  primary="Bangladesh power development board (BPDB)"
                />
              </ListItemButton>
            </ListItem>
          </List>
        </CardContent>
        <CardActions sx={{ px: 2, ml: { xs: 0, sm: 4 } }}>
          <Button variant="outlined" component={RouterLink} to="/search-alumni">
            Search more
          </Button>
        </CardActions>
      </Card>

      <Card
        sx={{
          maxWidth: 580,
          pt: 1,
          pb: 2,
          mr: { sm: 8 },
          mb: { xs: 2, sm: 0 },
          borderTop: '3px solid #4caf50',
          borderRadius: 0,
        }}
        elevation={0}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" color="primary">
            Kuetians at overseas universities
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3, fontSize: '1rem' }}>
            Find alumni at universities worldwide
          </Typography>
          <List sx={{ bgcolor: '#f7f5fc', mx: { xs: 0, sm: 4 }, py: 0 }}>
            <ListItem disablePadding disableGutters>
              <ListItemButton
                component={RouterLink}
                to="/search-alumni?company=Glasgow"
              >
                <ListItemIcon>
                  <SchoolRoundedIcon
                    color="success"
                    sx={{ fontSize: '1rem' }}
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
                <ListItemIcon
                  component={RouterLink}
                  to="/search-alumni?company=Saga"
                >
                  <SchoolRoundedIcon
                    color="success"
                    sx={{ fontSize: '1rem' }}
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
                    sx={{ fontSize: '1rem' }}
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
                <ListItemIcon
                  component={RouterLink}
                  to="/search-alumni?company=Pennsylvania"
                >
                  <SchoolRoundedIcon
                    color="success"
                    sx={{ fontSize: '1rem' }}
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
                    sx={{ fontSize: '1rem' }}
                  />
                </ListItemIcon>
                <ListItemText
                  sx={{ m: 0, p: 0, ml: -3 }}
                  primary="University of North Carolina"
                />
              </ListItemButton>
            </ListItem>
            <Divider light />
            <ListItem disablePadding>
              <ListItemButton
                component={RouterLink}
                to="/search-alumni?company=Florida"
              >
                <ListItemIcon>
                  <SchoolRoundedIcon
                    color="success"
                    sx={{ fontSize: '1rem' }}
                  />
                </ListItemIcon>
                <ListItemText
                  sx={{ m: 0, p: 0, ml: -3 }}
                  primary="Florida International University"
                />
              </ListItemButton>
            </ListItem>
          </List>
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
