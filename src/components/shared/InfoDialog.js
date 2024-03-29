import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

const InfoDialog = ({ dialogOpen, dialogOnClose, dialogTitle, children }) => {
  return (
    <Dialog open={dialogOpen} onClose={dialogOnClose}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent dividers sx={{ whiteSpace: "pre-wrap" }}>
        {children}
      </DialogContent>
      <DialogActions sx={{ mr: 2, my: 1 }}>
        <Button
          onClick={(e) => dialogOnClose(e, "cancel")}
          variant="outlined"
          sx={{ mr: 2 }}
        >
          Cancel
        </Button>
        <Button
          onClick={(e) => dialogOnClose(e, "confirm")}
          variant="contained"
        >
          Ok, Got it!
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InfoDialog;
