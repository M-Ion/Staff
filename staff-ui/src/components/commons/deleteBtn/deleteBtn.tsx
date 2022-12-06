import { IconButton } from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogConfirm from "../dialogConfirm";

type Props = {
  execute: Function;
  name: string;
  message?: string;
};

const DeleteBtn = ({ execute, message, name }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => setOpen(true);

  const handleDelete = async () => {
    await execute();
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <DeleteIcon color="error" />
      </IconButton>
      <DialogConfirm
        context={message ?? ""}
        fnc={handleDelete}
        openState={[open, setOpen]}
        title={`Delete ${name} ?`}
      />
    </>
  );
};

export default DeleteBtn;
