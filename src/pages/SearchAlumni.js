import React, { useState, useEffect } from "react";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";

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
  Stack,
  InputAdornment,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import {
  bloodGroupList,
  departments,
  districts,
  status,
  interests,
  batchList,
  countryStates,
  countries,
} from "../data/mappingFile";
import AlumniCard from "../components/shared/AlumniCard";
import Spinner from "../components/shared/Spinner";
import { grey } from "@mui/material/colors";
import { searchActions } from "../store";

import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

import HelpIcon from "@mui/icons-material/Help";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 350,
    fontSize: 14,
    padding: "12px",
  },
}));

const SearchAlumni = () => {
  const theme = useTheme();

  const dispatch = useDispatch();

  let [searchParams, setSearchParams] = useSearchParams();

  const companySearchText = searchParams.get("company");

  const matchesSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const [isLoading, setIsLoading] = useState(false);

  const [searchResult, setSearchResult] = useState(null);

  const [searchMessage, setSearchMessage] = useState(
    "Search alumni using filters"
  );

  const [interestsList, setInterestsList] = useState([]);

  const [openDrawer, setOpenDrawer] = useState(matchesSmDown ? true : false);

  const searchFilter = useSelector((state) => state.search?.search);

  let currOrg = "";
  if (companySearchText) {
    currOrg = companySearchText;
  } else if (searchFilter?.currentOrganization) {
    currOrg = searchFilter.currentOrganization;
  } else {
    currOrg = "";
  }

  const [filterOption, setFilterOption] = useState({
    name: searchFilter?.name || "",
    rollNo: searchFilter?.rollNo || "",
    batch: searchFilter?.batch || "",
    departmentShort: searchFilter?.departmentShort || "",
    homeDistrict: searchFilter?.homeDistrict || "",
    presentDistrict: searchFilter?.presentDistrict || "",
    country: searchFilter?.country || "",
    gender: searchFilter?.gender || "",
    bloodGroup: searchFilter?.bloodGroup || "",
    status: searchFilter?.status || "",
    currentJobTitle: searchFilter?.currentJobTitle || "",
    currentOrganization: currOrg,
    interests: searchFilter?.interests || "",
    expertin: searchFilter?.expertin || "",
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

  const handleAutoCompleteChange = (name, value) => {
    setFilterOption({
      ...filterOption,
      [name]: value,
    });
  };

  const handleFilterSubmit = async (type) => {
    let queryText = "search=1";
    for (let key in filterOption) {
      if (filterOption[key] !== "all" && filterOption[key] !== "") {
        if (key === "bloodGroup") {
          queryText += "&" + key + "=" + filterOption[key].replace("+", "%2B");
        } else {
          queryText += "&" + key + "=" + filterOption[key];
        }
      }
    }
    getSearchedItems(queryText);
    if (type === "button") {
      dispatch(searchActions.setSearchFilter(filterOption));
      setSearchParams({});
    }
  };

  const handleResetSearchFilter = () => {
    dispatch(searchActions.reset());
    setFilterOption({
      name: "",
      rollNo: "",
      batch: "",
      departmentShort: "",
      homeDistrict: "",
      presentDistrict: "",
      gender: "",
      bloodGroup: "",
      status: "",
      currentJobTitle: "",
      currentOrganization: "",
      interests: "",
      expertin: "",
    });
  };

  const getSearchedItems = async (queryText = "search=1") => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/getUsersByQuery?${queryText}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setSearchResult(response.data.users);
      if (response.data.users.length < 1) {
        setSearchMessage(
          "No alumni found maching your search. Try again with different option."
        );
      }
      handleToggleDrawer(false);
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
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
    handleFilterSubmit("initial");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterMenu = (
    <Box sx={{ px: { xs: 6, sm: 3 }, pb: { xs: 2, sm: 0 } }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 1 }}
      >
        <Typography>Search options</Typography>
        <Button
          size="small"
          onClick={handleResetSearchFilter}
          sx={{ textDecoration: "underline", fontSize: ".95rem" }}
        >
          Reset filters
        </Button>
      </Stack>

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
        select
        fullWidth
        label="batch"
        name="batch"
        value={filterOption.batch}
        onChange={handleFilterOptionChange}
        size="small"
        sx={{ my: 1 }}
      >
        {batchList.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

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
        options={countries}
        onChange={(event, value, reason) => {
          handleAutoCompleteChange("country", value);
        }}
        value={filterOption.country}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Present country"
            name="country"
            size="small"
            sx={{ my: 1 }}
          />
        )}
      />

      <Autocomplete
        options={districts}
        onChange={(event, value, reason) => {
          handleAutoCompleteChange("homeDistrict", value);
        }}
        value={filterOption.homeDistrict}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Home district"
            name="homeDistrict"
            size="small"
            sx={{ my: 1 }}
          />
        )}
      />

      <Box sx={{ display: "flex" }}>
        <Autocomplete
          fullWidth
          options={districts.concat(countryStates)}
          freeSolo
          autoSelect
          onChange={(event, value, reason) => {
            handleAutoCompleteChange("presentDistrict", value);
          }}
          value={filterOption.presentDistrict}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Present location"
              name="presentDistrict"
              size="small"
              sx={{ my: 1 }}
            />
          )}
        />
        <CustomTooltip
          title="Input district name to search an alumni inside BD. For searching alumni outside of BD input state or country name"
          placement="top"
          enterTouchDelay={10}
          leaveTouchDelay={8000}
        >
          <IconButton
            edge="end"
            sx={{ ":hover": { bgcolor: "transparent", color: "primary.main" } }}
          >
            <HelpIcon sx={{ fontSize: "1.2rem" }} />
          </IconButton>
        </CustomTooltip>
      </Box>

      {auth?.gender === "female" && (
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
      )}

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

      <Box sx={{ display: "flex" }}>
        <TextField
          fullWidth
          label="Current organization"
          name="currentOrganization"
          value={filterOption.currentOrganization}
          onChange={handleFilterOptionChange}
          size="small"
          sx={{ my: 1 }}
          // InputProps={{
          //   endAdornment: (
          //     <InputAdornment>
          //       <Tooltip
          //         title="/ onClick={handleClickShowPassword}
          //         // onMouseDown={handleMouseDownPassword}"
          //         placement="top"
          //         enterTouchDelay={10}
          //         leaveTouchDelay={8000}
          //       >
          //         <IconButton color="warning">
          //           <HelpIcon sx={{ fontSize: '1.2rem' }} />
          //         </IconButton>
          //       </Tooltip>
          //     </InputAdornment>
          //   ),
          // }}
        />
        <CustomTooltip
          title="Input company, university or any organization name you are currently working or studying"
          placement="top"
          enterTouchDelay={10}
          leaveTouchDelay={8000}
        >
          <IconButton
            edge="end"
            sx={{ ":hover": { bgcolor: "transparent", color: "primary.main" } }}
          >
            <HelpIcon sx={{ fontSize: "1.2rem" }} />
          </IconButton>
        </CustomTooltip>
      </Box>

      <Autocomplete
        freeSolo
        options={interestsList}
        onChange={(event, value, reason) => {
          handleAutoCompleteChange("interests", value);
        }}
        value={filterOption.interests}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Interested in"
            name="interests"
            size="small"
            sx={{ my: 1 }}
          />
        )}
      />
      <Autocomplete
        freeSolo
        options={interestsList}
        onChange={(event, value, reason) => {
          handleAutoCompleteChange("expertin", value);
        }}
        value={filterOption.expertin}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Expert zone"
            name="expertin"
            size="small"
            sx={{ my: 1 }}
          />
        )}
      />

      <Box sx={{ mb: 1 }}>
        <Button
          variant="contained"
          onClick={() => handleFilterSubmit("button")}
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
      navigate("/signin");
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
            display: "flex",
            justifyContent: "flex-end",
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
          maxWidth: "1175px",
          mx: "auto",
        }}
      >
        <Grid item xs={12} sm={3.5}>
          <Paper
            sx={{
              maxWidth: "300px",
              py: 2,
              mt: 6,
              mb: 4,
              display: { xs: "none", sm: "block" },
            }}
            elevation={0}
            variant="outlined"
          >
            {filterMenu}
          </Paper>
        </Grid>

        <Grid item xs={12} sm={8.5}>
          <Box sx={{ maxWidth: "800px" }}>
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
              sx={{ fontSize: "1.4rem", mt: 5.2, mb: 2, px: { xs: 3, sm: 0 } }}
            >
              Search result{" "}
              {searchResult &&
                `(${
                  searchResult.length > 99 ? "99+" : searchResult.length
                } matches)`}
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
