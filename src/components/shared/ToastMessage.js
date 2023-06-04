import { Alert, Snackbar } from '@mui/material';
import React from 'react';

const ToastMessage = ({ open, severity, message, onClose }) => {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      <Alert
        variant="filled"
        onClose={onClose}
        severity={severity}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ToastMessage;
