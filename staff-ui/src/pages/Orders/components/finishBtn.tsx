import { IconButton } from "@mui/material";
import { Order } from "../../../types/order.types";
import { setSuccess } from "../../../services/store/slices/feedback.slice";
import { useDispatch } from "react-redux";
import orderService from "../../../services/order.service";
import React from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

type Props = {
  order: Order;
};

const FinishBtn = ({ order }: Props) => {
  const dispatch = useDispatch();
  const [finish] = orderService.useFinishOrderMutation();

  const handleFinish = async () => {
    await finish(order.id);
    dispatch(
      setSuccess(
        `${order.dish.name} ordered by ${order.user.fullName} prepared.`
      )
    );
  };

  return (
    <IconButton onClick={handleFinish}>
      <TaskAltIcon color="primary" />
    </IconButton>
  );
};

export default FinishBtn;
