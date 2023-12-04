import React, { useState, useEffect } from 'react';
import {
  Link as RouterLink,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
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

import Spinner from '../../components/shared/Spinner';
import { grey } from '@mui/material/colors';

const UserDetails = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  const [userDetails, setUserDetails] = useState(null);

  const [inputRollNumber, setInputRollNumber] = useState(null);

  let [searchParams] = useSearchParams();

  const id = searchParams.get('id');

  const [formInputs, setFormInputs] = useState({
    isActive: false,
    approvalStatus: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const [successMessage, setSuccessMessage] = useState('');

  const [userNotFound, setUserNotFound] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormInputs({
      ...formInputs,
      [name]: value,
    });
  };

  const handleRollNumberChange = (event) => {
    if (event.target.name === 'rollNo') setInputRollNumber(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const response = await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/updateUserStatus`,
        {
          userId: userDetails._id,
          isActive: formInputs.isActive,
          approvalStatus: formInputs.approvalStatus,
          userEmail: userDetails.email,
          userName: `${userDetails.firstName} ${userDetails.lastName}`,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      if (response.status === 201) {
        setErrorMessage('');
        setSuccessMessage('User status update successful.');
      } else {
        setErrorMessage('User status update failed.');
        setSuccessMessage('');
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setErrorMessage('User status update failed.');
      setSuccessMessage('');
    }
  };

  const handleSearchUserByRollSubmit = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/getUserByRollNo/${inputRollNumber}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      if (response.status === 200) {
        setUserNotFound(false);
        setUserDetails(response.data.user);
      } else {
        setUserDetails(null);
        setUserNotFound(true);
      }

      setIsLoading(false);
    } catch (error) {
      setUserDetails(null);
      setUserNotFound(true);
      setIsLoading(false);
      console.log(error);
    }
  };

  const getUserDetails = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/getUserById/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setUserDetails(response.data.user);
      setFormInputs({
        isActive: response.data.user.isActive ? true : false,
        approvalStatus: response.data.user.approvalStatus,
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) getUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const formatUserData = () => {
    let tableData = [];
    for (let key in userDetails) {
      let displayValue;
      if (userDetails[key] === true) {
        displayValue = 'Yes';
      } else if (userDetails[key] === false) {
        displayValue = 'No';
      } else if (key === 'createdAt' || key === 'updatedAt') {
        displayValue = format(new Date(userDetails[key]), 'dd/MM/yyyy');
      } else if (key === 'profilePicture') {
        displayValue = (
          <img
            src={`${process.env.REACT_APP_CLOUD_IMAGE_URL}/${userDetails.profilePicture}`}
            alt="Not uploaded"
            width="130"
            height="130"
          />
        );
      } else {
        displayValue = userDetails[key];
      }
      tableData.push(
        <TableRow>
          <TableCell sx={{ fontWeight: 'bold' }}>{key}</TableCell>
          <TableCell>{displayValue}</TableCell>
        </TableRow>
      );
    }
    return tableData;
  };

  return (
    <Box
      sx={{
        maxWidth: '700px',
        mx: 'auto',
        px: 2,
        pt: 2,
      }}
    >
      <Spinner open={isLoading} />
      <Typography variant="h5" sx={{ textAlign: 'center' }}>
        User Data
      </Typography>

      {!id && (
        <Box sx={{ mt: 4 }}>
          <TextField
            label="Roll Number"
            name="rollNo"
            size="small"
            value={inputRollNumber}
            onChange={handleRollNumberChange}
            sx={{ minWidth: 160, mr: 2, mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mb: 2, px: 3 }}
            onClick={handleSearchUserByRollSubmit}
          >
            Search
          </Button>
        </Box>
      )}

      {userDetails && (
        <>
          <TableContainer component={Paper} elevation={0} sx={{ my: 2 }}>
            <Table>
              <TableHead sx={{ bgcolor: grey[200] }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Property</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Information</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{formatUserData()}</TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ mt: 4 }}>
            <TextField
              select
              label="Active status"
              name="isActive"
              size="small"
              value={formInputs.isActive}
              onChange={handleChange}
              sx={{ minWidth: 160, mr: 2, mb: 2 }}
            >
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
              Update
            </Button>

            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            {successMessage && (
              <Alert severity="success">{successMessage}</Alert>
            )}
          </Box>
        </>
      )}

      {userNotFound && (
        <Box>
          <Typography sx={{ m: 4 }}>User not found</Typography>
        </Box>
      )}
    </Box>
  );
};

export default UserDetails;
