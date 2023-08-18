import React from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import ChangePassword from '../../components/managePassword/ChangePassword';
import ResetPasswordLink from '../../components/managePassword/ResetPasswordLink';
import SetNewPassword from '../../components/managePassword/SetNewPassword';

const ManagePassword = () => {
  const { type } = useParams();

  return (
    <>
      <Box sx={{ mt: 2, px: 5, py: 3, maxWidth: '450px', mx: 'auto' }}>
        <Box sx={{ my: 6, textAlign: 'center' }}>
          <img src="/images/logo.png" alt="logo" width="275" />
        </Box>
        {type === 'change' && <ChangePassword />}
        {type === 'reset-link' && <ResetPasswordLink />}
        {type === 'set-new' && <SetNewPassword />}
      </Box>
    </>
  );
};

export default ManagePassword;
