import { Alert, AlertTitle, Snackbar, SnackbarOrigin } from "@mui/material";
import React, { useState } from "react";
import { fullW } from "../../assets/styles";

const snackBarOrigin: SnackbarOrigin = {
  horizontal: "center",
  vertical: "top",
};

const Feedback = () => {
  const [open, setOpen] = useState<boolean>(true);

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
      <Alert onClose={handleClose} severity={"success"} sx={{ ...fullW }}>
        <AlertTitle>{"Success"}</AlertTitle>
        {"Message"}
      </Alert>
    </Snackbar>
  );
};

export default Feedback;
