import React from 'react';

import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
  MenuItem,
  FormLabel,
  RadioGroup,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  Drawer,
  FormControl,
  Radio,
  useTheme,
  useMediaQuery,
  IconButton,
  Autocomplete,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import { useState } from 'react';
import { departments, districts, status } from '../data/mappingFile';
import axios from 'axios';
import { useSelector } from 'react-redux';

import AlumniCard from '../components/shared/AlumniCard';

const SearchAlumni = () => {
  const theme = useTheme();

  const matchesSmDown = useMediaQuery(theme.breakpoints.down('sm'));

  const [isLoading, setIsLoading] = useState(false);

  const [searchResult, setSearchResult] = useState(null);

  const [searchMessage, setSearchMessage] = useState(
    'Search alumni using filters'
  );

  const [openDrawer, setOpenDrawer] = useState(false);

  const auth = useSelector((state) => state.auth);

  const [filterOption, setFilterOption] = useState({
    name: '',
    rollNo: '',
    batch: '',
    departmentShort: '',
    homeDistrict: '',
    presentDistrict: '',
    status: '',
    currentJobTitle: '',
    currentOrganization: '',
  });

  const handleToggleDrawer = (state) => {
    setOpenDrawer(state);
  };

  const handleFilterOptionChange = (event) => {
    setFilterOption({
      ...filterOption,
      [event.target.name]: event.target.value,
    });
  };

  const handleFilterSubmit = async () => {
    let queryText = 'search=1';
    for (let key in filterOption) {
      if (filterOption[key] !== 'all' && filterOption[key] !== '') {
        queryText += '&' + key + '=' + filterOption[key];
      }
    }
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/getUsersByQuery?${queryText}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setSearchResult(response.data.users);
      if (response.data.users.length < 1) {
        setSearchMessage(
          'No alumni found maching your search. Try again with different option.'
        );
      }
      handleToggleDrawer(false);
      setIsLoading(false);

      //   console.log(
      //     `${process.env.REACT_APP_BACKEND_URL}/api/users/getUsersByQuery?${queryText}`
      //   );
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const filterMenu = (
    <Box sx={{ px: 3, py: 2 }}>
      <Typography sx={{ mb: 1 }} color="primary">
        Search options
      </Typography>
      <TextField
        fullWidth
        label="Name"
        name="name"
        value={filterOption.name}
        onChange={handleFilterOptionChange}
        size="small"
        sx={{ my: 1 }}
      />

      <TextField
        fullWidth
        label="Roll number"
        name="rollNo"
        type="number"
        value={filterOption.rollNo}
        onChange={handleFilterOptionChange}
        size="small"
        sx={{ my: 1 }}
      />

      <TextField
        fullWidth
        label="Joining year/batch"
        name="batch"
        type="number"
        value={filterOption.batch}
        onChange={handleFilterOptionChange}
        size="small"
        sx={{ my: 1 }}
      />

      <TextField
        select
        fullWidth
        value={filterOption.departmentShort}
        onChange={handleFilterOptionChange}
        name="departmentShort"
        label="Department"
        size="small"
        sx={{ my: 1 }}
      >
        <MenuItem value="all">Select All</MenuItem>
        {departments.map((option) => (
          <MenuItem key={option.short} value={option.short}>
            {option.short}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        fullWidth
        value={filterOption.homeDistrict}
        onChange={handleFilterOptionChange}
        name="homeDistrict"
        label="Home district"
        size="small"
        sx={{ my: 1 }}
      >
        <MenuItem value="all">Select All</MenuItem>
        {districts.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        fullWidth
        value={filterOption.presentDistrict}
        onChange={handleFilterOptionChange}
        name="presentDistrict"
        label="Present district"
        size="small"
        sx={{ my: 1 }}
      >
        <MenuItem value="all">Select All</MenuItem>
        {districts.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        fullWidth
        value={filterOption.status}
        onChange={handleFilterOptionChange}
        name="status"
        label="Current status"
        size="small"
        sx={{ my: 1 }}
      >
        <MenuItem value="all">Select All</MenuItem>
        {status.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        label="Job position"
        name="currentJobTitle"
        value={filterOption.currentJobTitle}
        onChange={handleFilterOptionChange}
        size="small"
        sx={{ my: 1 }}
      />

      <TextField
        fullWidth
        label="Current organization"
        name="currentOrganization"
        value={filterOption.currentOrganization}
        onChange={handleFilterOptionChange}
        size="small"
        sx={{ my: 1 }}
      />

      <Box sx={{ mb: 1 }}>
        <Button
          variant="contained"
          onClick={handleFilterSubmit}
          sx={{ mt: 1.8 }}
          fullWidth
        >
          Search
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        maxWidth: '1150px',
        mx: 'auto',
        alignItems: 'flex-start',
      }}
    >
      <Drawer
        anchor="bottom"
        open={openDrawer}
        onClose={() => handleToggleDrawer(false)}
        sx={{ px: 3 }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            mx: 2,
          }}
        >
          <Button
            variant="outlined"
            color="warning"
            startIcon={<CloseIcon fontSize="small" />}
            onClick={() => handleToggleDrawer(false)}
            sx={{ mt: 2 }}
          >
            Cancel
          </Button>
        </Box>

        {filterMenu}
      </Drawer>
      <Paper
        sx={{
          maxWidth: '350px',
          py: 2,
          mt: 6,
          mb: 4,
          borderRadius: 2,
          mr: 6,
          display: { xs: 'none', sm: 'block' },
        }}
        elevation={2}
      >
        {filterMenu}
      </Paper>
      <Box sx={{ maxWidth: '800px' }}>
        {matchesSmDown && (
          <Box sx={{ px: 3, mt: 4 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => handleToggleDrawer(true)}
              sx={{ px: 8, py: 1.5 }}
            >
              Advanced search options
            </Button>
          </Box>
        )}
        <Typography sx={{ fontSize: '1.6rem', my: 2, px: { xs: 3, sm: 0 } }}>
          Search results
        </Typography>
        <Grid
          container
          spacing={3}
          display="flex"
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {searchResult?.length > 0 ? (
            searchResult.map((item) => (
              <Grid item xs={12} sm={4} sx={{ mx: { xs: 3, sm: 0 } }}>
                <AlumniCard data={item} />
              </Grid>
            ))
          ) : (
            <Typography
              sx={{ pt: 6, pl: 3, mb: { xs: 10 } }}
              color="text.secondary"
            >
              {searchMessage}
            </Typography>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default SearchAlumni;
