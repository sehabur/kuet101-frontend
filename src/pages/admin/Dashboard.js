import React, { useState, useEffect } from 'react';
import {
  Link as RouterLink,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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

import Spinner from '../../components/shared/Spinner';
import { grey } from '@mui/material/colors';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);

  const auth = useSelector((state) => state.auth);

  const [data, setData] = useState(null);

  const getDashboardData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/getDashboardData`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setData(response.data.users[0]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.isLoggedIn) getDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <Box
      sx={{
        maxWidth: '980px',
        mx: 'auto',
        px: 2,
        pt: 2,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <Spinner open={isLoading} />
      <Paper
        elevation={8}
        sx={{ width: 200, m: 4, p: 3, fontSize: '2rem', borderRadius: 2 }}
      >
        <Typography variant="h6" sx={{ mb: 1, color: 'primary.dark' }}>
          Users
        </Typography>

        <Box>
          <Typography variant="body1">
            Total users: {data?.total[0].count}
          </Typography>
        </Box>

        {data?.activeStatus?.map((item) => (
          <Box>
            <Typography variant="body1">
              {item._id === true ? 'Active: ' : 'Inactive: '} {item.count}
            </Typography>
          </Box>
        ))}
        {data?.approvalStatus?.map((item) => (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Approval Status
            </Typography>
            <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
              {item._id}: {item.count}
            </Typography>
          </Box>
        ))}
      </Paper>
      <Paper
        elevation={8}
        sx={{ width: 200, m: 4, p: 3, fontSize: '2rem', borderRadius: 2 }}
      >
        <Typography variant="h6" sx={{ mb: 1, color: 'primary.dark' }}>
          By Department
        </Typography>
        {data?.department?.map((item) => (
          <Box>
            <Typography variant="body1">
              {item._id} {' : '} {item.count}
            </Typography>
          </Box>
        ))}
      </Paper>

      <Paper
        elevation={8}
        sx={{ width: 200, m: 4, p: 3, fontSize: '2rem', borderRadius: 2 }}
      >
        <Typography variant="h6" sx={{ mb: 1, color: 'primary.dark' }}>
          By Batch
        </Typography>
        {data?.batch?.map((item) => (
          <Box>
            <Typography variant="body1">
              {item._id} {' : '} {item.count}
            </Typography>
          </Box>
        ))}
      </Paper>
    </Box>
  );
};

export default Dashboard;
