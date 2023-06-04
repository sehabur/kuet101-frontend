import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';

import RemoveIcon from '@mui/icons-material/Remove';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PlaceIcon from '@mui/icons-material/Place';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Banner from '../components/homepage/Banner';
import Events from '../components/homepage/Events';
import Stories from '../components/homepage/Stories';
import Clubs from '../components/homepage/Clubs';
import LearningHub from '../components/homepage/LearningHub';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Homepage = () => {
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth?.isLoggedIn) {
      navigate('/signin');
    }
  }, [navigate, auth]);

  return (
    <>
      <Banner />
      <Events />
      <Stories />
      <Clubs />
      <LearningHub />
    </>
  );
};

export default Homepage;
