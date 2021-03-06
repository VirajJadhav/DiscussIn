import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  useMediaQuery,
  useTheme,
  Slide,
} from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function InfoModal({
  open,
  handleInfoModal,
  title,
  subTitle,
  description,
  status,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleInfoModal}
        aria-labelledby="room-information"
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle id="room-information">
          {/* {title} */}
          <Typography
            style={{
              fontSize: "2rem",
              marginLeft: "-0.2rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </Typography>
          <Typography
            style={{
              fontSize: "1.2rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {subTitle}
          </Typography>
        </DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>
        {status === "private" ? (
          <DialogContent>
            <DialogContentText>
              {"* Only admin can save room messages"}
            </DialogContentText>
          </DialogContent>
        ) : null}

        <DialogActions>
          <Button
            variant="contained"
            onClick={handleInfoModal}
            color="secondary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
