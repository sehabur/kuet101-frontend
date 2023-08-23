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

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [searchResult, setSearchResult] = useState(null);

  const [formInputs, setFormInputs] = useState({
    isActive: '',
    approvalStatus: '',
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
        `${
          formInputs.isActive !== 'all' ? `active=${formInputs.isActive}&` : ''
        }` +
        `${
          formInputs.approvalStatus !== 'all'
            ? `approval=${formInputs.approvalStatus}`
            : ''
        }`;

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/getUsers?${queryString}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setSearchResult(response.data.users);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: '980px',
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

          <TextField
            select
            label="Approval status"
            name="approvalStatus"
            size="small"
            value={formInputs.approvalStatus}
            onChange={handleChange}
            sx={{ minWidth: 170, mr: 2, mb: 2 }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
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
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Roll no</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Active</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Approval</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchResult?.map((row) => (
                <TableRow key={row.firstName}>
                  <TableCell
                    component={RouterLink}
                    to={`/admin/user-profile?id=${row._id}`}
                    sx={{ color: 'primary.main' }}
                  >
                    {row.firstName} {row.lastName}
                  </TableCell>
                  <TableCell>{row.rollNo}</TableCell>
                  <TableCell>{row.isActive ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{row.approvalStatus}</TableCell>
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

export default Users;
