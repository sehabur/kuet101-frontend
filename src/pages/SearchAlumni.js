import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Grid,
  Paper,
  TextField,
  Typography,
  MenuItem,
  Button,
  Box,
  Drawer,
  useTheme,
  useMediaQuery,
  Autocomplete,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import {
  bloodGroupList,
  departments,
  districts,
  status,
  interests,
} from '../data/mappingFile';
import AlumniCard from '../components/shared/AlumniCard';
import Spinner from '../components/shared/Spinner';
import { grey } from '@mui/material/colors';

const SearchAlumni = () => {
  const theme = useTheme();

  const matchesSmDown = useMediaQuery(theme.breakpoints.down('sm'));

  const [isLoading, setIsLoading] = useState(false);

  const [searchResult, setSearchResult] = useState(null);

  const [searchMessage, setSearchMessage] = useState(
    'Search alumni using filters'
  );

  const [interestsList, setInterestsList] = useState([]);

  const [openDrawer, setOpenDrawer] = useState(matchesSmDown ? true : false);

  const [filterOption, setFilterOption] = useState({
    name: '',
    rollNo: '',
    batch: '',
    departmentShort: '',
    homeDistrict: '',
    presentDistrict: '',
    gender: '',
    bloodGroup: '',
    status: '',
    currentJobTitle: '',
    currentOrganization: '',
    interests: '',
    expertin: '',
  });

  const auth = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleToggleDrawer = (state) => {
    setOpenDrawer(state);
  };

  const handleFilterOptionChange = (event) => {
    console.log(event.target.value);
    setFilterOption({
      ...filterOption,
      [event.target.name]: event.target.value,
    });
  };

  const handleAutoCompleteChange = (event, targetName) => {
    console.log(event.target.textContent);
    setFilterOption({
      ...filterOption,
      [targetName]: event.target.textContent,
    });
  };

  console.log(filterOption);

  const handleFilterSubmit = async () => {
    let queryText = 'search=1';
    for (let key in filterOption) {
      if (filterOption[key] !== 'all' && filterOption[key] !== '') {
        if (key === 'bloodGroup') {
          queryText += '&' + key + '=' + filterOption[key].replace('+', '%2B');
        } else {
          queryText += '&' + key + '=' + filterOption[key];
        }
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getInerests = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/users/getAllInterests`
    );
    const data = [...new Set(res.data.concat(interests))];
    setInterestsList(data);
  };

  useEffect(() => {
    getInerests();
  }, []);

  const filterMenu = (
    <Box sx={{ px: { xs: 6, sm: 3 }, pb: { xs: 2, sm: 0 } }}>
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
        value={filterOption.rollNo}
        onChange={handleFilterOptionChange}
        size="small"
        sx={{ my: 1 }}
      />

      <TextField
        fullWidth
        label="batch"
        name="batch"
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
        <MenuItem value="all">Select any</MenuItem>
        {departments.map((option) => (
          <MenuItem key={option.short} value={option.short}>
            {option.short}
          </MenuItem>
        ))}
      </TextField>

      <Autocomplete
        freeSolo
        options={districts}
        onChange={(e) => {
          handleAutoCompleteChange(e, 'homeDistrict');
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Home district"
            name="homeDistrict"
            value={filterOption.homeDistrict}
            size="small"
            sx={{ my: 1 }}
            onChange={handleFilterOptionChange}
          />
        )}
      />

      <Autocomplete
        freeSolo
        options={districts}
        onChange={(e) => {
          handleAutoCompleteChange(e, 'presentDistrict');
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Present location"
            name="presentDistrict"
            value={filterOption.presentDistrict}
            size="small"
            sx={{ my: 1 }}
            onChange={handleFilterOptionChange}
          />
        )}
      />

      <TextField
        select
        label="Gender"
        name="gender"
        fullWidth
        value={filterOption.gender}
        onChange={handleFilterOptionChange}
        size="small"
        sx={{ my: 1 }}
      >
        <MenuItem value="all">Select any</MenuItem>
        <MenuItem key="female" value="female">
          Female
        </MenuItem>
        <MenuItem key="male" value="male">
          Male
        </MenuItem>
        <MenuItem key="other" value="other">
          Other
        </MenuItem>
      </TextField>

      <TextField
        select
        label="Blood Group"
        name="bloodGroup"
        fullWidth
        value={filterOption.bloodGroup}
        onChange={handleFilterOptionChange}
        size="small"
        sx={{ my: 1 }}
      >
        <MenuItem value="all">Select any</MenuItem>
        {bloodGroupList.map((group) => (
          <MenuItem key={group} value={group}>
            {group}
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
        <MenuItem value="all">Select any</MenuItem>
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

      <Autocomplete
        freeSolo
        options={interestsList}
        onChange={(e) => {
          handleAutoCompleteChange(e, 'interests');
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Interested in"
            name="interests"
            value={filterOption.interests}
            size="small"
            sx={{ my: 1 }}
            onChange={handleFilterOptionChange}
          />
        )}
      />
      <Autocomplete
        freeSolo
        options={interestsList}
        onChange={(e) => {
          handleAutoCompleteChange(e, 'expertin');
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Expert zone"
            name="expertin"
            value={filterOption.expertin}
            size="small"
            sx={{ my: 1 }}
            onChange={handleFilterOptionChange}
          />
        )}
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

  useEffect(() => {
    if (!auth?.isLoggedIn) {
      navigate('/signin');
    }
  }, [navigate, auth]);

  return (
    <>
      <Spinner open={isLoading} />
      <Drawer
        anchor="bottom"
        open={openDrawer}
        onClose={() => handleToggleDrawer(false)}
        sx={{ px: 3 }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mt: 1,
            mr: 2,
          }}
        >
          <IconButton onClick={() => handleToggleDrawer(false)}>
            <CloseIcon color="warning" />
          </IconButton>
        </Box>
        {filterMenu}
      </Drawer>

      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{
          maxWidth: '1175px',
          mx: 'auto',
        }}
      >
        <Grid item xs={12} sm={3.5}>
          <Paper
            sx={{
              maxWidth: '300px',
              py: 2,
              mt: 6,
              mb: 4,
              display: { xs: 'none', sm: 'block' },
            }}
            elevation={0}
            variant="outlined"
          >
            {filterMenu}
          </Paper>
        </Grid>

        <Grid item xs={12} sm={8.5}>
          <Box sx={{ maxWidth: '800px' }}>
            {matchesSmDown && (
              <Box sx={{ px: 4, mt: 4 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => handleToggleDrawer(true)}
                  sx={{ px: 8, py: 1.5 }}
                >
                  Advanced search options
                </Button>
              </Box>
            )}
            <Typography
              sx={{ fontSize: '1.6rem', mt: 5, mb: 2, px: { xs: 3, sm: 0 } }}
            >
              Search result {searchResult && `(${searchResult.length} matches)`}
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Grid
                container
                spacing={3}
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
              >
                {searchResult?.length > 0 ? (
                  searchResult.map((user) => (
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      sx={{ mx: { xs: 4, sm: 0 }, mb: { xs: 0, sm: 1 } }}
                    >
                      <AlumniCard data={user} />
                    </Grid>
                  ))
                ) : (
                  <Typography
                    sx={{ pt: 6, pl: 3, mb: { xs: 10 }, mx: { xs: 3, sm: 0 } }}
                    color="text.secondary"
                  >
                    {searchMessage}
                  </Typography>
                )}
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default SearchAlumni;
