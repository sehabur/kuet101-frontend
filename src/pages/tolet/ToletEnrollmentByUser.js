/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Alert, Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import Spinner from "../../components/shared/Spinner";
import { Link as RouterLink, useParams } from "react-router-dom";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import ConfirmationDialog from "../../components/shared/ConfirmationDialog";
import ToletCard from "../../components/shared/ToletCard";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const ToletEnrollmentByUser = () => {
  const { id: userId } = useParams();

  const [toletEnrollment, setToletEnrollment] = useState(null);

  const [deleteTutorId, setDeleteTutorId] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth?.isLoggedIn) getToletEnrollment();
  }, [auth]);

  const getToletEnrollment = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/getToletEnrollmentByUser/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth && auth.token}`,
          },
        }
      );
      setToletEnrollment(response.data.tolets);
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
    if (action === "confirm") {
      try {
        setIsLoading(true);
        const response = await axios.delete(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/deleteToletEnrollment/${deleteTutorId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth && auth.token}`,
            },
          }
        );
        if (response.status === 200) {
          setSuccessMessage("Deletion successful");
          setErrorMessage("");
        } else {
          setSuccessMessage("");
          setErrorMessage("Deletion failed");
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setSuccessMessage("");
        setErrorMessage("Deletion failed");
      }
    }
    setDialogOpen(false);
  };

  return (
    <Box sx={{ maxWidth: "1400px", mx: "auto", py: 4, px: 2, mb: 4 }}>
      <Spinner open={isLoading} />
      <ConfirmationDialog
        dialogOpen={dialogOpen}
        dialogOnClose={handleDialogOnClose}
        dialogTitle="Delete Tolet Enrollment"
        dialogText="Do you really want to delete this enrollment?"
      />
      <Box
        sx={{
          mb: 4,
          px: 2,
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4, px: 2 }}>
          <Typography variant="h4" sx={{ fontSize: "2rem", mb: 2 }}>
            Tolet Enrollments
          </Typography>
          <Button
            variant="text"
            color="primary"
            component={RouterLink}
            to="/tutor/enroll"
            startIcon={<AddCircleIcon />}
          >
            Enroll a house rental
          </Button>
        </Box>
      </Box>

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "stretch",
        }}
      >
        {toletEnrollment &&
          toletEnrollment.map((item) => (
            <Box sx={{ m: 2 }}>
              <ToletCard key={item._id} data={item} />
              <Button
                size="small"
                color="error"
                variant="text"
                sx={{ ml: 0.8 }}
                startIcon={<DeleteOutlineIcon />}
                onClick={() => handleDelete(item._id)}
              >
                Delete enrollment
              </Button>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default ToletEnrollmentByUser;
