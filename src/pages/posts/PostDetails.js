/* eslint-disable react-hooks/exhaustive-deps */
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/shared/Spinner';
import ReactTimeAgo from 'react-time-ago';
import { Link as RouterLink } from 'react-router-dom';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { grey } from '@mui/material/colors';
import { batchList, departments, status } from '../../data/mappingFile';

const PostDetails = () => {
  const { id: postId } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const [postDetails, setPostDetails] = useState(null);

  const [mailRecpList, setMailRecpList] = useState({});

  const auth = useSelector((state) => state.auth);

  const [postSetActiveStatus, setPostSetActiveStatus] = useState();

  const [sendMailSelection, setSendMailSelection] = useState();

  const [errorMessage, setErrorMessage] = useState('');

  const [successMessage, setSuccessMessage] = useState('');

  const handleSendMailSelection = (event) => {
    setSendMailSelection(event.target.checked);
  };
  // const handleCheckboxChange = (event) => {
  //   setMailRecpList({
  //     ...mailRecpList,
  //     [event.target.name]: event.target.checked,
  //   });
  // };

  console.log(mailRecpList);

  const handleAutoCompleteChange = (name, value) => {
    console.log(name, value);
    setMailRecpList({
      ...mailRecpList,
      [name]: value,
    });
  };

  const handlePostActiveStatusChange = (event) => {
    setPostSetActiveStatus(event.target.value);
  };

  const handlePostActiveStatusSubmit = async () => {
    try {
      setIsLoading(true);

      let mailReceivers = {};
      for (let key in mailRecpList) {
        if (mailRecpList[key].length > 0) {
          mailReceivers[key] = mailRecpList[key];
        }
      }
      const response = await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/updatePostActiveStatus`,
        {
          postId: postDetails._id,
          isActive: postSetActiveStatus,
          sendMailSelection,
          mailReceivers,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      if (response.status === 201) {
        setErrorMessage('');
        setSuccessMessage(response.data.message);
      } else {
        setErrorMessage('Post status update failed.');
        setSuccessMessage('');
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setErrorMessage('Post status update failed.');
      setSuccessMessage('');
    }
  };

  const getPostDetails = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/posts/${postId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth && auth.token}`,
          },
        }
      );
      setPostDetails(response.data.post);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getPostDetails();
  }, [auth]);

  return (
    <Box sx={{ maxWidth: '950px', mx: 'auto', py: 4, px: 2, mb: 4 }}>
      <Spinner open={isLoading} />

      {postDetails && (
        <>
          <Typography variant="title" sx={{ my: 2, fontSize: '1.8rem' }}>
            {postDetails.title}
          </Typography>

          <Typography
            sx={{
              fontSize: '.9rem',
              fontStyle: 'italic',
              ml: 0.3,
              mt: 1,
              mb: 2,
            }}
          >
            Posted by{' '}
            <Typography
              sx={{ display: 'inline' }}
              component={RouterLink}
              to={`/profile/${postDetails.user._id}`}
            >
              {postDetails.user.firstName} {postDetails.user.lastName}
            </Typography>{' '}
            <ReactTimeAgo
              date={postDetails.createdAt}
              locale="en-US"
              timeStyle="round-minute"
            />
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            <PhotoProvider>
              {postDetails.images.map((image) => (
                <PhotoView
                  src={`${process.env.REACT_APP_CLOUD_IMAGE_URL}/${image}`}
                >
                  <Box
                    sx={{
                      width: { xs: '95vw', sm: 220 },
                      pr: 2,
                      height: 175,
                      mb: 2,
                      ':hover': {
                        cursor: 'pointer',
                      },
                    }}
                    // component={RouterLink}
                    // to={`${process.env.REACT_APP_CLOUD_IMAGE_URL}/${image}`}
                    // target="_blank"
                  >
                    <img
                      src={`${process.env.REACT_APP_CLOUD_IMAGE_URL}/${image}`}
                      sx={{
                        width: { xs: '95vw', sm: 220 },
                        pr: 2,
                        height: 175,
                        mb: 2,
                      }}
                      alt="no img available"
                      width="100%"
                      height="100%"
                      style={{
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                </PhotoView>
              ))}
            </PhotoProvider>
          </Box>

          <Typography paragraph={true} sx={{ mt: 2, whiteSpace: 'pre-wrap' }}>
            {postDetails.description}
          </Typography>
        </>
      )}

      {auth?.isAdmin && (
        <Box sx={{ mt: 6, bgcolor: grey[50], p: 2, borderRadius: 2 }}>
          <Typography sx={{ fontWeight: 700 }}>Admin Panel</Typography>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ my: 4 }}>
            <Box sx={{ my: 2 }}>
              {/* <FormControlLabel
                control={<Checkbox />}
                label="Department"
                name="deptSelect"
                onChange={handleCheckboxChange}
              /> */}
              <Autocomplete
                multiple
                options={departments.map((item) => item.short)}
                onChange={(event, value, reason = 'selectOption') => {
                  handleAutoCompleteChange('departmentShort', value);
                }}
                size="small"
                sx={{ maxWidth: 600 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="departmentShort"
                    label="Select department"
                  />
                )}
              />
            </Box>
            <Box sx={{ my: 2 }}>
              {/* <FormControlLabel
                control={<Checkbox />}
                label="Batch"
                name="batchSelect"
                onChange={handleCheckboxChange}
              /> */}
              <Autocomplete
                multiple
                options={batchList}
                onChange={(event, value, reason = 'selectOption') => {
                  handleAutoCompleteChange('batch', value);
                }}
                size="small"
                sx={{ maxWidth: 600 }}
                renderInput={(params) => (
                  <TextField {...params} name="batch" label="Select batch" />
                )}
              />
            </Box>
            <Box sx={{ my: 2 }}>
              {/* <FormControlLabel
                control={<Checkbox />}
                label="Status"
                name="statusSelect"
                onChange={handleCheckboxChange}
              /> */}
              <Autocomplete
                multiple
                options={status.map((item) => item.value)}
                onChange={(event, value, reason = 'selectOption') => {
                  handleAutoCompleteChange('status', value);
                }}
                size="small"
                sx={{ maxWidth: 600 }}
                renderInput={(params) => (
                  <TextField {...params} name="status" label="Select status" />
                )}
              />
            </Box>
            <Box sx={{ my: 2 }}>
              {/* <FormControlLabel
                control={<Checkbox />}
                label="Current location"
                name="locationSelect"
                onChange={handleCheckboxChange}
              /> */}
              <Autocomplete
                multiple
                options={['insideBd', 'outsideBd']}
                onChange={(event, value, reason = 'selectOption') => {
                  handleAutoCompleteChange('currentlyLiveIn', value);
                }}
                size="small"
                sx={{ maxWidth: 600 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="currentlyLiveIn"
                    label="Select location"
                  />
                )}
              />
            </Box>
            <FormControlLabel
              sx={{ mt: 2, ml: 0 }}
              control={<Checkbox />}
              label="Send mail"
              name="sendMail"
              onChange={handleSendMailSelection}
            />
            <Box sx={{ mt: 1 }}>
              <TextField
                select
                label="Active status"
                name="isActive"
                size="small"
                value={postSetActiveStatus}
                onChange={handlePostActiveStatusChange}
                sx={{ minWidth: 200, mr: 2 }}
              >
                <MenuItem value={true}>Active</MenuItem>
                <MenuItem value={false}>Inactive</MenuItem>
              </TextField>
              <Button
                variant="contained"
                color="primary"
                sx={{ px: 4 }}
                onClick={handlePostActiveStatusSubmit}
              >
                Update
              </Button>
            </Box>
          </Box>

          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
        </Box>
      )}
    </Box>
  );
};

export default PostDetails;
