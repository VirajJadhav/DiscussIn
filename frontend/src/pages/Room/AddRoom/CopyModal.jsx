import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  Slide,
  Typography,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import { FileCopy } from "@material-ui/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CopyModal({
  open,
  handleCopyModal,
  roomID,
  handleCopy,
}) {
  return (
    <div>
      <Dialog
        fullWidth
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="xs"
        aria-labelledby="copy-modal-title"
        aria-describedby="copy-modal-data"
      >
        <DialogTitle id="copy-modal-title">{"Join Room"}</DialogTitle>
        <div
          style={{
            border: "1px solid black",
            margin: "0.8rem",
            padding: "0.5rem 0.5rem 0.5rem 0.7rem",
            color: "grey",
          }}
        >
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="body1">{`Room ID: ${roomID}`}</Typography>
            </Grid>
            <Grid item>
              <Tooltip title="Copy to Clipboard">
                <IconButton aria-label="copy-to-clipboard">
                  <CopyToClipboard
                    text={roomID || "Room ID"}
                    onCopy={handleCopy}
                  >
                    <FileCopy />
                  </CopyToClipboard>
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </div>

        <DialogActions>
          <Button
            onClick={() => handleCopyModal(true)}
            variant="contained"
            color="secondary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
