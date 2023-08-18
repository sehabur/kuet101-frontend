import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { grey } from '@mui/material/colors';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import Spinner from '../../components/shared/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { learningActions } from '../../store';
import SchoolIcon from '@mui/icons-material/School';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

const Learning = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleLearningCategorySelect = async (category) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/posts/getLearningFileStructure/${category}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      dispatch(learningActions.fileStructure(response.data.files));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }

    navigate(`/learning/${category}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Spinner open={isLoading} />
      <Box sx={{ py: 6, bgcolor: 'secondary.dark' }}>
        <Box
          sx={{
            maxWidth: '750px',
            mx: 'auto',
            px: 2,
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          <Typography variant="h4" sx={{ color: grey[100] }}>
            Welcome to Learning Hub
          </Typography>
          <Typography sx={{ mt: 2, fontSize: '1.1rem', color: grey[300] }}>
            Find the learning materials you need from our huge amount of online
            resource collection and make yourself futureproof.
          </Typography>
        </Box>
      </Box>
      <Box sx={{ maxWidth: '750px', mx: 'auto', my: 4 }}>
        <Card sx={{ maxWidth: 550, mx: 2, borderRadius: 2 }} variant="outlined">
          <CardActionArea
            component={RouterLink}
            to="/learning/bcs"
            onClick={() => handleLearningCategorySelect('bcs')}
          >
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
              }}
            >
              <Box>
                <LibraryBooksIcon
                  sx={{
                    fontSize: '3rem',
                    mr: { xs: 2, sm: 3 },
                    ml: { xs: 0, sm: 1 },
                  }}
                  color="info"
                />
              </Box>
              <Box>
                <Typography variant="h6" component="div" color="secondary.main">
                  BCS, Bank jobs and others
                </Typography>
                <Typography color="text.secondary">
                  BCS, Government banks and other non departmental government
                  job preparation
                </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card
          sx={{ maxWidth: 550, my: 4, mx: 2, borderRadius: 2 }}
          variant="outlined"
        >
          <CardActionArea onClick={() => handleLearningCategorySelect('dept')}>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
              }}
            >
              <Box>
                <SchoolIcon
                  sx={{
                    fontSize: '3rem',
                    mr: { xs: 2, sm: 3 },
                    ml: { xs: 0, sm: 1 },
                  }}
                  color="info"
                />
              </Box>
              <Box>
                <Typography variant="h6" component="div" color="secondary.main">
                  Departmental Jobs
                </Typography>
                <Typography color="text.secondary">
                  Departmental government and autonomous company job preparation
                </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card sx={{ maxWidth: 550, mx: 2, borderRadius: 2 }} variant="outlined">
          <CardActionArea
            onClick={() => handleLearningCategorySelect('higherStudy')}
          >
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
              }}
            >
              <Box>
                <FlightTakeoffIcon
                  sx={{
                    fontSize: '3rem',
                    mr: { xs: 2, sm: 3 },
                    ml: { xs: 0, sm: 1 },
                  }}
                  color="info"
                />
              </Box>
              <Box>
                <Typography variant="h6" component="div" color="secondary.main">
                  Higher Studies
                </Typography>
                <Typography color="text.secondary">
                  Prepare for higher studies opportunities at top ranked
                  universities abroad
                </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </>
  );
};

export default Learning;
