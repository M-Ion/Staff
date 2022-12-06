import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
} from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import CloseIcon from "@mui/icons-material/Close";
import React, { ReactNode, SetStateAction } from "react";

type Props = {
  children?: ReactNode | ReactNode[];
  icon?: JSX.Element;
  openState: [boolean, (value: SetStateAction<boolean>) => void];
};

const DialogContainer = ({ children, icon, openState }: Props) => {
  const [open, setOpen] = openState;

  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open}>
      <DialogActions
        sx={
          icon
            ? {
                paddingBottom: 0,
                paddingLeft: "40px",
                justifyContent: "space-between",
              }
            : { paddingBottom: 0 }
        }
      >
        {icon}
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogActions>
      <DialogContent sx={{ paddingTop: 0, px: 5 }}>{children}</DialogContent>
    </Dialog>
  );
};

export default DialogContainer;
