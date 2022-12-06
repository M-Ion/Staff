import React, { SetStateAction } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

type Props = {
  context: string;
  fnc: Function;
  openState: [boolean, (value: SetStateAction<boolean>) => void];
  title: string;
};

const DialogConfirm = ({ context, fnc, openState, title }: Props) => {
  const [open, setOpen] = openState;

  const handleClose = () => {
    setOpen(false);
  };

  const doFunction = async () => {
    await fnc();
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{context}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={doFunction} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogConfirm;
