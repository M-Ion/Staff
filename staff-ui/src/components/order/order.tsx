import {
  Avatar,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { alignCenterSx } from "../../assets/styles";
import { Order } from "../../types/order";
import AddIcon from "@mui/icons-material/Add";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import React from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import orderService from "../../services/order.service";

type Props = {
  last?: boolean;
  noteId: string;
  order: Order;
  orders: string[];
};

const NoteOrder = ({ last, noteId, order, orders }: Props) => {
  const [post] = orderService.usePostOrderMutation();
  const [deleteOrder] = orderService.useDeleteOrderMutation();

  const fullName = `${order.dish.category.name} ${order.dish.name}`;
  const details = `Price ${order.dish.price} Total ${
    order.dish.price * order.quantity
  }`;

  const handlePost = async () => {
    await post({ dish: order.dish.id, note: noteId });
  };

  const handleRemove = async () => {
    const id = orders.pop();

    if (id) console.log(await deleteOrder(id));
  };

  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar src={order.dish.blob ?? ""}>
            <LocalDiningIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={fullName} secondary={details} />

        <IconButton sx={{ ...alignCenterSx }} onClick={handleRemove}>
          <RemoveIcon />
        </IconButton>
        {order.quantity}
        <IconButton sx={{ ...alignCenterSx }} onClick={handlePost}>
          <AddIcon />
        </IconButton>
      </ListItem>
      {last && <Divider />}
    </>
  );
};

export default NoteOrder;
