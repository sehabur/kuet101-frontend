import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';

const ConfirmationDialog = ({
  dialogOpen,
  dialogOnClose,
  dialogTitle,
  dialogText,
}) => {
  return (
    <Dialog open={dialogOpen} onClose={dialogOnClose}>
      <Box sx={{ p: 2 }}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogText}</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ mr: 2, mb: 1.5 }}>
          <Button
            onClick={(e) => dialogOnClose(e, 'cancel')}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={(e) => dialogOnClose(e, 'confirm')}
            variant="contained"
          >
            Confirm
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ConfirmationDialog;
