/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Alert, Box, Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Spinner from '../../components/shared/Spinner';
import { Link as RouterLink, useParams } from 'react-router-dom';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import ConfirmationDialog from '../../components/shared/ConfirmationDialog';
import TutorCard from '../../components/shared/TutorCard';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const TutionEnrollmentByUser = () => {
  const { id: userId } = useParams();

  const [tutionEnrollment, setTutionEnrollment] = useState(null);

  const [deleteTutorId, setDeleteTutorId] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [successMessage, setSuccessMessage] = useState('');

  const [dialogOpen, setDialogOpen] = useState(false);

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth?.isLoggedIn) getTutionEnrollment();
  }, [auth]);

  const getTutionEnrollment = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/getTutionEnrollmentByUser/${userId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth && auth.token}`,
          },
        }
      );
      setTutionEnrollment(response.data.tutors);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleDelete = async (tutorId) => {
    setDialogOpen(true);
    setDeleteTutorId(tutorId);
  };

  const handleDialogOnClose = async (e, action) => {
    if (action === 'confirm') {
      try {
        setIsLoading(true);
        const response = await axios.delete(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/deleteTutionEnrollment/${deleteTutorId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${auth && auth.token}`,
            },
          }
        );
        if (response.status === 200) {
          setSuccessMessage('Deletion successful');
          setErrorMessage('');
        } else {
          setSuccessMessage('');
          setErrorMessage('Deletion failed');
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setSuccessMessage('');
        setErrorMessage('Deletion failed');
      }
    }
    setDialogOpen(false);
  };

  return (
    <Box sx={{ maxWidth: '1400px', mx: 'auto', py: 4, px: 2, mb: 4 }}>
      <Spinner open={isLoading} />
      <ConfirmationDialog
        dialogOpen={dialogOpen}
        dialogOnClose={handleDialogOnClose}
        dialogTitle="Delete Tution Enrollment"
        dialogText="Do you really want to delete this enrollment?"
      />
      <Box
        sx={{
          mb: 4,
          px: 2,
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4, px: 2 }}>
          <Typography variant="h4" sx={{ fontSize: '2rem', mb: 2 }}>
            Tution Enrollments
          </Typography>
          <Button
            variant="text"
            color="primary"
            component={RouterLink}
            to="/tutor/enroll"
            startIcon={<AddCircleIcon />}
          >
            Enroll to be a tutor
          </Button>
        </Box>
      </Box>

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {tutionEnrollment &&
          tutionEnrollment.map((tutor) => (
            <Box>
              <TutorCard key={tutor._id} data={tutor} />
              <Button
                size="small"
                color="error"
                variant="text"
                sx={{ ml: 0.8 }}
                startIcon={<DeleteOutlineIcon />}
                onClick={() => handleDelete(tutor._id)}
              >
                Delete enrollment
              </Button>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default TutionEnrollmentByUser;
