import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Spinner from "../../components/shared/Spinner";
import ToletCard from "../../components/shared/ToletCard";
import { grey } from "@mui/material/colors";
import { districts } from "../../data/mappingFile";
import { searchActions } from "../../store";

const FindTolet = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const filter = useSelector((state) => state.search?.tolet);

  const [findToletData, setFindToletData] = useState(null);

  const [toletFilter, setToletFilter] = useState({
    presentDistrict: filter?.presentDistrict || "all",
    type: filter?.type || "all",
  });

  console.log(toletFilter);

  const handleChange = (event) => {
    setToletFilter({
      ...toletFilter,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    getToletData();
  };

  const getToletData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/findTolet?district=${toletFilter.presentDistrict}&type=${toletFilter.type}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setFindToletData(response.data.tolets);
      dispatch(searchActions.setTutionFilter(toletFilter));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getToletData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  // useEffect(() => {
  //   if (!auth?.isLoggedIn) {
  //     navigate("/signin");
  //   }
  // }, [navigate, auth]);

  return (
    <>
      <Spinner open={isLoading} />
      <Box sx={{ bgcolor: grey[100] }}>
        <Box
          sx={{
            maxWidth: "980px",
            mx: "auto",
            px: 2,
            pt: 2,
          }}
        >
          <TextField
            select
            label="District"
            name="presentDistrict"
            size="small"
            value={toletFilter?.presentDistrict}
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

          <TextField
            select
            label="Type"
            name="type"
            size="small"
            value={toletFilter?.type}
            onChange={handleChange}
            sx={{ minWidth: 175, mr: 2, mb: 2 }}
          >
            <MenuItem value="all">Select All</MenuItem>
            <MenuItem value="bachelor">Bachelor</MenuItem>
            <MenuItem value="family">Family</MenuItem>
          </TextField>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mb: 2, px: 3 }}
            onClick={handleSubmit}
          >
            Search
          </Button>
        </Box>
      </Box>
      <Box sx={{ my: 0 }}>
        <Box
          sx={{ maxWidth: "1080px", mx: "auto", py: 4, textAlign: "center" }}
        >
          <Typography
            variant="h5"
            sx={{ fontFamily: "Proza Libre, sans-serif", mb: 4, px: 2 }}
            color="secondary.main"
          >
            Find a tolet
          </Typography>
          <Typography
            sx={{ fontFamily: "Proza Libre, sans-serif", mb: 4, px: 2 }}
          >
            Are you looking for an available house rental for family or
            bachelor? Explore available house rental below, find the one that
            maches your requirements and make contact.
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "stretch",
            }}
          >
            {findToletData?.length > 0 ? (
              findToletData.map((item) => (
                <Box sx={{ m: 2 }}>
                  <ToletCard data={item} />
                </Box>
              ))
            ) : (
              <Box>
                <Typography sx={{ fontSize: "1.5rem", my: 8 }}>
                  No rental available
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default FindTolet;
