import React from "react";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";

export default function FormDialog({
  open,
  guestName,
  handleChange,
  handleFormDialog,
}) {
  return (
    <div>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Guest Name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide a guest name, to continue into this discussion.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            value={guestName}
            onChange={handleChange}
            id="guestName"
            name="guestName"
            label="Guest Name"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormDialog} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
