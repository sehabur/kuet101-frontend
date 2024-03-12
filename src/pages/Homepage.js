import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactGA from "react-ga";

import Banner from "../components/homepage/Banner";
// import Events from '../components/homepage/Events';
import Posts from "../components/homepage/Posts";
import Clubs from "../components/homepage/Clubs";
import LearningHub from "../components/homepage/LearningHub";
import Tution from "../components/homepage/Tution";
// import axios from 'axios';
// import { format } from 'date-fns';
// import Spinner from '../components/shared/Spinner';
import Blood from "../components/homepage/Blood";
import SearchAlumni from "../components/homepage/SearchAlumni";
import { searchActions } from "../store";

const Homepage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  dispatch(searchActions.reset());

  useEffect(() => {
    if (!auth?.isLoggedIn) {
      navigate("/signin");
    }
  }, [navigate, auth]);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <>
      <Banner />
      <Posts />
      <SearchAlumni />
      <Blood />
      <LearningHub />
      <Tution />
      <Clubs />
    </>
  );
};

export default Homepage;
