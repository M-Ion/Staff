import { Alert, AlertTitle, Snackbar, SnackbarOrigin } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { feedbackStatusSx, fullW } from "../../assets/styles";
import { selectFeedback } from "../../services/store/slices/feedback.slice";

const snackBarOrigin: SnackbarOrigin = {
  horizontal: "center",
  vertical: "top",
};

const Feedback = () => {
  const feedback = useSelector(selectFeedback);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (feedback.message) setOpen(true);
  }, [feedback]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={snackBarOrigin}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={feedback.status ?? "info"}
        sx={{ ...fullW }}
      >
        <AlertTitle sx={feedbackStatusSx}>{feedback.status}</AlertTitle>
        {feedback.message}
      </Alert>
    </Snackbar>
  );
};

export default Feedback;
