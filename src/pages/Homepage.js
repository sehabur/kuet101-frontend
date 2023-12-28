import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Banner from '../components/homepage/Banner';
// import Events from '../components/homepage/Events';
import Posts from '../components/homepage/Posts';
import Clubs from '../components/homepage/Clubs';
import LearningHub from '../components/homepage/LearningHub';
import Tution from '../components/homepage/Tution';
// import axios from 'axios';
// import { format } from 'date-fns';
import Spinner from '../components/shared/Spinner';
import Blood from '../components/homepage/Blood';
import SearchAlumni from '../components/homepage/SearchAlumni';

const Homepage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  // const [events, setEvents] = useState(null);

  // const getAllEvents = async () => {
  //   try {
  //     setIsLoading(true);
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_BACKEND_URL}/api/users/getAllEvents`,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${auth?.token}`,
  //         },
  //       }
  //     );
  //     console.log(eventsMapping(response.data.events));
  //     setEvents(eventsMapping(response.data.events));
  //     setIsLoading(false);
  //   } catch (error) {
  //     setIsLoading(false);
  //     console.log(error);
  //   }
  // };

  // const eventsMapping = (events) => {
  //   return events.map((event) => {
  //     const eventDateObject = new Date(event.date);
  //     return {
  //       month: format(eventDateObject, 'MMM'),
  //       date: format(eventDateObject, 'dd'),
  //       detailedDate: format(eventDateObject, 'MMM dd, yyyy'),
  //       title: event.title,
  //       description: event.description,
  //       location: event.location,
  //     };
  //   });
  // };

  useEffect(() => {
    if (!auth?.isLoggedIn) {
      navigate('/signin');
    }
  }, [navigate, auth]);

  // useEffect(() => {
  //   getAllEvents();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [auth]);

  return (
    <>
      <Spinner open={isLoading} />
      <Banner />
      {/* <Events events={events} /> */}
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
