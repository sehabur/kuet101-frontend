/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/shared/Spinner';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { bloodGroupList, districts } from '../data/mappingFile';
import { grey } from '@mui/material/colors';
import AlumniCard from '../components/shared/AlumniCard';
import axios from 'axios';
import { searchActions } from '../store';

const Blood = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [searchResult, setSearchResult] = useState(null);

  const [searchMessage, setSearchMessage] = useState(
    'Search alumni using filters'
  );

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const filter = useSelector((state) => state.search?.blood);

  const [formInputs, setFormInputs] = useState({
    presentDistrict: filter?.presentDistrict || '',
    bloodGroup: filter?.bloodGroup || '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormInputs({
      ...formInputs,
      [name]: value,
    });
  };

  const handleBloodFilterSubmit = async () => {
    getSearchedItems();
  };

  const getSearchedItems = async () => {
    try {
      setIsLoading(true);

      let queryText = 'search=1';

      for (let key in formInputs) {
        if (formInputs[key] !== 'all' && formInputs[key] !== '') {
          if (key === 'bloodGroup') {
            queryText += '&' + key + '=' + formInputs[key].replace('+', '%2B');
          } else {
            queryText += '&' + key + '=' + formInputs[key];
          }
        }
      }
      dispatch(searchActions.setBloodFilter(formInputs));

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
          'No alumni found matching your search. Try a different search.'
        );
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getSearchedItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  //   useEffect(() => {
  //     if (!auth?.isLoggedIn) {
  //       navigate('/signin');
  //     }
  //   }, [auth]);

  return (
    <Box>
      <Spinner open={isLoading} />
      <Box sx={{ py: 2, bgcolor: 'secondary.main' }}>
        <Box sx={{ maxWidth: '980px', mx: 'auto', px: 2 }}>
          <Typography
            variant="h4"
            sx={{ fontSize: '1.7rem', color: grey[300] }}
          >
            Search Blood
          </Typography>
        </Box>
      </Box>
      <Box sx={{ bgcolor: grey[100] }}>
        <Box
          sx={{
            maxWidth: '980px',
            mx: 'auto',
            px: 2,
            pt: 2,
          }}
        >
          <TextField
            select
            label="Blood group"
            name="bloodGroup"
            size="small"
            value={formInputs.bloodGroup}
            onChange={handleChange}
            sx={{ minWidth: 150, mr: 2, mb: 2 }}
          >
            {bloodGroupList.map((group) => (
              <MenuItem key={group} value={group}>
                {group}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Present district"
            name="presentDistrict"
            size="small"
            value={formInputs.presentDistrict}
            onChange={handleChange}
            sx={{ minWidth: 175, mr: 2, mb: 2 }}
          >
            <MenuItem value="all">Select All</MenuItem>
            {districts.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mb: 2, px: 3 }}
            onClick={handleBloodFilterSubmit}
          >
            Search
          </Button>
        </Box>
      </Box>

      <Box
        sx={{ my: 4, maxWidth: '980px', minHeight: '50vh', mx: 'auto', px: 2 }}
      >
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          {searchResult?.length > 0 ? (
            searchResult.map((user) => (
              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  mx: { xs: 4, sm: 0 },
                  mb: { xs: 0, sm: 1 },
                }}
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
  );
};

export default Blood;
