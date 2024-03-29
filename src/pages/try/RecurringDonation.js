import React from "react";

import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Alert,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";

import HorizontalRuleRoundedIcon from "@mui/icons-material/HorizontalRuleRounded";

import Spinner from "../../components/shared/Spinner";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import InfoDialog from "../../components/shared/InfoDialog";

const RecurringDonation = () => {
  const auth = useSelector((state) => state.auth);

  const formDefaultState = {
    type: "",
    amount: "",
    description: "",
  };

  const [isLoading, setIsLoading] = useState(false);

  const [formInputs, setFormInputs] = useState(formDefaultState);

  const [errorMessage, setErrorMessage] = useState("");

  const [success, setSuccess] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [dialogContent, setDialogContent] = useState();

  const handleDialogOnClose = () => {
    setDialogOpen(false);
  };

  const handleChange = (event) => {
    setFormInputs({
      ...formInputs,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/try/recurringDonation`,
        formInputs,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      if (response.status === 201) {
        setSuccess(true);
        setErrorMessage("");
        setIsLoading(false);

        setDialogContent(
          <Box sx={{ my: 2 }}>
            <Typography sx={{ fontSize: "1.2rem", mb: 2 }}>
              Thanks for your interest!
            </Typography>
            <Typography>
              One of our team member of TRY will reach out to you soon.
            </Typography>
          </Box>
        );
        setDialogOpen(true);
      }
    } catch (error) {
      setSuccess(false);

      setDialogContent(
        <Box sx={{ my: 2 }}>
          <Typography sx={{ fontSize: "1.2rem", color: "error.main" }}>
            Submission failed. Please try later.
          </Typography>
        </Box>
      );
      setDialogOpen(true);

      if (error.response) {
        let composeMsg;
        if (error.response.data.message) {
          composeMsg = error.response.data.message;
        } else if (error.response.data.errors) {
          composeMsg = error.response.data.errors[0].msg;
        }
        setErrorMessage(`Post creation failed. ${composeMsg}`);
      }
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <Spinner open={isLoading} />
      <InfoDialog
        dialogOpen={dialogOpen}
        dialogOnClose={handleDialogOnClose}
        dialogTitle="Recurring contribution"
      >
        {dialogContent}
      </InfoDialog>
      <Card
        sx={{
          width: { xs: "90vw", sm: 550 },
          py: 2,
          px: { xs: 2, sm: 5 },
          mx: { sm: 2 },
          mb: { xs: 2, sm: 0 },
          borderRadius: 0,
        }}
        elevation={0}
      >
        <CardContent>
          <HorizontalRuleRoundedIcon
            sx={{ fontSize: "3rem", ml: -1 }}
            color="success"
          />
          <Typography variant="h5" sx={{ mb: 3 }} color="success.main">
            Subscripe for a recurring donation plan and support hundred of
            families
          </Typography>

          <Box>
            <Typography
              sx={{
                textAlign: "left",
                ml: 0.5,
                my: 1,
              }}
            >
              Type
            </Typography>
            <TextField
              select
              size="small"
              name="type"
              fullWidth
              required
              value={formInputs.type}
              onChange={handleChange}
            >
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="three_month">Every 3 months</MenuItem>
              <MenuItem value="six_month">Every 6 months</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </TextField>
          </Box>
          <Box>
            <Typography
              sx={{
                textAlign: "left",
                ml: 0.5,
                my: 1,
              }}
            >
              Amount
            </Typography>
            <TextField
              name="amount"
              size="small"
              fullWidth
              required
              value={formInputs.amount}
              onChange={handleChange}
            />
          </Box>

          <Box>
            <Typography
              sx={{
                textAlign: "left",
                ml: 0.5,
                my: 1,
              }}
            >
              Description (optional)
            </Typography>
            <TextField
              multiline
              name="description"
              minRows={3}
              maxRows={24}
              fullWidth
              value={formInputs.description}
              onChange={handleChange}
              sx={{ width: "100%" }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              type="submit"
              sx={{ my: 2, px: 4, py: 1, borderRadius: 8, fontSize: "1.1rem" }}
              onClick={handleSubmit}
              color="success"
            >
              Submit
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default RecurringDonation;
