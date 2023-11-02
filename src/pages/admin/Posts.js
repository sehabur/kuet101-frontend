import React from 'react';
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../../components/shared/Spinner';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { blueGrey, grey } from '@mui/material/colors';
import axios from 'axios';

import { format } from 'date-fns';

const Posts = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [searchResult, setSearchResult] = useState(null);

  const [formInputs, setFormInputs] = useState({
    isActive: '',
  });

  const auth = useSelector((state) => state.auth);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormInputs({
      ...formInputs,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const queryString =
        formInputs.isActive !== 'all' ? `active=${formInputs.isActive}` : '';

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/getPosts?${queryString}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setSearchResult(response.data.posts);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: '720px',
        mx: 'auto',
        px: 2,
        pt: 2,
      }}
    >
      <Spinner open={isLoading} />
      <Box>
        <Box>
          <TextField
            select
            label="Active status"
            name="isActive"
            size="small"
            value={formInputs.isActive}
            onChange={handleChange}
            sx={{ minWidth: 160, mr: 2, mb: 2 }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value={true}>Active</MenuItem>
            <MenuItem value={false}>Inactive</MenuItem>
          </TextField>

          <Button
            variant="contained"
            color="primary"
            sx={{ mb: 2, px: 3 }}
            onClick={handleSubmit}
          >
            Search
          </Button>
        </Box>
      </Box>
      <Box>
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead sx={{ bgcolor: grey[200] }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>User</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Created at</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Active</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchResult?.map((row) => (
                <TableRow key={row._id}>
                  <TableCell
                    component={RouterLink}
                    to={`/admin/post-details/${row._id}`}
                    sx={{ color: 'primary.main' }}
                  >
                    {row.title}
                  </TableCell>
                  <TableCell
                    component={RouterLink}
                    to={`/admin/user-profile?id=${row.user._id}`}
                    sx={{ color: 'primary.main' }}
                  >
                    {row.user.firstName} {row.user.lastName}
                  </TableCell>
                  <TableCell>
                    {format(new Date(row.createdAt), 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell>{row.isActive ? 'Yes' : 'No'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {searchResult?.length < 1 && (
          <Typography sx={{ textAlign: 'center', my: 8 }}>
            No result found
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Posts;
