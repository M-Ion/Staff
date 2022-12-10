import { IconButton } from "@mui/material";
import orderService from "../../services/order.service";
import React from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

type Props = {
  orderId: string;
};

const FinishBtn = ({ orderId }: Props) => {
  const [finish] = orderService.useFinishOrderMutation();

  const handleFinish = async () => {
    await finish(orderId);
  };

  return (
    <IconButton onClick={handleFinish}>
      <TaskAltIcon color="primary" />
    </IconButton>
  );
};

export default FinishBtn;
