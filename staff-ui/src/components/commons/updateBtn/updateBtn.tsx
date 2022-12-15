import React, { useState } from "react";
import DialogContainer from "../dialogContainer";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";

type Props = {
  children?: React.ReactNode | React.ReactNode[];
};

const UpdateBtn = ({ children }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => setOpen(true);

  return (
    <>
      <DialogContainer
        icon={<EditIcon color="primary" />}
        openState={[open, setOpen]}
      >
        {children}
      </DialogContainer>
      <IconButton onClick={handleClick}>
        <EditIcon />
      </IconButton>
    </>
  );
};

export default UpdateBtn;
